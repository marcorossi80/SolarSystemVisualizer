const { spawn } = require('child_process');
const { resolve } = require('path');

// Start the server
console.log('Starting development server...');

const serverProcess = spawn('tsx', [resolve(__dirname, './server/index.ts')], {
  stdio: 'inherit',
  shell: true,
});

// Handle server process exit
serverProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Server process exited with code ${code}`);
    process.exit(code);
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Stopping development server...');
  serverProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Stopping development server...');
  serverProcess.kill('SIGTERM');
});