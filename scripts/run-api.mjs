import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(new URL('../apps/api/package.json', import.meta.url));
const mode = process.argv[2];
if (!['dev', 'start'].includes(mode)) throw new Error('Expected dev or start');
const apiPort = process.env.API_PORT ?? '3000';
const args = mode === 'start'
  ? [fileURLToPath(new URL('../apps/api/.next/standalone/apps/api/server.js', import.meta.url))]
  : [require.resolve('next/dist/bin/next'), 'dev', '--hostname', '127.0.0.1', '--port', apiPort, ...process.argv.slice(3)];
const child = spawn(process.execPath, args, {
  cwd: fileURLToPath(new URL('../apps/api/', import.meta.url)),
  stdio: 'inherit', env: { ...process.env, HOSTNAME: '127.0.0.1', PORT: apiPort },
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 1; });
