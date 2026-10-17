import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { validateEffect,verifyAssets,safePath,assertEffectRevision,serializeEffect } from '../assets/effects/protocol.mjs';
import { readEffectArchive, MAX_ARCHIVE_BYTES } from '../assets/effects/archive.mjs';
import { effectFiles,exportEffect,labHTML } from '../assets/effects/export.mjs';
globalThis.crypto ||= crypto.webcrypto;

export const packageRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const effectsDir=()=>path.join(process.env.DIG_UI_CONFIG_HOME || path.join(os.homedir(),'.config','dig-ui-skill'),'effects');
const hash=content=>'sha256:'+crypto.createHash('sha256').update(content).digest('hex');
const stringify=value=>JSON.stringify(value,null,2)+'\n';
async function exists(p){try{await fs.lstat(p);return true;}catch(e){if(e.code==='ENOENT')return false;throw e;}}
async function readJSON(p,fallback){try{return JSON.parse(await fs.readFile(p,'utf8'));}catch(e){if(e.code==='ENOENT'&&fallback!==undefined)return fallback;throw e;}}
async function atomic(p,content){await fs.mkdir(path.dirname(p),{recursive:true});const tmp=p+'.tmp-'+crypto.randomUUID();try{await fs.writeFile(tmp,content,{flag:'wx'});await fs.rename(tmp,p);}finally{await fs.rm(tmp,{force:true});}}
const snapshotPath=p=>typeof p==='string' && !path.posix.isAbsolute(p) && !path.win32.isAbsolute(p) && !/[\\\x00-\x1f\x7f]/.test(p) && p.split('/').every(s=>s && s!=='.' && s!=='..');
async function contained(root,relative,snapshot=false){
  if(!(snapshot?snapshotPath(relative):safePath(relative)))throw new Error('Unsafe relative path');
  const realRoot=await fs.realpath(root);let current=realRoot;
  for(const segment of relative.split('/')){current=path.join(current,segment);if(await exists(current)){const s=await fs.lstat(current);if(s.isSymbolicLink())throw new Error('Symlink is not an effect destination');}}
  return current;
}
async function withLock(root,name,action){
  await fs.mkdir(root,{recursive:true});const {lock}=await import('./effect-lock.cjs');
  const release=await lock(root,{lockfilePath:path.join(root,name),stale:10000,update:2000,retries:{retries:12,minTimeout:1000,maxTimeout:1000,factor:1}});
  try{return await action();}finally{await release();}
}
export async function readEffect(ref,{legacyDrivers=false}={}){
  let file;
  if(/[\/\\]/.test(ref)||/\.(json|zip)$/.test(ref))file=path.resolve(ref);
  else{if(!/^[a-zA-Z][\w-]{0,79}$/.test(ref))throw new Error('Invalid effect id');const local=path.join(effectsDir(),ref+'.json'),copy=path.join(packageRoot,'references/local/effects',ref+'.json');file=await exists(local)?local:await exists(copy)?copy:path.join(packageRoot,'references/effects',ref+'.json');}
  const stat=await fs.stat(file);if(stat.size>MAX_ARCHIVE_BYTES)throw new Error('Effect file too large');
  const bytes=await fs.readFile(file);let input,files;
  if(file.endsWith('.zip'))({recipe:input,files}=readEffectArchive(bytes));else input=JSON.parse(bytes.toString('utf8'));
  const recipe=validateEffect(input,{legacyDrivers});await verifyAssets(recipe);
  if(files)for(const a of recipe.assets){const resource=files['resources/'+a.path];if(!resource||hash(resource)!==a.sha256)throw new Error(`Packaged resource missing or corrupt: ${a.path}`);}
  return recipe;
}
export async function listEffects({includeLocal=true,legacyDrivers=true}={}){
  const official=path.join(packageRoot,'references/effects'),all=new Map();
  for(const dir of [official,...(includeLocal?[path.join(packageRoot,'references/local/effects'),effectsDir()]:[])]){
    if(!await exists(dir))continue;
    for(const name of (await fs.readdir(dir)).sort())if(name.endsWith('.json')){
      try{const effect=await readEffect(path.join(dir,name),{legacyDrivers:dir!==official&&legacyDrivers});all.set(effect.id,effect);}
      catch(e){if(dir===official)throw e;console.warn(`Effect ${path.join(dir,name)} skipped: ${e.message}; inspect with effect show and import a valid replacement`);}
    }
  }
  return [...all.values()];
}
export async function resources(){
  const names=['LICENSE','assets/effects/protocol.mjs','assets/effects/components.mjs','assets/effects/color.mjs','assets/effects/runtime.mjs','assets/effects/archive.mjs','assets/effects/export.mjs','assets/effects/shaders-js.mjs','assets/effects/SHADERS-LICENSE.txt','assets/effects/THIRD-PARTY-NOTICES.txt','assets/effects/lab.bundle.js','assets/effects/lab.css','adapters/react/DigEffect.jsx'];
  const result={};for(const name of names)result[name]=await fs.readFile(path.join(packageRoot,name),'utf8');
  const font=await fs.readFile(path.join(packageRoot,'assets/fonts/bootstrap-icons.woff2'));result['assets/effects/lab.css']=result['assets/effects/lab.css'].replace("url('../fonts/bootstrap-icons.woff2')",`url('data:font/woff2;base64,${font.toString('base64')}')`);return result;
}
function cssTokens(text){return Object.fromEntries([...text.matchAll(/(--dig-[\w-]+)\s*:\s*([^;]+);/g)].map(m=>[m[1],m[2].trim()]));}
function sectionTokens(markdown,title){const escaped=title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),match=markdown.match(new RegExp('## '+escaped+'\\s*\\n[\\s\\S]*?```css\\s*([\\s\\S]*?)```'));return cssTokens(match?.[1] || '');}
function themeEntry(id,name,light,dark){
  if(!light['--dig-bg']||!light['--dig-text']||!light['--dig-accent'])throw new Error(`Incomplete theme ${id}`);
  const rgb=light['--dig-bg'].match(/^#([a-f\d]{6})$/i),isDark=rgb?[0,2,4].map(i=>parseInt(rgb[1].slice(i,i+2),16)).reduce((a,b)=>a+b,0)<384:false;
  const derivedDark={...light,'--dig-bg':`color-mix(in srgb, ${light['--dig-accent']}, black 94%)`,'--dig-bg-soft':`color-mix(in srgb, ${light['--dig-accent']}, black 90%)`,'--dig-text':'#f5f5f5','--dig-text-muted':'#c0c0c0','--dig-surface':`color-mix(in srgb, ${light['--dig-accent']}, black 86%)`,'--dig-border':'#555555','--dig-control-bg':'#242424','--dig-control-bg-hover':'#303030'};
  const derivedLight={...light,'--dig-bg':`color-mix(in srgb, ${light['--dig-accent']}, white 97%)`,'--dig-bg-soft':`color-mix(in srgb, ${light['--dig-accent']}, white 93%)`,'--dig-text':'#202020','--dig-text-muted':'#555555','--dig-surface':'#ffffff','--dig-border':'#bbbbbb','--dig-control-bg':'#ffffff','--dig-control-bg-hover':'#eeeeee'};
  if(!dark['--dig-bg']){dark=isDark?light:derivedDark;light=isDark?derivedLight:light;}
  return {id,name,theme_tokens:{light,dark},derived_modes:dark===derivedDark?['dark']:light===derivedLight?['light']:[]};
}
export async function themes({includeLocal=true}={}){
  const result=[];
  async function walk(dir){for(const entry of (await fs.readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){const p=path.join(dir,entry.name);if(entry.isDirectory())await walk(p);else if(entry.name.endsWith('.md')&&!/\.(en|zh-CN)\.md$/.test(entry.name)&&!['README.md','_template.md'].includes(entry.name)){const text=await fs.readFile(p,'utf8'),id=entry.name.slice(0,-3),light=sectionTokens(text,'Dig UI CSS Tokens');if(!light['--dig-bg'])Object.assign(light,cssTokens([...text.matchAll(/```css\s*([\s\S]*?)```/g)].map(m=>m[1]).join('\n')));if(!light['--dig-bg'])continue;let dark=sectionTokens(text,'Dig UI Dark Tokens');const explicitLight=sectionTokens(text,'Light Dig CSS Tokens');if(explicitLight['--dig-bg']){dark={...light};Object.assign(light,explicitLight);}
      result.push(themeEntry(id,{en:text.match(/^name_en:\s*(.+)$/m)?.[1]||id,'zh-CN':text.match(/^name_zh:\s*(.+)$/m)?.[1]||id},light,dark));}}}
  await walk(path.join(packageRoot,'references/catalogs'));
  const configRoot=path.dirname(effectsDir());
  for(const kind of includeLocal?['palettes','styles']:[]){const dir=path.join(configRoot,kind);if(!await exists(dir))continue;for(const file of await fs.readdir(dir)){if(!/\.(json|md)$/.test(file))continue;const text=await fs.readFile(path.join(dir,file),'utf8');let name,light,dark;if(file.endsWith('.json')){const p=JSON.parse(text);name={en:p.name?.en||file,'zh-CN':p.name?.zh||p.name?.['zh-CN']||file};light=p.theme_tokens?.light||p.tokens;dark=p.theme_tokens?.dark||{};}else{name={en:file,'zh-CN':file};light=sectionTokens(text,'Dig UI CSS Tokens');dark=sectionTokens(text,'Dig UI Dark Tokens');}result.push(themeEntry('local-'+kind+'-'+file.replace(/\W/g,'-'),name,light,dark));}}
  return result;
}
export async function syncEffectsInto(skillDir){
  await fs.mkdir(skillDir,{recursive:true});const target=await contained(skillDir,'references/local/effects');await fs.mkdir(path.dirname(target),{recursive:true});
  await withLock(path.dirname(target),'.effects-sync-lock',async()=>{await contained(skillDir,'references/local/effects');const stage=await contained(skillDir,'references/local/effects.stage-'+crypto.randomUUID()),backup=await contained(skillDir,'references/local/effects.backup');
    if(await exists(backup)){if(!await exists(target))await fs.rename(backup,target);else await fs.rm(backup,{recursive:true});}
    await fs.mkdir(stage);try{if(await exists(effectsDir()))for(const f of await fs.readdir(effectsDir()))if(f.endsWith('.json')){
      let effect;try{effect=await readEffect(path.join(effectsDir(),f),{legacyDrivers:true});}
      catch(e){console.warn(`Effect ${f} not synced: ${e.message}; preserving a valid installed copy if available`);if(safePath(f)){const copy=await contained(skillDir,'references/local/effects/'+f);try{effect=await readEffect(copy,{legacyDrivers:true});}catch{/* The config source is retained for explicit repair. */}}}
      if(effect)await fs.writeFile(path.join(stage,effect.id+'.json'),stringify(effect));
    }
    if(await exists(target))await fs.rename(target,backup);try{await fs.rename(stage,target);}catch(e){if(await exists(backup))await fs.rename(backup,target);throw e;}await fs.rm(backup,{recursive:true,force:true});
  }finally{await fs.rm(stage,{recursive:true,force:true});}});
}
async function importEffect(ref,force){
  const recipe=await readEffect(ref);
  await withLock(effectsDir(),'.write-lock',async()=>{
    const dest=await contained(effectsDir(),recipe.id+'.json');let bytes;
    try{bytes=await fs.readFile(dest);}catch(e){if(e.code!=='ENOENT')throw e;}
    if(bytes){
      let old;
      try{old=validateEffect(JSON.parse(bytes.toString('utf8')),{legacyDrivers:true});}
      catch(e){
        if(!force)throw new Error(`Existing effect is invalid; use --force to preserve it in history and replace explicitly: ${e.message}`);
        await atomic(await contained(effectsDir(),`history/${recipe.id}-invalid-${crypto.randomUUID()}.json`),bytes);
        await atomic(dest,stringify(recipe));return;
      }
      if(assertEffectRevision(recipe,old,force))return;
      await atomic(await contained(effectsDir(),`history/${recipe.id}-r${old.revision}-${Date.now()}.json`),stringify(old));
    }
    await atomic(dest,stringify(recipe));
  });return recipe;
}

const LOCK='.dig-ui-effects.json',JOURNAL='.dig-ui-effects.pending.json';
function validateProjectRecord(lock){
  if(lock.schema!=='dig.effect.install.v1'||!lock.effects||typeof lock.effects!=='object'||Array.isArray(lock.effects))throw new Error('Invalid project effect installation record');
  function entryValid(id,e,snapshot=false){
    if(e?.id!==id||e.directory!=='components/dig-effects/'+id||e.recipe?.id!==id||!e.files||typeof e.files!=='object'||Array.isArray(e.files))throw new Error('Invalid project effect entry');
    validateEffect(e.recipe,{legacyDrivers:true});
    for(const [file,digest] of Object.entries(e.files))if(!(snapshot?snapshotPath(file):safePath(file))||!/^sha256:[a-f0-9]{64}$/.test(digest))throw new Error('Invalid installed file record');
    if(e.source_ref!==undefined&&(typeof e.source_ref!=='string'||!e.source_ref))throw new Error('Invalid effect source record');
    if(e.generated_files&&(typeof e.generated_files!=='object'||Array.isArray(e.generated_files)))throw new Error('Invalid generated file record');
    if(e.generated_files)for(const [file,digest] of Object.entries(e.generated_files))if(!safePath(file)||!/^sha256:[a-f0-9]{64}$/.test(digest))throw new Error('Invalid generated file record');
    if(e.backups!==undefined&&!Array.isArray(e.backups))throw new Error('Invalid effect backups');
    for(const b of e.backups||[]){if(snapshot||!b.path?.startsWith('.dig-ui-effects-backups/'+id+'-')||!safePath(b.path))throw new Error('Invalid effect backup record');entryValid(id,b.entry,true);}
  }
  for(const [id,e] of Object.entries(lock.effects))entryValid(id,e);return lock;
}
async function projectLock(project){return validateProjectRecord(await readJSON(path.join(project,LOCK),{schema:'dig.effect.install.v1',effects:{}}));}
async function recover(project){const journal=await readJSON(path.join(project,JOURNAL),null);if(!journal)return;validateProjectRecord(journal.before);validateProjectRecord(journal.after);if(journal.target!=='components/dig-effects/'+journal.id||!journal.stage.startsWith(journal.target+'.stage-')||!journal.backup.startsWith('.dig-ui-effects-backups/'+journal.id+'-'))throw new Error('Invalid recovery destinations');for(const key of ['target','stage','backup'])if(!safePath(journal[key]))throw new Error('Invalid effect recovery record');if(journal.had_target!==undefined&&typeof journal.had_target!=='boolean')throw new Error('Invalid recovery target state');const target=await contained(project,journal.target),stage=await contained(project,journal.stage),backup=await contained(project,journal.backup);const current=await readJSON(path.join(project,LOCK),null),committed=JSON.stringify(current)===JSON.stringify(journal.after);
  if(committed){if(!await exists(target)&&await exists(stage))await fs.rename(stage,target);if(!await exists(target))throw new Error('Committed effect files missing; preserve recovery record');}
  else{if(await exists(backup)){await fs.rm(target,{recursive:true,force:true});await fs.rename(backup,target);}else if(!journal.before.effects[journal.id]||journal.had_target===false)await fs.rm(target,{recursive:true,force:true});await atomic(path.join(project,LOCK),stringify(journal.before));}
  await fs.rm(stage,{recursive:true,force:true});await fs.rm(path.join(project,JOURNAL),{force:true});
}
async function fileChanges(project,entry){const changes=[],directories=new Set();for(const name of Object.keys(entry.files)){const parts=name.split('/');for(let i=1;i<parts.length;i++)directories.add(parts.slice(0,i).join('/'));}const dir=await contained(project,entry.directory);for(const [name,digest] of Object.entries(entry.files)){const file=await contained(project,entry.directory+'/'+name);if(!await exists(file))changes.push(name+' (missing)');else if(hash(await fs.readFile(file))!==digest)changes.push(name+' (modified)');}
  async function walk(p,prefix=''){if(!await exists(p))return;for(const e of await fs.readdir(p,{withFileTypes:true})){const name=prefix+e.name;if(e.isSymbolicLink())throw new Error('Symlink in installed effect');if(e.isDirectory()){if(!directories.has(name))changes.push(name+'/ (untracked directory)');await walk(path.join(p,e.name),name+'/');}else if(!Object.hasOwn(entry.files,name))changes.push(name+' (untracked)');}}await walk(dir);return changes;}
async function directoryHashes(directory){const files=Object.create(null);async function walk(dir,prefix=''){for(const e of await fs.readdir(dir,{withFileTypes:true})){if(e.isSymbolicLink())throw new Error('Symlink in effect snapshot');const name=prefix+e.name;if(!snapshotPath(name))throw new Error('Unsupported snapshot filename: '+name);if(e.isDirectory())await walk(path.join(dir,e.name),name+'/');else{if(!e.isFile())throw new Error('Non-regular file in effect snapshot');files[name]=hash(await fs.readFile(path.join(dir,e.name)));}}}await walk(directory);return files;}
// Byte hashes alone do not distinguish empty directories or executable modes.
async function sameDirectoryShape(left,right){
  if(((await fs.stat(left)).mode&0o777)!==((await fs.stat(right)).mode&0o777))return false;
  const a=(await fs.readdir(left,{withFileTypes:true})).sort((x,y)=>x.name.localeCompare(y.name)),b=(await fs.readdir(right,{withFileTypes:true})).sort((x,y)=>x.name.localeCompare(y.name));
  if(a.length!==b.length)return false;
  for(let i=0;i<a.length;i++){
    if(a[i].name!==b[i].name||a[i].isDirectory()!==b[i].isDirectory()||a[i].isFile()!==b[i].isFile())return false;
    const x=path.join(left,a[i].name),y=path.join(right,b[i].name);
    if(a[i].isDirectory()?!(await sameDirectoryShape(x,y)):((await fs.stat(x)).mode&0o777)!==((await fs.stat(y)).mode&0o777))return false;
  }
  return true;
}
async function applyProject(project,recipe,force,restore=false,sourceRef=recipe.id){
  project=path.resolve(project);await fs.mkdir(project,{recursive:true});
  {
    const before=await projectLock(project),old=before.effects[recipe.id];
    const sameRecipe=old&&!restore?assertEffectRevision(recipe,old.recipe,force):false;
    const changes=old?await fileChanges(project,old):[];
    if(changes.length&&!force)throw new Error('Local edits preserved: '+changes.join(', '));
    let files,restoreEntry,backupSource;
    if(restore){
      if(!old?.backups?.length)throw new Error('No previous version to restore');
      const currentDir=await contained(project,old.directory),currentFiles=await exists(currentDir)?await directoryHashes(currentDir):null;
      for(const snapshot of [...old.backups].reverse()){
        const source=await contained(project,snapshot.path),actual=await directoryHashes(source);
        if(serializeEffect(actual)!==serializeEffect(snapshot.entry.files))throw new Error('Backup checksum mismatch');
        const sameState=currentFiles&&serializeEffect(actual)===serializeEffect(currentFiles)&&serializeEffect(snapshot.entry.recipe)===serializeEffect(old.recipe)&&(snapshot.entry.source_ref||old.id)===(old.source_ref||old.id)&&serializeEffect(snapshot.entry.generated_files||snapshot.entry.files)===serializeEffect(old.files)&&await sameDirectoryShape(source,currentDir);
        if(sameState)continue;
        backupSource=source;restoreEntry=snapshot.entry;break;
      }
      if(!restoreEntry)throw new Error('No different previous version to restore');recipe=restoreEntry.recipe;
    }
    else files=await effectFiles(recipe,await resources(),await themes({includeLocal:false}));
    if(sameRecipe&&!changes.length&&(old.source_ref||old.id)===sourceRef&&serializeEffect(old.files)===serializeEffect(Object.fromEntries(Object.entries(files).map(([name,content])=>[name,hash(content)]))))return old;
    const directory=old?.directory||'components/dig-effects/'+recipe.id;
    const target=await contained(project,directory);
    const hadTarget=await exists(target);
    if(!old&&hadTarget)throw new Error('Untracked destination exists; choose another project or move it first');
    const suffix=crypto.randomUUID(),stageRel=directory+'.stage-'+suffix,backupRel='.dig-ui-effects-backups/'+recipe.id+'-'+suffix;
    const stage=await contained(project,stageRel),backup=await contained(project,backupRel);await fs.mkdir(stage,{recursive:true});
    try{if(restore){await fs.cp(backupSource,stage,{recursive:true});const copied=await directoryHashes(stage);if(Object.keys(copied).length!==Object.keys(restoreEntry.files).length||Object.entries(restoreEntry.files).some(([name,digest])=>copied[name]!==digest))throw new Error('Backup checksum mismatch');}
      else for(const [name,content] of Object.entries(files)){const p=await contained(stage,name,true);await fs.mkdir(path.dirname(p),{recursive:true});await fs.writeFile(p,content);}
      const after=structuredClone(before),entry={id:recipe.id,directory,recipe,source_ref:restore?restoreEntry.source_ref:sourceRef,files:restore?(restoreEntry.generated_files||restoreEntry.files):Object.fromEntries(Object.entries(files).map(([n,c])=>[n,hash(c)])),installed_at:new Date().toISOString(),backups:[...(old?.backups||[])]};
      if(old&&hadTarget)entry.backups.push({path:backupRel,entry:{...old,generated_files:old.files,files:await directoryHashes(target),backups:[]}});after.effects[recipe.id]=entry;validateProjectRecord(after);
      await atomic(path.join(project,JOURNAL),stringify({id:recipe.id,target:directory,stage:stageRel,backup:backupRel,had_target:hadTarget,before,after}));
      if(old&&hadTarget){await fs.mkdir(path.dirname(backup),{recursive:true});await fs.rename(target,backup);}await fs.rename(stage,target);await atomic(path.join(project,LOCK),stringify(after));await fs.rm(path.join(project,JOURNAL));return entry;
    }catch(e){if(await exists(path.join(project,JOURNAL)))await recover(project);throw e;}finally{await fs.rm(stage,{recursive:true,force:true});}
  }
}
export async function buildLab(output=path.join(packageRoot,'renders/effects/index.html'),effect,{officialOnly=false}={}){const effects=effect?[validateEffect(effect)]:await listEffects({includeLocal:!officialOnly,legacyDrivers:false}),themeList=await themes({includeLocal:!officialOnly}),res=await resources();await atomic(output,labHTML({effects,themes:themeList,selection:{effect:effects[0].id,theme:themeList.find(t=>t.id==='dig')?.id||themeList[0].id}},res));return output;}
function parse(args){const first=args.shift()||'help',out={action:['--help','-h'].includes(first)?'help':first,values:[]};for(let i=0;i<args.length;i++){const a=args[i];if(['--force','--all'].includes(a))out[a.slice(2)]=true;else if(['--output','--project'].includes(a)){if(!args[i+1]||args[i+1].startsWith('--'))throw new Error('Missing '+a);out[a.slice(2)]=path.resolve(args[++i]);}else if(a==='--help'||a==='-h')out.action='help';else if(a.startsWith('-'))throw new Error('Unknown option '+a);else out.values.push(a);}return out;}
export async function runEffectCLI(args,context={}){
  const o=parse([...args]),ref=o.values[0];
  if(o.action==='help'){console.log('dig-ui-skill effect path | list | show <id> | import <json|zip> [target|--all] | sync [target|--all]\n  preview [id] --output <html> | export <id> --output <zip>\n  install <id|file> --project <dir> | update [id] --project <dir> [--force]\n  check [id] --project <dir> | diff <id|file> --project <dir> | restore <id> --project <dir> [--force]');return;}
  if(!['import','sync'].includes(o.action)&&o.values.length>1)throw new Error('Unexpected positional arguments');
  if(['path','list','build'].includes(o.action)&&o.values.length)throw new Error('This action takes no effect id');
  if(o.output&&!['preview','export','build'].includes(o.action))throw new Error('--output is only supported by preview/export/build');
  if(o.project&&!['install','update','check','diff','restore'].includes(o.action))throw new Error('--project is only supported by project actions');
  if(o.force&&!['import','install','update','restore'].includes(o.action))throw new Error('--force is only supported by writes');
  if(o.all&&!['import','sync'].includes(o.action))throw new Error('--all is only supported by import/sync');
  if(o.action==='diff'&&!ref)throw new Error('diff requires an effect id');
  if(o.action==='path'){console.log(effectsDir());return;}
  if(o.action==='list'){for(const e of await listEffects()){console.log(`${e.id}\tr${e.revision}\t${e.name.en}`);try{validateEffect(e);}catch(error){console.warn(`${e.id}: requires repair before use: ${error.message}`);}}return;}
  if(o.action==='show'){if(!ref)throw new Error('Effect id required');const effect=await readEffect(ref,{legacyDrivers:true});console.log(stringify(effect));try{validateEffect(effect);}catch(error){console.warn(`${effect.id}: requires repair before use: ${error.message}`);}return;}
  if(o.action==='build'){console.log(await buildLab(o.output,undefined,{officialOnly:true}));return;}
  if(o.action==='preview'){const recipe=ref?await readEffect(ref):null;console.log(await buildLab(o.output||path.join(effectsDir(),'previews',recipe?.id||'index','index.html'),recipe));return;}
  if(o.action==='export'){if(!ref||!o.output||!o.output.endsWith('.zip'))throw new Error('export requires <id> --output <zip>');await atomic(o.output,await exportEffect(await readEffect(ref),await resources(),await themes({includeLocal:false})));console.log(o.output);return;}
  if(o.action==='import'||o.action==='sync'){
    const raw=o.action==='import'?o.values.slice(1):o.values,targets=o.all?Object.keys(context.targets||{}):raw.map(x=>x==='claude'?'claude-code':x);
    for(const id of targets)if(!context.targets?.[id])throw new Error('Unknown target '+id);
    if(o.action==='import'){if(!ref)throw new Error('Import file required');const e=await importEffect(ref,o.force);console.log(`Imported ${e.id} r${e.revision}`);}
    if(o.action==='sync'&&!targets.length)throw new Error('sync requires target or --all');
    for(const id of targets){const target=context.targets?.[id];if(!target)throw new Error('Unknown target '+id);const dir=target.skillDir();if(!await exists(dir)){console.log(`${id}: skipped (skill not installed)`);continue;}await syncEffectsInto(dir);console.log(`${id}: synced`);}return;
  }
  if(['install','update','check','diff','restore'].includes(o.action)){
    if(!o.project)throw new Error('--project required');
    // The project writer owns recovery, source resolution and every record transition.
    return withLock(o.project,'.dig-ui-effects.write-lock',async()=>{
      await recover(o.project);const lock=await projectLock(o.project);
      const fileRef=ref && (/[\/\\]/.test(ref)||/\.(json|zip)$/.test(ref));
      const explicitSource=fileRef?path.resolve(ref):ref;
      async function source(entry,explicit){const next=await readEffect(explicit||entry.source_ref||entry.id);if(next.id!==entry.id)throw new Error('Source effect identity changed: '+entry.id);return next;}
      if(['check','diff'].includes(o.action)){
        const entries=ref?[lock.effects[ref]||lock.effects[(await readEffect(ref)).id]]:Object.values(lock.effects);
        if(entries.some(e=>!e))throw new Error('Effect not installed');
        for(const entry of entries){const edits=await fileChanges(o.project,entry);console.log(`${entry.id}: ${edits.length?'local edits '+edits.join(', '):'pristine'}`);
          if(o.action==='diff'){const next=await source(entry,fileRef?explicitSource:undefined);console.log(stringify({installed_revision:entry.recipe.revision,source_revision:next.revision,before:entry.recipe,after:next}));}
          else{try{const next=await source(entry);console.log(`source r${next.revision}, installed r${entry.recipe.revision}`);}catch{console.log('Source unavailable; installed files retained');}}
        }return;
      }
      if(o.action==='restore'&&(!ref||!lock.effects[ref]))throw new Error('restore requires an installed effect id');
      if(o.action==='install'&&!ref)throw new Error('install requires id');
      const requests=o.action==='restore'?[{id:ref,recipe:lock.effects[ref].recipe}]:ref?[{id:ref,entry:o.action==='update'&&!fileRef?lock.effects[ref]:undefined,sourceRef:explicitSource}]:Object.values(lock.effects).map(entry=>({id:entry.id,entry}));
      const failures=[];
      for(const request of requests){try{
        const recipe=request.recipe||(request.entry?await source(request.entry):await readEffect(request.sourceRef));
        if(o.action==='update'&&!Object.hasOwn(lock.effects,recipe.id))throw new Error('Effect not installed; use install first: '+recipe.id);
        const sourceRef=request.entry?(request.entry.source_ref||request.entry.id):request.sourceRef;
        const entry=await applyProject(o.project,recipe,o.force,o.action==='restore',sourceRef);
        console.log(`${o.action}: ${entry.id} r${entry.recipe.revision} → ${entry.directory}`);
      }catch(error){failures.push(new Error(`${request.id}: ${error.message}`));}}
      if(failures.length)throw new Error(failures.map(e=>e.message).join('\n'));
    });
  }
  throw new Error('Unknown effect action '+o.action);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{await runEffectCLI(process.argv.slice(2));}catch(e){console.error(e.message);process.exitCode=1;}}
