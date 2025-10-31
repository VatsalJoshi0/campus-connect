# Deployment Guide - Campus Connect

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [GitHub Pages Deployment](#github-pages-deployment)
4. [Alternative Hosting Options](#alternative-hosting-options)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Rollback Procedure](#rollback-procedure)
7. [Monitoring & Analytics](#monitoring--analytics)

---

## Pre-Deployment Checklist

Before deploying to production, ensure all items are completed:

### Code Quality
```
✓ All tests passing: npm test
✓ No console errors in production build
✓ No security vulnerabilities: npm audit
✓ Dependencies up to date
✓ Code linted: npm run lint
✓ Build succeeds: npm run build
```

### Performance
```
✓ Lighthouse score > 90 (all categories)
✓ Images optimized (lazy loading, responsive)
✓ Bundle size < 250KB (main chunk gzipped)
✓ Core Web Vitals within thresholds
✓ No layout shifts (CLS < 0.1)
```

### Security
```
✓ Security headers configured (_headers file)
✓ Content Security Policy set
✓ All API calls use HTTPS
✓ XSS prevention implemented
✓ Rate limiting configured
✓ Input validation on all forms
✓ No secrets in code (use environment variables)
```

### Accessibility
```
✓ WCAG 2.2 Level AA compliant
✓ Keyboard navigation works
✓ Screen reader compatible
✓ Color contrast meets standards
✓ Focus indicators visible
```

### Functionality
```
✓ Registration flow tested
✓ Login/logout tested
✓ Event registration tested
✓ Messaging system tested
✓ All pages load without errors
✓ Forms validate correctly
✓ Error states handled gracefully
```

---

## Environment Setup

### 1. Environment Variables

Create `.env.production` file (DO NOT commit to Git):

```bash
# API Configuration
REACT_APP_API_URL=https://api.your-domain.com
REACT_APP_ENVIRONMENT=production

# Analytics (Optional)
REACT_APP_GA_TRACKING_ID=UA-XXXXXXXXX-X

# Feature Flags (Optional)
REACT_APP_ENABLE_CHAT=true
REACT_APP_ENABLE_LIVE_SESSIONS=true
```

### 2. Update Configuration

**package.json** - Verify homepage URL:
```json
{
  "homepage": "https://vatsaljoshi0.github.io/campus-connect"
}
```

**public/CNAME** (if using custom domain):
```
campusconnect.your-domain.com
```

---

## GitHub Pages Deployment

### Method 1: Automated Deployment (Recommended)

#### Step 1: Install Dependencies
```bash
cd WebApp.io
npm install
```

#### Step 2: Build Production Bundle
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

#### Step 3: Deploy to GitHub Pages
```bash
npm run deploy
```

This command:
- Builds the app
- Pushes to `gh-pages` branch
- Updates your live site

**Expected Output:**
```
Published
https://vatsaljoshi0.github.io/campus-connect/
```

#### Step 4: Verify Deployment
- Navigate to: https://vatsaljoshi0.github.io/campus-connect
- Test critical user flows
- Check browser console for errors

### Method 2: Manual Deployment

If automated deployment fails:

```bash
# Build the app
npm run build

# Navigate to build folder
cd build

# Initialize git (if not already)
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push -f https://github.com/VatsalJoshi0/campus-connect.git master:gh-pages

cd ..
```

### Troubleshooting GitHub Pages

**Issue: 404 on page refresh**
- Already fixed with `404.html` and HashRouter
- Verify `404.html` exists in `public/` folder

**Issue: Blank page**
- Check browser console for errors
- Verify `homepage` in package.json is correct
- Ensure build completed successfully

**Issue: CSS not loading**
- Clear browser cache (Ctrl+Shift+R)
- Verify all file paths are relative
- Check Content-Type headers

---

## Alternative Hosting Options

### Option 1: Netlify (Recommended for Custom Domain)

#### Setup
1. Sign up at https://netlify.com
2. Connect GitHub repository
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
4. Deploy

#### Custom Domain
1. Add custom domain in Netlify settings
2. Update DNS records (provided by Netlify)
3. Enable HTTPS (automatic with Let's Encrypt)

#### Netlify Configuration

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Option 3: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Deploy
firebase deploy
```

**firebase.json:**
```json
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          }
        ]
      }
    ]
  }
}
```

---

## Post-Deployment Verification

### Automated Checks

Run these immediately after deployment:

```bash
# 1. Lighthouse audit
lighthouse https://vatsaljoshi0.github.io/campus-connect --view

