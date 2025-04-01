#!/bin/bash

# Exit on any error
set -e

# Make sure the build script is executable
chmod +x build-for-deploy.sh

# Check if the repository URL is provided
if [ -z "$1" ]; then
  echo "ERROR: GitHub repository URL is required"
  echo "Usage: ./deploy-to-github.sh <github-repository-url>"
  echo "Example: ./deploy-to-github.sh https://github.com/username/repo.git"
  exit 1
fi

REPO_URL=$1
TMP_DIR="tmp_gh_pages"

echo "=== Deploying Solar System Visualizer to GitHub Pages ==="

# Step 1: Build the project
echo "Step 1: Building project..."
./build-for-deploy.sh

# Step 2: Prepare temporary directory
echo "Step 2: Preparing for deployment..."
rm -rf $TMP_DIR
mkdir -p $TMP_DIR
cp -r dist/* $TMP_DIR/

# Step 3: Initialize git in the temporary directory
echo "Step 3: Initializing git repository..."
cd $TMP_DIR
git init
git branch -M main
git add .
git config --local user.email "deploy@example.com"
git config --local user.name "GitHub Pages Deployment Script"
git commit -m "Deploy to GitHub Pages"

# Step 4: Push to GitHub Pages branch
echo "Step 4: Pushing to GitHub Pages..."
git remote add origin $REPO_URL
git push -f origin main:gh-pages

# Step 5: Cleanup
echo "Step 5: Cleaning up..."
cd ..
rm -rf $TMP_DIR

echo "=== Deployment complete! ==="
echo "The Solar System Visualizer has been deployed to GitHub Pages."
echo "It should be available at: https://$(echo $REPO_URL | cut -d'/' -f4).github.io/$(echo $REPO_URL | cut -d'/' -f5 | cut -d'.' -f1)/"
echo ""
echo "IMPORTANT: Make sure to configure GitHub Pages in your repository settings to deploy from the 'gh-pages' branch."