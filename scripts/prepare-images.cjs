// Lossless-source resize/format optimisation only; no scene editing.
const sharp=require('sharp');
const fs=require('node:fs/promises');
const path=require('node:path');
async function main(){
  const source=process.argv[2];
  if(!source) throw new Error('Pass directory containing the two original generated PNGs.');
  const output=path.join(__dirname,'../apps/web/public/images');
  await fs.mkdir(output,{recursive:true});
  for(const [name,file,widths] of [
    ['workshop','exec-7804ae86-d89e-4bbc-9f62-28848ca56fce.png',[640,1280]],
    ['subscription','exec-eba7174c-981e-4653-934e-1bae9c212436.png',[600,1200]],
  ]){
    for(const width of widths) await sharp(path.join(source,file)).resize({width}).webp({quality:82}).toFile(path.join(output,`${name}-${width}.webp`));
  }
  await sharp(path.join(source,'exec-7804ae86-d89e-4bbc-9f62-28848ca56fce.png')).resize(1200,630,{fit:'cover'}).jpeg({quality:85}).toFile(path.join(output,'social.jpg'));
  console.log('Optimised original images and 1200x630 social crop.');
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
