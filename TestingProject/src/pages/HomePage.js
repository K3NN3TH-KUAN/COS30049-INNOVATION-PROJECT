import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';
import { WebView } from 'react-native-webview';

const HomePage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Home - Semonggoh Wildlife Centre" });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {/* Top Menu Bar */}
      <MenuBar />

      <ScrollView contentContainerStyle={styles.homeContainer}>
        {/* Horizontal ScrollView for Images */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
          <Image
            source={require("../assets/mmmonkey.jpg")}
            style={styles.image}
          />
          <Image
            source={require("../assets/mousedeer.jpg")}
            style={styles.image}
          />
          <Image
            source={require("../assets/leocar.jpg")}
            style={styles.image}
          />
        </ScrollView>

        {/* Welcome Section */}
        <View style={styles.homeContent}>
          <Text style={styles.headerText}>Welcome to the Home Page of SWC!</Text>
          <Text style={styles.paragraph}>
            Our mission is to protect and preserve biodiversity while raising awareness about the importance of wildlife conservation.
          </Text>

          <View style={styles.divider} />

          {/* Tableau Dashboard Section */}
          <View style={styles.tableauContainer}>
            <Text style={styles.subHeader}>Explore Our Dashboard</Text>
            <View
              style={styles.webviewWrapper}
              onStartShouldSetResponder={() => true} // Capture touch events
              onResponderTerminationRequest={() => false} // Prevent parent from taking over scroll gestures
            >
              <WebView
                source={{
                  uri: 'https://public.tableau.com/app/profile/daniel.meng.en.pang/viz/SemonggohDashboardVer2/Dashboard1?publish=yes',
                }}
                style={styles.webview}
                scalesPageToFit={true}
                scrollEnabled={true} // Enable independent scrolling
                nestedScrollEnabled={true}
                javaScriptEnabled={true}
              />
            </View>
          </View>

          {/* Fun Facts Section */}
          <View style={styles.funFacts}>
            <Text style={styles.subHeader}>Did You Know?</Text>
            <Text style={styles.paragraph}>Over 1 million species are threatened with extinction.</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Info")} style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Discover More</Text>
            </TouchableOpacity>
          </View>

          {/* Interactive Element */}
          <View style={styles.interactiveElement}>
            <Text style={styles.subHeader}>Join Us!</Text>
            <Text style={styles.paragraph}>
              Sign up to stay updated on wildlife conservation efforts and explore extra features.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  homeContainer: {
    flexGrow: 1,
  },
  imageScroll: {
    height: 250,
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: "100%",
    resizeMode: "cover",
    marginRight: 10,
  },
  homeContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 20,
  },
  tableauContainer: {
    marginVertical: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    overflow: "hidden",
  },
  webviewWrapper: {
    height: 400, // Fixed height to make it scrollable
    overflow: "hidden", // Ensures it doesn't affect other elements
  },
  webview: {
    flex: 1,
  },
  funFacts: {
    padding: 16,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaButton: {
    marginTop: 15,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  ctaButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  interactiveElement: {
    padding: 16,
    backgroundColor: "#ffe0b2",
    borderRadius: 8,
  },
});

export default HomePage;
