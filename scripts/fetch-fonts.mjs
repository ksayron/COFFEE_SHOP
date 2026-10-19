import { mkdir, writeFile } from 'node:fs/promises';
import https from 'node:https';
const get = async (url) => {
  for(let attempt=0;attempt<4;attempt++) {
    try {
      return await new Promise((resolve,reject)=>{
        const request=https.get(url,{family:4},response=>{
          if(response.statusCode!==200){response.resume();reject(new Error(`HTTP ${response.statusCode}`));return;}
          const parts=[];response.on('data',part=>parts.push(part));response.on('end',()=>resolve(Buffer.concat(parts)));response.on('error',reject);
        });
        request.setTimeout(20000,()=>request.destroy(new Error('Font request timeout')));request.on('error',reject);
      });
    } catch(error){if(attempt===3)throw error;}
  }
};
const dir = new URL('../apps/web/public/fonts/', import.meta.url);
await mkdir(dir,{recursive:true});
for (const [name,path] of [
  ['golos','ofl/golostext/GolosText[wght].ttf'],
  ['literata','ofl/literata/Literata[opsz,wght].ttf'],
]) {
  const base='https://cdn.jsdelivr.net/gh/google/fonts@main/';
  const response=await get(base+path.replaceAll('[','%5B').replaceAll(']','%5D'));
  await writeFile(new URL(name+'.ttf',dir),response);
  const license=await get(base+path.slice(0,path.lastIndexOf('/'))+'/OFL.txt');
  await writeFile(new URL(name+'-OFL.txt',dir),license);
  console.log(`Fetched ${name} and SIL OFL license`);
}
