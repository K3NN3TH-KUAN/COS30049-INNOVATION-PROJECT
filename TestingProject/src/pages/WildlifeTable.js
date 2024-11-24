import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, ImageBackground, ScrollView, Alert } from 'react-native';
import MenuBar from '../components/MenuBar';
import { Ionicons } from '@expo/vector-icons'; 
import Footer from '../components/Footer';

const WildlifeTable = () => {
  const [wildlifeData, setWildlifeData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWildlife, setSelectedWildlife] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    species_name: '',
    common_name: '',
    scientific_name: '',
    population_estimate: '',
    status: ''
  });

  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchWildlifeData();
  }, []);

  const fetchWildlifeData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.0.158/MobileApp/TestingProject/src/backend/getWildlife.php?timestamp=' + new Date().getTime());
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setWildlifeData(data);
    } catch (error) {
      setError("Could not load wildlife data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleAddOrUpdate = () => {
    const action = isEditMode ? 'Save Changes' : 'Add Record';
    
    Alert.alert(
      `Confirm ${action}`,
      `Are you sure you want to ${action.toLowerCase()}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            const endpoint = isEditMode ? 'editWildlife.php' : 'addWildlife.php';
            const payload = isEditMode ? { id: selectedWildlife.id, ...formData } : formData;
            try {
              const response = await fetch(`http://192.168.0.158/MobileApp/TestingProject/src/backend/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              if (response.ok) {
                fetchWildlifeData();
                resetForm();
              }
            } catch (error) {
              console.error(`Error ${isEditMode ? "updating" : "adding"} wildlife record:`, error);
            }
          }
        }
      ]
    );
  };

  const handleEdit = (wildlife) => {
    Alert.alert(
      'Confirm Edit',
      'Are you sure you want to edit this record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setSelectedWildlife(wildlife);
            setFormData(wildlife);
            setIsEditMode(true);
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
          }
        }
      ]
    );
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const response = await fetch('http://192.168.0.158/MobileApp/TestingProject/src/backend/deleteWildlife.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
              });
              if (response.ok) {
                fetchWildlifeData();
              }
            } catch (error) {
              console.error("Error deleting wildlife record:", error);
            }
          }
        }
      ]
    );
  };

  const resetForm = () => {
    setSelectedWildlife(null);
    setIsEditMode(false);
    setFormData({
      species_name: '',
      common_name: '',
      scientific_name: '',
      population_estimate: '',
      status: ''
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.species_name}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}><Text style={styles.label}>ID:</Text> {item.id}</Text>
        <Text style={styles.cardText}><Text style={styles.label}>Common Name:</Text> {item.common_name}</Text>
        <Text style={styles.cardText}><Text style={styles.label}>Scientific Name:</Text> {item.scientific_name}</Text>
        <Text style={styles.cardText}><Text style={styles.label}>Population:</Text> {item.population_estimate}</Text>
        <Text style={styles.cardText}><Text style={styles.label}>Status:</Text> {item.status}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      <MenuBar />
      <ImageBackground source={require('../assets/donations.jpg')} style={styles.header} resizeMode="cover">
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Wildlife Data Management</Text>
          <Text style={styles.heroDescription}>Monitor and manage data for conservation efforts</Text>
        </View>
      </ImageBackground>

      <Text style={styles.header1}>{isEditMode ? 'Edit Wildlife Record' : 'Add Wildlife Record'}</Text>
      {error && <Text style={styles.errorMessage}>{error}</Text>}

      <View contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          {/* Form Fields */}
          <TextInput style={styles.input} placeholder="Species Name" value={formData.species_name} onChangeText={(value) => handleInputChange('species_name', value)} />
          <TextInput style={styles.input} placeholder="Common Name" value={formData.common_name} onChangeText={(value) => handleInputChange('common_name', value)} />
          <TextInput style={styles.input} placeholder="Scientific Name" value={formData.scientific_name} onChangeText={(value) => handleInputChange('scientific_name', value)} />
          <TextInput style={styles.input} placeholder="Population Estimate" value={formData.population_estimate} onChangeText={(value) => handleInputChange('population_estimate', value)} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Status" value={formData.status} onChangeText={(value) => handleInputChange('status', value)} />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleAddOrUpdate} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>{isEditMode ? 'Save Changes' : 'Add Record'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetForm} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={wildlifeData}
            renderItem={renderItem}
            scrollEnabled={false}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>

      <TouchableOpacity onPress={() => scrollViewRef.current.scrollTo({ y: 0, animated: true })} style={styles.scrollToTopButton}>
        <Ionicons name="arrow-up-circle" size={24} color="#fff" />
        <Text style={styles.scrollToTopButtonText}>Scroll to Top</Text>
      </TouchableOpacity>
      <Footer />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
    marginTop: 15,
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
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#FF0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardContent: {
    marginTop: 10,
  },
  cardText: {
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scrollToTopButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5, // Space between icon and text
  },
  header: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
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
});

export default WildlifeTable;
