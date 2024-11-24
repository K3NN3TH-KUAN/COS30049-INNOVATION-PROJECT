// src/components/Footer.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <View style={styles.footerContainer}>
        <View style={styles.footerSection}>
          <Text style={styles.footerHeading}>About Us</Text>
          <Text style={styles.footerText}>We are committed to making the world a better place through donations and community efforts.</Text>
        </View>
        <View style={styles.footerSection}>
          <Text style={styles.footerHeading}>Quick Links</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.footerLink}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Info")}>
            <Text style={styles.footerLink}>Info</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Donation")}>
            <Text style={styles.footerLink}>Donate</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Education")}>
            <Text style={styles.footerLink}>Education</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerSection}>
          <Text style={styles.footerHeading}>Contact Us</Text>
          <Text style={styles.footerText}>Email: hello@SWC.com.my</Text>
          <Text style={styles.footerText}>Phone: (123) 456-7890</Text>
        </View>
      </View>
      <View style={styles.footerBottom}>
        <Text style={styles.footerBottomText}>&copy; 2024 Group 12. All Rights Reserved.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    footer: {
      backgroundColor: '#333',
      paddingVertical: 20,
      position: 'relative',
      bottom: 0,
      width: '100%',
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    footerSection: {
      flex: 1,
      paddingHorizontal: 10,
    },
    footerHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
    },
    footerText: {
      color: '#aaa',
      fontSize: 14,
      marginBottom: 5,
    },
    footerLink: {
      color: '#1e90ff',
      fontSize: 14,
      marginBottom: 5,
      textDecorationLine: 'underline',
    },
    footerBottom: {
      borderTopWidth: 1,
      borderTopColor: '#444',
      paddingVertical: 10,
      alignItems: 'center',
    },
    footerBottomText: {
      color: '#aaa',
      fontSize: 12,
    },
  });
  
  export default Footer;
  
