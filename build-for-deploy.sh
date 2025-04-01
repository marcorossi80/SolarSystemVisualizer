#!/bin/bash

echo "===== Building for Deployment ====="

# Create the necessary directory structure
mkdir -p dist/public

# Create a temporary build directory
mkdir -p temp_build

# Copy the entire client directory to our temp build location
cp -r client/* temp_build/

# Copy required config files
cp vite.config.ts temp_build/
cp tsconfig.json temp_build/
cp tailwind.config.ts temp_build/
cp postcss.config.js temp_build/
cp theme.json temp_build/

# Create a temporary package.json for building
cat > temp_build/package.json << EOL
{
  "name": "solar-system-visualizer-build",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "vite build"
  },
  "dependencies": {
    "@replit/vite-plugin-runtime-error-modal": "^0.0.3",
    "@replit/vite-plugin-shadcn-theme-json": "^0.0.4",
    "@tailwindcss/typography": "^0.5.16",
    "@tanstack/react-query": "^5.71.1",
    "@vitejs/plugin-react": "^4.3.4",
    "lucide-react": "^0.486.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "wouter": "^3.6.0"
  }
}
EOL

# Navigate to build directory
cd temp_build

# Create a minimal vite config for the build
cat > vite.config.js << EOL
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist/public',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
EOL

# Install dependencies and build
echo "===== Installing dependencies ====="
npm install --silent

echo "===== Building React app ====="
npm run build

# Go back to the main directory
cd ..

# Copy the standalone HTML as a fallback
cp index.html dist/index.html

# Add a 404.html file for GitHub Pages SPA routing
cat > dist/404.html << EOL
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Solar System Visualizer</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License
      // https://github.com/rafgraph/spa-github-pages
      var segmentCount = 0;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?p=/' +
        l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
        (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
EOL

# Create README in the dist folder
cat > dist/README.md << EOL
# Solar System Visualizer - Deployed Build

This folder contains two versions of the Solar System Visualizer:

1. **React Application (Main)**: Located in the \`public\` folder
2. **Standalone HTML Version (Fallback)**: Located at the root of this folder

## Using the React Application

Open \`public/index.html\` to view the React application with all interactive features.

## Using the Standalone Version

If you encounter any issues with the React application, you can use the standalone version by opening \`index.html\` directly in your browser.
EOL

# Clean up the temp directory
rm -rf temp_build

echo "===== Build completed successfully! ====="
echo "Files prepared for deployment in ./dist folder"
echo "To deploy to GitHub Pages:"
echo "1. Push this repository to GitHub"
echo "2. Go to your repository settings"
echo "3. Under GitHub Pages section, select the 'dist' folder as your source"
echo "4. Your site will be available at https://yourusername.github.io/SolarSystemVisualizer/"
echo ""
echo "Note: Two versions are available:"
echo "- React application (main): dist/public/index.html"
echo "- Standalone version (fallback): dist/index.html"