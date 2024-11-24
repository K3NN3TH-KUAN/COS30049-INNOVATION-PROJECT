import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Sample image data for the image slider
const images = [
  { id: '1', src: require('../assets/Non_breath.jpg') },
  { id: '2', src: require('../assets/raputa.jpg') },
  { id: '3', src: require('../assets/Slide1.jpg') },
];

const HomePage = () => {
  const navigation = useNavigation();

  // Function to render each image in the slider
  const renderImage = ({ item }) => {
    return (
      <Image source={item.src} style={styles.sliderImage} />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Logo and Menu */}
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuButton}>
        <Text style={styles.menuText}>Menu</Text>
        </TouchableOpacity>
      </View>


      {/* Image Slider */}
      <FlatList
        data={images}
        renderItem={renderImage}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />

     {/* Text Below Image Slider */}
<View style={styles.sliderText}>
  <Text style={styles.whiteTitle}>Welcome to the Home Page of SWC!</Text>
  <Text style={styles.whiteText}>Page is currently under construction.</Text>
  <Text style={styles.whiteText}>Please do wait patiently.</Text>
  <Text style={styles.whiteText}>Text goes here</Text>
  <Text style={styles.whiteText}>We are currently busy</Text>
</View>


      {/* Button to Navigate to Login Page */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('LoginPage')}
      >
        <Text style={styles.loginButtonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  logo: {
    width: 50,
    height: 50,
  },
  menuButton: {
    padding: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sliderImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  sliderText: {
    textAlign: 'left',
    marginBottom: 100, 
  },
  whiteTitle: {
    fontSize: 30,
    color: '#FFFFFF',        // White text color
    fontWeight: 'bold',
    marginBottom: 10,        // Space between text lines
    // Optional: Make the text bold

  },
  whiteText: {
    fontSize: 20,            // Font size of the text
    color: '#FFFFFF',        // White text color
    marginBottom: 10,        // Space between text lines
  },
  loginButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomePage;
