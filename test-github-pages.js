const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Paths
const distPath = path.resolve(__dirname, 'dist');
const clientPath = path.resolve(__dirname, 'client');

// Step 1: Create dist directory if it doesn't exist
console.log('Step 1: Creating dist directory...');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Step 2: Copy the 404.html file to dist
console.log('Step 2: Copying 404.html...');
fs.copyFileSync(
  path.resolve(__dirname, '404.html'),
  path.resolve(distPath, '404.html')
);

// Step 3: Copy the index.html file to dist
console.log('Step 3: Copying index.html...');
fs.copyFileSync(
  path.resolve(__dirname, 'index.html'),
  path.resolve(distPath, 'index.html')
);

// Step 4: Create a README in dist
console.log('Step 4: Creating README...');
fs.writeFileSync(
  path.resolve(distPath, 'README.md'),
  '# Solar System Visualizer - GitHub Pages Test\n\nThis is a test build for GitHub Pages deployment.'
);

console.log('Done! All files copied to dist/ directory.');
console.log('These files implement the GitHub Pages routing solution using:');
console.log('1. 404.html redirect script');
console.log('2. URL handling in index.html');
console.log('3. Hash-based routing fallback');
console.log('\nTo deploy, upload the contents of the dist/ directory to GitHub Pages.');