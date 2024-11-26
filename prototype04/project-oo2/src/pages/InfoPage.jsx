// src/pages/InfoPage.jsx
import React, { useEffect } from "react";
import './InfoPage.css';
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
import infoImage from '../assets/info.jpg'; // Import your banner image

const InfoPage = () => {
  useEffect(() => {
    document.title = "Information - Semonggoh Wildlife Centre";
  }, []);

  return (
    <>
      <div className="hero-section" style={{ backgroundImage: `url(${infoImage})` }}>
        <div className="hero-text-container">
          <h1 className="hero-title">Discover the Wildlife</h1>
          <p className="hero-description">Explore fascinating information about various wildlife species and their roles in the ecosystem. Learn how conservation efforts are vital to protecting these incredible animals and their habitats.</p>
        </div>
      </div>
      <div className="info-container">
        <h1 className="info-title">Information Page</h1>

        {/* Orangutan Section */}
        <section className="animal-section">
          <h2 className="animal-title">Orangutan</h2>
          <img src={orangutanImage} alt="Orangutan" className="animal-image" />
          <p className="animal-description">
            Orangutans are great apes found only in the rainforests of Borneo and Sumatra. 
            They are known for their intelligence, red hair, and powerful arms.
            Unfortunately, they are critically endangered due to deforestation and habitat loss.
          </p>
        </section>

        {/* Hornbill Section */}
        <section className="animal-section">
          <h2 className="animal-title">Hornbill</h2>
          <img src={hornbillImage} alt="Hornbill" className="animal-image" />
          <p className="animal-description">
            Hornbills are distinctive birds known for their large bills, which sometimes have a casque on top. 
            Found in tropical and subtropical Africa and Asia, hornbills play an important role in the ecosystem as seed dispersers.
          </p>
        </section>

        {/* Mousedeer Section */}
        <section className="animal-section">
          <h2 className="animal-title">Mousedeer</h2>
          <img src={mousedeerImage} alt="Mousedeer" className="animal-image" />
          <p className="animal-description">
            A mousedeer, also known as a chevrotain, is a small, delicate creature that looks like a mix between a mouse and a deer. 
            Its slender legs and tiny frame make it one of the smallest ungulates in the animal kingdom. 
            Despite its size, the mousedeer is a swift and elusive animal, often spotted darting through dense forests.
          </p>
        </section>

        {/* Leopard Cat Section */}
        <section className="animal-section">
          <h2 className="animal-title">Leopard Cat</h2>
          <img src={leocatImage} alt="Leopard Cat" className="animal-image" />
          <p className="animal-description">
            A leopard cat is a small wild cat native to Asia, known for its striking spotted coat that resembles that of a leopard. 
            With sharp hunting skills, it thrives in various habitats, from forests to farmlands. 
            Though wild, it’s often admired for its beautiful and elusive nature.
          </p>
        </section>

        {/* Bearded Pig Section */}
        <section className="animal-section">
          <h2 className="animal-title">Bearded Pig</h2>
          <img src={beardedpigImage} alt="Bearded Pig" className="animal-image" />
          <p className="animal-description">
          A unique wild pig species native to Southeast Asia, named for the distinctive "beard" of coarse hair along its snout and cheeks. Bearded Pigs are primarily found in forests and mangroves, where they forage for roots, fruits, and small invertebrates. They are also known for their seasonal migrations in search of food, particularly during mass fruiting events in forests.
          </p>
        </section>

        {/* Long Tailed Macaque Section */}
        <section className="animal-section">
          <h2 className="animal-title">Long Tailed Macaque</h2>
          <img src={longtailmacImage} alt="Long Tailed Macaque" className="animal-image" />
          <p className="animal-description">
          A highly adaptable primate found in Southeast Asia, known for its long tail and social behavior. Often seen in forests and near human settlements, they are opportunistic feeders with a diet that includes fruits, leaves, and small animals.
          </p>
        </section>

        {/* Malayan Civet Section */}
        <section className="animal-section">
          <h2 className="animal-title">Malayan Civet</h2>
          <img src={malcivetImage} alt="Malayan Civet" className="animal-image" />
          <p className="animal-description">
          A carnivorous mammal native to Southeast Asia, the malayan civet has a slender body, short legs, and distinctive black and white markings. It feeds on small vertebrates, insects, and fruits, often inhabiting forests and plantations.
          </p>
        </section>

        {/* Marbled Cat Section */}
        <section className="animal-section">
          <h2 className="animal-title">Marbled Cat</h2>
          <img src={marbcatImage} alt="Marbled Cat" className="animal-image" />
          <p className="animal-description">
          A rare and elusive small wild cat found in Southeast Asia, the marbled cat has beautiful marbled patterns on its fur. It is arboreal and preys on birds, rodents, and other small animals in dense forest habitats.
          </p>
        </section>

        {/* Muntjac Section */}
        <section className="animal-section">
          <h2 className="animal-title">Muntjac</h2>
          <img src={muntjacImage} alt="Muntjac" className="animal-image" />
          <p className="animal-description">
          Also known as "barking deer" due to their unique barking calls, muntjacs are small deer native to Asia. They are solitary or live in pairs, feeding on leaves, fruits, and shoots, and are known for their short antlers.
          </p>
        </section>

        {/* Pig Tailed Macaque Section */}
        <section className="animal-section">
          <h2 className="animal-title">Pig Tailed Macaque</h2>
          <img src={pigtailmacImage} alt="Pig Tailed Macaque" className="animal-image" />
          <p className="animal-description">
          A medium-sized primate with a short, pig-like tail, commonly found in Southeast Asia. These intelligent and social animals live in forests and are known for their diverse diet and ability to use tools.
          </p>
        </section>

        {/* Sambar Deer Section */}
        <section className="animal-section">
          <h2 className="animal-title">Sambar Deer</h2>
          <img src={samdeerImage} alt="Sambar Deer" className="animal-image" />
          <p className="animal-description">
          One of the largest deer species in Southeast Asia, the Sambar has a sturdy build, long ears, and coarse fur. They are herbivores, grazing on grasses, shrubs, and fruits, often found in forests and grasslands.
          </p>
        </section>

        {/* Sun Bear Section */}
        <section className="animal-section">
          <h2 className="animal-title">Sun Bear</h2>
          <img src={sunbearImage} alt="Sun Bear" className="animal-image" />
          <p className="animal-description">
          The smallest bear species, native to Southeast Asia, with a distinctive orange-yellow chest patch. They are arboreal and primarily feed on insects, honey, and fruits. Sun Bears are crucial for seed dispersal and maintaining forest health.
          </p>
        </section>

        {/* Yellow Throated Marten Section */}
        <section className="animal-section">
          <h2 className="animal-title">Yellow Throated Marten</h2>
          <img src={martenImage} alt="Yellow Throated Marten" className="animal-image" />
          <p className="animal-description">
          A strikingly colorful and agile mammal with a bright yellow throat and chest. Found in forests of Asia, they are omnivores, feeding on fruits, insects, and small animals, and are known for their playful and curious nature.
          </p>
        </section>
      </div>
    </>
  );
};

export default InfoPage;
