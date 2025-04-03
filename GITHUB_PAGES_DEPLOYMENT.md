# Deploying the Solar System Visualizer to GitHub Pages

This guide provides step-by-step instructions to deploy the Solar System Visualizer as a static website on GitHub Pages, making it accessible from anywhere on the web.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Basic familiarity with command line operations

## Deployment Steps

### 1. Prepare your static files

Our deployment script (`deploy-to-github-pages.sh`) handles this automatically. It:
- Creates a `gh-pages` directory
- Copies the required HTML and asset files
- Creates a 404 page for better user experience
- Adds a `.nojekyll` file to prevent Jekyll processing

Run the script to prepare your files:

```bash
chmod +x deploy-to-github-pages.sh
./deploy-to-github-pages.sh
```

### 2. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "solar-system-visualizer")
4. Add a description if desired
5. Choose whether to make it public or private
6. Click "Create repository"

### 3. Push to GitHub Pages Branch

The simplest approach is to push the contents of your `gh-pages` directory to a branch called `gh-pages` in your new repository:

```bash
cd gh-pages
git init
git add .
git commit -m "Deploy Solar System Visualizer to GitHub Pages"
git remote add origin https://github.com/your-username/solar-system-visualizer.git
git push -f origin main:gh-pages
```

Replace `your-username` with your actual GitHub username and `solar-system-visualizer` with your repository name.

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select the `gh-pages` branch
5. Click "Save"

GitHub will provide you with a URL for your published site (usually `https://your-username.github.io/solar-system-visualizer/`).

### 5. Verify Deployment

Open the provided URL in your browser to verify that your Solar System Visualizer is running correctly.

## Using a Custom Domain (Optional)

If you have a custom domain that you'd like to use for this project:

1. Add your domain to the CNAME file:
   ```
   echo "your-domain.com" > gh-pages/CNAME
   ```

2. Commit and push this change to the gh-pages branch

3. Configure your domain's DNS settings:
   - For apex domains (e.g., example.com), create A records pointing to GitHub's IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - For subdomains (e.g., solar.example.com), create a CNAME record pointing to `your-username.github.io`

4. In your repository settings, add your custom domain to the GitHub Pages section

## Updating the Deployment

When you make changes to your visualization:

1. Update the necessary files in the `public` directory
2. Run the deployment script again:
   ```bash
   ./deploy-to-github-pages.sh
   ```
3. Push the changes to GitHub:
   ```bash
   cd gh-pages
   git add .
   git commit -m "Update Solar System Visualizer"
   git push -f origin main:gh-pages
   ```

## Troubleshooting

- **Page Not Found (404)**: Make sure your repository name matches the URL path and that GitHub Pages is enabled for the correct branch.
- **Styling Issues**: If your styles are not loading, check for relative path issues in your HTML files.
- **CORS Errors**: For security reasons, some browsers block cross-origin requests. Make sure all resources are loaded from the same domain or properly configured for CORS.
- **Custom Domain Not Working**: DNS changes can take up to 48 hours to propagate. Check your DNS configuration and wait at least 24 hours before troubleshooting further.

## GitHub Actions Automation (Advanced)

For automated deployments, you can set up a GitHub Actions workflow:

1. Create a file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Prepare deployment
        run: |
          chmod +x deploy-to-github-pages.sh
          ./deploy-to-github-pages.sh
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./gh-pages
```

This workflow will automatically deploy your site whenever you push changes to the `main` branch.