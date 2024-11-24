import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useUser } from '../components/UserContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuBar from '../components/MenuBar';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/Footer';

const LoginPage = () => {
  const { setUser } = useUser();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectMessage, setRedirectMessage] = useState(''); // State for redirect message

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        // Set user context if already logged in
        setUser(user);

        if (user.role_id === 1) {
          setRedirectMessage('You are already logged in. You will be redirected to the Admin Panel!');
        } else if (user.role_id === 2) {
          setRedirectMessage('You are already logged in. You will be redirected to the Main Menu!');
        }

        // Redirect after 3 seconds
        setTimeout(() => {
          if (user.role_id === 1) {
            navigation.navigate('AdminMenu');
          } else {
            navigation.navigate('MainMenu');
          }
        }, 1000); 
      }
    };

    checkIfLoggedIn();
  }, [navigation, setUser]);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    const response = await fetch('http://192.168.0.158/MobileApp/TestingProject/src/backend/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.status === 'success') {
      const userData = {
        id: data.id,
        username: data.username,
        role_id: data.role_id,
      };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      if (data.role_id === 1) {
        navigation.navigate('AdminMenu');
      } else {
        navigation.navigate('MainMenu');
      }
    } else {
      setErrorMessage(data.message);
      Alert.alert("Error", data.message);
    }
  };

  return (
    <ScrollView style={styles.authContainer}>
      <MenuBar />
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>

        {redirectMessage ? <Text style={styles.redirectMessage}>{redirectMessage}</Text> : null}

        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        <View style={styles.card}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              keyboardType="email-address"
              placeholder="Enter your email"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              secureTextEntry
              placeholder="Enter your password"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.registerRedirect}>
            <Text>
              Don't have an account? <Text onPress={() => navigation.navigate('Register')} style={styles.link}>Register here</Text>
            </Text>
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  redirectMessage: {
    fontSize: 16,
    color: '#ff6b6b',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    marginBottom: 60,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#0056b3',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerRedirect: {
    marginTop: 15,
    textAlign: 'center',
  },
  link: {
    color: '#0056b3',
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
