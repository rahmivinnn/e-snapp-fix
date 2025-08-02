#!/usr/bin/env node
import { exec } from 'child_process';

// Start the production server
const server = exec('NODE_ENV=production node dist/index.js', {
  cwd: process.cwd(),
  env: { ...process.env, NODE_ENV: 'production' }
});

server.stdout.on('data', (data) => {
  console.log(data.toString());
});

server.stderr.on('data', (data) => {
  console.error(data.toString());
});

server.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
});

// Keep the process alive
process.on('SIGINT', () => {
  server.kill();
  process.exit(0);
});