# 2. Security headers check
curl -I https://vatsaljoshi0.github.io/campus-connect

# 3. Check for JavaScript errors
# Open browser console and navigate through app
```

### Manual Testing Checklist

```
✓ Home page loads
✓ Login works
✓ Registration works
✓ Events display correctly
✓ Messages send/receive
✓ Images load properly
✓ Dark/light theme toggle works
✓ Mobile responsive
✓ No console errors
✓ Performance acceptable (< 3s load time)
```

### Monitoring Setup

#### 1. Google Analytics (Optional)

Add to `public/index.html` (before `</head>`):
```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### 2. Error Tracking (Sentry - Optional)

```bash
npm install @sentry/react
```

```javascript
// src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});
```

---

## Rollback Procedure

If deployment has critical issues:

### Quick Rollback (GitHub Pages)

```bash
# Find previous working commit
git log --oneline

# Checkout previous version
git checkout <commit-hash>

# Rebuild and deploy
npm run build
npm run deploy
```

### Rollback to Specific Version

```bash
# List all deployments
git log gh-pages --oneline

# Revert to specific deployment
git checkout gh-pages
git revert <bad-commit-hash>
git push origin gh-pages
```

---

## Continuous Deployment Workflow

### GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --passWithNoTests
    
    - name: Build
      run: npm run build
      env:
        CI: false
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

---

## Performance Optimization Tips

### 1. Bundle Size Reduction

```bash
# Analyze bundle
npm run build
npx source-map-explorer 'build/static/js/*.js'

# Install analyzer
npm install --save-dev webpack-bundle-analyzer
```

### 2. Code Splitting

```javascript
// Lazy load routes
import { lazy, Suspense } from 'react';

const EventsPage = lazy(() => import('./pages/EventsPage'));
const NetworkPage = lazy(() => import('./pages/NetworkPage'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <EventsPage />
</Suspense>
```

### 3. Image Optimization

```bash
# Convert images to WebP
npm install -g @squoosh/cli

squoosh-cli --webp auto images/*.jpg
```

---

## Maintenance Schedule

### Daily
- Monitor error logs
- Check uptime
- Review user feedback

### Weekly
- Review analytics
- Update dependencies (patch versions)
- Performance audit

### Monthly
- Security audit: `npm audit`
- Update minor dependencies
- Lighthouse audit
- Backup data

### Quarterly
- Major dependency updates
- Full security review
- Performance optimization
- User testing

---

## Support & Troubleshooting

### Common Issues

**Issue: Site not updating after deployment**
```
Solution: Clear CDN cache
- GitHub Pages: Wait 5-10 minutes
- Hard refresh: Ctrl+Shift+R
- Clear browser cache
```

**Issue: CORS errors**
```
Solution: Configure backend CORS headers
Access-Control-Allow-Origin: https://your-domain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

**Issue: Images not loading**
```
Solution:
- Check image URLs are relative
- Verify images in public/ folder
- Check Content-Type headers
```

### Getting Help

1. **Documentation**: Check README.md and this guide
2. **Issues**: Check GitHub Issues for similar problems
3. **Community**: Stack Overflow (tag: react, github-pages)
4. **Contact**: File an issue on GitHub

---

## Security Best Practices

### Production Checklist
```
✓ No API keys in code (use environment variables)
✓ HTTPS enabled
✓ Security headers configured
✓ Dependencies updated (no vulnerabilities)
✓ Input validation implemented
✓ XSS prevention active
✓ Rate limiting enabled
✓ Error messages don't leak sensitive info
✓ Logging configured (no sensitive data logged)
```

### Regular Security Audits

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Update all dependencies
npm update

# Check outdated packages
npm outdated
```

---

## Conclusion

Follow this guide for successful deployments. Always test in a staging environment before production deployment.

**Quick Deploy Command:**
```bash
npm install && npm test && npm run build && npm run deploy
```

**Emergency Contact:**
- GitHub: [@VatsalJoshi0](https://github.com/VatsalJoshi0)
- Issues: [Create Issue](https://github.com/VatsalJoshi0/campus-connect/issues)

---

**Last Updated:** 2025-10-31  
**Version:** 1.0.0  
**Maintained by:** Campus Connect Team
