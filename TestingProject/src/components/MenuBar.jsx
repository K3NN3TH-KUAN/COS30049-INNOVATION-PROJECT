import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Text, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect to listen for navigation events
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icons
import { useUser } from '../components/UserContext'; // Adjust the import path to where your UserContext is located

const MenuBar = ({ title }) => {
  const navigation = useNavigation();
  const { user, logout } = useUser(); // Get user state and logout function from context
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

  // Animated value to handle menu height
  const menuHeight = useState(new Animated.Value(0))[0];

  // Function to toggle the menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    // Animate menu height
    Animated.timing(menuHeight, {
      toValue: isMenuOpen ? 0 : 350,
      duration: 300,
      useNativeDriver: false, // Set to false for height animations
    }).start();
  };

  // Close the menu when navigating to a new screen
  useFocusEffect(
    React.useCallback(() => {
      // Close the menu when the screen is focused
      setIsMenuOpen(false);
      Animated.timing(menuHeight, {
        toValue: 0, // Close the menu
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, [menuHeight])
  );

  return (
    <View style={styles.container}>
      <View style={styles.menuBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={toggleMenu} style={styles.toggleButton}>
          {/* Hamburger icon for menu toggle */}
          <Icon name="bars" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Animated menu items */}
      <Animated.View style={{ height: menuHeight, overflow: 'hidden' }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.button}>
            <Icon name="home" size={22} color="#fff" />
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Info")} style={styles.button}>
            <Icon name="info" size={22} color="#fff" />
            <Text style={styles.buttonText}>Information</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Donation")} style={styles.button}>
            <Icon name="heart" size={22} color="#fff" />
            <Text style={styles.buttonText}>Donation</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Education")} style={styles.button}>
            <Icon name="book" size={22} color="#fff" />
            <Text style={styles.buttonText}>Education</Text>
          </TouchableOpacity>

          {/* Conditional rendering based on login status and role_id */}
          {user ? (
            <>
              {user.role_id === 1 ? ( // Check for admin role
                <TouchableOpacity onPress={() => navigation.navigate("AdminMenu")} style={styles.button}>
                  <Icon name="user" size={22} color="#fff" />
                  <Text style={styles.buttonText}>Admin Panel</Text>
                </TouchableOpacity>
              ) : user.role_id === 2 ? ( // Check for user role
                <TouchableOpacity onPress={() => navigation.navigate("MainMenu")} style={styles.button}>
                  <Icon name="user" size={22} color="#fff" />
                  <Text style={styles.buttonText}>Main Menu</Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity onPress={() => { logout(); navigation.navigate("Home"); }} style={styles.button}>
                <Icon name="sign-out" size={22} color="#fff" />
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
                <Icon name="sign-in" size={22} color="#fff" />
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.button}>
                <Icon name="user-plus" size={22} color="#fff" />
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Full width for the container
    backgroundColor: '#333', 
  },
  menuBar: {
    backgroundColor: "#333",
    paddingVertical: 10,
    zIndex: 10, // Ensure it stays on top
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically
    justifyContent: 'space-between', // Distribute space between logo and toggle button
  },
  logo: {
    width: 50, // Adjust as necessary
    height: 50, // Adjust as necessary
    marginLeft: 10, // Space from the left edge
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: 'bold',
    marginLeft: 10, // Space between icon and title
  },
  toggleButton: {
    backgroundColor: 'transparent',
    padding: 5,
    marginRight: 10, // Space from the right edge
  },
  buttonContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#0056b3",
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center', // Align icon and text
  },
  buttonText: {
    color: "#fff",
    marginLeft: 15, // Space between icon and text
    fontWeight: 'bold',
    lineHeight: 22, // Set line height to vertically center the text
  },
});

export default MenuBar;
