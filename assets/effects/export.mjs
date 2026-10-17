import { validateEffect, verifyAssets } from './protocol.mjs';
import { zipFiles } from './archive.mjs';
export function scriptJSON(value){return JSON.stringify(value).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');}
export function labHTML(data, resources){
  if(!Array.isArray(data.themes)||!data.themes.length)throw new Error('Effect preview requires theme data');
  for(const theme of data.themes)for(const mode of ['light','dark'])if(!['--dig-bg','--dig-text','--dig-accent'].every(key=>typeof theme.theme_tokens?.[mode]?.[key]==='string'&&theme.theme_tokens[mode][key]))throw new Error('Effect preview requires complete light/dark theme tokens');
  if(data.selection?.theme&&!data.themes.some(theme=>theme.id===data.selection.theme))throw new Error('Effect preview theme selection missing');
  if(data.selection?.effect&&!data.effects.some(effect=>effect.id===data.selection.effect))throw new Error('Effect preview asset selection missing');
  const payload=scriptJSON({...data,resources});
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dig Effect Lab</title><style>${resources['assets/effects/lab.css']}</style></head><body><main id="effect-lab"></main><script id="effect-data" type="application/json">${payload}</script><script>${resources['assets/effects/lab.bundle.js'].replace(/<\/script/gi,'<\\/script')}</script></body></html>`;
}
export async function effectFiles(input, resources, themes = [], selection = {}){
  const recipe=validateEffect(input);await verifyAssets(recipe);
  const files={...resources,'effect.json':JSON.stringify(recipe,null,2)+'\n'};
  for(const a of recipe.assets)files['resources/'+a.path]=Uint8Array.from(atob(a.data),c=>c.charCodeAt(0));
  files['mount.mjs']=`import { mountEffect } from './assets/effects/runtime.mjs';\nconst response = await fetch(new URL('./effect.json', import.meta.url));\nif (!response.ok) throw new Error('Unable to load effect.json');\nexport const recipe = await response.json();\nexport function mount(host, options) { return mountEffect(host, recipe, options); }\n`;
  files['Effect.jsx']=`'use client';\nimport React from 'react';\nimport recipe from './effect.json';\nimport { DigEffect } from './adapters/react/DigEffect.jsx';\nexport default function Effect(props) { return <DigEffect {...props} recipe={recipe} />; }\n`;
  files['preview.html']=labHTML({effects:[recipe],themes,selection},resources);
  files['README.md']=`# ${recipe.id}\n\nRevision ${recipe.revision}; Shaders ${recipe.provider.version}. Original recipe: ${recipe.source}.\n\nOpen preview.html for preview/edit/export (static fallback works without WebGPU). Serve over localhost/HTTPS for WebGPU. JS: import { mount } from mount.mjs over localhost/HTTPS (it loads effect.json) and call it with a positioned host and Dig theme tokens; destroy the returned controller on unmount. React: import Effect.jsx in a JSON-capable bundler, keep React 18/19 as the host dependency. Runtime/providers are bundled locally; no CDN or Shaders account required.\n\nProject files are configuration-derived. Keep effect.json as the source of truth. Use dig-ui-skill effect install/update/check/diff/restore for tracked project application.\n\nThird-party software license: assets/effects/SHADERS-LICENSE.txt. Resource sources/licenses are recorded in effect.json.\n`;
  return files;
}
export async function exportEffect(recipe,resources,themes,selection){return zipFiles(await effectFiles(recipe,resources,themes,selection));}
