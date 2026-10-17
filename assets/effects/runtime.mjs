import registry from './components.mjs';
import { validateEffect, verifyAssets, resolveComposition, staticBackground, flattenLayers, serializeEffect } from './protocol.mjs';

const terminal = new Set(['unsupported','no-adapter','no-device','init-failed','device-lost','out-of-memory','gpu-error','render-failed','limit-exceeded','unrecoverable','rebuild_failed']);
export async function loadShaders() { return import('./shaders-js.mjs'); }
export function readThemeTokens(host){
  const win=host.ownerDocument.defaultView,style=win.getComputedStyle(host),probe=host.ownerDocument.createElement('span'),result={};
  probe.style.display='none';host.append(probe);
  for(const key of Array.from(style).filter(k=>k.startsWith('--dig-'))){const raw=style.getPropertyValue(key).trim();probe.style.color='';probe.style.color=raw;result[key]=probe.style.color?win.getComputedStyle(probe).color:raw;}
  probe.remove();return result;
}

/** One host owns one effect controller. Return immediately, including during asynchronous GPU setup. */
export function mountEffect(host, input, options = {}) {
  let recipe = validateEffect(input), shader = null, disposed = false, epoch = 0, pending = false, assetEpoch = 0, creatingEpoch = null, appliedComposition = null;
  let manualPause = Boolean(options.paused), forcedStatic = Boolean(options.staticPreview), inView = true, failure = null, readyResolve;
  const doc = host.ownerDocument, win = doc.defaultView, themeRoot = options.themeRoot || host;
  const domMode=()=>{const ancestor=themeRoot.closest('[data-theme],[data-style-theme]');return ancestor?.dataset.theme || ancestor?.dataset.styleTheme || 'light';};
  let mode = options.mode || domMode(), contextOverrides = {...options.context}, context = {...recipe.runtime.context,...contextOverrides};
  if(!['light','dark'].includes(mode))throw new Error('Theme must be light or dark');
  validateEffect({...recipe,runtime:{...recipe.runtime,context}});
  const layer = doc.createElement('div'), canvas = doc.createElement('canvas');
  layer.dataset.digEffect = recipe.id; layer.setAttribute('aria-hidden','true');
  Object.assign(layer.style,{position:recipe.mount.scroll==='viewport'?'fixed':'absolute',inset:'0',zIndex:'0',pointerEvents:'none'});
  Object.assign(canvas.style,{width:'100%',height:'100%',display:'block'});
  layer.append(canvas);
  // Caller establishes host positioning; only the dedicated layer gets clipping/decoration styles.
  host.prepend(layer);
  const assetURLs = {};
  let assetsReady = false;
  const motion = win.matchMedia('(prefers-reduced-motion: reduce)');
  const timers=new Set();
  const status = (state, reason = '') => { if (!disposed) { layer.dataset.state=state; layer.dataset.reason=reason; try {options.onStatus?.({state,reason});} catch(e) {win.console?.error('Effect status callback failed',e);} } };
  const tokens = () => options.tokens?.() || readThemeTokens(themeRoot);
  const inactive = () => manualPause || forcedStatic || motion.matches || doc.hidden || !inView || context.OPERATIONAL_CRITICALITY >= 8 || context.INFORMATION_DENSITY >= 8 || context.INTERACTION_ENERGY <= 2;
  const settleReady = () => { readyResolve?.(); readyResolve=null; };
  function stopShader() { epoch++; pending=false; for(const timer of timers)win.clearTimeout(timer);timers.clear();shader?.destroy(); shader=null; appliedComposition=null; canvas.style.visibility='hidden'; }
  function paintFallback() {
    try { layer.style.background=staticBackground(recipe,tokens(),assetURLs); }
    catch (e) { layer.style.background='var(--dig-bg)'; failure=e.message; }
  }
  function dimensions() {
    const rect=layer.getBoundingClientRect(), pixels=Math.max(1,rect.width*rect.height);
    const scale=Math.min(1,Math.sqrt(recipe.runtime.max_pixels/(pixels*Math.max(1,win.devicePixelRatio)**2)));
    return [Math.max(1,Math.floor(rect.width*scale)),Math.max(1,Math.floor(rect.height*scale))];
  }
  function size() {
    if (!shader) return;
    shader.resize(...dimensions());
    canvas.style.width='100%'; canvas.style.height='100%';
  }
  // Shaders update() merges props. Removed props and compile-time changes need a fresh instance.
  const structure=components=>JSON.stringify(components.map(function walk(n){return {id:n.id,type:n.type,props:Object.keys(n.props).sort(),compileTime:Object.fromEntries(Object.entries(n.props).filter(([key])=>registry.components[n.type].props[key]?.compileTime)),children:n.children?.map(walk)};}));
  async function reconcile() {
    if (disposed || !assetsReady) return;
    paintFallback();
    if (inactive() || failure) { stopShader(); status('static',failure || (motion.matches ? 'reduced-motion' : 'paused')); settleReady(); return; }
    if (shader) { size(); return; }
    if (pending) return;
    if (creatingEpoch !== null) {status('static','restarting');settleReady();return;}
    const mine=++epoch; pending=true; status('loading');
    let timedOut=false,candidate=null;
    const timeout=win.setTimeout(()=>{ if(!disposed && mine===epoch) {timedOut=true; failure='init-timeout';stopShader();status('static',failure);settleReady();} },10000);
    timers.add(timeout);
    try {
      const provider=await (options.loadProvider || loadShaders)();
      if (disposed || mine!==epoch) return;
      const composition=resolveComposition(recipe,tokens(),mode,assetURLs);
      const [width,height]=dimensions();canvas.style.width=width+'px';canvas.style.height=height+'px';
      creatingEpoch=mine;
      const next=candidate=await provider.createShader(canvas,composition,{
        disableTelemetry:true,observeElement:false,colorSpace:'srgb',
        onReady:()=>{ if(shader && !disposed && mine===epoch && !failure) {canvas.style.visibility='visible';status('running');settleReady();} },
        onError:reason=>{ if(!disposed && mine===epoch && terminal.has(reason)) {failure=reason;stopShader();status('static',reason);settleReady();} }
      });
      if (disposed || mine!==epoch || timedOut || inactive()) {next.destroy();candidate=null;return;}
      failure=next.getFailureReason?.() || null;
      if (failure) {next.destroy();candidate=null;status('static',failure);settleReady();return;}
      // Resolve again after initialization: CSS/theme may have changed while awaiting WebGPU.
      const latest=resolveComposition(recipe,tokens(),mode,assetURLs);
      if(structure(composition.components)!==structure(latest.components)){next.destroy();candidate=null;stopShader();return;}
      shader=next;candidate=null;appliedComposition=latest.components;
      if(JSON.stringify(composition)!==JSON.stringify(latest))for(const n of flattenLayers({composition:latest.components}))shader.update(n.id,n.props);
      size(); canvas.style.visibility='visible';status('running');settleReady();
    } catch (e) { if(!disposed && mine===epoch) {failure=e.message;stopShader();status('static',failure);settleReady();} }
    finally {candidate?.destroy();win.clearTimeout(timeout);timers.delete(timeout);if(creatingEpoch===mine)creatingEpoch=null;if(mine===epoch)pending=false;else if(!disposed)void reconcile();}
  }
  function refreshTheme(nextMode=mode) {
    if(disposed)return;if(!['light','dark'].includes(nextMode))throw new Error('Theme must be light or dark');mode=nextMode;paintFallback();
    if(shader) {
      try { const resolved=resolveComposition(recipe,tokens(),mode,assetURLs);
        if(structure(appliedComposition)!==structure(resolved.components)){stopShader();void reconcile();}
        else{for(const n of flattenLayers({composition:resolved.components}))shader.update(n.id,n.props);appliedComposition=resolved.components;}
      }
      catch(e){failure=e.message;stopShader();status('static',failure);}
    } else void reconcile();
  }
  const ready=new Promise(resolve=>{readyResolve=resolve;});
  const resizeObserver=new win.ResizeObserver(size);resizeObserver.observe(layer);
  const intersection=new win.IntersectionObserver(entries=>{inView=entries[0]?.isIntersecting ?? true;void reconcile();});intersection.observe(layer);
  const themeObserver=new win.MutationObserver(()=>refreshTheme(options.modeFromDOM?.() || (options.mode===undefined?domMode():mode)));
  for(let ancestor=themeRoot;ancestor;ancestor=ancestor.parentElement)themeObserver.observe(ancestor,{attributes:true,attributeFilter:['class','style','data-theme','data-style-theme']});
  const onVisibility=()=>void reconcile(); doc.addEventListener('visibilitychange',onVisibility);
  motion.addEventListener('change',onVisibility);
  // Shader's pointer tracker listens at document scope and uses canvas bounds, so decorative
  // pointer-events:none does not block host controls or require synthetic events.
  async function prepare() {
    const generation=++assetEpoch, preparedRecipe=recipe;
    try {
      await verifyAssets(preparedRecipe);
      if(disposed || generation!==assetEpoch)return;
      for(const a of preparedRecipe.assets) assetURLs[a.path]=win.URL.createObjectURL(new win.Blob([Uint8Array.from(atob(a.data),c=>c.charCodeAt(0))],{type:a.mime}));
      assetsReady=true; layer.style.overflow=recipe.mount.clip; await reconcile();
    } catch(e){if(disposed || generation!==assetEpoch)return;failure=e.message;assetsReady=true;paintFallback();status('static',failure);settleReady();}
  }
  void prepare();
  return {
    ready,
    refreshTheme,
    update(next) {
      next=validateEffect(next);
      if(disposed)throw new Error('Effect destroyed');
      if(serializeEffect(next)===serializeEffect(recipe))return;
      const rebuild=structure(recipe.composition)!==structure(next.composition) || JSON.stringify(recipe.assets)!==JSON.stringify(next.assets);
      recipe=next;context={...recipe.runtime.context,...contextOverrides};layer.dataset.digEffect=recipe.id;layer.style.overflow=recipe.mount.clip;layer.style.position=recipe.mount.scroll==='viewport'?'fixed':'absolute';failure=null;
      if(rebuild){stopShader();for(const u of Object.values(assetURLs))win.URL.revokeObjectURL(u);for(const k of Object.keys(assetURLs))delete assetURLs[k];assetsReady=false;void prepare();}
      else {if(pending)stopShader();refreshTheme(mode);void reconcile();}
    },
    pause(){manualPause=true;void reconcile();},
    resume(){manualPause=false;failure=null;void reconcile();},
    setStatic(value){forcedStatic=Boolean(value);failure=null;void reconcile();},
    setContext(value){const next={...recipe.runtime.context,...value};validateEffect({...recipe,runtime:{...recipe.runtime,context:next}});contextOverrides={...value};context=next;void reconcile();},
    destroy(){if(disposed)return;disposed=true;assetEpoch++;stopShader();resizeObserver.disconnect();intersection.disconnect();themeObserver.disconnect();doc.removeEventListener('visibilitychange',onVisibility);motion.removeEventListener('change',onVisibility);for(const u of Object.values(assetURLs))win.URL.revokeObjectURL(u);layer.remove();settleReady();},
    getState(){return {state:layer.dataset.state,reason:layer.dataset.reason,disposed};}
  };
}
