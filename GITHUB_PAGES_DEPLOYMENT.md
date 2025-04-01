# GitHub Pages Deployment Guide

This document provides comprehensive instructions for deploying the Solar System Visualizer to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. A repository created on GitHub (e.g., `SolarSystemVisualizer`)

## Deployment Options

There are three ways to deploy this project to GitHub Pages:

### Option 1: Automated GitHub Actions (Recommended)

1. Push your code to the `main` branch of your GitHub repository
2. GitHub Actions will automatically build and deploy to the `gh-pages` branch
3. Go to your repository on GitHub → Settings → Pages
4. Configure GitHub Pages to deploy from the `gh-pages` branch
5. Your site will be available at `https://yourusername.github.io/repository-name/`

The GitHub Actions workflow file is already set up at `.github/workflows/deploy.yml`.

### Option 2: Using the Deploy Script

1. Clone your repository to your local machine
2. Navigate to the project directory
3. Run the deployment script:

```bash
./deploy-to-github.sh https://github.com/yourusername/repository-name.git
```

4. The script will build the project and push it to the `gh-pages` branch
5. Configure GitHub Pages in your repository settings to deploy from the `gh-pages` branch

### Option 3: Manual Deployment

1. Build the project using the build script:

```bash
./build-for-deploy.sh
```

2. This creates a `dist` directory with all the files needed for deployment
3. Push the contents of the `dist` directory to the `gh-pages` branch:

```bash
cd dist
git init
git add .
git commit -m "Deploy to GitHub Pages"
git remote add origin https://github.com/yourusername/repository-name.git
git push -f origin main:gh-pages
```

4. Configure GitHub Pages in your repository settings to deploy from the `gh-pages` branch

## Important Files for GitHub Pages

The project includes these special files for GitHub Pages SPA routing:

- `404.html`: Handles redirects for client-side routing
- `index.html`: Contains the SPA router script
- `.nojekyll`: Prevents GitHub Pages from processing the site with Jekyll

## Setting Up a Custom Domain (Optional)

1. Create a `CNAME` file in the root directory with your domain name (e.g., `solarsystem.yourdomain.com`)
2. Configure DNS settings with your domain provider:
   - For a subdomain: Create a CNAME record pointing to `yourusername.github.io`
   - For an apex domain: Create A records pointing to GitHub Pages IP addresses
3. Update the GitHub Pages settings in your repository to use your custom domain

## Troubleshooting

### Issue: 404 Errors When Navigating
- Make sure the 404.html file is correctly set up
- Verify that the SPA router script in index.html is intact
- Check that GitHub Pages is configured to use the correct branch

### Issue: Assets Not Loading
- Ensure all asset paths are relative, not absolute
- Check for any hardcoded URLs that might need updating

### Issue: Custom Domain Not Working
- Verify DNS propagation (can take up to 48 hours)
- Make sure the CNAME file is properly created
- Check GitHub repository settings to confirm custom domain configuration

## Further Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [SPA GitHub Pages](https://github.com/rafgraph/spa-github-pages) - Credits for the SPA routing technique