#!/bin/bash

# Exit on any error
set -e

echo "=== Building Solar System Visualizer for GitHub Pages ==="

# Clean up any existing build
rm -rf dist
mkdir -p dist

echo "1. Building client application..."
cd client
# Install dependencies if needed
npm install
# Build the client
npm run build
# Copy the build to the dist directory
cp -r dist/* ../dist/

echo "2. Copying GitHub Pages configuration files..."
cd ..
# Copy the index.html (with SPA router script)
cp index.html dist/index.html
# Copy the 404.html (for GitHub Pages routing)
cp 404.html dist/404.html 
# Copy the CNAME file if it exists
[ -f CNAME ] && cp CNAME dist/CNAME

echo "3. Creating README for GitHub Pages..."
cat > dist/README.md << 'EOL'
# Solar System Visualizer

An interactive web application showing an accurate model of our solar system with planets positioned as of April 1, 2025.

## Features
- Accurate planetary positions based on astronomical calculations
- True scale mode showing actual proportions of the solar system
- Enhanced visibility mode for better visualization
- Zoom, pan, and animation controls
- Information panel with solar system details

## Technologies
- React
- HTML5 Canvas
- Astronomical algorithms based on Jean Meeus' "Astronomical Algorithms"

## Deployment
This site is deployed using GitHub Pages.
EOL

echo "=== Build complete! ==="
echo "The application is ready for deployment in the 'dist' directory."
echo "To deploy to GitHub Pages:"
echo "1. Create a GitHub repository if you haven't already"
echo "2. Push the contents of the 'dist' folder to the 'gh-pages' branch"
echo "3. Configure GitHub Pages to deploy from the 'gh-pages' branch"