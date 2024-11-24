import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import donationImage from '../assets/donation.jpg';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';

const DonationTable = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.0.158/MobileApp/TestingProject/src/backend/getDonations.php?timestamp=${new Date().getTime()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'success') {
        setDonations(data.data); // Update state to reflect the correct data structure
      } else {
        setError("Error fetching donations.");
      }
      setError(null);
    } catch (error) {
      console.error("Error fetching donation data:", error);
      setError("Could not load donations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Donation ID: {item.id}</Text>
      <Text style={styles.cardText}>Email: {item.email}</Text>
      <Text style={styles.cardText}>Amount: ${parseFloat(item.amount).toFixed(2)}</Text>
      <Text style={styles.cardText}>Date: {new Date(item.donation_date).toLocaleDateString()}</Text>
      <Text style={styles.cardText}>Message: {item.message || 'No message'}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MenuBar />
      <View style={styles.heroSection}>
        <Image source={donationImage} style={styles.heroImage} />
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Donation Records</Text>
          <Text style={styles.heroDescription}>
            View all contributions made by our generous supporters. These funds enable the ongoing efforts in wildlife conservation, habitat protection, and awareness programs at Semonggoh Wildlife Centre.
          </Text>
        </View>
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.sectionTitle}>Donations</Text>
        {error && <Text style={styles.errorMessage}>{error}</Text>}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={donations}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={<Text style={styles.emptyMessage}>No donations found.</Text>}
          />
        )}
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
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.7,
  },
  heroTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroDescription: {
    color: '#dcdcdc',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  cardContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  errorMessage: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    padding: 20,
    color: '#888',
  },
});

export default DonationTable;
