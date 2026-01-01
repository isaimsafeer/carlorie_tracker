// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEAVWQDbrUoHVBcn9i_qQOYyJP-Z2ICpk",
    authDomain: "nutri-ai-fa758.firebaseapp.com",
    projectId: "nutri-ai-fa758",
    storageBucket: "nutri-ai-fa758.firebasestorage.app",
    messagingSenderId: "317091239940",
    appId: "1:317091239940:web:5d15de9e524b6c267b3d51",
    measurementId: "G-7QG8P264Z3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;