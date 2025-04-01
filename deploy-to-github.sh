#!/bin/bash

# Execute the build script
chmod +x ./build-for-deploy.sh
./build-for-deploy.sh

echo "===== Files prepared for deployment ====="
echo "To deploy to GitHub Pages:"
echo "1. Push this repository to GitHub"
echo "2. Go to your repository settings"
echo "3. Under GitHub Pages section, select the 'dist' folder as your source"
echo "4. Your site will be available at https://yourusername.github.io/SolarSystemVisualizer/"