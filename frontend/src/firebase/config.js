// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ Import auth
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUGzMpIzg7XXaoZVHLoIRasELuSZorK3Q",
  authDomain: "e-bus-management-51035.firebaseapp.com",
  projectId: "e-bus-management-51035",
  storageBucket: "e-bus-management-51035.firebasestorage.app",
  messagingSenderId: "1010527258161",
  appId: "1:1010527258161:web:15f87b4f7b0b63fd3ab710",
  measurementId: "G-RXL27YMXZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

// ✅ Initialize and export authentication
const auth = getAuth(app);
export { auth };
export const db = getFirestore(app);
export { messaging, getToken, onMessage };
