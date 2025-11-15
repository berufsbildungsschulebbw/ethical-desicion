// ==========================================
// FIREBASE KONFIGURATION
// ==========================================
// Ersetze die Werte unten mit deiner eigenen Firebase-Config
// Firebase Console → Projekteinstellungen → Web-App

export const firebaseConfig = {
  apiKey: "AIzaSyA_YSdR-1BnmxqWYygSCh9MyQIqXTKPeBQ",
  authDomain: "ethik-interaktiv-dynamisch.firebaseapp.com",
  projectId: "ethik-interaktiv-dynamisch",
  storageBucket: "ethik-interaktiv-dynamisch.firebasestorage.app",
  messagingSenderId: "503348916130",
  appId: "1:503348916130:web:06e0fcebfd8b6b40e14cfb"
};

// Firebase Initialisierung (wird in anderen Dateien importiert)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

let app, db;

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("✅ Firebase initialized successfully");
} catch (error) {
    console.error("❌ Firebase initialization error:", error);
    console.log("Running in demo mode without Firebase");
}

export { app, db };
