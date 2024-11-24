import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import MenuBar from '../components/MenuBar';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/Footer';
import { useUser } from '../components/UserContext'; // Import the UserContext

const RegisterPage = () => {
  const navigation = useNavigation();
  const { user } = useUser(); // Access the logged-in user from context
  const [redirectMessage, setRedirectMessage] = useState(''); // State for redirect message

  useEffect(() => {
    if (user) {
      // Display the appropriate message based on the user role
      if (user.role_id === 1) {
        setRedirectMessage('You are already logged in. You will be redirected to the Admin Panel!');
      } else if (user.role_id === 2) {
        setRedirectMessage('You are already logged in. You will be redirected to the Main Menu!');
      }

      // Redirect after 3 seconds to the appropriate page
      setTimeout(() => {
        if (user.role_id === 1) {
          navigation.navigate('AdminMenu'); // Redirect to Admin Panel
        } else if (user.role_id === 2) {
          navigation.navigate('MainMenu'); // Redirect to Main Menu for regular user
        }
      }, 1000); // 3-second delay before redirect
    }
  }, [user, navigation]); // Re-run when the user state changes

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setErrorMessage(''); // Clear previous error messages

    if (formData.name.trim() === '') {
      setErrorMessage('Name cannot be empty.');
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.158/MobileApp/TestingProject/src/backend/register.php', {
        username: formData.name,
        email: formData.email,
        pass: formData.password,
        c_pass: formData.confirmPassword,
      });

      if (response.data.status === 'success') {
        navigation.navigate('Login'); // Redirect on success
      } else {
        setErrorMessage(response.data.message); // Set error message
      }
    } catch (error) {
      setErrorMessage('There was an error processing your request.');
      Alert.alert("Error", "There was an error processing your request."); // Show alert on error
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrorMessage(''); // Clear error message
  };

  return (
    <ScrollView style={styles.authContainer}>
      <MenuBar />
      <View style={styles.content}>
        <Text style={styles.title}>Register</Text>

        {redirectMessage ? <Text style={styles.redirectMessage}>{redirectMessage}</Text> : null}

        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        <View style={styles.card}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => handleChange('name', value)}
              placeholder="Enter your name"
            />
          </View>

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

          <View style={styles.formGroup}>
            <Text style={styles.label}>Confirm Password:</Text>
            <TextInput
              style={styles.input}
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              secureTextEntry
              placeholder="Confirm your password"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonReset} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerRedirect}>
            <Text>
              Already have an account? 
              <Text onPress={() => navigation.navigate('Login')} style={styles.link}> Login here</Text>
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
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0056b3',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonReset: {
    backgroundColor: '#ff6b6b',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
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

export default RegisterPage;
