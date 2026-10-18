import type { NextConfig } from 'next';
import path from 'node:path';
const config: NextConfig = {output:'standalone',outputFileTracingRoot:path.join(process.cwd(),'../..'),transpilePackages:['@kvarta/shared'],poweredByHeader:false};
export default config;
