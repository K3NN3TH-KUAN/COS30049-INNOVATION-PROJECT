import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { Button, Image, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Animated, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';
import eduImage from '../assets/identify.jpg'; 

const IdentifyPage = () => {
  const [model, setModel] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [predictionResult, setPredictionResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animationValue] = useState(new Animated.Value(0)); // For prediction result animation

  const classLabels = ['Yellow Throated Marten', 'Sun Bear', 'Sambar Deer', 'Pig Tailed Macaque', 'Munjact', 'Marbled Cat', 'Malayan Civet', 'Long Tailed Macaque', 'Leopard Cat', 'Bearded Pig', 'Not An Animal'];

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const loadedModel = await tf.loadLayersModel('http:/192.168.0.158/MobileApp/TestingProject/src/tm-my-image-model/model.json');
      setModel(loadedModel);
      console.log('Model loaded successfully');
    };

    loadModel();
  }, []);

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result && !result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setImageUri(selectedUri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handlePredict = async () => {
    if (!imageUri) return;

    setLoading(true);
    try {
      const response = await fetch(imageUri);
      const imageData = await response.arrayBuffer();

      const imageTensor = decodeJpeg(new Uint8Array(imageData));
      const resizedTensor = tf.image.resizeBilinear(imageTensor, [224, 224]);
      const normalizedTensor = resizedTensor.div(255.0).expandDims(0);

      const prediction = await model.predict(normalizedTensor);
      const predictionData = prediction.dataSync();

      // Prepare the list of all class labels with their respective confidence
      const results = classLabels.map((label, index) => {
        return { label, confidence: (predictionData[index] * 100).toFixed(2) };
      });

      // Set the prediction results as an array
      setPredictionResult(results);

      // Animate the prediction result
      Animated.spring(animationValue, {
        toValue: 1,
        friction: 5,
        tension: 150,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Error making prediction:', error);
    }
    setLoading(false);
  };

  // Find the highest confidence prediction
  const maxConfidence = Math.max(...predictionResult.map(result => parseFloat(result.confidence)));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      <MenuBar />

      <View style={styles.heroSection}>
        <Image source={eduImage} style={styles.heroImage} />
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Species Identification Portal</Text>
          <Text style={styles.heroDescription}>
            Upload an image to identify the animal species. Our system uses advanced algorithms to provide accurate identifications.
          </Text>
        </View>
      </View>

      <Text style={styles.title}>Animal Species Identifier</Text>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Image source={require('C:/xampp/htdocs/MobileApp/TestingProject/src/assets/placeholder.jpg')} style={styles.image} />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleImagePick}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, (loading || !imageUri || !model) && styles.buttonDisabled]}
          onPress={handlePredict}
          disabled={loading || !imageUri || !model}
        >
          <Text style={styles.buttonText}>Predict</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />}

      {predictionResult.length > 0 && (
        <Animated.View
          style={[
            styles.resultContainer,
            {
              opacity: animationValue,
              transform: [{ scale: animationValue.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) }],
            },
          ]}
        >
          <Text style={styles.resultTitle}>Prediction Results:</Text>
          <View style={styles.resultsList}>
            {predictionResult.map((result, index) => (
              <View key={index} style={styles.resultItem}>
                <Text
                  style={[
                    styles.resultLabel,
                    result.confidence == maxConfidence && styles.resultLabelBold, // Apply bold style to highest confidence
                  ]}
                >
                  {result.label}
                </Text>
                <Text style={styles.resultConfidence}>Confidence: {result.confidence}%</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      )}
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
    marginTop: 15,
  },
  image: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    flex: 1,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginTop: 25,
  },
  resultContainer: {
    marginTop: 40,
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: '#774caf',
    alignItems: 'center',
    width: '100%',
    maxWidth: 450,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  resultsList: {
    width: '100%',
  },
  resultItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resultLabelBold: {
    fontWeight: '900', // Bolder font weight
    color: '#4CAF50', // Highlight with a distinct color
    fontSize: 22,
  },
  resultConfidence: {
    fontSize: 16,
    color: '#333333',
  },
});

export default IdentifyPage;
