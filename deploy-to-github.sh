#!/bin/bash

# This script builds and deploys the Solar System Visualizer to GitHub Pages

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting GitHub Pages deployment process...${NC}"

# Create a production build
echo -e "${YELLOW}Creating production build...${NC}"
npx vite build

if [ ! -d "dist/public" ]; then
  echo -e "${RED}Build failed! Check the errors above.${NC}"
  exit 1
fi

echo -e "${GREEN}Build successful!${NC}"

# Create or switch to gh-pages branch
echo -e "${YELLOW}Setting up gh-pages branch...${NC}"
git checkout -B gh-pages

# Copy the redirect page, package.json and README
echo -e "${YELLOW}Setting up GitHub Pages files...${NC}"
cp github-pages.html index.html
cp gh-pages-package.json package.json
cp README.md README.md

# Create a .nojekyll file to disable Jekyll processing
touch .nojekyll

# Add all files
echo -e "${YELLOW}Committing changes...${NC}"
git add .
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
echo -e "${YELLOW}Pushing to GitHub...${NC}"
echo -e "${GREEN}Run the following command to push:${NC}"
echo -e "${YELLOW}git push -f origin gh-pages${NC}"
echo -e "${YELLOW}After pushing, go to your repository settings and ensure GitHub Pages is enabled for the gh-pages branch.${NC}"

echo -e "${GREEN}Done! Your site will be available at: https://marcorossi80.github.io/SolarSystemVisualizer/${NC}"