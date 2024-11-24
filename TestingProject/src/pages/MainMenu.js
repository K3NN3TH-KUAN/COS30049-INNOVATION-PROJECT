import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import donationImage from '../assets/donation.jpg'; // Update the path as needed
import educationalImage from '../assets/educational.jpg';
import eduImage from '../assets/mmmonkey.jpg'; // Background image for the hero section
import infoImage from '../assets/info.jpg';
import identifyImage from '../assets/identify.jpg';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';

const MainMenu = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Main Menu - Semonggoh Wildlife Centre");
  }, []);

  const handleCategoryClick = (category) => {
    switch (category) {
      case 'Donation':
        navigation.navigate('Donation');
        break;
      case 'Education':
        navigation.navigate('Education');
        break;
      case 'Info':
        navigation.navigate('Info');
        break;
      case 'Identify':
        navigation.navigate('Identify');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <MenuBar />
      {/* Banner Section */}
      <ImageBackground source={eduImage} style={styles.heroSection}>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Explore Wildlife Conservation</Text>
          <Text style={styles.heroDescription}>
            Explore our educational resources, support conservation efforts through donations, and learn to identify various species. Your involvement matters!
          </Text>
        </View>
      </ImageBackground>

      {/* Main Menu Section */}
      <View style={styles.mainMenu}>
        <Text style={styles.menuTitle}>Main Menu</Text>
        
        <TouchableOpacity style={styles.menuCategory} onPress={() => handleCategoryClick('Donation')}>
          <Image source={donationImage} style={styles.categoryImage} />
          <View style={styles.categoryText}>
            <Text style={styles.categoryTitle}>Donation</Text>
            <Text style={styles.categoryDescription}>Support our cause through donations.</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuCategory} onPress={() => handleCategoryClick('Education')}>
          <Image source={educationalImage} style={styles.categoryImage} />
          <View style={styles.categoryText}>
            <Text style={styles.categoryTitle}>Educational</Text>
            <Text style={styles.categoryDescription}>Learn more about our educational programs.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuCategory} onPress={() => handleCategoryClick('Info')}>
          <Image source={infoImage} style={styles.categoryImage} />
          <View style={styles.categoryText}>
            <Text style={styles.categoryTitle}>Information</Text>
            <Text style={styles.categoryDescription}>Learn more about our species information.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuCategory} onPress={() => handleCategoryClick('Identify')}>
          <Image source={identifyImage} style={styles.categoryImage} />
          <View style={styles.categoryText}>
            <Text style={styles.categoryTitle}>Identify</Text>
            <Text style={styles.categoryDescription}>Upload image to identify the wildlife species.</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  heroSection: {
    width: "100%",
    height: 280,
    justifyContent: "center",
    alignItems: "center",
  },
  heroTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for readability
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  heroDescription: {
    color: "#f0f0f0",
    fontSize: 16,
    textAlign: "center",
  },
  mainMenu: {
    padding: 20,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  menuCategory: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 15,
    padding: 10,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default MainMenu;
