import React, { useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, ImageBackground } from "react-native";
import orangutanImage from '../assets/orangutan.jpg';
import hornbillImage from '../assets/hornbill.jpg';
import mousedeerImage from '../assets/mousedeer.jpg';
import leocatImage from '../assets/leocar.jpg';
import beardedpigImage from '../assets/beardedpig.jpg';
import longtailmacImage from '../assets/longtailmac.jpeg';
import malcivetImage from '../assets/malcivet.jpg';
import marbcatImage from '../assets/marbcat.jpg';
import muntjacImage from '../assets/muntjac.jpg';
import pigtailmacImage from '../assets/pigtailmac.jpg';
import samdeerImage from '../assets/samdeer.jpg';
import sunbearImage from '../assets/sunbear.jpg';
import martenImage from '../assets/marten.jpg';
import infoImage from '../assets/info.jpg'; // Import banner image
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';

const InfoPage = () => {
  useEffect(() => {
    console.log("Information - Semonggoh Wildlife Centre");
  }, []);

  return (
    <ScrollView style={styles.container}>
      <MenuBar />
      {/* Hero Section with Background Image */}
      <ImageBackground source={infoImage} style={styles.heroSection}>
        <View style={styles.overlay}>
          <Text style={styles.heroTitle}>Discover the Wildlife</Text>
          <Text style={styles.heroDescription}>
            Explore fascinating information about various wildlife species and their roles in the ecosystem.
            Learn how conservation efforts are vital to protecting these incredible animals and their habitats.
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Information Page</Text>

        {/* Animal Sections */}
        <View style={styles.animalSection}>
          <Text style={styles.animalTitle}>Orangutan</Text>
          <Image source={orangutanImage} style={styles.animalImage} />
          <Text style={styles.animalDescription}>
            Orangutans are great apes found only in the rainforests of Borneo and Sumatra.
            They are known for their intelligence, red hair, and powerful arms. Unfortunately,
            they are critically endangered due to deforestation and habitat loss.
          </Text>
        </View>

        <View style={styles.animalSection}>
          <Text style={styles.animalTitle}>Hornbill</Text>
          <Image source={hornbillImage} style={styles.animalImage} />
          <Text style={styles.animalDescription}>
            Hornbills are distinctive birds known for their large bills, which sometimes have a casque on top.
            Found in tropical and subtropical Africa and Asia, hornbills play an important role in the ecosystem as seed dispersers.
          </Text>
        </View>

        <View style={styles.animalSection}>
          <Text style={styles.animalTitle}>Mousedeer</Text>
          <Image source={mousedeerImage} style={styles.animalImage} />
          <Text style={styles.animalDescription}>
            A mousedeer, also known as a chevrotain, is a small, delicate creature that looks like a mix between a mouse and a deer.
            Its slender legs and tiny frame make it one of the smallest ungulates in the animal kingdom.
            Despite its size, the mousedeer is a swift and elusive animal, often spotted darting through dense forests.
          </Text>
        </View>

        <View style={styles.animalSection}>
          <Text style={styles.animalTitle}>Leopard Cat</Text>
          <Image source={leocatImage} style={styles.animalImage} />
          <Text style={styles.animalDescription}>
            A leopard cat is a small wild cat native to Asia, known for its striking spotted coat that resembles that of a leopard.
            With sharp hunting skills, it thrives in various habitats, from forests to farmlands.
            Though wild, it’s often admired for its beautiful and elusive nature.
          </Text>
        </View>

        <View style={styles.animalSection}>
          <Text style={styles.animalTitle}>Bearded Pig</Text>
          <Image source={beardedpigImage} style={styles.animalImage} />
          <Text style={styles.animalDescription}>
            A unique wild pig species native to Southeast Asia, named for the distinctive "beard" of coarse hair along its snout and cheeks. Bearded Pigs are primarily found in forests and mangroves, where they forage for roots, fruits, and small invertebrates. They are also known for their seasonal migrations in search of food, particularly during mass fruiting events in forests.
          </Text>
        </View>

        <View style={styles.animalSection}>
          <Text style={styles.animalTitle}>Long Tailed Macaque</Text>
          <Image source={longtailmacImage} style={styles.animalImage} />
          <Text style={styles.animalDescription}>
            A highly adaptable primate found in Southeast Asia, known for its long tail and social behavior. Often seen in forests and near human settlements, they are opportunistic feeders with a diet that includes fruits, leaves, and small animals.
          </Text>
        </View>

        <View style={styles.animalSection}>
          <Text style={styles.animalTitle}>Malayan Civet</Text>
          <Image source={malcivetImage} style={styles.animalImage} />
          <Text style={styles.animalDescription}>
            A carnivorous mammal native to Southeast Asia, the malayan civet has a slender body, short legs, and distinctive black and white markings. It feeds on small vertebrates, insects, and fruits, often inhabiting forests and plantations.
          </Text>
        </View>

        <View style={styles.animalSection}>
          <Text style={styles.animalTitle}>Marbled Cat</Text>
          <Image source={marbcatImage} style={styles.animalImage} />
          <Text style={styles.animalDescription}>
            A rare and elusive small wild cat found in Southeast Asia, the marbled cat has beautiful marbled patterns on its fur. It is arboreal and preys on birds, rodents, and other small animals in dense forest habitats.
          </Text>
        </View>

        <View style={styles.animalSection}>
          <Text style={styles.animalTitle}>Muntjac</Text>
          <Image source={muntjacImage} style={styles.animalImage} />
          <Text style={styles.animalDescription}>
            Also known as "barking deer" due to their unique barking calls, muntjacs are small deer native to Asia. They are solitary or live in pairs, feeding on leaves, fruits, and shoots, and are known for their short antlers.
          </Text>
        </View>

        <View style={styles.animalSection}>
          <Text style={styles.animalTitle}>Pig Tailed Macaque</Text>
          <Image source={pigtailmacImage} style={styles.animalImage} />
          <Text style={styles.animalDescription}>
            A medium-sized primate with a short, pig-like tail, commonly found in Southeast Asia. These intelligent and social animals live in forests and are known for their diverse diet and ability to use tools.
          </Text>
        </View>

        <View style={styles.animalSection}>
          <Text style={styles.animalTitle}>Sambar Deer</Text>
          <Image source={samdeerImage} style={styles.animalImage} />
          <Text style={styles.animalDescription}>
            One of the largest deer species in Southeast Asia, the Sambar has a sturdy build, long ears, and coarse fur. They are herbivores, grazing on grasses, shrubs, and fruits, often found in forests and grasslands.
          </Text>
        </View>

        <View style={styles.animalSection}>
          <Text style={styles.animalTitle}>Sun Bear</Text>
          <Image source={sunbearImage} style={styles.animalImage} />
          <Text style={styles.animalDescription}>
            The smallest bear species, native to Southeast Asia, with a distinctive orange-yellow chest patch. They are arboreal and primarily feed on insects, honey, and fruits. Sun Bears are crucial for seed dispersal and maintaining forest health.
          </Text>
        </View>

        <View style={styles.animalSection}>
          <Text style={styles.animalTitle}>Yellow Throated Marten</Text>
          <Image source={martenImage} style={styles.animalImage} />
          <Text style={styles.animalDescription}>
            A strikingly colorful and agile mammal with a bright yellow throat and chest. Found in forests of Asia, they are omnivores, feeding on fruits, insects, and small animals, and are known for their playful and curious nature.
          </Text>
        </View>
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
  overlay: {
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
  infoContainer: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#333",
    textAlign: "center",
  },
  animalSection: {
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    padding: 15,
  },
  animalTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  animalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  animalDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 5,
  },
});

export default InfoPage;
