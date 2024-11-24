import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ImageBackground, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';

const DonationPage = () => {
  useEffect(() => {
    // Set the title for the current screen if using a navigation library
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    message: '',
    donation_date: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null); // Track pressed button
  const [showDatePicker, setShowDatePicker] = useState(false); // Toggle date picker visibility

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (name === 'amount') {
      setSelectedAmount(null);
    }
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://192.168.0.158/MobileApp/TestingProject/src/backend/donation.php', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 'success') {
        Alert.alert('Thank you for your donation!');
        setFormData({
          name: '',
          email: '',
          amount: '',
          message: '',
          donation_date: '',
        });
        setSelectedAmount(null);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage('There was an error processing your donation.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountPress = (amount) => {
    setFormData({ ...formData, amount: amount.toString() });
    setSelectedAmount(amount);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-CA');
      setFormData({ ...formData, donation_date: formattedDate });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MenuBar />
      <ImageBackground
        source={require('../assets/donations.jpg')}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Support Our Cause</Text>
          <Text style={styles.heroDescription}>Your contribution makes a difference!</Text>
        </View>
      </ImageBackground>

      <Text style={styles.formTitle}>Make a Donation</Text>

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={formData.name}
          onChangeText={(value) => handleChange('name', value)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
          keyboardType="email-address"
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Donation Amount"
          value={formData.amount}
          onChangeText={(value) => handleChange('amount', value)}
          keyboardType="numeric"
          required
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: formData.donation_date ? '#000' : '#888' }}>
            {formData.donation_date || 'Select Donation Date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={formData.donation_date ? new Date(formData.donation_date) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TextInput
          style={styles.textArea}
          placeholder="Your message here..."
          value={formData.message}
          onChangeText={(value) => handleChange('message', value)}
          multiline
        />

<View style={styles.buttonContainer}>
          {/** Amount Buttons **/}
          <TouchableOpacity
            style={[
              styles.button,
              selectedAmount === 10 ? styles.buttonPressed : null,
            ]}
            onPress={() => handleAmountPress(10)}
          >
            <Text style={styles.buttonText}>$10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedAmount === 25 ? styles.buttonPressed : null,
            ]}
            onPress={() => handleAmountPress(25)}
          >
            <Text style={styles.buttonText}>$25</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedAmount === 50 ? styles.buttonPressed : null,
            ]}
            onPress={() => handleAmountPress(50)}
          >
            <Text style={styles.buttonText}>$50</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Processing...' : 'Donate Now'}
          </Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#0056b3',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DonationPage;
