// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAas3gIngOzN_1LMW7tcn0ssMvzp7bQz_0",
    authDomain: "campushive-48d4f.firebaseapp.com",
    projectId: "campushive-48d4f",
    storageBucket: "campushive-48d4f.firebasestorage.app",
    messagingSenderId: "1063508969779",
    appId: "1:1063508969779:web:8ede0d890bdefe48f99646",
    measurementId: "G-E912PLNVNW"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();