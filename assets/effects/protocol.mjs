// Shared by the CLI, Lab and every framework adapter. Configuration is the source of truth.
import registry from './components.mjs';
import Color from './color.mjs';

export const EFFECT_SCHEMA = 'dig.effect.v1';
export const SHADERS_VERSION = registry.version;
export const clone = value => JSON.parse(JSON.stringify(value));
// Object field order does not change an asset; layer/parameter/resource array order still does.
export function serializeEffect(value) {
  const ordered=v=>Array.isArray(v)?v.map(ordered):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,ordered(v[k])])):v;
  return JSON.stringify(ordered(value));
}
export function assertEffectRevision(next,previous,force=false) {
  if(!previous)return false;
  if(next.id!==previous.id)throw new Error('Effect identity changed');
  const same=serializeEffect(next)===serializeEffect(previous);
  if(!force){
    if(next.revision<previous.revision)throw new Error('Refusing revision downgrade; use --force for explicit replacement');
    if(next.revision===previous.revision&&!same)throw new Error('Different content requires a newer revision; use --force for explicit replacement');
  }
  return same;
}
const plain = v => v && typeof v === 'object' && !Array.isArray(v);
const assert = (ok, message) => { if (!ok) throw new Error(message); };
export const safePath = p => typeof p === 'string' && /^[A-Za-z0-9_.\-/]+$/.test(p) && !p.startsWith('/') && p.split('/').every(s => s && s !== '.' && s !== '..');
const safeId = v => typeof v === 'string' && /^[a-zA-Z][a-zA-Z0-9_-]{0,79}$/.test(v) && !Object.hasOwn(Object.prototype,v);
const tokenName = v => typeof v === 'string' && /^--dig-[a-zA-Z0-9_-]+$/.test(v);
// Universal compositor enums follow the pinned SDK, independently of component props.
const blends = new Set(['normal','normal-oklch','normal-oklab','multiply','screen','overlay','softLight','hardLight','linearDodge','linearBurn','colorDodge','colorBurn','darken','lighten','difference','exclusion','hue','saturation','color','luminosity']);
const universal = new Set(['opacity','visible','blendMode','maskSource','maskType','boundingBox','absolute','transform','flow']);

