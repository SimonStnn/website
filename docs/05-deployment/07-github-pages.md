# GitHub Pages Setup Guide

This guide will walk you through configuring your GitHub repository to deploy the documentation to GitHub Pages.

## Prerequisites

- The workflow file `.github/workflows/docs.build.yaml` has been updated with the GitHub Pages deployment job
- You have admin access to the repository on GitHub

## Configuration Steps

### Step 1: Enable GitHub Pages

1. Navigate to your repository on GitHub: [https://github.com/SimonStnn/website](https://github.com/SimonStnn/website)

2. Click on **Settings** in the repository menu (top right)

3. In the left sidebar, scroll down and click on **Pages** under the "Code and automation" section

4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** from the dropdown
   - This is critical - do NOT select "Deploy from a branch"
   - GitHub Actions allows your workflow to deploy directly

5. Click **Save** if prompted

### Step 2: Push the Changes

The workflow and configuration files have been updated. Now you need to push these changes to trigger the deployment:

```bash
# Stage the changes
git add .github/workflows/docs.build.yaml config/mkdocs/mkdocs.yml

# Commit the changes
git commit -m "Add GitHub Pages deployment workflow"

# Push to main branch
git push origin main
```

### Step 3: Monitor the Deployment

1. Go to the **Actions** tab in your GitHub repository

2. You should see a new workflow run called "Build and Publish Documentation Docker Image"

3. Click on the running workflow to see the progress

4. The workflow has two jobs:
   - `build`: Builds and pushes the Docker image (takes ~2-5 minutes)
   - `deploy-pages`: Builds and deploys to GitHub Pages (takes ~1-2 minutes)

5. Wait for both jobs to complete successfully (green checkmarks)

### Step 4: Access Your Documentation

Once the workflow completes successfully:

1. Your documentation will be available at:
   **https://simonstnn.github.io/website/**

2. You can also find the URL in:
   - The GitHub Pages settings page (Settings → Pages)
   - The workflow run summary (Actions tab)
   - The environment deployments (right sidebar on the main repository page)

## Automatic Updates

From now on, any push to the `main` branch that modifies files in:

- `docs/**` (any documentation files)
- `README.md`

...will automatically trigger a rebuild and redeploy of your documentation site.

## Optional: Custom Domain

If you want to use a custom domain for your documentation:

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `docs.simonstijnen.com`)
3. Add a CNAME record in your DNS settings pointing to `simonstnn.github.io`
4. GitHub will automatically provision an SSL certificate

## Troubleshooting

### Workflow fails on the "Deploy to GitHub Pages" step

**Error**: `Error: No deployment token found`

**Solution**:

- Ensure you selected "GitHub Actions" as the source in Pages settings
- The repository must be public, or you need GitHub Pro/Team for private repo Pages

### 404 Error when visiting the site

**Possible causes**:

1. Workflow hasn't completed yet - check the Actions tab
2. Wrong URL - ensure you're using `https://simonstnn.github.io/website/`
3. Pages not enabled - verify in Settings → Pages

### Assets or CSS not loading

**Possible causes**:

- The `site_url` in `mkdocs.yml` must match your GitHub Pages URL exactly
- Currently set to: `https://simonstnn.github.io/website/`

## What Was Changed

### Files Modified

1. **`.github/workflows/docs.build.yaml`**
   - Added `deploy-pages` job that runs after the Docker build
   - Installs Python 3.11 and MkDocs dependencies
   - Builds the static site using `mkdocs build`
   - Uploads and deploys to GitHub Pages

2. **`config/mkdocs/mkdocs.yml`**
   - Added `site_url: https://simonstnn.github.io/website/`
   - Ensures proper URL generation for GitHub Pages hosting

### What Stays the Same

- Docker image building still works (deployed to GitHub Container Registry)
- Local development unchanged (`docker-compose up docs`)
- All MkDocs features and themes work the same way

## Next Steps

After your documentation is live:

1. ✅ Test all navigation and search functionality
2. ✅ Verify dark/light theme switching works
3. ✅ Check that all internal links work correctly
4. ✅ Test on mobile devices
5. 📝 Share the documentation URL with your team
6. 🔗 Add a link to the docs in your README.md

---

**Need help?** Check the [GitHub Pages documentation](https://docs.github.com/en/pages) or [MkDocs Material documentation](https://squidfunk.github.io/mkdocs-material/).
