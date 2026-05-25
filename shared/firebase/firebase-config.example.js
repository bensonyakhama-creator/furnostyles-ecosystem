/**
 * FURNOSTYLES — FIREBASE CONFIG EXAMPLE / TEMPLATE
 * ==================================================
 * File: shared/firebase/firebase-config.example.js
 *
 * PURPOSE:
 *   This is a safe-to-commit TEMPLATE. Never commit your real
 *   firebase-config.js with live credentials.
 *
 * HOW TO CONFIGURE:
 *   1. Go to https://console.firebase.google.com
 *   2. Open your project → Project Settings → General
 *   3. Scroll to "Your apps" → select or add a Web App
 *   4. Copy the firebaseConfig object shown there
 *   5. Open shared/firebase/firebase-config.js
 *   6. Replace each PASTE_... placeholder with your real value
 *   7. Add firebase-config.js to .gitignore before committing
 *
 * FIREBASE SERVICES NEEDED FOR THIS PROJECT:
 *   - Authentication  (Email/Password + future Google/Phone)
 *   - Firestore       (NoSQL database for all app data)
 *   - Storage         (File uploads: photos, documents)
 *
 * .GITIGNORE NOTE:
 *   Add this line to your .gitignore file:
 *     shared/firebase/firebase-config.js
 *
 * FIELD GUIDE:
 *   apiKey            → Found in Project Settings → General → Web App config
 *   authDomain        → Usually: your-project-id.firebaseapp.com
 *   projectId         → Your Firebase project ID (e.g. "furnostyles-prod")
 *   storageBucket     → Usually: your-project-id.appspot.com
 *                       (newer projects: your-project-id.firebasestorage.app)
 *   messagingSenderId → Found in Project Settings → Cloud Messaging → Sender ID
 *   appId             → Found in Project Settings → Your Apps → App ID
 *   measurementId     → Found in Project Settings → Your Apps (optional, for Analytics)
 */

window.FURNOSTYLES_FIREBASE_CONFIG = {
  apiKey:            "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain:        "your-project-id.firebaseapp.com",
  projectId:         "your-project-id",
  storageBucket:     "your-project-id.appspot.com",
  messagingSenderId: "000000000000",
  appId:             "1:000000000000:web:0000000000000000000000"
  /* measurementId: "G-XXXXXXXXXX" */  /* Optional: enable for Google Analytics */
};
