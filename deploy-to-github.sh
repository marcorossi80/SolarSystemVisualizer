#!/bin/bash

# Create deployment directory
mkdir -p dist

# Copy the standalone HTML file to dist
cp index.html dist/index.html

# If you have additional files (like images or js), copy them too
# cp -r images dist/images
# cp -r js dist/js

echo "Files prepared for deployment in ./dist folder"
echo "To deploy to GitHub Pages:"
echo "1. Push this repository to GitHub"
echo "2. Go to your repository settings"
echo "3. Under GitHub Pages section, select the 'dist' folder as your source"
echo "4. Your site will be available at https://yourusername.github.io/SolarSystemVisualizer/"