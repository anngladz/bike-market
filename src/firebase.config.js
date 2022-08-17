import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCGqPMEk77blJkxLZAmoFhFSNgMIqvDa20',
  authDomain: 'bike-market-f5d85.firebaseapp.com',
  projectId: 'bike-market-f5d85',
  storageBucket: 'bike-market-f5d85.appspot.com',
  messagingSenderId: '722312515407',
  appId: '1:722312515407:web:0b5ba9e4698bcd94a63f3a',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
