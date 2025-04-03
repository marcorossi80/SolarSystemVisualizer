#!/bin/bash

# Solar System Visualizer GitHub Pages Deployment Script

# Create deployment directory
echo "Creating deployment directory..."
mkdir -p gh-pages

# Copy static files
echo "Copying static files..."
cp public/index.html gh-pages/
cp public/solar-system.html gh-pages/

# Create GitHub Pages specific files
echo "Creating GitHub Pages files..."

# Create 404 page
cat > gh-pages/404.html << EOL
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found - Solar System Visualizer</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #0d1117;
      color: #f0f6fc;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(to right, #58a6ff, #bc8cff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    p {
      margin-bottom: 2rem;
      font-size: 1.25rem;
      max-width: 600px;
    }
    .button {
      background: #238636;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      text-decoration: none;
      font-weight: 600;
      transition: background-color 0.2s;
    }
    .button:hover {
      background: #2ea043;
    }
  </style>
</head>
<body>
  <h1>404 - Page Not Found</h1>
  <p>The solar system is vast, and it seems you've drifted into uncharted space.</p>
  <a href="/" class="button">Return to Home</a>
</body>
</html>
EOL

# Create CNAME file if you have a custom domain
# echo "yourdomain.com" > gh-pages/CNAME

# Create .nojekyll file (prevents GitHub from running Jekyll processing)
touch gh-pages/.nojekyll

echo "Deployment files prepared in the gh-pages directory."
echo "To deploy to GitHub Pages:"
echo "1. Create a GitHub repository for your project"
echo "2. Push the contents of the gh-pages directory to the gh-pages branch of your repository"
echo "3. Enable GitHub Pages in your repository settings, selecting the gh-pages branch"
echo ""
echo "Manual deployment command example:"
echo "cd gh-pages"
echo "git init"
echo "git add ."
echo "git commit -m \"Deploy Solar System Visualizer to GitHub Pages\""
echo "git remote add origin https://github.com/yourusername/solar-system-visualizer.git"
echo "git push -f origin main:gh-pages"