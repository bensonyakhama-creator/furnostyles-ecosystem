# FURNOSTYLES Website Ecosystem

A comprehensive furniture and home improvement marketplace ecosystem for Kenya, featuring furniture sales, materials sourcing, repairs, real estate, and artisan services.

## Features

- **Furniture Marketplace**: Browse and purchase new, custom, luxury, and secondhand furniture
- **Materials Marketplace**: Construction materials, hardware, tools, and supplies
- **Services Marketplace**: Professional repair services and installations
- **Real Estate Marketplace**: Property listings, rentals, and property management
- **Artisan Network**: Connect with vetted artisans and contractors
- **Property Management**: Landlord services, Airbnb setup, and property maintenance
- **Blog & Resources**: Guides, tips, and inspiration for home improvement

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Hosting**: Cloudflare Pages
- **Version Control**: Git

## Firebase Configuration

Firebase is configured in `shared/firebase/firebase-config.js` with the following services:
- Firestore Database
- Authentication
- Storage
- Analytics

## Cloudflare Pages Deployment

The site is configured for Cloudflare Pages deployment with:
- Static site hosting
- CDN caching for assets
- Security headers
- Build configuration in `wrangler.toml`

## Getting Started

1. Clone the repository
2. Open `index.html` in a browser
3. Firebase will auto-connect using the configured credentials

## Project Structure

```
├── index.html              # Homepage
├── assets/                # CSS, JS, and images
├── shared/                # Shared JavaScript modules
├── furniture-*.html       # Furniture category pages
├── materials-*.html       # Materials category pages
├── repair-*.html          # Repair service pages
├── property-*.html        # Real estate pages
├── vendor/                # Vendor dashboard
├── admin/                 # Admin dashboard
└── docs/                  # Documentation
```

## Contact

- **Email**: furnostyles@gmail.com
- **WhatsApp**: +254713639205
- **Website**: https://furnostyles.com

## License

Copyright © 2026 FURNOSTYLES. All rights reserved.
