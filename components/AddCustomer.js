import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {addCustomer, getUser} from './storage';

const AddCustomer = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    const user = await getUser();
    setUserId(user.id);
    setUserEmail(user.email);
  };

  const handleContinue = async () => {
    setLoading(true);
    if (!name) {
      Alert.alert('Validation', 'Name is required!');
      return;
    }
    if (userId && userEmail) {
      await addCustomer(name, mobileNumber, userId, userEmail);
      setLoading(false);
      navigation.navigate('HomeTab');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>CONTINUE</Text>
        )}
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
    color: 'black',
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
