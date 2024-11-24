import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, SafeAreaView,
  TouchableOpacity, Modal, Button, ScrollView, TextInput
} from 'react-native';
import { database } from '../components/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import eduImage from '../assets/donations.jpg';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';
import Icon from 'react-native-vector-icons/AntDesign'; // Import the icon library
import { Picker } from '@react-native-picker/picker';

const FirebasePage = () => {
  const [sensorData, setSensorData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State for controlling modal visibility
  const [iconColor, setIconColor] = useState("#007bff"); // State for icon color
  const [showMessageBox, setShowMessageBox] = useState(true); // Set to true to show message box initially
  const [filteredSensorData, setFilteredSensorData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [rowLimit, setRowLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const dataRef = ref(database, 'sensorData/');

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.entries(data).map(([key, value]) => {
          const postData = {
            sensor_id: key,
            value: value
          };

          fetch('http://192.168.0.158/MobileApp/TestingProject/src/backend/updateSensorData.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              if (data.status === 'error') {
                console.error("Error updating sensor data:", data.message);
              }
            })
            .catch(err => console.error("Error updating sensor data:", err));

          return { key, value };
        });

        setSensorData(formattedData);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchFilteredSensorData();
  }, []);

  useEffect(() => {
    const filtered = filteredSensorData.filter(({ created_at }) =>
      new Date(created_at).toLocaleString().includes(searchTerm)
    );
    setDisplayedData(filtered.slice(0, rowLimit));
  }, [filteredSensorData, rowLimit, searchTerm]);

  const fetchFilteredSensorData = async () => {
    try {
      const response = await fetch('http://192.168.0.158/MobileApp/TestingProject/src/backend/getFilteredSensorData.php');
      if (!response.ok) throw new Error('Failed to fetch filtered data');
      const data = await response.json();
      setFilteredSensorData(data);
    } catch (error) {
      console.error("Error fetching filtered sensor data:", error);
    }
  };

  const handleIconPress = () => {
    setModalVisible(true);
    setIconColor("#FF6347"); // Change color on press to indicate interaction
    setShowMessageBox(false); // Hide the message box when the icon is pressed
  };

  const handleIconRelease = () => {
    setIconColor("#007bff"); // Reset color when the press is released
  };

  return (
    <ScrollView style={styles.container}>
      <MenuBar />
      <View style={styles.heroSection}>
        <Image source={eduImage} style={styles.backgroundImage} />
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Real Time Database</Text>
          <Text style={styles.heroDescription}>View the real-time data retrieved from the sensors placed in the sites.</Text>
        </View>
      </View>

      <View style={styles.firebasePage}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Real-Time Sensor Data</Text>

          {/* Message Box Above the Icon */}
          {showMessageBox && (
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>Click for info</Text>
              <View style={styles.messageBoxTail} />
            </View>
          )}

          {/* Question Mark Icon next to the header */}
          <TouchableOpacity
            onPress={handleIconPress}
            onPressOut={handleIconRelease} // To reset color
            style={styles.questionIconContainer}
          >
            <Icon name="questioncircleo" size={30} color={iconColor} />
          </TouchableOpacity>
        </View>

        {/* Modal with information */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sensor Information</Text>
              
              <ScrollView contentContainerStyle={styles.modalScrollView}>
                <Text style={styles.modalText}>
                  Here are the details about the sensors used in this system:
                </Text>

                <View style={styles.modalSection}>
                  <Text style={styles.sensorIcon}>🔊</Text>
                  <Text style={styles.modalSubTitle}>• ObjectDetect (Ultrasonic Sensor)</Text>
                  <Text style={styles.modalDescription}>
                    This sensor detects objects by ultrasonic sensor, we use this sensor to detect an object.
                  </Text>
                  <View style={styles.separatorLine} />
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.sensorIcon}>🔈</Text>
                  <Text style={styles.modalSubTitle}>• soundValue (Sound Sensor)</Text>
                  <Text style={styles.modalDescription}>
                    This sensor detects sound, such as a gunshot or other loud noises. If the sound exceeds 2000, it triggers a response.
                  </Text>
                  <View style={styles.separatorLine} />
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.sensorIcon}>🚨</Text>
                  <Text style={styles.modalSubTitle}>• redLedStatus (Alert)</Text>
                  <Text style={styles.modalDescription}>
                    The red light is triggered when both the ObjectDetect and buttonPressed sensors are in the "YES" condition, 
                    or the sound value exceeds 2000.
                  </Text>
                  <View style={styles.separatorLine} />
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.sensorIcon}>⚠️</Text>
                  <Text style={styles.modalSubTitle}>• yellowLedStatus (Warning)</Text>
                  <Text style={styles.modalDescription}>
                    The yellow light turns on when the ObjectDetect sensor detects an object (condition "YES").
                  </Text>
                  <View style={styles.separatorLine} />
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.sensorIcon}>🖲️</Text>
                  <Text style={styles.modalSubTitle}>• buttonPressed (Push Button)</Text>
                  <Text style={styles.modalDescription}>
                    This button is used to detect if an object steps on it, which can trigger other actions.
                  </Text>
                  <View style={styles.separatorLine} />
                </View>
              </ScrollView>

              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
        
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.leftAlign]}>Sensor ID</Text>
          <Text style={[styles.tableHeaderText, styles.centerAlign]}>Value</Text>
        </View>

        {/* First Table: Real-time Sensor Data */}
        <FlatList
          data={sensorData}
          scrollEnabled={false}
          keyExtractor={({ key }) => key}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              style={[styles.tableRow, index % 2 === 0 ? styles.tableRowAlt : null]} 
              activeOpacity={0.8}
            >
              <Text style={[styles.tableCell, styles.leftAlign]}>{item.key}</Text>
              <Text style={[styles.tableCell, styles.centerAlign]}>{item.value}</Text>
            </TouchableOpacity>
          )}
        />
        <Text style={styles.header1}>Filtered Sensor Data (redLedStatus = 'ON')</Text>
        {/* Second Table: Filtered Sensor Data */}
        <View style={styles.controlsContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Date/Time"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Picker
            selectedValue={rowLimit}
            style={styles.picker}
            onValueChange={(value) => setRowLimit(value)}
          >
            <Picker.Item label="5" value={5} />
            <Picker.Item label="10" value={10} />
            <Picker.Item label="20" value={20} />
            <Picker.Item label="50" value={50} />
            <Picker.Item label="All" value={filteredSensorData.length} />
          </Picker>
        </View>
        
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.leftAlign]}>Sensor ID</Text>
          <Text style={styles.tableHeaderText}>Value</Text>
          <Text style={[styles.tableHeaderText, styles.rightAlign]}>Date & Time</Text>
        </View>

        <FlatList
          data={displayedData}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.sensor_id}</Text>
              <Text style={styles.tableCell}>{item.value}</Text>
              <Text style={styles.tableCell}>{new Date(item.created_at).toLocaleString()}</Text>
            </View>
          )}
        />
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    zIndex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  heroDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
  firebasePage: {
    flex: 1,
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fff',
    marginTop: -24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  header1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 30,
    marginBottom: 10,
  },
  messageBox: {
    position: 'absolute',
    top: -60,
    right: 0,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '80%',
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageBoxTail: {
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: [{ translateX: 30 }],
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderStyle: 'solid',
    borderTopColor: '#FF6347',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  questionIconContainer: {
    paddingRight: 10,
  },
  // Table styles with borders
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 2, // Thicker border for header
    borderBottomColor: '#ddd',
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 10,
    width: '33%',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1, // Border between rows
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  tableCell: {
    fontSize: 14,
    color: '#555',
    paddingHorizontal: 6,
    width: '34%',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tableRowAlt: {
    backgroundColor: '#f9f9f9',
  },
  tableRowSelected: {
    backgroundColor: '#e6f7ff',
  }, 
  leftAlign: {
    textAlign: 'left',
  },
  centerAlign: {
    textAlign: 'center',
  },
  rightAlign: {
    textAlign: 'right',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalScrollView: {
    flexGrow: 1,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchInput: {
    width: '70%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 40,
    width: 120412170,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sensorIcon: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 5,
  },
  separatorLine: {
    marginTop: 10,
    height: 1,
    backgroundColor: '#ddd',
    alignSelf: 'stretch',
  },
});


export default FirebasePage;