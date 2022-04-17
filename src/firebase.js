import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyB3rOSUdb8ikymCRhmGW6MlyLMCVdjBtVE',
  authDomain: 'todo-app-000.firebaseapp.com',
  databaseURL: 'https://todo-app-000-default-rtdb.firebaseio.com',
  projectId: 'todo-app-000',
  storageBucket: 'todo-app-000.appspot.com',
  messagingSenderId: '652842938697',
  appId: '1:652842938697:web:e30e1df4f52efca440aa98',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
