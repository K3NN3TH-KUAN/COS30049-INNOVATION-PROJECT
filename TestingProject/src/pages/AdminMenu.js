// src/pages/AdminMenuPage.js
import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import for navigation
import eduImage from '../assets/mmmonkey.jpg';
import userImage from '../assets/educational.jpg';
import wildlifeImage from '../assets/donations.jpg';
import donationImage from '../assets/donation.jpg';
import firebaseImage from '../assets/firebase.jpg';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';

const AdminMenu = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Redirect if the user is not an admin
  
  }, []); // Added user to the dependency array

  const handleCategoryClick = (category) => {
    switch (category) {
      case 'UserTable':
        navigation.navigate('UserTable');
        break;
      case 'WildlifeTable':
        navigation.navigate('WildlifeTable');
        break;
      case 'DonationTable':
        navigation.navigate('DonationTable');
        break;
      case 'Firebase':
        navigation.navigate('Firebase');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MenuBar />
      <View style={styles.heroSection}>
        <Image source={eduImage} style={styles.heroImage} />
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Welcome to the Admin Menu</Text>
          <Text style={styles.heroDescription}>Manage wildlife conservation efforts effectively.</Text>
        </View>
      </View>

      <Text style={styles.adminMenuTitle}>Admin Main Menu</Text>
      <View style={styles.adminMenuContainer}>
        <TouchableOpacity style={styles.adminMenuItem} onPress={() => navigation.navigate('UserTable')}>
          <Image source={userImage} style={styles.adminMenuImage} />
          <Text style={styles.adminMenuHeading}>Manage User Table</Text>
          <Text style={styles.adminMenuDescription}>View, edit, or delete user accounts.</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.adminMenuItem} onPress={() => navigation.navigate('WildlifeTable')}>
          <Image source={wildlifeImage} style={styles.adminMenuImage} />
          <Text style={styles.adminMenuHeading}>Manage Wildlife Records</Text>
          <Text style={styles.adminMenuDescription}>Add or update wildlife records in the database.</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.adminMenuItem} onPress={() => navigation.navigate('DonationTable')}>
          <Image source={donationImage} style={styles.adminMenuImage} />
          <Text style={styles.adminMenuHeading}>Donation Table</Text>
          <Text style={styles.adminMenuDescription}>View and manage donation records.</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.adminMenuItem} onPress={() => navigation.navigate('Firebase')}>
          <Image source={firebaseImage} style={styles.adminMenuImage} />
          <Text style={styles.adminMenuHeading}>Firebase Table</Text>
          <Text style={styles.adminMenuDescription}>Get real-time data from the sensor.</Text>
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
  heroSection: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heroTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for readability
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
  },
  heroTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroDescription: {
    color: '#f0f0f0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  adminMenuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  adminMenuContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  adminMenuItem: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3, // Shadow effect for Android
    alignItems: 'center',
  },
  adminMenuImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  adminMenuHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  adminMenuDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AdminMenu;
