// Offline syntax/import/JSON check. This does NOT replace tsc or production builds.
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
const root=path.resolve(__dirname,'..');let count=0;let failed=false;
function walk(dir){
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    if(['node_modules','.next','dist'].includes(entry.name))continue;
    const file=path.join(dir,entry.name);
    if(entry.isDirectory())walk(file);
    else if(/\.(ts|tsx)$/.test(file)){
      const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
      for(const error of source.parseDiagnostics){failed=true;console.error(file,ts.flattenDiagnosticMessageText(error.messageText,' '));}
      for(const statement of source.statements){
        if(ts.isImportDeclaration(statement)&&statement.moduleSpecifier.text.startsWith('.')){
          const target=path.resolve(path.dirname(file),statement.moduleSpecifier.text);
          if(!['','.ts','.tsx','.js','.css','/index.ts'].some(ext=>fs.existsSync(target+ext))){failed=true;console.error('Missing relative import:',file,statement.moduleSpecifier.text);}
        }
      }
      count++;
    }else if(entry.name.endsWith('.json')){try{JSON.parse(fs.readFileSync(file,'utf8'));}catch{failed=true;console.error('Invalid JSON:',file);}}
  }
}
for(const directory of ['apps','packages','tests'])walk(path.join(root,directory));
for(const file of ['package.json','tsconfig.base.json'])JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
console.log(`${count} TypeScript sources parsed; local imports and JSON checked. Full typecheck/build not run.`);
process.exitCode=failed?1:0;
