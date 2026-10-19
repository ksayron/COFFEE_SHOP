import { defineConfig, devices } from '@playwright/test';
export default defineConfig({testDir:'./tests/browser',fullyParallel:false,workers:1,timeout:30000,
  use:{baseURL:process.env.TEST_BASE_URL??'http://localhost:8080',trace:'retain-on-failure',...devices['Desktop Chrome']},
  reporter:[['list'],['html',{open:'never'}]],
});
