# Furnostyles Go-Live Checklist

## Firebase Setup
- [ ] Create Firebase project in Firebase Console
- [ ] Enable Authentication (Email/Password)
- [ ] Enable Firestore Database
- [ ] Enable Cloud Storage
- [ ] Copy firebase-config.js from example and fill in real credentials
- [ ] Add firebase-config.js to .gitignore
- [ ] Test Firebase connectivity from production domain

## Firestore Security Rules
- [ ] Configure Firestore rules for production
- [ ] Enable authentication for write operations
- [ ] Set up collection-level security rules
- [ ] Configure index rules for common queries
- [ ] Test rules with different user roles

## Storage Security Rules
- [ ] Configure Firebase Storage rules
- [ ] Limit file types (images only)
- [ ] Set file size limits (e.g., 5MB max)
- [ ] Enable authentication for uploads
- [ ] Test upload functionality with rules

## Cloudflare Deployment
- [ ] Connect Cloudflare Pages to Git repository
- [ ] Configure build settings (static site, no build command)
- [ ] Set root directory to project root
- [ ] Connect custom domain
- [ ] Configure SSL/TLS (Full mode)
- [ ] Set up DNS records (A/CNAME)
- [ ] Test deployment on staging environment
- [ ] Deploy to production

## Domain Configuration
- [ ] Purchase domain (if not already owned)
- [ ] Configure DNS records in Cloudflare
- [ ] Verify domain ownership in Google Search Console
- [ ] Set up email forwarding (if needed)
- [ ] Configure subdomains (e.g., admin.furnostyles.com)

## Google Search Console
- [ ] Add property to Google Search Console
- [ ] Verify domain ownership
- [ ] Submit sitemap.xml
- [ ] Monitor indexing status
- [ ] Set up Core Web Vitals monitoring
- [ ] Configure mobile usability tracking
- [ ] Review coverage report

## Analytics Setup
- [ ] Set up Google Analytics 4 property
- [ ] Add GA tracking ID to environment variables
- [ ] Install GA tracking code on key pages
- [ ] Enable Firebase Analytics
- [ ] Configure event tracking for key actions
- [ ] Set up conversion tracking
- [ ] Test analytics data flow

## Payment Gateway Setup (Future)
- [ ] M-Pesa: Create Daraja account, get API keys
- [ ] Paystack: Create account, get public/secret keys
- [ ] Stripe: Create account, get publishable/secret keys
- [ ] Configure webhook endpoints
- [ ] Test payment flows in sandbox mode
- [ ] DO NOT activate live payments until fully tested

## Final Verification
- [ ] Test all public pages load correctly
- [ ] Test mobile responsiveness on multiple devices
- [ ] Test Firebase connectivity
- [ ] Test upload functionality
- [ ] Test marketplace rendering
- [ ] Test dashboard access (with auth)
- [ ] Verify SEO meta tags render
- [ ] Check robots.txt accessibility
- [ ] Check sitemap.xml accessibility
- [ ] Test WhatsApp chat link
- [ ] Verify all internal links work
- [ ] Check for console errors
- [ ] Verify no hardcoded secrets in code

## Post-Launch Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error tracking (e.g., Sentry)
- [ ] Set up performance monitoring
- [ ] Monitor Google Analytics traffic
- [ ] Monitor Search Console indexing
- [ ] Review Firebase usage and costs
- [ ] Set up backup procedures for Firestore data
