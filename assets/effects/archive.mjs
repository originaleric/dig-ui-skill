// Stored ZIP exports shared by browser and CLI. Reject compression explicitly rather than
// accepting entries we cannot verify. No archive path is ever used as a filesystem destination.
import { safePath } from './protocol.mjs';
export const MAX_ARCHIVE_BYTES = 96 * 1024 * 1024;
const encoder=new TextEncoder(), decoder=new TextDecoder('utf-8',{fatal:true});
export function crc32(bytes){let c=0xffffffff;for(const b of bytes){c^=b;for(let j=0;j<8;j++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;}
export function zipFiles(files){
  if(Object.keys(files).length > 128)throw new Error('Too many ZIP entries');
  const chunks=[], central=[];let offset=0;
  for(const [name,content] of Object.entries(files)){
    if(!safePath(name))throw new Error('Unsafe archive name');
    const n=encoder.encode(name);if(n.length>65535)throw new Error('ZIP entry name too long');
    const data=typeof content==='string'?encoder.encode(content):content,crc=crc32(data);
    const h=new Uint8Array(30+n.length),v=new DataView(h.buffer);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x800,true);v.setUint32(14,crc,true);v.setUint32(18,data.length,true);v.setUint32(22,data.length,true);v.setUint16(26,n.length,true);h.set(n,30);chunks.push(h,data);
    const ch=new Uint8Array(46+n.length),cv=new DataView(ch.buffer);cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0x800,true);cv.setUint32(16,crc,true);cv.setUint32(20,data.length,true);cv.setUint32(24,data.length,true);cv.setUint16(28,n.length,true);cv.setUint32(42,offset,true);ch.set(n,46);central.push(ch);offset+=h.length+data.length;
  }
  const size=central.reduce((s,c)=>s+c.length,0),end=new Uint8Array(22),v=new DataView(end.buffer);v.setUint32(0,0x06054b50,true);v.setUint16(8,central.length,true);v.setUint16(10,central.length,true);v.setUint32(12,size,true);v.setUint32(16,offset,true);
  if(offset+size+end.length>MAX_ARCHIVE_BYTES)throw new Error('ZIP exceeds 96 MiB');
  const all=[...chunks,...central,end],out=new Uint8Array(all.reduce((s,c)=>s+c.length,0));let at=0;for(const c of all){out.set(c,at);at+=c.length;}return out;
}
export function unzipFiles(input){
  const bytes=input instanceof Uint8Array?input:new Uint8Array(input);if(bytes.length>MAX_ARCHIVE_BYTES)throw new Error('ZIP exceeds 96 MiB');
  const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),files=Object.create(null);let at=0;
  while(at+4<=bytes.length && v.getUint32(at,true)===0x04034b50){
    if(at+30>bytes.length)throw new Error('Truncated ZIP');
    const flags=v.getUint16(at+6,true),method=v.getUint16(at+8,true),size=v.getUint32(at+18,true),rawSize=v.getUint32(at+22,true),n=v.getUint16(at+26,true),extra=v.getUint16(at+28,true),start=at+30+n+extra,end=start+size;
    if(method!==0 || (flags&9))throw new Error('Use stored, unencrypted Dig Effect ZIP exports');
    if(size!==rawSize || end>bytes.length)throw new Error('Invalid ZIP size');
    const name=decoder.decode(bytes.subarray(at+30,at+30+n));if(!safePath(name)||Object.hasOwn(files,name)||Object.keys(files).length>=128)throw new Error('Unsafe or duplicate ZIP entry');
    const data=bytes.slice(start,end);if(crc32(data)!==v.getUint32(at+14,true))throw new Error('ZIP checksum mismatch');files[name]=data;at=end;
  }
  if(!Object.keys(files).length || at+4>bytes.length || v.getUint32(at,true)!==0x02014b50 || bytes.length<22 || v.getUint32(bytes.length-22,true)!==0x06054b50)throw new Error('Invalid ZIP structure');
  return files;
}
export function readEffectArchive(bytes){
 const files=unzipFiles(bytes);if(!files['effect.json'])throw new Error('Missing effect.json');
 const recipe=JSON.parse(decoder.decode(files['effect.json']));
 for(const asset of recipe.assets||[]){const packaged=files['resources/'+asset.path];let decoded;try{decoded=Uint8Array.from(atob(asset.data),c=>c.charCodeAt(0));}catch{throw new Error('Invalid resource encoding');}if(!packaged||packaged.length!==decoded.length||packaged.some((byte,i)=>byte!==decoded[i]))throw new Error('Packaged resource mismatch: '+asset.path);}
 return {recipe,files};
}
