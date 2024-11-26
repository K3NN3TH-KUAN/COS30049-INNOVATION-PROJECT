// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCCTAz4xI6VEoqxloEIGYZMkrjDcaVFISI",
  authDomain: "iots-f5f6a.firebaseapp.com",
  databaseURL: "https://iots-f5f6a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iots-f5f6a",
  storageBucket: "iots-f5f6a.firebasestorage.app",
  messagingSenderId: "349658067130",
  appId: "1:349658067130:web:aa8b6d202d884eaf615283",
  measurementId: "G-D08YTZXH3Y"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
