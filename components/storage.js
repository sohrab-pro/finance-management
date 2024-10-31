import {db, collection, addDoc, getDocs} from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addCustomer = async (name, phone) => {
  try {
    const docRef = await addDoc(collection(db, 'customers'), {
      name: name,
      phone: phone,
    });
    console.log(docRef);
  } catch (error) {
    console.log(error);
  }
};

export const getCustomers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'customers'));
    const customers = [];
    querySnapshot.forEach(doc => {
      customers.push({...doc.data(), id: doc.id});
    });
    console.log(customers);
    return customers;
  } catch (error) {
    console.log(error);
  }
};

export const saveUser = async data => {
  await AsyncStorage.setItem('user', JSON.stringify(data));
};

// Retrieve token
export const getUser = async () => {
  const data = await AsyncStorage.getItem('user');
  console.log(data);
  return data ? JSON.parse(data) : null;
};

// Delete token
export const deleteToken = async () => {
  await AsyncStorage.removeItem('authToken');
};
