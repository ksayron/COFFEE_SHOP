// Uses ONLY an already-cached PostgreSQL 17 image; never downloads dependencies.
// Disposable isolated database, not the application database or an API integration test.
const {execFileSync,spawn}=require('node:child_process');
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const name='kvarta-sql-check';
const docker=(args,input)=>execFileSync('docker',args,{input,encoding:'utf8',timeout:30000,stdio:['pipe','pipe','pipe']}).trim();
const sql=query=>docker(['exec','-i',name,'psql','-v','ON_ERROR_STOP=1','-U','postgres','-t','-A'],query);
async function main(){
  let started=false;
  try{
    docker(['run','--pull=never','--rm','--network','none','--name',name,'-e','POSTGRES_PASSWORD=disposable-test-only','-d','postgres:17-alpine']);started=true;
    let ready=false;
    for(let i=0;i<30;i++){try{sql('SELECT 1');ready=true;break;}catch{}await new Promise(r=>setTimeout(r,500));}
    assert.ok(ready,'PostgreSQL startup');
    sql(fs.readFileSync(path.join(__dirname,'../apps/api/migrations/001_leads.sql'),'utf8'));
    // Same lock and rolling-window expression as the API, exercised concurrently.
    const transaction=`BEGIN;
      SELECT pg_advisory_xact_lock(hashtextextended('+375291111119',0));
      INSERT INTO leads(name,phone,interest,attribution)
      SELECT '__SQL_TEST__','+375291111119','question','{}'::jsonb
      WHERE NOT EXISTS(SELECT id FROM leads WHERE phone='+375291111119' AND created_at > clock_timestamp()-interval '10 minutes');
      COMMIT;`;
    await Promise.all(Array.from({length:16},()=>new Promise((resolve,reject)=>{
      const process=spawn('docker',['exec','-i',name,'psql','-v','ON_ERROR_STOP=1','-U','postgres','-q'],{stdio:['pipe','ignore','pipe']});
      let error='';process.stderr.on('data',data=>error+=data);process.on('error',reject);process.on('close',code=>code===0?resolve():reject(Error(error)));process.stdin.end(transaction);
    })));
    assert.equal(sql('SELECT count(*) FROM leads'),'1');
    sql("UPDATE leads SET created_at=clock_timestamp()-interval '10 minutes 1 second'");sql(transaction);
    assert.equal(sql('SELECT count(*) FROM leads'),'2');
    console.log('PASS: migration on PostgreSQL 17; 16 concurrent locked inserts => one row; expired window => second row. API/pg client not exercised.');
  }finally{if(started)docker(['stop',name]);}
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
