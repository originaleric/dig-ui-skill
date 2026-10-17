import { clone,validateEffect,setParameter,flattenLayers,verifyAssets,serializeEffect } from './protocol.mjs';
import { mountEffect,readThemeTokens } from './runtime.mjs';
import { readEffectArchive,unzipFiles } from './archive.mjs';
import { exportEffect } from './export.mjs';
import Color from './color.mjs';

const data=JSON.parse(document.getElementById('effect-data').textContent);
const dictionary={
 'zh-CN':{title:'Effect Lab',description:'选择特效，调整参数，在不同主题中预览并保存。',recipe:'特效',catalog:'基础主题',parameters:'参数',mount:'使用区域',width:'预览宽度',background:'背景','hero-background':'首屏背景',illustration:'插画','local-container':'局部容器',wide:'自适应',narrow:'手机',medium:'平板',pause:'暂停',play:'播放',static:'静态预览',undo:'撤销',redo:'重做',reset:'恢复默认',export:'导出特效',import:'打开特效 JSON / ZIP',themeImport:'打开自定义主题 JSON / ZIP / Markdown',diff:'参数改动',clean:'与原版一致',sampleTitle:'让视觉服务于内容',sampleText:'背景特效与可操作的文字、输入框和按钮独立工作。',sampleLabel:'项目名称',samplePlaceholder:'输入项目名称',sampleAction:'保存项目',sampleSaved:'项目已保存',loading:'正在准备预览',running:'动态预览已就绪',paused:'已暂停，显示静态背景',fallback:'正在显示静态背景',draft:'已恢复草稿',stale:'旧草稿与当前资产不匹配，已保留旧草稿并打开当前资产',exported:'特效已导出',error:'操作失败',light:'浅色',dark:'深色',slotChanged:'使用区域已更新'},
 en:{title:'Effect Lab',description:'Tune an effect, preview with different themes, and save it for reuse.',recipe:'Effect',catalog:'Base theme',parameters:'Parameters',mount:'Placement',width:'Preview width',background:'Background','hero-background':'Hero background',illustration:'Illustration','local-container':'Local container',wide:'Responsive',narrow:'Phone',medium:'Tablet',pause:'Pause',play:'Play',static:'Static preview',undo:'Undo',redo:'Redo',reset:'Reset defaults',export:'Export effect',import:'Open effect JSON / ZIP',themeImport:'Open custom theme JSON / ZIP / Markdown',diff:'Parameter changes',clean:'Same as original',sampleTitle:'Let visuals support the content',sampleText:'Background effects work independently from readable content and usable controls.',sampleLabel:'Project name',samplePlaceholder:'Enter a project name',sampleAction:'Save project',sampleSaved:'Project saved',loading:'Preparing preview',running:'Animated preview ready',paused:'Paused; showing static background',fallback:'Showing static background',draft:'Draft restored',stale:'An older draft does not match this asset; kept the draft and opened this asset',exported:'Effect exported',error:'Action failed',light:'Light',dark:'Dark',slotChanged:'Placement updated'}
};
let lang=storageGet('dig-ui-lang')==='en'?'en':'zh-CN',mode=storageGet('dig-ui-effect-theme')==='dark'?'dark':'light';
let savedSelection;try{savedSelection=JSON.parse(storageGet('dig-ui-effect-selection')||'null');}catch{}
// The selection owns its source baseline; an ID alone does not identify that source.
const packagedBaselines=new Map(data.effects.map(effect=>[effect.id,selectionBaseline(effect)]));
if(data.effects.length>1&&savedSelection?.effect){
 try{const draft=JSON.parse(storageGet('dig-ui-effect-draft:'+savedSelection.effect)||'null'),original=validateEffect(JSON.parse(draft.baseline)),candidate=validateEffect(draft.recipe),packaged=data.effects.find(x=>x.id===savedSelection.effect);
  const sourceUnchanged=!packaged||(savedSelection.packagedBaseline!==undefined?savedSelection.packagedBaseline===selectionBaseline(packaged):original.revision>packaged.revision);
  if(sourceUnchanged&&original.id===savedSelection.effect&&candidate.id===original.id&&candidate.revision===original.revision&&(savedSelection.effectBaseline===undefined||savedSelection.effectBaseline===selectionBaseline(original))){if(packaged)data.effects=data.effects.map(x=>x.id===original.id?original:x);else data.effects.push(original);}
 }catch{/* Invalid/obsolete drafts cannot replace packaged assets. */}
}
let currentId=data.effects.some(x=>x.id===savedSelection?.effect)?savedSelection.effect:data.selection?.effect || data.effects[0].id, themeId=data.themes.some(x=>x.id===savedSelection?.theme)?savedSelection.theme:data.selection?.theme || data.themes[0]?.id;
let baseline,recipe,controller,paused=false,staticMode=false,undo=[],redo=[],providerURL,exporting=false,pageActive=true,pageEpoch=0,importEpoch=0,themeImportEpoch=0;
const exported=new Map();
const $=id=>document.getElementById(id),t=key=>dictionary[lang][key] || key;
function storageGet(key){try{return localStorage.getItem(key);}catch{return null;}}
function storageSet(key,value){try{localStorage.setItem(key,value);}catch{/* private/file contexts may deny storage */}}
function storageRemove(key){try{localStorage.removeItem(key);}catch{}}
function report(message,error=false){$('message').textContent=message;$('message').classList.toggle('error',error);}
function button(id,key,extra=''){return `<button type="button" id="${id}" data-i18n="${key}" ${extra}>${t(key)}</button>`;}
function optionsHTML(items,value){return items.map(x=>{const el=document.createElement('option');el.value=x.id;el.textContent=x.name?.[lang]||x.name?.en||x.id;if(x.id===value)el.setAttribute('selected','');return el.outerHTML;}).join('');}
function shell(){
 document.documentElement.lang=lang;
 $('effect-lab').innerHTML=`<header><div><h1 data-i18n="title">${t('title')}</h1><p data-i18n="description">${t('description')}</p></div><div class="tools">${button('language','title','aria-label="Language"')}<div class="theme-group" data-mode="${mode}"><span class="theme-indicator" aria-hidden="true"></span>${button('light','light','class="theme-button"')}${button('dark','dark','class="theme-button"')}</div></div></header><div class="workspace"><section class="controls" aria-label="${t('parameters')}"><label class="field wide"><span data-i18n="recipe">${t('recipe')}</span><select id="recipe" class="dig-select">${optionsHTML(data.effects,currentId)}</select></label><label class="field wide"><span data-i18n="catalog">${t('catalog')}</span><select id="catalog" class="dig-select">${optionsHTML(data.themes,themeId)}</select></label><label class="field"><span data-i18n="mount">${t('mount')}</span><select id="mount" class="dig-select">${['background','hero-background','illustration','local-container'].map(k=>`<option value="${k}" data-i18n="${k}">${t(k)}</option>`).join('')}</select></label><label class="field"><span data-i18n="width">${t('width')}</span><select id="width" class="dig-select">${['wide','medium','narrow'].map(k=>`<option value="${k}" data-i18n="${k}">${t(k)}</option>`).join('')}</select></label><div id="parameters" class="wide"></div><label class="field import-field wide"><span data-i18n="import">${t('import')}</span><input id="import" type="file" accept=".json,.zip"></label><label class="field import-field wide"><span data-i18n="themeImport">${t('themeImport')}</span><input id="theme-import" type="file" accept=".json,.zip,.md"></label></section><section class="preview-section"><div class="tools">${button('pause','pause')}${button('static','static','aria-pressed="false"')}${button('undo','undo')}${button('redo','redo')}${button('reset','reset')}${button('export','export','class="primary"')}</div><div class="preview-frame"><div id="preview" class="preview"><div class="content"><h2 data-i18n="sampleTitle">${t('sampleTitle')}</h2><p data-i18n="sampleText">${t('sampleText')}</p><form class="sample-form" id="sample-form"><label><span data-i18n="sampleLabel">${t('sampleLabel')}</span><input placeholder="${t('samplePlaceholder')}" required></label><button class="primary" data-i18n="sampleAction">${t('sampleAction')}</button></form></div></div></div><div id="runtime-status" class="status" role="status"></div><div id="message" class="status" role="status"></div><details open><summary data-i18n="diff">${t('diff')}</summary><pre id="diff"></pre></details></section></div>`;
 $('language').textContent=lang==='en'?'中':'EN';$('language').onclick=()=>{const previous=lang;lang=lang==='en'?'zh-CN':'en';storageSet('dig-ui-lang',lang==='zh-CN'?'zh':lang);localize(previous);};
 for(const m of ['light','dark']){const b=$(m);b.removeAttribute('data-i18n');b.setAttribute('aria-label',t(m));b.innerHTML=`<span class="bi" aria-hidden="true">${m==='light'?'&#xf1d2;':'&#xf494;'}</span>`;b.onclick=()=>{mode=m;storageSet('dig-ui-effect-theme',mode);applyTheme();controller?.refreshTheme(mode);renderParameters();};}
 $('recipe').onchange=()=>{importEpoch++;currentId=$('recipe').value;loadRecipe();};
 $('catalog').onchange=()=>{themeImportEpoch++;themeId=$('catalog').value;saveSelection();applyTheme();controller?.refreshTheme(mode);};
 $('mount').onchange=()=>{const next=clone(recipe);next.mount.slot=$('mount').value;commit(next);};
 $('width').onchange=()=>{$('preview').style.width={wide:'100%',medium:'768px',narrow:'360px'}[$('width').value];$('preview').style.maxWidth='100%';};
 $('pause').onclick=()=>{paused=!paused;paused?controller?.pause():controller?.resume();refreshButtons();};
 $('static').onclick=()=>{staticMode=!staticMode;controller?.setStatic(staticMode);refreshButtons();};
 $('undo').onclick=()=>{if(!undo.length)return;redo.push(clone(recipe));recipe=undo.pop();changed();};
 $('redo').onclick=()=>{if(!redo.length)return;undo.push(clone(recipe));recipe=redo.pop();changed();};
 $('reset').onclick=()=>{commit(clone(baseline));storageRemove(key());report(t('clean'));};
 $('sample-form').onsubmit=e=>{e.preventDefault();report(t('sampleSaved'));};
 $('import').onchange=async()=>{
  const input=$('import'),f=input.files[0];if(!f)return;input.value='';const generation=++importEpoch;
  try{const bytes=new Uint8Array(await f.arrayBuffer()),next=validateEffect(f.name.endsWith('.zip')?readEffectArchive(bytes).recipe:JSON.parse(new TextDecoder().decode(bytes)));await verifyAssets(next);
   if(!pageActive||generation!==importEpoch)return;
   data.effects=data.effects.filter(x=>x.id!==next.id);data.effects.push(next);currentId=next.id;$('recipe').innerHTML=optionsHTML(data.effects,currentId);loadRecipe();
  }catch(e){if(pageActive&&generation===importEpoch)report(`${t('error')}: ${e.message}`,true);}
 };
 $('theme-import').onchange=async()=>{
  const input=$('theme-import'),f=input.files[0];if(!f)return;input.value='';const generation=++themeImportEpoch,epoch=pageEpoch;
  try{let text=await f.text();if(f.name.endsWith('.zip')){const entries=unzipFiles(new Uint8Array(await f.arrayBuffer())),entry=Object.keys(entries).find(x=>x.endsWith('.json'));if(!entry)throw new Error('Theme JSON missing');text=new TextDecoder().decode(entries[entry]);}
   if(!pageActive||epoch!==pageEpoch||generation!==themeImportEpoch)return;
   const theme=themeFromAsset(text,f.name);data.themes.push(theme);themeId=theme.id;$('catalog').innerHTML=optionsHTML(data.themes,themeId);applyTheme();controller?.refreshTheme(mode);
  }catch(e){if(pageActive&&epoch===pageEpoch&&generation===themeImportEpoch)report(`${t('error')}: ${e.message}`,true);}
 };
 $('export').disabled=exporting;
 $('export').onclick=async()=>{
  if(exporting)return;exporting=true;$('export').disabled=true;
  const generation=pageEpoch,output=clone(recipe),selectedThemes=data.themes.filter(t=>!t.id.startsWith('local-')&&!t.id.startsWith('custom-')||t.id===themeId),selection={effect:output.id,theme:themeId};
  try{
   const save=async()=>{
    if(!pageActive||generation!==pageEpoch)return false;
    const content=clone(output);delete content.revision;
    const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(serializeEffect(content))),sha256=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
    const storageKey='dig-ui-effect-export:'+output.id;let previous=exported.get(output.id);
    try{const saved=JSON.parse(storageGet(storageKey)||'null');if(Number.isSafeInteger(saved?.revision)&&saved.revision>0&&/^[a-f0-9]{64}$/.test(saved.sha256)&&(!previous||saved.revision>=previous.revision))previous=saved;}catch{}
    output.revision=previous?.sha256===sha256&&previous.revision>=output.revision?previous.revision:Math.max(output.revision,previous?.revision||0)+1;
    const bytes=await exportEffect(output,data.resources,selectedThemes,selection);
    if(!pageActive||generation!==pageEpoch)return false;
    const url=URL.createObjectURL(new Blob([bytes],{type:'application/zip'})),a=document.createElement('a');a.href=url;a.download=`${output.id}.effect-r${output.revision}.zip`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    const record={revision:output.revision,sha256};exported.set(output.id,record);storageSet(storageKey,JSON.stringify(record));return true;
   };
   const saved=navigator.locks?await navigator.locks.request('dig-ui-effect-export:'+output.id,save):await save();
   if(saved&&pageActive&&generation===pageEpoch)report(t('exported'));
  }catch(e){if(pageActive&&generation===pageEpoch)report(`${t('error')}: ${e.message}`,true);}finally{exporting=false;$('export').disabled=false;}
 };

}
// Translation changes labels, never the native controls, host or controller.
function localize(previous=lang){
 document.documentElement.lang=lang;
 for(const el of $('effect-lab').querySelectorAll('[data-i18n]'))el.textContent=t(el.dataset.i18n);
 $('language').textContent=lang==='en'?'中':'EN';
 for(const m of ['light','dark'])$(m).setAttribute('aria-label',t(m));
 $('effect-lab').querySelector('.controls').setAttribute('aria-label',t('parameters'));
 $('sample-form').querySelector('input').placeholder=t('samplePlaceholder');
 for(const [id,items] of [['recipe',data.effects],['catalog',data.themes]])for(const option of $(id).options){const item=items.find(x=>x.id===option.value);option.textContent=item?.name?.[lang]||item?.name?.en||option.value;}
 for(const input of $('parameters').querySelectorAll('[data-parameter]')){const p=recipe.parameters.find(x=>x.id===input.dataset.parameter),label=p.label[lang]||p.label.en;input.parentElement.querySelector('span').textContent=label;input.setAttribute('aria-label',label);}
 const message=$('message'),key=Object.keys(dictionary[previous]).find(key=>dictionary[previous][key]===message.textContent);
 if(key)message.textContent=t(key);else if(message.textContent.startsWith(dictionary[previous].error+': '))message.textContent=t('error')+message.textContent.slice(dictionary[previous].error.length);
 const state=$('runtime-status').dataset.state;$('runtime-status').textContent=state==='running'?t('running'):state==='loading'?t('loading'):paused?t('paused'):t('fallback');
 if($('diff').textContent===dictionary[previous].clean)$('diff').textContent=t('clean');
 refreshButtons();
}
function deriveTheme(base){
 if(!base['--dig-bg']||!base['--dig-text']||!base['--dig-accent'])throw new Error('Theme requires canvas, text and accent');
 return {...base,'--dig-bg-soft':base['--dig-bg-soft']||`color-mix(in srgb, ${base['--dig-bg']}, ${base['--dig-text']} 5%)`,'--dig-surface':base['--dig-surface']||`color-mix(in srgb, ${base['--dig-bg']}, ${base['--dig-text']} 8%)`,'--dig-accent-2':base['--dig-accent-2']||base['--dig-accent'],'--dig-border':base['--dig-border']||`color-mix(in srgb, ${base['--dig-text']}, transparent 82%)`,'--dig-text-muted':base['--dig-text-muted']||`color-mix(in srgb, ${base['--dig-text']}, transparent 25%)`,'--dig-control-bg':base['--dig-control-bg']||base['--dig-bg'],'--dig-control-bg-hover':base['--dig-control-bg-hover']||`color-mix(in srgb, ${base['--dig-bg']}, ${base['--dig-text']} 12%)`};
}
function themeFromAsset(text,file){
 let name,light,dark;
 if(file.endsWith('.md')){const parse=s=>Object.fromEntries([...s.matchAll(/(--dig-[\w-]+)\s*:\s*([^;]+);/g)].map(m=>[m[1],m[2].trim()]));const blocks=[...text.matchAll(/```css\s*([\s\S]*?)```/g)];light=parse(blocks[0]?.[1]||'');dark=parse(blocks[1]?.[1]||'');name={en:file,'zh-CN':file};}
 else{const p=JSON.parse(text);if(!['dig.palette.export.v1','dig.style.export.v1'].includes(p.schema))throw new Error('Unsupported theme schema');light=p.theme_tokens?.light||p.tokens;dark=p.theme_tokens?.dark;name={en:p.name?.en||file,'zh-CN':p.name?.['zh-CN']||p.name?.zh||file};}
 light=deriveTheme(light);dark=deriveTheme(dark&&dark['--dig-bg']?dark:{...light,'--dig-bg':`color-mix(in srgb, ${light['--dig-accent']}, black 94%)`,'--dig-text':'#f5f5f5','--dig-bg-soft':`color-mix(in srgb, ${light['--dig-accent']}, black 90%)`,'--dig-surface':`color-mix(in srgb, ${light['--dig-accent']}, black 86%)`,'--dig-control-bg':`color-mix(in srgb, ${light['--dig-accent']}, black 86%)`,'--dig-control-bg-hover':`color-mix(in srgb, ${light['--dig-accent']}, black 80%)`,'--dig-border':'#555555','--dig-text-muted':'#bdbdbd'});
 for(const tokens of [light,dark])for(const [k,v] of Object.entries(tokens)){if(!/^--dig-[\w-]+$/.test(k)||typeof v!=='string'||/[<>;]/.test(v)||/url\s*\(|@import|javascript:|expression\s*\(/i.test(v))throw new Error('Invalid theme token');}
 return {id:'custom-'+Date.now(),name,theme_tokens:{light,dark}};
}
let appliedKeys=[];
function applyTheme(){const theme=data.themes.find(x=>x.id===themeId);if(!theme)throw new Error('Theme not found');for(const k of appliedKeys)document.documentElement.style.removeProperty(k);const tokens=deriveTheme(theme.theme_tokens[mode]);appliedKeys=Object.keys(tokens);for(const [k,v] of Object.entries(tokens))document.documentElement.style.setProperty(k,v);document.documentElement.style.colorScheme=mode;document.querySelector('.theme-group').dataset.mode=mode;const resolved=readThemeTokens(document.documentElement);const foreground=background=>{const color=new Color(background).to('srgb'),canvas=new Color(resolved['--dig-bg']).to('srgb');const rgb=color.coords.map((v,i)=>v*color.alpha+canvas.coords[i]*(1-color.alpha));const linear=rgb.map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);const luminance=linear[0]*.2126+linear[1]*.7152+linear[2]*.0722;return 1.05/(luminance+.05)>=(luminance+.05)/.05?'#ffffff':'#000000';};for(const [name,background] of [['--dig-on-accent','--dig-accent'],['--dig-control-text','--dig-control-bg'],['--dig-control-text-hover','--dig-control-bg-hover']]){if(!tokens[name]){try{document.documentElement.style.setProperty(name,foreground(resolved[background]));appliedKeys.push(name);}catch{}}}if(!tokens['--dig-control-text-muted']){document.documentElement.style.setProperty('--dig-control-text-muted','color-mix(in srgb, var(--dig-control-text), var(--dig-control-bg) 25%)');appliedKeys.push('--dig-control-text-muted');}for(const m of ['light','dark'])$(m).setAttribute('aria-pressed',String(mode===m));}
function resolvedTokens(){return readThemeTokens(document.documentElement);}
function mount(){controller?.destroy();controller=null;if(!pageActive)return;controller=mountEffect($('preview'),recipe,{mode,paused,staticPreview:staticMode,tokens:resolvedTokens,loadProvider:async()=>{if(!providerURL)providerURL=URL.createObjectURL(new Blob([data.resources['assets/effects/shaders-js.mjs']],{type:'text/javascript'}));return import(/* @vite-ignore */providerURL);},onStatus:s=>{$('runtime-status').textContent=s.state==='running'?t('running'):s.state==='loading'?t('loading'):paused?t('paused'):t('fallback');$('runtime-status').dataset.state=s.state;}});$('preview').dataset.slot=recipe.mount.slot;}
// Persist the selected baseline without duplicating embedded resource bytes.
function selectionBaseline(value){const {assets,...rest}=value;return serializeEffect({...rest,assets:assets.map(({data,...asset})=>asset)});}
function saveSelection(){storageSet('dig-ui-effect-selection',JSON.stringify({effect:currentId,theme:themeId,effectBaseline:selectionBaseline(baseline),packagedBaseline:packagedBaselines.get(currentId)??null}));}
function key(){return 'dig-ui-effect-draft:'+recipe.id;}
function loadRecipe(restore=true){
 baseline=validateEffect(data.effects.find(x=>x.id===currentId));recipe=clone(baseline);saveSelection();undo=[];redo=[];let notice='';
 if(restore){try{const draft=JSON.parse(storageGet(key())||'null');if(draft){
  const original=validateEffect(JSON.parse(draft.baseline)),candidate=validateEffect(draft.recipe);
  if(serializeEffect(original)===serializeEffect(baseline)&&candidate.id===baseline.id&&candidate.revision===baseline.revision){recipe=candidate;notice=t('draft');}else notice=t('stale');
 }}catch{notice=t('stale');}}
 applyTheme();mount();renderParameters();report(notice);
}

function commit(next){next=validateEffect(next);if(JSON.stringify(next)===JSON.stringify(recipe))return;undo.push(clone(recipe));if(undo.length>60)undo.shift();redo=[];recipe=next;changed();}
function changed(){storageSet(key(),JSON.stringify({baseline:serializeEffect(baseline),recipe}));controller?.update(recipe);$('preview').dataset.slot=recipe.mount.slot;renderParameters();}
function renderParameters(){const parent=$('parameters');parent.replaceChildren();for(const p of recipe.parameters){const label=document.createElement('label');label.className='field';const title=document.createElement('span');title.textContent=p.label[lang]||p.label.en;const input=document.createElement(p.control==='select'?'select':'input');if(p.control==='select'){input.className='dig-select';for(const o of p.options){const option=document.createElement('option');option.value=o;option.textContent=o;input.append(option);}}else input.type=p.control==='boolean'?'checkbox':p.control;const value=recipe.theme_bindings?.[mode]?.[p.layer+'.'+p.prop]??flattenLayers(recipe).find(x=>x.id===p.layer).props[p.prop];if(p.control==='range'){input.min=p.min;input.max=p.max;input.step=p.step;}if(p.control==='boolean')input.checked=value;else if(p.control==='color'){try{const color=new Color(typeof value==='object'?resolvedTokens()[value.token]:value).to('srgb');input.value='#'+color.coords.map(c=>Math.round(Math.max(0,Math.min(1,c))*255).toString(16).padStart(2,'0')).join('');}catch{input.value='#000000';}}else input.value=typeof value==='object'?p.default:value;input.dataset.parameter=p.id;input.setAttribute('aria-label',title.textContent);const output=document.createElement('output');output.textContent=typeof value==='object'?JSON.stringify(value):String(value);const readValue=()=>p.control==='range'?Number(input.value):p.control==='boolean'?input.checked:p.control==='select'?p.options.find(v=>String(v)===input.value):input.value;input.oninput=()=>{output.textContent=input.type==='checkbox'?String(input.checked):input.value;try{controller.update(setParameter(recipe,p.id,readValue(),mode));}catch(e){report(e.message,true);}};input.onchange=()=>{try{commit(setParameter(recipe,p.id,readValue(),mode));}catch(e){report(e.message,true);}};label.append(title,input,output);parent.append(label);}const before=JSON.stringify(baseline.composition),after=JSON.stringify(recipe.composition);$('diff').textContent=before===after&&baseline.mount.slot===recipe.mount.slot&&JSON.stringify(baseline.theme_bindings)===JSON.stringify(recipe.theme_bindings)?t('clean'):JSON.stringify({composition:recipe.composition,mount:recipe.mount,theme_bindings:recipe.theme_bindings},null,2);$('mount').value=recipe.mount.slot;refreshButtons();}
function refreshButtons(){$('undo').disabled=!undo.length;$('redo').disabled=!redo.length;$('pause').textContent=t(paused?'play':'pause');$('static').setAttribute('aria-pressed',String(staticMode));}
window.addEventListener('pagehide',()=>{
 pageActive=false;pageEpoch++;importEpoch++;themeImportEpoch++;controller?.destroy();controller=null;
 if(providerURL)URL.revokeObjectURL(providerURL);providerURL=null;
});
window.addEventListener('pageshow',()=>{if(!pageActive){pageActive=true;mount();refreshButtons();}});
shell();loadRecipe();
