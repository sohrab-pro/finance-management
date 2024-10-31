import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {addCustomer} from './storage';

const AddCustomer = ({nativation, route}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleContinue = async () => {
    if (!name) {
      Alert.alert('Validation', 'Name is required!');
      return;
    }
    console.log(name, mobileNumber);
    await addCustomer(name, mobileNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Customer</Text>
      <TextInput
        placeholder="Name"
        placeholderTextColor="#999"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Mobile Number"
        placeholderTextColor="#999"
        style={styles.input}
        value={mobileNumber}
        keyboardType="phone-pad"
        onChangeText={setMobileNumber}
      />

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'orange',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCustomer;
