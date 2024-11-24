import React, { useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import eduImage from '../assets/mmmonkey.jpg'; 
import habImage from '../assets/habitat.jpg';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';

const EducationPage = () => {
  useEffect(() => {
    // You might want to set the title in your app navigation or context
  }, []); 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MenuBar />
      <View style={styles.heroSection}>
        <Image source={eduImage} style={styles.heroImage} />
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Welcome to the Education Page</Text>
          <Text style={styles.heroDescription}>
            Learn about the importance of wildlife conservation and how you can make a difference.
          </Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.contentTitle}>
          Preserving wildlife is crucial for maintaining biodiversity and ecological balance.
        </Text>
        <Text style={styles.introText}>
          Here are some basic strategies to help protect wildlife:
        </Text>
        
        <View style={styles.strategiesList}>
          <Text style={styles.strategyItem}>
            <Text style={styles.boldText}>Habitat Conservation</Text>: Protecting and restoring natural habitats like forests, wetlands, and grasslands is essential. This can involve creating protected areas, reforestation, and wetland restoration.
          </Text>
          <Text style={styles.strategyItem}>
            <Text style={styles.boldText}>Sustainable Land-Use Practices</Text>: Implementing sustainable agricultural and forestry practices helps reduce habitat destruction and fragmentation. This includes reducing pesticide use and promoting eco-friendly technologies.
          </Text>
          <Text style={styles.strategyItem}>
            <Text style={styles.boldText}>Research and Monitoring</Text>: Conducting research and monitoring wildlife populations helps identify conservation needs and inform policy decisions. This includes tracking changes in habitat quality and population sizes.
          </Text>
          <Text style={styles.strategyItem}>
            <Text style={styles.boldText}>Public Education and Awareness</Text>: Educating the public about the importance of wildlife conservation can foster a culture of responsible behavior. Outreach programs and awareness campaigns can highlight the impacts of human activities on wildlife.
          </Text>
        </View>

        <View style={styles.imagesContainer}>
          <Image source={eduImage} style={styles.educationImage} />
          <Image source={habImage} style={styles.educationImage} />
        </View>
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
    width: "100%",
    height: 280,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0, 
  },
  heroTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heroDescription: {
    color: "#f0f0f0",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  contentSection: {
    marginTop: 20,
    padding: 20,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  introText: {
    fontSize: 16,
    marginBottom: 10,
  },
  strategiesList: {
    marginBottom: 20,
  },
  strategyItem: {
    fontSize: 14,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  educationImage: {
    width: '45%',
    height: 150,
    borderRadius: 10,
  },
});

export default EducationPage;
