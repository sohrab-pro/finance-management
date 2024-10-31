import {initializeApp} from 'firebase/app';
import {getFirestore, collection, addDoc, getDocs} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCPl63fEWhhD8y_z3Iy-p2zgHWNTVFR_n0',
  authDomain: 'finance-655b3.firebaseapp.com',
  projectId: 'finance-655b3',
  storageBucket: 'finance-655b3.appspot.com',
  messagingSenderId: '13470158960',
  appId: '1:13470158960:web:97daf5dc7a1c4ab1bae4b5',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {app, db, getFirestore, collection, addDoc, getDocs};
