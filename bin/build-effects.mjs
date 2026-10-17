import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { getAllShaders } from 'shaders/registry';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const packageInfo=JSON.parse(await fs.readFile(path.join(root,'node_modules/shaders/package.json'),'utf8'));
const components={};
await build({entryPoints:[path.join(root,'bin/effect-lock-entry.mjs')],bundle:true,format:'cjs',platform:'node',minify:true,legalComments:'eof',outfile:path.join(root,'bin/effect-lock.cjs')});
for(const shader of getAllShaders()){
  const props={};
  for(const [name,p] of Object.entries(shader.definition.props || {})){
    const types=[p.ui?.type].flat(),kind=types.includes('color')?'color':typeof p.default==='number'?'number':typeof p.default==='boolean'?'boolean':typeof p.default==='string'?'string':'object';
    props[name]={kind,...(types.includes('position')?{position:true}:{}),...(p.ui?.min!==undefined?{min:p.ui.min}:{}),...(p.ui?.max!==undefined?{max:p.ui.max}:{}),...(p.ui?.options?{options:p.ui.options.map(x=>typeof x==='object'?x.value:x)}:{}),compileTime:Boolean(p.compileTime)};
  }
  components[shader.name]={children:Boolean(shader.requiresChild || shader.name==='Group'),props};
}
await fs.mkdir(path.join(root,'assets/effects'),{recursive:true});
await build({stdin:{contents:"export { default } from 'colorjs.io';",resolveDir:root},bundle:true,format:'esm',platform:'neutral',target:'es2022',minify:true,outfile:path.join(root,'assets/effects/color.mjs')});
await fs.writeFile(path.join(root,'assets/effects/components.mjs'),`// Generated from shaders/registry; npm run build:effects\nexport default ${JSON.stringify({version:packageInfo.version,components})};\n`);
await build({stdin:{contents:"export { createShader } from 'shaders/js';",resolveDir:root},bundle:true,format:'esm',platform:'browser',target:'es2022',minify:true,legalComments:'eof',outfile:path.join(root,'assets/effects/shaders-js.mjs')});
await fs.copyFile(path.join(root,'node_modules/shaders/LICENSE'),path.join(root,'assets/effects/SHADERS-LICENSE.txt'));
let notices='Bundled Shaders software: MIT. Original Dig recipes and adapters: Apache-2.0. No shaders.com presets are redistributed.\n\n';
for(const name of ['colorjs.io','typegpu','typed-binary','tinyest','tsover-runtime','proper-lockfile','graceful-fs','retry','signal-exit','@babel/parser','@babel/types','@babel/helper-string-parser','@babel/helper-validator-identifier','bootstrap-icons']){
  const dir=path.join(root,'node_modules',name);
  for(const file of ['LICENSE','LICENSE.md','LICENSE.txt','LICENSE-MIT']){
    try{notices+=`\n## ${name}\n${await fs.readFile(path.join(dir,file),'utf8')}\n`;break;}catch(e){if(e.code!=='ENOENT')throw e;}
  }
}
await fs.writeFile(path.join(root,'assets/effects/THIRD-PARTY-NOTICES.txt'),notices.trimEnd()+'\n');
await build({entryPoints:[path.join(root,'assets/effects/lab.mjs')],bundle:true,format:'iife',platform:'browser',target:'es2022',minify:true,external:['./shaders-js.mjs'],outfile:path.join(root,'assets/effects/lab.bundle.js')});
const hashes={};
for(const name of ['package.json','bin/build-effects.mjs','bin/effect-lock-entry.mjs','bin/effect-lock.cjs','assets/effects/protocol.mjs','assets/effects/runtime.mjs','assets/effects/archive.mjs','assets/effects/export.mjs','assets/effects/lab.mjs','assets/effects/lab.css','assets/effects/components.mjs','assets/effects/color.mjs','assets/effects/shaders-js.mjs','assets/effects/lab.bundle.js','assets/effects/SHADERS-LICENSE.txt','assets/effects/THIRD-PARTY-NOTICES.txt','adapters/react/DigEffect.jsx'])hashes[name]='sha256:'+createHash('sha256').update(await fs.readFile(path.join(root,name))).digest('hex');
await fs.writeFile(path.join(root,'assets/effects/build-hashes.json'),JSON.stringify(hashes,null,2)+'\n');
console.log(`Built Effects registry/provider/Lab for shaders ${packageInfo.version} (${Object.keys(components).length} components)`);
