import {db, collection, addDoc, getDocs} from '../firebaseConfig';

export const addCustomer = async () => {
  try {
    const docRef = await addDoc(collection(db, 'customers'), {
      name: 'me it is',
    });
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
