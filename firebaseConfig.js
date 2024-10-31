import {initializeApp} from 'firebase/app';
import {getFirestore, collection, addDoc, getDocs} from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export {app, db, auth, getFirestore, collection, addDoc, getDocs};
