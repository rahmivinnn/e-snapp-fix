#!/usr/bin/env node

// Production start script for deployment
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Set production environment
process.env.NODE_ENV = 'production';

// Check if build exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.log('Build not found, building application...');
  const buildProcess = spawn('npm', ['run', 'build'], { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  
  buildProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Build failed with exit code', code);
      process.exit(1);
    }
    
    console.log('Build completed, starting server...');
    startServer();
  });
} else {
  console.log('Build found, starting server...');
  startServer();
}

function startServer() {
  const serverProcess = spawn('node', ['dist/index.js'], { 
    stdio: 'inherit',
    cwd: __dirname,
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: process.env.PORT || '80'
    }
  });
  
  serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
    process.exit(code);
  });
  
  serverProcess.on('error', (err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}