function checkValue(v, depth = 0) {
  assert(depth < 16, 'Effect value is too deeply nested');
  if (typeof v === 'number') assert(Number.isFinite(v), 'Non-finite effect number');
  else if (typeof v === 'string') assert(v.length <= 8 * 1024 * 1024 && !/[<>\u0000]/.test(v), 'Invalid effect string');
  else if (Array.isArray(v)) { assert(v.length <= 64, 'Effect array too large'); v.forEach(x => checkValue(x, depth + 1)); }
  else if (plain(v)) { for (const [k,x] of Object.entries(v)) { assert(!['__proto__','prototype','constructor'].includes(k), 'Unsafe property'); checkValue(x, depth + 1); } }
  else assert(v === null || typeof v === 'boolean', 'Invalid effect value');
}
function checkProp(value, spec, refs, key = '', legacyDrivers = false) {
  // Resource ownership follows the registered prop type, including every theme override.
  if (spec.kind === 'string' && /url$/i.test(key) && value) assert(plain(value) && 'asset' in value, 'URL props require a declared embedded resource');
  if (plain(value) && 'asset' in value) { assert(spec.kind === 'string' && safePath(value.asset) && Object.keys(value).length === 1, 'Invalid resource binding'); return; }
  if (plain(value) && 'token' in value) {
    assert(spec.kind === 'color' && Object.keys(value).length === 1 && tokenName(value.token), 'Token bindings require a color prop and a --dig-* token'); return;
  }
  if (plain(value) && ['auto-animate','mouse','mouse-position','map'].includes(value.type)) {
    const position=value.type==='mouse-position';
    assert(legacyDrivers?(spec.kind==='number'||spec.kind==='object'):(position?spec.kind==='object'&&spec.position===true:spec.kind==='number'), 'Dynamic driver must match numeric or position prop');
    const fields={
      map:['type','source','channel','inputMin','inputMax','outputMin','outputMax','curve'],
      mouse:['type','axis','outputMin','outputMax','curve','smoothing','momentum'],
      'mouse-position':['type','x','y','invertX','invertY','smoothing','momentum','reach','originX','originY'],
      'auto-animate':['type','mode','outputMin','outputMax','speed','easing','waveform']
    };
    const oldFields=['type','mode','axis','channel','source','inputMin','inputMax','outputMin','outputMax','speed','smoothing','momentum','seed','offset','easing'];
    const keys=new Set([...fields[value.type],...(legacyDrivers?oldFields:[])]);
    assert(Object.keys(value).every(k=>keys.has(k)), 'Unknown dynamic driver field');
    for(const k of ['inputMin','inputMax','outputMin','outputMax','speed','smoothing','momentum','seed','offset','curve','reach','originX','originY'])if(k in value)assert(Number.isFinite(value[k]), 'Invalid dynamic driver number');
    for(const k of ['outputMin','outputMax'])if(k in value){
      if(spec.min!==undefined&&(!legacyDrivers||k==='outputMin'))assert(value[k]>=spec.min,'Dynamic range below prop minimum');
      if(spec.max!==undefined&&(!legacyDrivers||k==='outputMax'))assert(value[k]<=spec.max,'Dynamic range above prop maximum');
    }
    if('mode' in value)assert(['loop','ping-pong',...(legacyDrivers?['once']:[])].includes(value.mode),'Invalid animation mode');
    if('axis' in value)assert(['x','y'].includes(value.axis),'Invalid mouse axis');
    if('channel' in value)assert(['alpha','alphaInverted','luminance','luminanceInverted',...(legacyDrivers?['r','g','b','a']:[])].includes(value.channel),'Invalid map channel');
    if(!legacyDrivers){
      if(!position)assert('outputMin' in value&&'outputMax' in value,'Dynamic output range required');
      if(value.type==='auto-animate')assert('mode' in value,'Animation mode required');
      if(value.type==='mouse')assert('axis' in value,'Mouse axis required');
      if(value.type==='map')assert('channel' in value&&Number.isFinite(value.inputMin)&&Number.isFinite(value.inputMax)&&value.inputMin<value.inputMax,'Invalid map input range/channel');
      for(const k of ['smoothing','momentum','originX','originY'])if(k in value)assert(value[k]>=0&&value[k]<=1,`${k} must be 0–1`);
      if('curve' in value)assert(value.curve>=-1&&value.curve<=1,'Curve must be -1–1');
      for(const k of ['x','y'])if(k in value)assert(value[k]==='mouse'||Number.isFinite(value[k])&&value[k]>=0&&value[k]<=1,'Invalid position axis');
      for(const k of ['invertX','invertY'])if(k in value)assert(typeof value[k]==='boolean','Position inversion must be boolean');
      if('easing' in value)assert(['sine','linear','quad','expo','bounce'].includes(value.easing),'Invalid animation easing');
      if('waveform' in value)assert(['sine','linear'].includes(value.waveform),'Invalid animation waveform');
    }
    if(value.type==='map'){assert(safeId(value.source),'Map source required');refs.push(value.source);}
    return;
  }
  if (spec.kind === 'number') {
    assert(typeof value === 'number', 'Expected numeric prop');
    if (spec.min !== undefined) assert(value >= spec.min, `Prop must be >= ${spec.min}`);
    if (spec.max !== undefined) assert(value <= spec.max, `Prop must be <= ${spec.max}`);
  } else if (spec.kind === 'boolean') assert(typeof value === 'boolean', 'Expected boolean prop');
  else if (spec.kind === 'color' || spec.kind === 'string') assert(typeof value === 'string', 'Expected string prop');
  else if (spec.kind === 'object') assert(value === null || plain(value) || Array.isArray(value), 'Expected structured prop');
  if (spec.options?.length) assert(spec.options.includes(value), 'Unknown prop option');
  if(spec.kind==='color'){try{new Color(value);}catch{throw new Error('Invalid color prop');}}
}
// Legacy tolerance is only for inspecting previously persisted records/history so they
// can be repaired or restored. Incoming assets and runtime mounting remain strict.
export function validateEffect(input, { legacyDrivers = false } = {}) {
  assert(plain(input) && input.schema === EFFECT_SCHEMA, 'Unsupported effect schema');
  checkValue(input);
  assert(new TextEncoder().encode(JSON.stringify(input)).length < 24 * 1024 * 1024, 'Effect exceeds 24 MiB');
  assert(safeId(input.id) && Number.isSafeInteger(input.revision) && input.revision > 0, 'Effect id/revision required');
  assert(plain(input.name) && typeof input.name.en === 'string' && typeof input.name['zh-CN'] === 'string', 'Bilingual effect name required');
  assert(input.name.en && input.name['zh-CN'] && typeof input.source==='string' && input.source, 'Effect name/source must not be empty');
  assert(!('catalog' in input) && !('compatible_catalogs' in input), 'Effects cannot own a base catalog');
  assert(input.provider?.name === 'shaders' && input.provider.version === SHADERS_VERSION, `Provider must be shaders ${SHADERS_VERSION}`);
  assert(input.provider.capabilities===undefined||(Array.isArray(input.provider.capabilities)&&input.provider.capabilities.length===1&&input.provider.capabilities[0]==='webgpu'),'Unsupported provider capability');
  assert(Array.isArray(input.composition) && input.composition.length > 0, 'Composition required');
  const nodes = new Map(), refs = [];
  function visit(list, depth = 0) {
    assert(depth < 8 && list.length <= 32, 'Composition limit exceeded');
    for (const node of list) {
      assert(plain(node) && safeId(node.id) && !nodes.has(node.id), 'Unique layer id required');
      const definition = Object.hasOwn(registry.components,node.type) ? registry.components[node.type] : null;
      assert(definition, `Unknown shader component: ${node.type}`);
      assert(!['HTMLInCanvas','WebcamTexture'].includes(node.type), 'Live DOM/camera capture is outside Effects v1');
      assert(nodes.size < 64, 'Maximum 64 layers'); nodes.set(node.id, node);
      assert(plain(node.props), 'Layer props required');
      for (const [key,value] of Object.entries(node.props)) {
        assert(universal.has(key) || Object.hasOwn(definition.props,key), `Unknown ${node.type} prop: ${key}`);
        if (Object.hasOwn(definition.props,key)) checkProp(value, definition.props[key], refs, key, legacyDrivers);
        if (key === 'opacity') assert(typeof value === 'number' && value >= 0 && value <= 1, 'Opacity must be 0–1');
        if (key === 'visible' || key === 'absolute') assert(typeof value === 'boolean', `${key} must be boolean`);
        if (key === 'blendMode') assert(blends.has(value), 'Unknown blend mode');
        if (key === 'maskSource') { assert(safeId(value), 'Invalid mask source'); refs.push(value); }
        if (key === 'maskType') assert(['alpha','alphaInverted','luminance','luminanceInverted'].includes(value), 'Unknown mask type');
      }
      if (node.children) { assert(definition.children && Array.isArray(node.children), `${node.type} does not accept children`); visit(node.children, depth + 1); }
    }
  }
  visit(input.composition);
  for (const ref of refs) assert(nodes.has(ref), `Missing layer reference: ${ref}`);
  const active=new Set(),done=new Set();
  function references(value,out){if(plain(value)){if(value.maskSource)out.push(value.maskSource);if(value.type==='map')out.push(value.source);for(const v of Object.values(value))references(v,out);}else if(Array.isArray(value))value.forEach(v=>references(v,out));}
  function checkCycle(id, theme = {}){if(done.has(id))return;assert(!active.has(id),'Cyclic layer references');active.add(id);const node=nodes.get(id),edges=[];references({...node.props,...Object.fromEntries(Object.entries(theme).filter(([key])=>key.startsWith(id+'.')).map(([key,value])=>[key.slice(id.length+1),value]))},edges);for(const child of node.children||[])edges.push(child.id);for(const edge of edges){assert(nodes.has(edge), `Missing layer reference: ${edge}`);checkCycle(edge,theme);}active.delete(id);done.add(id);}
  for(const id of nodes.keys())checkCycle(id);
  assert(Array.isArray(input.parameters) && input.parameters.length <= 64, 'Parameters required');
  const parameterIds = new Set();
  for (const p of input.parameters) {
    assert(safeId(p.id) && !parameterIds.has(p.id), 'Unique parameter id required'); parameterIds.add(p.id);
    assert(nodes.has(p.layer) && Object.hasOwn(registry.components[nodes.get(p.layer).type].props,p.prop), 'Parameter target not found');
    assert(['range','color','select','boolean'].includes(p.control), 'Unsupported parameter control');
    assert(p.label?.en && p.label?.['zh-CN'] && typeof p.group === 'string', 'Parameter labels/group required');
    checkProp(p.default, registry.components[nodes.get(p.layer).type].props[p.prop], [], p.prop, legacyDrivers);
    const spec=registry.components[nodes.get(p.layer).type].props[p.prop];
    assert(p.control==='range'?spec.kind==='number':p.control==='color'?spec.kind==='color':p.control==='boolean'?spec.kind==='boolean':spec.options?.length,'Parameter control must match provider prop');
    if (p.control === 'range') assert(Number.isFinite(p.min) && Number.isFinite(p.max) && Number.isFinite(p.step) && p.min <= p.max && p.step > 0 && p.default >= p.min && p.default <= p.max && (spec.min===undefined||p.min>=spec.min) && (spec.max===undefined||p.max<=spec.max), 'Invalid parameter range');
    if (p.control === 'select') {assert(Array.isArray(p.options) && p.options.includes(p.default), 'Invalid parameter options');for(const option of p.options)checkProp(option,spec,[],p.prop,legacyDrivers);}
  }
  assert(['background','hero-background','illustration','local-container'].includes(input.mount?.slot), 'Unknown mount slot');
  assert(['none','host'].includes(input.mount.pointer_events) && ['hidden','visible'].includes(input.mount.clip), 'Invalid mount behavior');
  assert(input.mount.layer === 'decoration', 'Effects must use decoration layer');
  assert(input.mount.scroll===undefined||['host','viewport'].includes(input.mount.scroll),'Unknown mount scroll relationship');
  assert(input.runtime?.reduced_motion === 'static-fallback' && Number.isFinite(input.runtime.max_pixels) && input.runtime.max_pixels >= 16384 && input.runtime.max_pixels <= 4194304, 'Invalid runtime policy');
  assert(input.runtime.context && ['INFORMATION_DENSITY','INTERACTION_ENERGY','OPERATIONAL_CRITICALITY'].every(k => Number.isFinite(input.runtime.context[k]) && input.runtime.context[k] >= 1 && input.runtime.context[k] <= 10), 'Dig Read dials must be 1–10');
  assert(['css-gradient','image','static-frame'].includes(input.fallback?.type), 'Static fallback required');
  assert(Array.isArray(input.assets) && input.assets.length <= 32, 'Assets required');
  const paths = new Set();
  for (const a of input.assets) {
    assert(safePath(a.path) && !paths.has(a.path), 'Unique relative asset path required'); paths.add(a.path);
    assert(['image/png','image/jpeg','image/webp','image/svg+xml','application/octet-stream','font/woff2'].includes(a.mime), 'Unsupported asset MIME');
    assert(typeof a.source === 'string' && a.source && typeof a.license === 'string' && a.license, 'Asset source/license required');
    assert(/^sha256:[a-f0-9]{64}$/.test(a.sha256) && typeof a.data === 'string' && /^[A-Za-z0-9+/]*={0,2}$/.test(a.data) && a.data.length <= 8 * 1024 * 1024, 'Invalid embedded resource');
  }
  if (input.fallback.type === 'css-gradient') {assert(Array.isArray(input.fallback.colors) && input.fallback.colors.length >= 2 && input.fallback.colors.length <= 4 && input.fallback.colors.every(v => tokenName(v?.token) || typeof v === 'string'), 'Gradient colors required');for(const color of input.fallback.colors)checkProp(color,{kind:'color'},[]);}
  else assert(paths.has(input.fallback.asset), 'Fallback resource missing');
  function checkResources(v){if(plain(v)){if('asset' in v)assert(paths.has(v.asset),'Layer resource missing');for(const x of Object.values(v))checkResources(x);}else if(Array.isArray(v))v.forEach(checkResources);}
  checkResources(input.composition);checkResources(input.theme_bindings);
  for (const mode of ['light','dark']) {
    const theme = input.theme_bindings?.[mode] || {};
    assert(plain(theme), 'Theme bindings must be maps');
    for (const [target,value] of Object.entries(theme)) {
      const [id,prop] = target.split('.');
      assert(target.split('.').length === 2 && nodes.has(id) && Object.hasOwn(registry.components[nodes.get(id).type].props,prop), 'Theme target missing');
      checkProp(value, registry.components[nodes.get(id).type].props[prop], [], prop, legacyDrivers);
    }
    active.clear();done.clear();for(const id of nodes.keys())checkCycle(id,theme);
  }
  return clone(input);
}
export function flattenLayers(recipe) {
  const out = []; const visit = nodes => { for (const n of nodes) { out.push(n); if (n.children) visit(n.children); } }; visit(recipe.composition); return out;
}
export function setParameter(recipe, id, value, mode) {
  const next = clone(recipe), p = next.parameters.find(x => x.id === id);
  assert(p, 'Unknown parameter');
  if (p.control === 'range') assert(typeof value === 'number' && value >= p.min && value <= p.max, 'Parameter outside declared range');
  if (p.control === 'select') assert(p.options.includes(value), 'Invalid parameter choice');
  if(p.control==='color' && ['light','dark'].includes(mode)){next.theme_bindings ||= {};next.theme_bindings[mode] ||= {};next.theme_bindings[mode][p.layer+'.'+p.prop]=value;}
  else flattenLayers(next).find(n => n.id === p.layer).props[p.prop] = value;
  return validateEffect(next);
}
export async function verifyAssets(recipe) {
  for (const a of recipe.assets) {
    const bytes = Uint8Array.from(atob(a.data), c => c.charCodeAt(0));
    const hash = await crypto.subtle.digest('SHA-256', bytes);
    assert('sha256:' + Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2,'0')).join('') === a.sha256, `Resource checksum mismatch: ${a.path}`);
  }
}
export function resolveComposition(recipe, tokens, mode = 'light', assetURLs = {}) {
  const resolve = value => {
    if (plain(value) && 'token' in value) { assert(typeof tokens[value.token] === 'string' && tokens[value.token], `Missing theme token: ${value.token}`); return tokens[value.token]; }
    if (plain(value) && 'asset' in value) { assert(assetURLs[value.asset], `Missing resource: ${value.asset}`); return assetURLs[value.asset]; }
    if (Array.isArray(value)) return value.map(resolve);
    if (plain(value)) return Object.fromEntries(Object.entries(value).map(([k,v]) => [k,resolve(v)]));
    return value;
  };
  const visit = list => list.map(n => {
    const props=resolve({...n.props,...Object.fromEntries(Object.entries(recipe.theme_bindings?.[mode] || {}).filter(([k])=>k.startsWith(n.id+'.')).map(([k,v])=>[k.slice(n.id.length+1),v]))});
    // Recipes replace configuration; the SDK merges transform fields on update.
    // Use the same complete defaults on create/update, without changing the recipe.
    if('transform' in props&&!props.transform)delete props.transform;
    else if('transform' in props)props.transform={...props.transform,
      offsetX:props.transform?.offsetX??0,offsetY:props.transform?.offsetY??0,
      rotation:props.transform?.rotation??0,scale:props.transform?.scale??1,
      anchorX:props.transform?.anchorX??.5,anchorY:props.transform?.anchorY??.5,
      edges:props.transform?.edges??'transparent'};
    // SDK resolves absent/non-object boxes to undefined, which update ignores.
    // Omission lets the existing effective-prop comparison rebuild to clear it.
    if('boundingBox' in props&&(!props.boundingBox||typeof props.boundingBox!=='object'))delete props.boundingBox;
    return {id:n.id,type:n.type,props,...(n.children?{children:visit(n.children)}:{})};
  });
  return { components: visit(recipe.composition) };
}
export function staticBackground(recipe, tokens, assetURLs = {}) {
  if (recipe.fallback.type !== 'css-gradient') return `url("${assetURLs[recipe.fallback.asset] || ''}") center / cover`;
  const colors = recipe.fallback.colors.map(c => typeof c === 'string' ? c : tokens[c.token]);
  assert(colors.every(c => typeof c === 'string' && c && !/[;<>]/.test(c)), 'Fallback theme tokens missing');
  return `linear-gradient(135deg, ${colors.join(', ')})`;
}
