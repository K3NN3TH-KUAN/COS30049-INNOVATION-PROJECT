import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, ScrollView, ImageBackground, Alert } from 'react-native';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '', role_id: '', pass: '' });

  // Reference to the ScrollView
  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.0.158/MobileApp/TestingProject/src/backend/userTable.php?timestamp=' + new Date().getTime());
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Could not fetch user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleAddOrUpdateUser = () => {
    const action = editingUser ? 'Save Changes' : 'Add User';

    // Password requirement (e.g., minimum 8 characters)
    if (formData.pass && formData.pass.length < 8) {
      Alert.alert('Password Error', 'Password must be at least 8 characters long.');
      return;
    }
    
    Alert.alert(
      `Confirm ${action}`,
      `Are you sure you want to ${action.toLowerCase()}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            const endpoint = editingUser ? `updateUser.php` : `addUser.php`;
            try {
              const response = await fetch(`http://192.168.0.158/MobileApp/TestingProject/src/backend/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, id: editingUser?.id }),
              });
              if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
              fetchUsers();
              clearForm();
            } catch (error) {
              console.error('Error adding/updating user:', error);
              setError('Could not save user data. Please try again later.');
            }
          },
        },
      ]
    );
  };

  const handleEditUser = (user) => {
    Alert.alert(
      'Confirm Edit',
      'Are you sure you want to edit this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setEditingUser(user);
            setFormData({ username: user.username, email: user.email, role_id: user.role_id, pass: '' });
            // Scroll to the form
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
          },
        },
      ]
    );
  };

  const handleDeleteUser = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const response = await fetch(`http://192.168.0.158/MobileApp/TestingProject/src/backend/deleteUser.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
              });
              if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
              fetchUsers();
            } catch (error) {
              console.error('Error deleting user:', error);
              setError('Could not delete user. Please try again later.');
            }
          },
        },
      ]
    );
  };

  const resetForm = () => {
    Alert.alert(
      'Confirm Cancel',
      'Are you sure you want to cancel?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setEditingUser(null);
            clearForm();
          },
        },
      ]
    );
  };

  // Function to clear the form fields without an alert
  const clearForm = () => {
    setEditingUser(null);
    setFormData({ username: '', email: '', role_id: '', pass: '' });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.username}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}><Text style={styles.label}>ID:</Text> {item.id}</Text>
        <Text style={styles.cardText}><Text style={styles.label}>Email:</Text> {item.email}</Text>
        <Text style={styles.cardText}><Text style={styles.label}>Role:</Text> {item.role_id === '1' ? 'Admin' : 'User'}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEditUser(item)} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        {/* Only show the delete button if the user is not an admin */}
        {item.role_id !== '1' && (
          <TouchableOpacity onPress={() => handleDeleteUser(item.id)} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.container}>
      <MenuBar />
      <ImageBackground
        source={require('../assets/educational.jpg')}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Manage User List</Text>
          <Text style={styles.heroDescription}>View, edit and manage user information for smooth operation</Text>
        </View>
      </ImageBackground>

      <Text style={styles.header1}>{editingUser ? 'Edit User' : 'Add User'}</Text>
      {error && <Text style={styles.errorMessage}>{error}</Text>}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formData.username}
          onChangeText={(value) => handleInputChange('username', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Role (1 as 'admin', 2 as 'user')"
          value={formData.role_id}
          onChangeText={(value) => handleInputChange('role_id', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.pass}
          onChangeText={(value) => handleInputChange('pass', value)}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleAddOrUpdateUser} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>{editingUser ? 'Save Changes' : 'Add User'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetForm} style={styles.cancelButton}>
          <Text style={styles.submitButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  header1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
    marginTop: 15,
  },
  heroSection: {
    position: 'relative',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
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
  errorMessage: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
  },
  form: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007BFF',
  },
  cardContent: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  label: {
    fontWeight: '600',
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default UserTable;
