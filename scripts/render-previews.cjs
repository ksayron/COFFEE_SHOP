// Representative visual previews only, not a browser test of the live form.
const fs=require('node:fs');
const path=require('node:path');
const Module=require('node:module');
const ts=require('typescript');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const root=path.resolve(__dirname,'..');
const input=path.join(root,'apps/web/src/Preview.tsx');
const source=fs.readFileSync(input,'utf8').replace("import './styles.css';",'');
const output=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022},reportDiagnostics:true});
if(output.diagnostics?.length)throw Error('Preview transpilation failed');
const compiled=new Module(input,module);compiled.paths=module.paths;compiled._compile(output.outputText,input);
const directory=path.join(root,'.local/previews');fs.mkdirSync(directory,{recursive:true});
for(const variant of ['notice','photo']){
  const html='<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Кварта · '+variant+'</title><link rel="stylesheet" href="/styles.css"></head><body>'+renderToStaticMarkup(React.createElement(compiled.exports.Preview,{variant}))+'</body></html>';
  fs.writeFileSync(path.join(directory,variant+'.html'),html);
}
const http=require('node:http');
http.createServer((request,response)=>{
  const url=new URL(request.url,'http://localhost');
  const relative=decodeURIComponent(url.pathname);
  const file=relative==='/styles.css'?path.join(root,'apps/web/src/styles.css')
    : relative==='/notice.html'||relative==='/photo.html'?path.join(directory,path.basename(relative))
    : path.resolve(root,'apps/web/public','.'+relative);
  if(!file.startsWith(root+path.sep)){response.writeHead(403).end();return;}
  const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.woff2':'font/woff2','.jpg':'image/jpeg'};
  try{const data=fs.readFileSync(file);response.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});response.end(data);}
  catch{response.writeHead(404).end('Not found');}
}).listen(4174,'127.0.0.1',()=>console.log('Representative static previews: http://127.0.0.1:4174/notice.html and /photo.html'));
