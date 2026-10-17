import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {webcrypto,createHash} from 'node:crypto';
import {spawnSync,spawn} from 'node:child_process';
import {validateEffect,clone,setParameter,resolveComposition,verifyAssets,flattenLayers} from '../assets/effects/protocol.mjs';
import {zipFiles,unzipFiles,readEffectArchive} from '../assets/effects/archive.mjs';
import {readEffect,listEffects,runEffectCLI,themes,syncEffectsInto,effectsDir,packageRoot,buildLab} from '../bin/effects-cli.mjs';
globalThis.crypto ||= webcrypto;
const root=await fs.mkdtemp(path.join(os.tmpdir(),'dig-effects-test-'));
process.env.DIG_UI_CONFIG_HOME=path.join(root,'config');
const ribbon=await readEffect('flowing-ribbon');
test.after(async()=>{await fs.rm(root,{recursive:true,force:true});});

test('recipes are catalog-independent; params and layer references are checked',()=>{
 for(const mutate of [r=>r.id='constructor',r=>r.catalog='dig',r=>r.provider.version='0',r=>r.composition[0].props.fake=1,r=>r.composition[0].props.speed=20,r=>r.composition[0].props.maskSource='absent',r=>r.composition.push(clone(r.composition[0])),r=>r.mount.layer='modal']){const bad=clone(ribbon);mutate(bad);assert.throws(()=>validateEffect(bad));}
 assert.throws(()=>setParameter(ribbon,'speed',9));
 assert.equal(setParameter(ribbon,'speed',.7).composition[0].props.speed,.7);
});
test('same recipe resolves independent light/dark themes without leaking token syntax',()=>{
 const tokens={'--dig-bg':'#fff','--dig-bg-soft':'#eee','--dig-accent':'#123456','--dig-accent-2':'#654321'};
 assert.equal(resolveComposition(ribbon,tokens).components[0].props.colorB,'#123456');
 assert.equal(resolveComposition(ribbon,{...tokens,'--dig-accent':'#abc'}).components[0].props.colorB,'#abc');
 assert.throws(()=>resolveComposition(ribbon,{}),/Missing theme token/);
});
test('archive rejects traversal, duplicate, truncation, CRC corruption',()=>{
 assert.throws(()=>zipFiles({'../escape':'bad'}));
 const zip=zipFiles({'effect.json':JSON.stringify(ribbon),'README.md':'hello'});
 assert.deepEqual(readEffectArchive(zip).recipe,ribbon);
 const corrupt=zip.slice();corrupt[50]^=1;assert.throws(()=>unzipFiles(corrupt));
 assert.throws(()=>unzipFiles(zip.subarray(0,zip.length-22)));
});
test('embedded resource hash is verified before persisting',async()=>{
 const bad=clone(ribbon);bad.assets=[{path:'image.png',mime:'image/png',source:'test',license:'CC0',sha256:'sha256:'+'0'.repeat(64),data:'aGVsbG8='}];
 await assert.rejects(()=>verifyAssets(bad),/checksum/);
 const input=path.join(root,'bad.json');await fs.writeFile(input,JSON.stringify(bad));
 await assert.rejects(()=>runEffectCLI(['import',input]),/checksum/);
 assert.equal(await fs.stat(effectsDir()).then(()=>true,()=>false),false);
});
test('export/import/re-export preserves configuration; repeat import is idempotent',async()=>{
 const zip=path.join(root,'ribbon.zip');await runEffectCLI(['export','flowing-ribbon','--output',zip]);
 await runEffectCLI(['import',zip]);await runEffectCLI(['import',zip]);
 assert.deepEqual(await readEffect('flowing-ribbon'),ribbon);
 assert.deepEqual((await fs.readdir(effectsDir())).filter(f=>f.endsWith('.json')),['flowing-ribbon.json']);
 const bytes=await fs.readFile(zip),archive=readEffectArchive(bytes);assert.ok(archive.files['preview.html']);assert.ok(archive.files['Effect.jsx']);assert.ok(archive.files['assets/effects/SHADERS-LICENSE.txt']);
 const altered=clone(ribbon);altered.composition[0].props.speed=.6;const input=path.join(root,'altered.json');await fs.writeFile(input,JSON.stringify(altered));await assert.rejects(()=>runEffectCLI(['import',input]),/newer revision/);
 altered.revision=2;await fs.writeFile(input,JSON.stringify(altered));await runEffectCLI(['import',input]);assert.equal((await readEffect('flowing-ribbon')).revision,2);
});
test('all built-in catalog types and custom themes are available',async()=>{
 const customDir=path.join(root,'config','palettes');await fs.mkdir(customDir,{recursive:true});await fs.writeFile(path.join(customDir,'test.json'),JSON.stringify({schema:'dig.palette.export.v1',name:{en:'Custom'},tokens:{'--dig-bg':'#fafafa','--dig-text':'#101010','--dig-accent':'#33aa99'}}));
 const all=await themes();for(const id of ['dig','apple','palette01','monochrome','hologram-moire'])assert.ok(all.find(t=>t.id===id),id);
 assert.ok(all.find(t=>t.id.startsWith('local-palettes')));assert.notEqual(all.find(t=>t.id==='dig').theme_tokens.light['--dig-bg'],all.find(t=>t.id==='dig').theme_tokens.dark['--dig-bg']);
});
test('sync isolates effects and preserves unrelated local assets',async()=>{
 const target=path.join(root,'skill');await fs.mkdir(path.join(target,'references/local/styles'),{recursive:true});await fs.writeFile(path.join(target,'references/local/styles/keep.json'),'keep');
 await syncEffectsInto(target);assert.equal(await fs.readFile(path.join(target,'references/local/styles/keep.json'),'utf8'),'keep');assert.equal(JSON.parse(await fs.readFile(path.join(target,'references/local/effects/flowing-ribbon.json'))).revision,2);
});
test('project updates preserve edits; upgrade and restore use tracked snapshots',async()=>{
 const project=path.join(root,'app');await runEffectCLI(['install','flowing-ribbon','--project',project]);
 const entry=JSON.parse(await fs.readFile(path.join(project,'.dig-ui-effects.json'))).effects['flowing-ribbon'];assert.equal(entry.recipe.revision,2);
 const file=path.join(project,entry.directory,'mount.mjs');await fs.appendFile(file,'\n// local edit\n');await assert.rejects(()=>runEffectCLI(['update','flowing-ribbon','--project',project]),/Local edits preserved/);assert.match(await fs.readFile(file,'utf8'),/local edit/);
 // Restore pristine content from a freshly generated installation, then upgrade its source.
 const clean=path.join(root,'clean-app');await runEffectCLI(['install','flowing-ribbon','--project',clean]);const next=clone(await readEffect('flowing-ribbon'));next.revision=3;next.composition[0].props.speed=.9;const input=path.join(root,'v3.json');await fs.writeFile(input,JSON.stringify(next));await runEffectCLI(['import',input]);await runEffectCLI(['update','flowing-ribbon','--project',clean]);
 assert.equal(JSON.parse(await fs.readFile(path.join(clean,'.dig-ui-effects.json'))).effects['flowing-ribbon'].recipe.revision,3);
 await runEffectCLI(['restore','flowing-ribbon','--project',clean]);assert.equal(JSON.parse(await fs.readFile(path.join(clean,'.dig-ui-effects.json'))).effects['flowing-ribbon'].recipe.revision,2);
});
test('unknown project destination and symlinks are rejected',async()=>{
 const project=path.join(root,'unsafe-app');await fs.mkdir(path.join(project,'components/dig-effects/flowing-ribbon'),{recursive:true});await assert.rejects(()=>runEffectCLI(['install','flowing-ribbon','--project',project]),/Untracked destination/);
 const symlink=path.join(root,'symlink-app');await fs.mkdir(symlink);await fs.symlink(root,path.join(symlink,'components'));await assert.rejects(()=>runEffectCLI(['install','flowing-ribbon','--project',symlink]),/Symlink/);
});
test('force update snapshot restores modified/untracked files and keeps them protected',async()=>{
 const project=path.join(root,'forced-app');await runEffectCLI(['install','flowing-ribbon','--project',project]);
 const record=()=>fs.readFile(path.join(project,'.dig-ui-effects.json'),'utf8').then(JSON.parse);
 const dir=path.join(project,(await record()).effects['flowing-ribbon'].directory);
 await fs.appendFile(path.join(dir,'mount.mjs'),'\n// user code\n');await fs.writeFile(path.join(dir,'user-notes.txt'),'keep these notes');
 await runEffectCLI(['update','flowing-ribbon','--project',project,'--force']);assert.doesNotMatch(await fs.readFile(path.join(dir,'mount.mjs'),'utf8'),/user code/);
 await runEffectCLI(['restore','flowing-ribbon','--project',project]);assert.match(await fs.readFile(path.join(dir,'mount.mjs'),'utf8'),/user code/);assert.equal(await fs.readFile(path.join(dir,'user-notes.txt'),'utf8'),'keep these notes');
 await assert.rejects(()=>runEffectCLI(['update','flowing-ribbon','--project',project]),/Local edits preserved/);
});
test('file-origin update follows source; interrupted transaction recovers prior files',async()=>{
 const input=path.join(root,'file-origin.json'),recipe=clone(ribbon);recipe.id='file-origin';recipe.revision=1;await fs.writeFile(input,JSON.stringify(recipe));
 const project=path.join(root,'recovery-app');await runEffectCLI(['install',input,'--project',project]);recipe.revision=2;recipe.composition[0].props.speed=.8;await fs.writeFile(input,JSON.stringify(recipe));await runEffectCLI(['update','--project',project]);
 const recordPath=path.join(project,'.dig-ui-effects.json'),before=JSON.parse(await fs.readFile(recordPath)),entry=before.effects[recipe.id];assert.equal(entry.recipe.revision,2);assert.equal(entry.source_ref,input);
 const target=entry.directory,stage=target+'.stage-test',backup='.dig-ui-effects-backups/'+recipe.id+'-test';await fs.mkdir(path.dirname(path.join(project,backup)),{recursive:true});await fs.rename(path.join(project,target),path.join(project,backup));await fs.mkdir(path.join(project,stage),{recursive:true});await fs.writeFile(path.join(project,stage,'partial'),'incomplete');
 const after=clone(before);after.effects[recipe.id].recipe.revision=3;
 await fs.writeFile(path.join(project,'.dig-ui-effects.pending.json'),JSON.stringify({id:recipe.id,target,stage,backup,before,after}));
 await runEffectCLI(['check',recipe.id,'--project',project]);assert.deepEqual(JSON.parse(await fs.readFile(recordPath)),before);assert.ok(await fs.stat(path.join(project,target,'mount.mjs')));assert.equal(await fs.stat(path.join(project,stage)).then(()=>true,()=>false),false);
 // A malformed recovery record cannot remove unrelated project content.
 await fs.writeFile(path.join(project,'unrelated'),'keep');await fs.writeFile(path.join(project,'.dig-ui-effects.pending.json'),JSON.stringify({id:recipe.id,target:'unrelated',stage,backup,before,after}));
 await assert.rejects(()=>runEffectCLI(['check',recipe.id,'--project',project]),/recovery destinations/);assert.equal(await fs.readFile(path.join(project,'unrelated'),'utf8'),'keep');
});
test('isolated skill installation/update includes tooling and protects local effects',async()=>{
 const project=path.join(root,'cursor-project'),fakeUser=path.join(root,'isolated-user'),preload=path.join(root,'isolated-os.mjs');await fs.mkdir(project);const env={...process.env,DIG_UI_CONFIG_HOME:process.env.DIG_UI_CONFIG_HOME};
 // Existing --project scopes only Cursor rules. Isolate every os.homedir() call in this child
 // process; never alter the real user environment or installed skills.
 await fs.writeFile(preload,`import os from 'node:os';os.homedir=()=>${JSON.stringify(fakeUser)};`);
 for(const command of ['install','update']){const result=spawnSync(process.execPath,['--import',preload,'bin/dig-ui-skill.mjs',command,'cursor','--source',packageRootForTest(),'--project',project],{encoding:'utf8',env});assert.equal(result.status,0,result.stderr);}
 const installed=path.join(fakeUser,'.cursor/skills/dig-ui');assert.ok(await fs.stat(path.join(installed,'assets/effects/runtime.mjs')));assert.ok(await fs.stat(path.join(installed,'bin/effect-lock.cjs')));assert.ok(await fs.stat(path.join(installed,'references/local/effects/flowing-ribbon.json')));
 const result=spawnSync(process.execPath,['--import',preload,path.join(installed,'bin/dig-ui-skill.mjs'),'effect','list'],{encoding:'utf8',env});assert.equal(result.status,0,result.stderr);assert.match(result.stdout,/flowing-ribbon/);
 const offline=spawnSync(process.execPath,['--import',preload,path.join(installed,'bin/dig-ui-skill.mjs'),'effect','show','flowing-ribbon'],{encoding:'utf8',env:{...env,DIG_UI_CONFIG_HOME:path.join(root,'offline-config')}});assert.equal(offline.status,0,offline.stderr);assert.equal(JSON.parse(offline.stdout).revision,3);
});
function packageRootForTest(){return packageRoot;}
test('concurrent project writers serialize and stale locks recover',async()=>{
 const project=path.join(root,'concurrent-app');await fs.mkdir(project);
 await fs.mkdir(path.join(project,'.dig-ui-effects.write-lock'));const old=new Date(Date.now()-30000);await fs.utimes(path.join(project,'.dig-ui-effects.write-lock'),old,old);
 const run=()=>new Promise((resolve,reject)=>{const child=spawn(process.execPath,['bin/dig-ui-skill.mjs','effect','install','flowing-ribbon','--project',project],{env:{...process.env},stdio:['ignore','pipe','pipe']});let output='';child.stderr.on('data',b=>output+=b);child.on('error',reject);child.on('exit',code=>code?reject(new Error(output)):resolve());});
 await Promise.all([run(),run()]);const lock=JSON.parse(await fs.readFile(path.join(project,'.dig-ui-effects.json')));assert.equal(Object.keys(lock.effects).length,1);assert.equal(lock.effects['flowing-ribbon'].recipe.revision,3);await runEffectCLI(['check','flowing-ribbon','--project',project]);
});
test('official builds exclude personal assets; portable resource bytes are checked end-to-end',async()=>{
 const personal=clone(ribbon);personal.id='private-example';await fs.writeFile(path.join(effectsDir(),personal.id+'.json'),JSON.stringify(personal));
 const preview=path.join(root,'official.html');await buildLab(preview,undefined,{officialOnly:true});const html=await fs.readFile(preview,'utf8'),payload=JSON.parse(html.match(/<script id="effect-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);assert.ok(!payload.effects.some(e=>e.id==='private-example'));assert.ok(!payload.themes.some(t=>t.id.startsWith('local-')));
 const png=await fs.readFile(path.join(packageRoot,'assets/dig-mark.png')),effect=clone(ribbon);effect.id='resource-example';effect.assets=[{path:'mark.png',mime:'image/png',source:'Dig original',license:'Apache-2.0',sha256:'sha256:'+createHash('sha256').update(png).digest('hex'),data:png.toString('base64')}];effect.fallback={type:'image',asset:'mark.png'};
 const source=path.join(root,'image.json');await fs.writeFile(source,JSON.stringify(effect));const output=path.join(root,'image.zip');await runEffectCLI(['export',source,'--output',output]);await runEffectCLI(['import',output]);assert.deepEqual(await readEffect(effect.id),effect);
 const files=unzipFiles(await fs.readFile(output));files['resources/mark.png']=new Uint8Array([1,2,3]);assert.throws(()=>readEffectArchive(zipFiles(files)),/resource mismatch/);
});
test('color controls preserve independent themes and reject unsupported capture/invalid drivers',()=>{
 const effect=clone(ribbon);effect.parameters.push({id:'color',layer:'ribbon',prop:'colorB',control:'color',group:'color',label:{en:'Color','zh-CN':'颜色'},default:{token:'--dig-accent'}});
 const edited=setParameter(effect,'color','#ff0000','dark');assert.equal(edited.theme_bindings.dark['ribbon.colorB'],'#ff0000');assert.deepEqual(edited.composition[0].props.colorB,{token:'--dig-accent'});
 const invalid=clone(ribbon);invalid.composition[0].props.colorB='invalid-color';assert.throws(()=>validateEffect(invalid),/color/);
 invalid.composition[0].props.colorB={token:'--dig-accent'};invalid.composition[0].props.speed={type:'mouse',outputMin:0,outputMax:100};assert.throws(()=>validateEffect(invalid),/maximum/);
 invalid.composition[0]={id:'capture',type:'HTMLInCanvas',props:{}};invalid.parameters=[];assert.throws(()=>validateEffect(invalid),/outside Effects/);
});
test('generated provider, registry, Lab and adapters match their source build',async()=>{
 const hashes=JSON.parse(await fs.readFile(path.join(packageRoot,'assets/effects/build-hashes.json')));
 for(const [name,digest] of Object.entries(hashes))assert.equal('sha256:'+createHash('sha256').update(await fs.readFile(path.join(packageRoot,name))).digest('hex'),digest,`${name} changed; run npm run build:effects`);
});

test('all effective props share resource ownership, typed URL detection and reference validation',()=>{
 const image=clone(ribbon);image.composition=[{id:'image',type:'ImageTexture',props:{}}];image.parameters=[];
 for(const mode of ['light','dark']){image.theme_bindings={[mode]:{'image.url':'https://example.invalid/untracked.png'}};assert.throws(()=>validateEffect(image),/embedded resource/);}
 image.theme_bindings={};image.composition[0].props.url='https://example.invalid/untracked.png';assert.throws(()=>validateEffect(image),/embedded resource/);
 image.theme_bindings={light:{'image.toString':'unknown'}};image.composition[0].props={};assert.throws(()=>validateEffect(image),/Theme target/);
 const ink=clone(ribbon);ink.composition=[{id:'ink',type:'InkFlow',props:{curl:1}}];ink.parameters=[];ink.theme_bindings={dark:{'ink.curl':2}};assert.equal(validateEffect(ink).composition[0].props.curl,1);
 const mapped=clone(ribbon);mapped.theme_bindings={dark:{'ribbon.speed':{type:'map',source:'missing',channel:'luminance',inputMin:0,inputMax:1,outputMin:0,outputMax:1}}};assert.throws(()=>validateEffect(mapped),/Missing layer/);
 mapped.theme_bindings.dark['ribbon.speed'].source='ribbon';assert.throws(()=>validateEffect(mapped),/Cyclic/);
 mapped.theme_bindings={light:{'ribbon.speed.extra':.5}};assert.throws(()=>validateEffect(mapped),/Theme target/);
});

test('project ID update/diff follow recorded file provenance and reject changed identity',async()=>{
 const project=path.join(root,'source-by-id'),file=path.join(root,'source-by-id.json'),original=clone(ribbon);original.id='source-by-id';original.revision=1;await fs.writeFile(file,JSON.stringify(original));await runEffectCLI(['install',file,'--project',project]);
 original.revision=2;original.composition[0].props.speed=.7;await fs.writeFile(file,JSON.stringify(original));const diff=spawnSync(process.execPath,[path.join(packageRoot,'bin/effects-cli.mjs'),'diff',original.id,'--project',project],{env:process.env,encoding:'utf8'});assert.equal(diff.status,0,diff.stderr);assert.equal(JSON.parse(diff.stdout.slice(diff.stdout.indexOf('{'))).source_revision,2);await runEffectCLI(['update',original.id,'--project',project]);
 const recordPath=path.join(project,'.dig-ui-effects.json'),record=JSON.parse(await fs.readFile(recordPath));assert.equal(record.effects[original.id].source_ref,file);assert.equal(record.effects[original.id].recipe.revision,2);
 const before=await fs.readFile(recordPath,'utf8');original.id='changed-identity';await fs.writeFile(file,JSON.stringify(original));await assert.rejects(()=>runEffectCLI(['update','source-by-id','--project',project]),/identity changed/);assert.equal(await fs.readFile(recordPath,'utf8'),before);
 await fs.rm(file);await assert.rejects(()=>runEffectCLI(['diff','source-by-id','--project',project]),/ENOENT/);await runEffectCLI(['check','source-by-id','--project',project]);assert.equal(await fs.readFile(recordPath,'utf8'),before);
});

test('native snapshot names restore byte-for-byte and unsafe backup records reject before writes',async()=>{
 const project=path.join(root,'native-snapshot');await runEffectCLI(['install','flowing-ribbon','--project',project]);const dir=path.join(project,'components/dig-effects/flowing-ribbon');
 await fs.mkdir(path.join(dir,'空目录'));await fs.writeFile(path.join(dir,'user-script.sh'),'#!/bin/sh\necho ok\n');await fs.chmod(path.join(dir,'user-script.sh'),0o755);
 const names=['设计说明.md','notes copy.txt','__proto__','constructor','文档目录/主题 参数.md'];for(const name of names){await fs.mkdir(path.dirname(path.join(dir,name)),{recursive:true});await fs.writeFile(path.join(dir,name),'keep '+name);}
 await runEffectCLI(['update','flowing-ribbon','--project',project,'--force']);await runEffectCLI(['restore','flowing-ribbon','--project',project]);assert.ok((await fs.stat(path.join(dir,'user-script.sh'))).mode&0o111);assert.ok((await fs.stat(path.join(dir,'空目录'))).isDirectory());for(const name of names)assert.equal(await fs.readFile(path.join(dir,name),'utf8'),'keep '+name);
 await assert.rejects(()=>runEffectCLI(['update','flowing-ribbon','--project',project]),/Local edits/);
 const recordPath=path.join(project,'.dig-ui-effects.json'),good=JSON.parse(await fs.readFile(recordPath)),bad=clone(good);bad.effects['flowing-ribbon'].backups.at(-1).entry.files['../outside']='sha256:'+'0'.repeat(64);await fs.writeFile(recordPath,JSON.stringify(bad));await assert.rejects(()=>runEffectCLI(['restore','flowing-ribbon','--project',project,'--force']),/Invalid installed file/);assert.equal(await fs.readFile(path.join(dir,names[0]),'utf8'),'keep '+names[0]);await fs.writeFile(recordPath,JSON.stringify(good));
});

test('large valid asset exports reopen with shared limits and entry files reuse effect.json',async()=>{
 const {resources}=await import('../bin/effects-cli.mjs'),{exportEffect}=await import('../assets/effects/export.mjs'),{MAX_ARCHIVE_BYTES}=await import('../assets/effects/archive.mjs');
 const recipe=clone(ribbon);recipe.id='large-roundtrip';const bytes=Buffer.alloc(5*1024*1024,123),sha256='sha256:'+createHash('sha256').update(bytes).digest('hex');recipe.assets=['a.bin','b.bin','c.bin'].map(name=>({path:name,mime:'application/octet-stream',source:'fixture',license:'CC0',sha256,data:bytes.toString('base64')}));validateEffect(recipe);
 const archive=await exportEffect(recipe,await resources(),await themes({includeLocal:false})),file=path.join(root,'large.zip');assert.ok(archive.length>48*1024*1024&&archive.length<MAX_ARCHIVE_BYTES);await fs.writeFile(file,archive);await runEffectCLI(['import',file]);assert.deepEqual(await readEffect(recipe.id),recipe);
 const files=readEffectArchive(archive).files;assert.match(new TextDecoder().decode(files['mount.mjs']),/effect\.json/);assert.ok(files['mount.mjs'].length<1000);assert.ok(files['Effect.jsx'].length<1000);assert.equal(files['resources/a.bin'].length,bytes.length);
 assert.throws(()=>unzipFiles(new Uint8Array(MAX_ARCHIVE_BYTES+1)),/96 MiB/);
});

function runtimeHost(){
 let doc;const motion={matches:false,addEventListener(){},removeEventListener(){}};
 const win={setTimeout,clearTimeout,devicePixelRatio:1,ResizeObserver:class{observe(){}disconnect(){}},IntersectionObserver:class{observe(){}disconnect(){}},MutationObserver:class{observe(){}disconnect(){}},matchMedia:()=>motion,URL,Blob};
 const element=()=>({ownerDocument:doc,style:{},dataset:{},parentElement:null,setAttribute(){},append(){},prepend(){},remove(){},closest(){return null;},getBoundingClientRect(){return{width:300,height:200};}});
 doc={defaultView:win,hidden:false,createElement:element,addEventListener(){},removeEventListener(){}};return element();
}
const runtimeTokens=()=>({'--dig-bg':'#fff','--dig-bg-soft':'#eee','--dig-accent':'#09f','--dig-accent-2':'#9ff'});
const tick=()=>new Promise(r=>setTimeout(r,0));
test('pending initialization commits latest theme and ignores premature ready callback',async()=>{
 const {mountEffect}=await import('../assets/effects/runtime.mjs');const recipe=clone(ribbon);recipe.theme_bindings={light:{'ribbon.colorB':'#ff0000'},dark:{'ribbon.colorB':'#0000ff'}};
 let entered,finish,props,updates=0,resolved=false;const inside=new Promise(r=>entered=r),gate=new Promise(r=>finish=r);
 const c=mountEffect(runtimeHost(),recipe,{tokens:runtimeTokens,mode:'light',loadProvider:async()=>({createShader:async(canvas,preset,o)=>{props=clone(preset.components[0].props);o.onReady();entered();await gate;return{destroy(){},resize(){},getFailureReason(){return null;},update(id,next){updates++;Object.assign(props,next);}};}})});c.ready.then(()=>resolved=true);
 try{await inside;assert.equal(resolved,false);c.refreshTheme('dark');finish();await c.ready;assert.equal(props.colorB,'#0000ff');assert.equal(updates,1);assert.equal(c.getState().state,'running');}finally{finish();c.destroy();}
});
test('removed effective override rebuilds and pending rebuilds never share a canvas',async()=>{
 const {mountEffect}=await import('../assets/effects/runtime.mjs');const recipe=clone(ribbon);delete recipe.composition[0].props.seed;recipe.parameters=recipe.parameters.filter(p=>p.id!=='seed');recipe.theme_bindings.light={'ribbon.seed':77};
 let entered,finish,calls=0,destroys=0,live=0,maxLive=0,props;const inside=new Promise(r=>entered=r),gate=new Promise(r=>finish=r);
 const c=mountEffect(runtimeHost(),recipe,{tokens:runtimeTokens,mode:'light',loadProvider:async()=>({createShader:async(canvas,preset)=>{calls++;live++;maxLive=Math.max(maxLive,live);if(calls===1){entered();await gate;}props={seed:0,...clone(preset.components[0].props)};return{destroy(){destroys++;live--;},resize(){},getFailureReason(){return null;},update(id,next){Object.assign(props,next);}};}})});
 try{await inside;const next=clone(recipe);next.theme_bindings.light={};c.update(next);await tick();assert.equal(calls,1);finish();await c.ready;await tick();assert.equal(props.seed,0);assert.equal(calls,2);assert.equal(maxLive,1);assert.equal(destroys,1);
 const rebound=clone(next);rebound.theme_bindings.dark={'ribbon.seed':88};c.update(rebound);c.refreshTheme('dark');await tick();assert.equal(props.seed,88);c.refreshTheme('light');await tick();assert.equal(props.seed,0);assert.equal(maxLive,1);
 }finally{finish();c.destroy();}assert.equal(live,0);
});

test('cancelled in-flight creation yields usable fallback and cleanup survives a later theme error',{timeout:3000},async()=>{
 const {mountEffect}=await import('../assets/effects/runtime.mjs');let enter,release,calls=0,destroys=0;const entered=new Promise(r=>enter=r),gate=new Promise(r=>release=r);
 const c=mountEffect(runtimeHost(),ribbon,{tokens:runtimeTokens,loadProvider:async()=>({createShader:async()=>{calls++;enter();await gate;return{destroy(){destroys++;},resize(){},update(){},getFailureReason(){return null;}};}})});
 try{await entered;const next=clone(ribbon);next.composition[0].props.speed=.6;c.update(next);await c.ready;assert.equal(c.getState().state,'static');assert.equal(c.getState().reason,'restarting');assert.equal(calls,1);c.destroy();release();await tick();assert.equal(destroys,1);}finally{release();c.destroy();}
 let missing=false,inside,finish;const initialization=new Promise(r=>inside=r),ready=new Promise(r=>finish=r);let cleaned=0;
 const failing=mountEffect(runtimeHost(),ribbon,{tokens:()=>missing?{'--dig-bg':'#fff','--dig-accent':'#09f'}:runtimeTokens(),loadProvider:async()=>({createShader:async()=>{inside();await ready;return{destroy(){cleaned++;},resize(){},getFailureReason(){return null;}};}})});
 try{await initialization;missing=true;finish();await failing.ready;assert.equal(failing.getState().state,'static');assert.match(failing.getState().reason,/Missing theme token/);assert.equal(cleaned,1);}finally{finish();failing.destroy();}
});

test('effect sync rejects redirected parent and backup paths without changing outside assets',async()=>{
 const target=path.join(root,'redirected-skill'),outside=path.join(root,'outside-assets');await fs.mkdir(path.join(target,'references'),{recursive:true});await fs.mkdir(outside);await fs.writeFile(path.join(outside,'keep.txt'),'unchanged');await fs.symlink(outside,path.join(target,'references/local'));
 await assert.rejects(()=>syncEffectsInto(target),/Symlink/);assert.deepEqual(await fs.readdir(outside),['keep.txt']);
 await fs.rm(path.join(target,'references/local'));await fs.mkdir(path.join(target,'references/local'));await fs.symlink(outside,path.join(target,'references/local/effects.backup'));await assert.rejects(()=>syncEffectsInto(target),/Symlink/);assert.equal(await fs.readFile(path.join(outside,'keep.txt'),'utf8'),'unchanged');
});

test('force update repairs missing installation directories and interrupted repair restores absence',async()=>{
 const project=path.join(root,'missing-install');await runEffectCLI(['install','flowing-ribbon','--project',project]);const recordPath=path.join(project,'.dig-ui-effects.json');const before=JSON.parse(await fs.readFile(recordPath)),entry=before.effects['flowing-ribbon'],target=entry.directory;
 await fs.rm(path.join(project,target),{recursive:true});await assert.rejects(()=>runEffectCLI(['update','flowing-ribbon','--project',project]),/Local edits/);
 const stage=target+'.stage-missing-test',backup='.dig-ui-effects-backups/flowing-ribbon-missing-test';await fs.mkdir(path.join(project,target),{recursive:true});await fs.writeFile(path.join(project,target,'partial'),'incomplete');await fs.mkdir(path.join(project,stage));
 const after=clone(before);after.effects['flowing-ribbon'].recipe.revision++;
 await fs.writeFile(path.join(project,'.dig-ui-effects.pending.json'),JSON.stringify({id:'flowing-ribbon',target,stage,backup,had_target:false,before,after}));
 await runEffectCLI(['check','flowing-ribbon','--project',project]);assert.deepEqual(JSON.parse(await fs.readFile(recordPath)),before);assert.equal(await fs.stat(path.join(project,target)).then(()=>true,()=>false),false);
 await runEffectCLI(['update','flowing-ribbon','--project',project,'--force']);assert.ok(await fs.stat(path.join(project,target,'mount.mjs')));await runEffectCLI(['check','flowing-ribbon','--project',project]);
});

test('personal and project writes share revision rules while preserving explicit rollback',async()=>{
 const recipe=clone(ribbon);recipe.id='revision-contract';recipe.revision=1;const file=path.join(root,'revision-contract.json'),project=path.join(root,'revision-contract');await fs.writeFile(file,JSON.stringify(recipe));await runEffectCLI(['import',file]);await runEffectCLI(['install',file,'--project',project]);
 const recordPath=path.join(project,'.dig-ui-effects.json'),before=await fs.readFile(recordPath,'utf8');const changed=clone(recipe);changed.composition[0].props.speed=.8;await fs.writeFile(file,JSON.stringify(changed));
 for(const args of [['import',file],['install',file,'--project',project],['update',recipe.id,'--project',project],['update',file,'--project',project],['update','--project',project]])await assert.rejects(()=>runEffectCLI(args),/newer revision/);
 assert.equal(await fs.readFile(recordPath,'utf8'),before);assert.equal(await fs.stat(path.join(project,'.dig-ui-effects.pending.json')).then(()=>true,()=>false),false);
 await runEffectCLI(['update',recipe.id,'--project',project,'--force']);assert.equal(JSON.parse(await fs.readFile(recordPath)).effects[recipe.id].recipe.composition[0].props.speed,.8);await runEffectCLI(['restore',recipe.id,'--project',project]);assert.equal(JSON.parse(await fs.readFile(recordPath)).effects[recipe.id].recipe.composition[0].props.speed,recipe.composition[0].props.speed);
 const reversed=Object.fromEntries(Object.entries(recipe).reverse());reversed.composition=recipe.composition.map(n=>({...n,props:Object.fromEntries(Object.entries(n.props).reverse())}));await fs.writeFile(file,JSON.stringify(reversed));await runEffectCLI(['import',file]);await runEffectCLI(['update',recipe.id,'--project',project]);
 const unknown=clone(recipe);unknown.id='not-installed';await fs.writeFile(file,JSON.stringify(unknown));await assert.rejects(()=>runEffectCLI(['update',file,'--project',project]),/not installed/);assert.equal(await fs.stat(path.join(project,'components/dig-effects/not-installed')).then(()=>true,()=>false),false);
 changed.revision=2;await fs.writeFile(file,JSON.stringify(changed));await runEffectCLI(['update',recipe.id,'--project',project]);await fs.writeFile(file,JSON.stringify(recipe));await assert.rejects(()=>runEffectCLI(['update',recipe.id,'--project',project]),/downgrade/);
});

test('scalar/position driver fields and all map channels match Shaders 4.0.4',()=>{
 const base=clone(ribbon);base.composition.push({id:'source',type:'FlowingGradient',props:{}});
 const map={type:'map',source:'source',channel:'alpha',inputMin:0,inputMax:1,outputMin:0,outputMax:1,curve:.3};
 for(const channel of ['alpha','alphaInverted','luminance','luminanceInverted']){base.composition[0].props.speed={...map,channel};validateEffect(base);base.theme_bindings.dark={'ribbon.speed':{...map,channel}};validateEffect(base);}
 base.theme_bindings={};for(const driver of [{type:'mouse',axis:'x',outputMin:1,outputMax:0,curve:-.5,smoothing:.1,momentum:.1},{type:'auto-animate',mode:'loop',outputMin:0,outputMax:1,speed:-1,easing:'bounce'},{type:'auto-animate',mode:'ping-pong',outputMin:0,outputMax:1,waveform:'linear'}]){base.composition[0].props.speed=driver;validateEffect(base);}
 for(const driver of [{...map,channel:'a'},{...map,channel:'r'},{...map,inputMax:0},{type:'auto-animate',mode:'once',outputMin:0,outputMax:1},{type:'mouse',axis:'z',outputMin:0,outputMax:1},{type:'mouse',axis:'x',outputMin:100},{type:'mouse',axis:'x',outputMax:-1},{type:'mouse',axis:'x',outputMin:0,outputMax:1,mode:'loop'},{type:'auto-animate',mode:'loop',outputMin:0,outputMax:1,easing:'invented'}]){base.composition[0].props.speed=driver;assert.throws(()=>validateEffect(base));}
 const position=clone(ribbon);position.composition=[{id:'gradient',type:'RadialGradient',props:{center:{type:'mouse-position',x:'mouse',y:.5,invertX:true,invertY:false,reach:-1,originX:.5,originY:.5,smoothing:.1,momentum:.2}}}];position.parameters=[];position.theme_bindings={};validateEffect(position);position.composition[0].props.center.invertX='yes';assert.throws(()=>validateEffect(position),/boolean/);position.composition[0].props.center.invertX=true;position.composition[0].props.stops={type:'mouse-position'};assert.throws(()=>validateEffect(position),/position prop/);
});

test('persisted legacy drivers remain inspectable and repairable without admitting new invalid input',async()=>{
 const recipe=clone(ribbon);recipe.id='legacy-driver';recipe.revision=1;const file=path.join(root,'legacy-driver.json'),project=path.join(root,'legacy-driver');await fs.writeFile(file,JSON.stringify(recipe));await runEffectCLI(['install',file,'--project',project]);
 const old=clone(recipe);old.composition[0].props.speed={type:'auto-animate',mode:'once',outputMin:0,outputMax:1};assert.throws(()=>validateEffect(old),/animation mode/);validateEffect(old,{legacyDrivers:true});
 await fs.mkdir(effectsDir(),{recursive:true});await fs.writeFile(path.join(effectsDir(),old.id+'.json'),JSON.stringify(old));
 const recordPath=path.join(project,'.dig-ui-effects.json'),record=JSON.parse(await fs.readFile(recordPath)),entry=record.effects[old.id];entry.recipe=old;const bytes=JSON.stringify(old,null,2)+'\n';await fs.writeFile(path.join(project,entry.directory,'effect.json'),bytes);entry.files['effect.json']='sha256:'+createHash('sha256').update(bytes).digest('hex');await fs.writeFile(recordPath,JSON.stringify(record));
 recipe.revision=2;recipe.composition[0].props.speed={type:'auto-animate',mode:'loop',outputMin:0,outputMax:1};await fs.writeFile(file,JSON.stringify(recipe));await runEffectCLI(['import',file]);await runEffectCLI(['update',old.id,'--project',project]);assert.equal((await readEffect(old.id)).revision,2);assert.equal(JSON.parse(await fs.readFile(recordPath)).effects[old.id].recipe.revision,2);
});

test('portable preview producers reject absent theme data and dangling selections',async()=>{
 const {resources}=await import('../bin/effects-cli.mjs'),{exportEffect,labHTML}=await import('../assets/effects/export.mjs');const res=await resources(),all=await themes({includeLocal:false});
 await assert.rejects(()=>exportEffect(ribbon,res,[]),/requires theme data/);
 assert.throws(()=>labHTML({effects:[ribbon],themes:all,selection:{theme:'missing'}},res),/theme selection missing/);
 assert.throws(()=>labHTML({effects:[ribbon],themes:all,selection:{effect:'missing'}},res),/asset selection missing/);
});

test('unchanged project commands are idempotent without skipping changed generated files or force repairs',async()=>{
 const recipe=clone(ribbon);recipe.id='noop-update';const file=path.join(root,'noop.json'),project=path.join(root,'noop-project');await fs.writeFile(file,JSON.stringify(recipe));await runEffectCLI(['install',file,'--project',project]);recipe.revision++;recipe.composition[0].props.speed=.6;await fs.writeFile(file,JSON.stringify(recipe));await runEffectCLI(['update',file,'--project',project]);
 const recordPath=path.join(project,'.dig-ui-effects.json'),before=await fs.readFile(recordPath,'utf8');
 for(const args of [['update',recipe.id],['update',file],['update'],['install',file],['update',recipe.id,'--force']])await runEffectCLI([...args,'--project',project]);
 assert.equal(await fs.readFile(recordPath,'utf8'),before);await runEffectCLI(['restore',recipe.id,'--project',project]);let record=JSON.parse(await fs.readFile(recordPath)),entry=record.effects[recipe.id];assert.equal(entry.recipe.revision,1);
 // A pristine installation generated by an older runtime must still be regenerated.
 recipe.revision=1;recipe.composition[0].props.speed=ribbon.composition[0].props.speed;await fs.writeFile(file,JSON.stringify(recipe));const runtime=path.join(project,entry.directory,'assets/effects/runtime.mjs');await fs.appendFile(runtime,'\n// previous generator\n');entry.files['assets/effects/runtime.mjs']='sha256:'+createHash('sha256').update(await fs.readFile(runtime)).digest('hex');await fs.writeFile(recordPath,JSON.stringify(record));const count=entry.backups.length;await runEffectCLI(['update',recipe.id,'--project',project]);record=JSON.parse(await fs.readFile(recordPath));assert.equal(record.effects[recipe.id].backups.length,count+1);assert.doesNotMatch(await fs.readFile(runtime,'utf8'),/previous generator/);
 const mount=path.join(project,entry.directory,'mount.mjs');await fs.appendFile(mount,'\n// local edit\n');await assert.rejects(()=>runEffectCLI(['update',recipe.id,'--project',project]),/Local edits/);await runEffectCLI(['update',recipe.id,'--project',project,'--force']);assert.doesNotMatch(await fs.readFile(mount,'utf8'),/local edit/);
});

test('restore skips legacy duplicate snapshots and fails closed on corrupt snapshots',async()=>{
 const recipe=clone(ribbon);recipe.id='duplicate-history';const file=path.join(root,'duplicate.json'),project=path.join(root,'duplicate-project');await fs.writeFile(file,JSON.stringify(recipe));await runEffectCLI(['install',file,'--project',project]);recipe.revision++;await fs.writeFile(file,JSON.stringify(recipe));await runEffectCLI(['update',file,'--project',project]);
 const recordPath=path.join(project,'.dig-ui-effects.json'),record=JSON.parse(await fs.readFile(recordPath)),entry=record.effects[recipe.id],duplicate='.dig-ui-effects-backups/'+recipe.id+'-duplicate';await fs.cp(path.join(project,entry.directory),path.join(project,duplicate),{recursive:true});entry.backups.push({path:duplicate,entry:{...clone(entry),generated_files:clone(entry.files),backups:[]}});await fs.writeFile(recordPath,JSON.stringify(record));
 await fs.appendFile(path.join(project,duplicate,'mount.mjs'),'corrupt');await assert.rejects(()=>runEffectCLI(['restore',recipe.id,'--project',project]),/Backup checksum/);assert.equal(JSON.parse(await fs.readFile(recordPath)).effects[recipe.id].recipe.revision,2);await fs.copyFile(path.join(project,entry.directory,'mount.mjs'),path.join(project,duplicate,'mount.mjs'));
 await runEffectCLI(['restore',recipe.id,'--project',project]);assert.equal(JSON.parse(await fs.readFile(recordPath)).effects[recipe.id].recipe.revision,1);
 const only=path.join(root,'only-duplicates');recipe.revision=1;await fs.writeFile(file,JSON.stringify(recipe));await runEffectCLI(['install',file,'--project',only]);const onlyPath=path.join(only,'.dig-ui-effects.json'),onlyRecord=JSON.parse(await fs.readFile(onlyPath)),e=onlyRecord.effects[recipe.id],copy='.dig-ui-effects-backups/'+recipe.id+'-only';await fs.cp(path.join(only,e.directory),path.join(only,copy),{recursive:true});e.backups.push({path:copy,entry:{...clone(e),generated_files:clone(e.files),backups:[]}});await fs.writeFile(onlyPath,JSON.stringify(onlyRecord));const prior=await fs.readFile(onlyPath,'utf8');await assert.rejects(()=>runEffectCLI(['restore',recipe.id,'--project',only]),/No different previous version/);assert.equal(await fs.readFile(onlyPath,'utf8'),prior);
});

test('restore never skips snapshots differing only in empty directories or executable modes',async()=>{
 for(const kind of ['empty','mode']){
  const recipe=clone(ribbon);recipe.id='snapshot-shape-'+kind;const file=path.join(root,'shape-'+kind+'.json'),project=path.join(root,'shape-project-'+kind);await fs.writeFile(file,JSON.stringify(recipe));await runEffectCLI(['install',file,'--project',project]);
  const recordPath=path.join(project,'.dig-ui-effects.json'),record=JSON.parse(await fs.readFile(recordPath)),entry=record.effects[recipe.id],backup='.dig-ui-effects-backups/'+recipe.id+'-shape';await fs.cp(path.join(project,entry.directory),path.join(project,backup),{recursive:true});
  if(kind==='empty')await fs.mkdir(path.join(project,backup,'空目录'));else await fs.chmod(path.join(project,backup,'mount.mjs'),0o755);
  entry.backups.push({path:backup,entry:{...clone(entry),generated_files:clone(entry.files),backups:[]}});await fs.writeFile(recordPath,JSON.stringify(record));await runEffectCLI(['restore',recipe.id,'--project',project]);
  if(kind==='empty')assert.ok((await fs.stat(path.join(project,entry.directory,'空目录'))).isDirectory());else assert.equal((await fs.stat(path.join(project,entry.directory,'mount.mjs'))).mode&0o777,0o755);
 }
});

test('legacy personal assets remain diagnosable and synced while invalid sources cannot block valid assets',async()=>{
 const old=clone(ribbon);old.id='legacy-diagnostic';old.composition[0].props.speed={type:'auto-animate',mode:'once',outputMin:0,outputMax:1};const file=path.join(effectsDir(),old.id+'.json'),target=path.join(root,'legacy-sync');await fs.writeFile(file,JSON.stringify(old));
 await assert.rejects(()=>readEffect(old.id),/animation mode/);assert.equal((await readEffect(old.id,{legacyDrivers:true})).id,old.id);await runEffectCLI(['show',old.id]);await runEffectCLI(['list']);assert.ok((await listEffects()).some(e=>e.id===old.id));
 const preview=path.join(root,'legacy-preview.html');await buildLab(preview);const html=await fs.readFile(preview,'utf8'),payload=JSON.parse(html.match(/<script id="effect-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);assert.ok(payload.effects.some(e=>e.id==='flowing-ribbon'));assert.ok(!payload.effects.some(e=>e.id===old.id));await assert.rejects(()=>buildLab(path.join(root,'invalid-preview.html'),old),/animation mode/);
 for(const args of [['import',file],['export',old.id,'--output',path.join(root,'invalid.zip')],['install',old.id,'--project',path.join(root,'invalid-project')]])await assert.rejects(()=>runEffectCLI(args),/animation mode/);
 await syncEffectsInto(target);const copy=path.join(target,'references/local/effects',old.id+'.json');assert.deepEqual(JSON.parse(await fs.readFile(copy)),old);
 const fakeUser=path.join(root,'legacy-user'),hostProject=path.join(root,'legacy-host'),preload=path.join(root,'legacy-os.mjs'),env={...process.env};await fs.mkdir(hostProject);await fs.writeFile(preload,`import os from 'node:os';os.homedir=()=>${JSON.stringify(fakeUser)};`);for(const command of ['install','update']){const result=spawnSync(process.execPath,['--import',preload,'bin/dig-ui-skill.mjs',command,'cursor','--source',packageRoot,'--project',hostProject],{encoding:'utf8',env});assert.equal(result.status,0,result.stderr);}const installed=path.join(fakeUser,'.cursor/skills/dig-ui'),offline=spawnSync(process.execPath,['--import',preload,path.join(installed,'bin/dig-ui-skill.mjs'),'effect','show',old.id],{encoding:'utf8',env:{...env,DIG_UI_CONFIG_HOME:path.join(root,'legacy-offline')}});assert.equal(offline.status,0,offline.stderr);assert.deepEqual(JSON.parse(offline.stdout),old);assert.match(offline.stderr,/requires repair/);

 await fs.writeFile(file,'{');await fs.writeFile(path.join(effectsDir(),'broken name.json'),'{');const valid=clone(ribbon);valid.id='healthy-after-broken';await fs.writeFile(path.join(effectsDir(),valid.id+'.json'),JSON.stringify(valid));assert.ok((await listEffects()).some(e=>e.id===valid.id));await buildLab(preview);await syncEffectsInto(target);assert.deepEqual(JSON.parse(await fs.readFile(copy)),old);assert.equal(JSON.parse(await fs.readFile(path.join(target,'references/local/effects',valid.id+'.json'))).id,valid.id);
 const repair=clone(ribbon);repair.id=old.id;repair.revision=2;const repairFile=path.join(root,'repair-legacy.json');await fs.writeFile(repairFile,JSON.stringify(repair));await assert.rejects(()=>runEffectCLI(['import',repairFile]),/Existing effect is invalid/);assert.equal(await fs.readFile(file,'utf8'),'{');await runEffectCLI(['import',repairFile,'--force']);assert.deepEqual(await readEffect(old.id),repair);const saved=(await fs.readdir(path.join(effectsDir(),'history'))).find(name=>name.startsWith(old.id+'-invalid-'));assert.equal(await fs.readFile(path.join(effectsDir(),'history',saved),'utf8'),'{');await syncEffectsInto(target);assert.deepEqual(JSON.parse(await fs.readFile(copy)),repair);
 await fs.rm(file);await fs.rm(path.join(effectsDir(),'broken name.json'));
});

test('all pinned SDK compositor enums validate and invalid enums/references remain rejected',async()=>{
 const types=await fs.readFile(path.join(packageRoot,'node_modules/shaders/dist/core/types.d.ts'),'utf8');const values=name=>{const union=types.match(new RegExp('export type '+name+' = ([^;]+);'))?.[1];assert.ok(union,'SDK union missing: '+name);return [...union.matchAll(/'([^']+)'/g)].map(m=>m[1]);};
 const blendModes=values('BlendMode'),maskTypes=values('MaskType');assert.equal(blendModes.length,20);assert.equal(maskTypes.length,4);
 const base=clone(ribbon);base.composition.unshift({id:'mask',type:'RadialGradient',props:{}});base.composition[1].props.maskSource='mask';
 for(const blendMode of blendModes)for(const maskType of maskTypes){const recipe=clone(base);Object.assign(recipe.composition[1].props,{blendMode,maskType});validateEffect(recipe);const resolved=resolveComposition(recipe,{'--dig-bg':'#fff','--dig-bg-soft':'#eee','--dig-accent':'#09f','--dig-accent-2':'#9ff'});assert.equal(resolved.components[1].props.blendMode,blendMode);assert.equal(resolved.components[1].props.maskType,maskType);}
 for(const [key,invalid] of [['blendMode',['normal-invented','NORMAL','',null]],['maskType',['alpha-inverted','r','',null]]])for(const value of invalid){const bad=clone(base);bad.composition[1].props[key]=value;assert.throws(()=>validateEffect(bad),/Unknown (blend mode|mask type)/);assert.throws(()=>validateEffect(bad,{legacyDrivers:true}),/Unknown (blend mode|mask type)/);}
 for(const maskType of maskTypes){const bad=clone(base);bad.composition[1].props.maskType=maskType;bad.composition[1].props.maskSource='missing';assert.throws(()=>validateEffect(bad),/Missing layer reference/);bad.composition[1].props.maskSource='ribbon';assert.throws(()=>validateEffect(bad),/Cyclic/);bad.composition[1].props.maskSource='mask';bad.composition[0].props.maskSource='ribbon';assert.throws(()=>validateEffect(bad),/Cyclic/);}
});

test('new compositor values survive CLI import/export and project installation',async()=>{
 const cases=[{blendMode:'normal-oklch'},{blendMode:'normal-oklab'},{maskType:'alphaInverted'},{maskType:'luminanceInverted'}];
 for(let i=0;i<cases.length;i++){
  const recipe=clone(ribbon);recipe.id='compositor-roundtrip-'+i;recipe.composition.unshift({id:'mask',type:'RadialGradient',props:{}});Object.assign(recipe.composition[1].props,{maskSource:'mask',...cases[i]});const input=path.join(root,recipe.id+'.json'),zip=path.join(root,recipe.id+'.zip'),project=path.join(root,recipe.id);await fs.writeFile(input,JSON.stringify(recipe));await runEffectCLI(['import',input]);assert.deepEqual(await readEffect(recipe.id),recipe);await runEffectCLI(['export',recipe.id,'--output',zip]);assert.deepEqual(await readEffect(zip),recipe);await runEffectCLI(['install',zip,'--project',project]);assert.deepEqual(JSON.parse(await fs.readFile(path.join(project,'components/dig-effects',recipe.id,'effect.json'))),recipe);
 }
});

test('SDK nested merge defaults apply only to resolved provider props at every depth',()=>{
 const recipe=clone(ribbon);recipe.composition=[{id:'group',type:'Group',props:{transform:{scale:.7}},children:[{id:'paint',type:'SolidColor',props:{color:'#f00',transform:{offsetX:.3,rotation:null},boundingBox:null}}]}];recipe.parameters=[];recipe.theme_bindings={};const before=clone(recipe);validateEffect(recipe);
 const result=resolveComposition(recipe,runtimeTokens()),defaults={offsetX:0,offsetY:0,rotation:0,scale:1,anchorX:.5,anchorY:.5,edges:'transparent'};
 assert.deepEqual(result.components[0].props.transform,{...defaults,scale:.7});assert.deepEqual(result.components[0].children[0].props.transform,{...defaults,offsetX:.3});assert.ok(!Object.hasOwn(result.components[0].children[0].props,'boundingBox'));assert.deepEqual(recipe,before);
 for(const value of [null,false,0,'']){recipe.composition[0].props.transform=value;assert.ok(!Object.hasOwn(resolveComposition(recipe,runtimeTokens()).components[0].props,'transform'));}
 for(const value of [null,false,0,'','none']){recipe.composition[0].props.boundingBox=value;assert.ok(!Object.hasOwn(resolveComposition(recipe,runtimeTokens()).components[0].props,'boundingBox'));}
});

test('full recipe replacement resets all SDK merged transform fields without recreating value edits',async()=>{
 const {mountEffect}=await import('../assets/effects/runtime.mjs'),defaults={offsetX:0,offsetY:0,rotation:0,scale:1,anchorX:.5,anchorY:.5,edges:'transparent'},full={offsetX:.3,offsetY:.2,rotation:35,scale:.6,anchorX:.2,anchorY:.8,edges:'mirror'};
 for(const nested of [false,true]){
  const recipe=clone(ribbon),paint={id:'paint',type:'SolidColor',props:{color:'#f00',transform:clone(full),boundingBox:{width:{value:.6,unit:'uv'}}}};recipe.composition=nested?[{id:'group',type:'Group',props:{},children:[paint]}]:[paint];recipe.parameters=[];recipe.theme_bindings={};let calls=0,destroys=0,live=0,maxLive=0,current;
  const c=mountEffect(runtimeHost(),recipe,{tokens:runtimeTokens,loadProvider:async()=>({createShader:async(canvas,preset)=>{
   calls++;live++;maxLive=Math.max(maxLive,live);current=clone(flattenLayers({composition:preset.components}).find(n=>n.id==='paint').props);
   return{getFailureReason(){return null;},resize(){},destroy(){destroys++;live--;},update(id,props){if(id!=='paint')return;const old=current.transform;Object.assign(current,clone(props));if('transform'in props)current.transform=Object.fromEntries(Object.keys(defaults).map(key=>[key,props.transform[key]??old?.[key]??defaults[key]]));}};
  }})});
  try{await c.ready;for(const field of Object.keys(defaults)){
   c.update(recipe);const next=clone(recipe),target=flattenLayers(next).find(n=>n.id==='paint');delete target.props.transform[field];c.update(next);await tick();assert.deepEqual(current.transform,{...full,[field]:defaults[field]},String(nested)+' '+field);assert.equal(calls,1,'value/partial-field edits reuse the SDK instance');
  }
  const clear=clone(recipe),target=flattenLayers(clear).find(n=>n.id==='paint');target.props.transform=null;target.props.boundingBox=null;c.update(clear);await tick();assert.equal(calls,2);assert.ok(!Object.hasOwn(current,'transform'));assert.ok(!Object.hasOwn(current,'boundingBox'));assert.equal(maxLive,1);
  c.pause();c.update(recipe);c.resume();await tick();assert.deepEqual(current.transform,full);assert.equal(maxLive,1);assert.equal(c.getState().state,'running');
  }finally{c.destroy();}assert.equal(live,0);assert.equal(destroys,calls);
 }
});

test('provider defaults never rewrite partial/null composition in stored or exported recipes',async()=>{
 const recipe=clone(ribbon);recipe.id='replacement-roundtrip';recipe.composition=[{id:'group',type:'Group',props:{},children:[{id:'paint',type:'SolidColor',props:{color:'#f00',transform:{scale:.6},boundingBox:null}}]}];recipe.parameters=[];recipe.theme_bindings={};
 const file=path.join(root,recipe.id+'.json'),zip=path.join(root,recipe.id+'.zip'),project=path.join(root,recipe.id);await fs.writeFile(file,JSON.stringify(recipe));await runEffectCLI(['import',file]);await runEffectCLI(['export',recipe.id,'--output',zip]);assert.deepEqual(await readEffect(zip),recipe);await runEffectCLI(['install',zip,'--project',project]);assert.deepEqual(JSON.parse(await fs.readFile(path.join(project,'components/dig-effects',recipe.id,'effect.json'))),recipe);
});
