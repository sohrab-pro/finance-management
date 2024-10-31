import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebaseConfig';
import {saveUser} from './storage';

const Login = ({navigation, setIsLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const data = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
      };
      await saveUser(data);
      setIsLoggedIn(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error, 'code');
      if (error.code === 'auth/invalid-credential') {
        console.log('Invalid credentials');
        setError('Invalid credentials');
      } else if (error.code == 'auth/invalid-email') {
        console.log('Invalid email');
        setError('Invalid email');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Icon name="message-text" size={60} color="#FF6347" />
            <Text style={styles.title}>Sign SMS</Text>
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.inputContainer}>
            <Icon
              name="account"
              size={24}
              color="#FF6347"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={email}
              autoCapitalize="none"
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#a0a0a0"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon
              name="lock"
              size={24}
              color="#FF6347"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#a0a0a0"
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.eyeButton}>
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#FF6347"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Sing Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    marginTop: 100,
    marginHorizontal: 20,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6347',
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    padding: 10,
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: '#FF3B30',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Login;
