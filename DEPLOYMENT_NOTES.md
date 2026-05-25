# Furnostyles Production Deployment Notes

## Environment Setup

1. **Firebase Configuration**
   - Copy `shared/firebase/firebase-config.example.js` to `shared/firebase/firebase-config.js`
   - Fill in actual Firebase project credentials from Firebase Console
   - Add `shared/firebase/firebase-config.js` to `.gitignore`
   - Enable required Firebase services: Authentication, Firestore, Storage

2. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in actual values for production
   - Add `.env` to `.gitignore`

3. **Firestore Security Rules**
   - Configure Firestore rules for production
   - Enable authentication requirements for write operations
   - Set up index rules for queries

4. **Storage Security Rules**
   - Configure Firebase Storage rules
   - Limit file types and sizes
   - Enable authentication for uploads

## Cloudflare Pages Deployment

1. **Build Configuration**
   - Static site hosting (no build step required)
   - Root directory: `furnostyles-clean-rebuild/`
   - Build output directory: same as root

2. **Domain Configuration**
   - Connect custom domain to Cloudflare Pages
   - Configure SSL/TLS
   - Set up DNS records

3. **Environment Variables**
   - Add Firebase config to Cloudflare Pages environment variables (if needed)
   - Or keep config in firebase-config.js (client-side)

## Google Search Console

1. **Domain Verification**
   - Add domain to Google Search Console
   - Verify ownership via DNS or HTML file upload

2. **Sitemap Submission**
   - Submit `sitemap.xml` to Google Search Console
   - Monitor indexing status

3. **Performance Monitoring**
   - Enable Core Web Vitals monitoring
   - Set up mobile usability tracking

## Analytics Setup

1. **Google Analytics**
   - Add GA tracking ID to environment variables
   - Update analytics tracking code in relevant pages

2. **Firebase Analytics**
   - Enable Firebase Analytics in Firebase Console
   - Configure event tracking for key user actions

## Security Checklist

- [ ] Firebase config file added to .gitignore
- [ ] .env file added to .gitignore
- [ ] No hardcoded secrets in committed code
- [ ] Firestore security rules configured
- [ ] Storage security rules configured
- [ ] HTTPS enforced via Cloudflare
- [ ] CSP headers configured (if needed)

## Post-Deployment Verification

1. **Functional Testing**
   - Test Firebase connectivity
   - Test upload functionality
   - Test marketplace rendering
   - Test dashboard access

2. **Performance Testing**
   - Check page load times
   - Verify mobile responsiveness
   - Test on multiple browsers

3. **SEO Verification**
   - Check robots.txt accessibility
   - Verify sitemap.xml accessibility
   - Test meta tags on key pages
