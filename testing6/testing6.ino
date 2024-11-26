// Blynk Template and Auth Details
#define BLYNK_TEMPLATE_ID "TMPL6oSzabYYQ"         // Blynk Template ID for connecting to the correct project on Blynk Cloud
#define BLYNK_TEMPLATE_NAME "IoT 2"               // Name assigned to this Blynk project
#define BLYNK_AUTH_TOKEN "LBl4CX9PrqI9v9I--KKiYinh_yu6HQYc" // Authentication token to connect ESP32 to Blynk

// Include Required Libraries
#include <WiFi.h>                     // Library for Wi-Fi connection
#include <BlynkSimpleEsp32.h>         // Blynk library for ESP32 connection to Blynk Cloud
#include <Firebase_ESP_Client.h>      // Library for Firebase communication
#include <FS.h>                       // File System library for file handling
#include <SPIFFS.h>                   // SPIFFS library for file storage on ESP32
#include "addons/TokenHelper.h"       // Provides token generation helper functions for Firebase
#include "addons/RTDBHelper.h"        // Provides helper functions for Firebase Realtime Database (RTDB) operations
 
// Wi-Fi and Firebase Credentials
const char* ssid = "Xiaomi 11T";    // Wi-Fi network name
const char* pass = "kenneth04";          // Wi-Fi password

#define API_KEY "AIzaSyCCTAz4xI6VEoqxloEIGYZMkrjDcaVFISI" // Firebase API key
#define DATABASE_URL "https://iots-f5f6a-default-rtdb.asia-southeast1.firebasedatabase.app" // Firebase RTDB URL   
#define STORAGE_BUCKET "iots-f5f6a.firebasestorage.app" // Firebase Storage bucket name

// Firebase Data Objects
FirebaseData firebaseData;             // Object to handle data transactions with Firebase
FirebaseAuth firebaseAuth;             // Object for Firebase authentication
FirebaseConfig firebaseConfig;         // Object for Firebase configuration settings

// Pin Connections and Variables
const int trigPin = 22;                // Ultrasonic sensor trigger pin
const int echoPin = 23;                // Ultrasonic sensor echo pin
const int yellowLedPin = 12;           // Yellow LED pin
const int redLedPin = 14;              // Red LED pin
const int buttonPin = 18;              // Button pin for user input
const int analogSoundPin = 34;         // Analog sound sensor pin

long duration;                         // Time taken for ultrasonic pulse to return
int ObjectDetect = 0;                  // Calculated distance from ultrasonic sensor
int buttonState = 0;                   // Button press status (0 = not pressed, 1 = pressed)
int analogSoundValue = 0;              // Sound level read from the sound sensor

// Blynk Virtual Pins
#define VIRTUAL_PIN_ObjectDetected V0         // Virtual pin for displaying distance on Blynk
#define VIRTUAL_PIN_SOUND V1            // Virtual pin for displaying sound level on Blynk
#define VIRTUAL_PIN_BUTTON  V2
#define VIRTUAL_PIN_YELLOW_LED V3       // Virtual pin to control yellow LED
#define VIRTUAL_PIN_RED_LED V4          // Virtual pin to control red LED

// Blynk Timer
BlynkTimer timer;                       // Timer for scheduling repeated tasks in Blynk

// Firebase Token Status Callback Function
void MyTokenStatusCallback(token_info_t info) {
  // Handles Firebase token status updates
  if (info.status == token_status_ready) {
    Serial.println("Token generation completed.");
  } else if (info.status == token_status_error) {
    Serial.printf("Token error: %s\n", info.error.message.c_str());
  }
}

// Function to Upload Data to Firebase Realtime Database
void uploadDataToFirebaseDatabase(String objectDetected, int soundValue, bool yellowLedStatus, bool redLedStatus, bool buttonPressed) {
    String path = "/sensorData"; // Database path for storing data

    FirebaseJson jsonData; // Object to store data in JSON format
    jsonData.set("ObjectDetect", objectDetected); // Add distance to JSON
    jsonData.set("soundValue", soundValue); // Add sound level to JSON
    jsonData.set("yellowLedStatus", yellowLedStatus ? "ON" : "OFF"); // Add yellow LED status to JSON
    jsonData.set("redLedStatus", redLedStatus ? "ON" : "OFF"); // Add red LED status to JSON
    jsonData.set("buttonPressed", buttonPressed ? "YES" : "NO"); // Add button press status to JSON

    // Upload JSON data to Firebase
    if (Firebase.RTDB.setJSON(&firebaseData, path, &jsonData)) {
        Serial.println("Data uploaded to Firebase Realtime Database successfully.");
    } else {
        Serial.print("Failed to upload data: ");
        Serial.println(firebaseData.errorReason());
    }
}

// Update Function to Upload Data to Firebase Storage
void uploadDataToFirebaseStorage(String ObjectDetect, int soundValue, bool yellowLedStatus, bool redLedStatus, bool buttonPressed) {
  String filePath = "/sensorData/sensor_data.txt"; // Path in Firebase Storage
  String localFileName = "/tmp/sensor_data.txt";   // Local file for temporary storage
  String existingContent;

  // Download existing data from Firebase Storage
  if (Firebase.Storage.download(&firebaseData, STORAGE_BUCKET, filePath.c_str(), localFileName.c_str(), mem_storage_type_flash)) {
    File file = SPIFFS.open(localFileName, "r"); // Open file for reading
    if (file) {
      existingContent = file.readString(); // Read existing data
      file.close();
    }
    SPIFFS.remove(localFileName); // Delete local temporary file
  } else {
    Serial.println("No existing data found, starting fresh.");
  }

  // Determine object detection status as "Yes" or "No"
  String objectDetected = (ObjectDetect.toInt() < 400) ? "YES" : "NO"; // Convert ObjectDetect to int for comparison

  // Append new data to existing content with LED statuses
  String newData = "ObjectDetect: " + objectDetected + ", Sound: " + String(soundValue) + 
                   ", Yellow LED: " + (yellowLedStatus ? "ON" : "OFF") + 
                   ", Red LED: " + (redLedStatus ? "ON" : "OFF") + 
                   ", Button Pressed: " + (buttonPressed ? "YES" : "NO") + "\n";

  String updatedContent = existingContent + newData;

  const uint8_t* data = (const uint8_t*)updatedContent.c_str(); // Convert content to byte array
  size_t len = updatedContent.length(); // Get content length

  // Upload updated content to Firebase Storage
  if (!Firebase.Storage.upload(&firebaseData, STORAGE_BUCKET, data, len, filePath.c_str(), "text/plain")) {
    Serial.print("Failed to upload updated file: ");
    Serial.println(firebaseData.errorReason());
  } else {
    Serial.println("Data uploaded successfully to Firebase Storage.");
  }
}

// Setup Function
void setup() {
  Serial.begin(115200);                 // Initialize Serial Monitor
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass); // Connect to Blynk Cloud

  // Firebase configuration
  firebaseConfig.api_key = API_KEY;
  firebaseConfig.database_url = DATABASE_URL;
  firebaseConfig.token_status_callback = MyTokenStatusCallback; // Set token callback

  // Firebase signup and connection
  if (Firebase.signUp(&firebaseConfig, &firebaseAuth, "", "")){
    Serial.println("Signup successful");
  } else {
    Serial.printf("Signup error: %s\n", firebaseConfig.signer.signupError.message.c_str());
  }

  Firebase.begin(&firebaseConfig, &firebaseAuth);
  Firebase.reconnectWiFi(true); // Enable auto Wi-Fi reconnect

  // Initialize GPIO pins
  pinMode(trigPin, OUTPUT);          // Set ultrasonic trigger pin as output
  pinMode(echoPin, INPUT);           // Set ultrasonic echo pin as input
  pinMode(yellowLedPin, OUTPUT);     // Set yellow LED pin as output
  pinMode(redLedPin, OUTPUT);        // Set red LED pin as output
  pinMode(buttonPin, INPUT_PULLUP);  // Set button pin with pull-up resistor
  pinMode(analogSoundPin, INPUT);    // Set sound sensor pin as input

  // Initialize SPIFFS
  if (!SPIFFS.begin(true)) {
    Serial.println("Failed to mount SPIFFS");
    return;
  }

  Serial.println("Setup complete: Ultrasonic sensor with Blynk and sound sensor started.");
  timer.setInterval(100L, classifyAndSendSoundData); // Schedule sound data function every 100 ms
}

// Main Loop Function
void loop() {
  Blynk.run();                           // Run Blynk tasks
  timer.run();                           // Run scheduled tasks in Blynk

  buttonState = digitalRead(buttonPin);  // Read button state

  // Check if the button is pressed
  bool buttonPressed = (buttonState == LOW); // Track if the button is pressed
  if (buttonPressed) { // If the button is pressed
      Serial.println("Button Pressed!"); // Print to Serial Monitor
      Blynk.virtualWrite(VIRTUAL_PIN_BUTTON, 1); // Send pressed state to Blynk
  } else {
      Blynk.virtualWrite(VIRTUAL_PIN_BUTTON, 0); // Send not pressed state to Blynk
  }

  // Measure distance using ultrasonic sensor
  digitalWrite(trigPin, LOW);            // Start with trigger pin low
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);           // Send a 10µs pulse
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);            // Set trigger pin low

  duration = pulseIn(echoPin, HIGH, 60000); // Measure pulse duration from echo pin
  
  if (duration > 0) {
    ObjectDetect = duration * 0.034 / 2; // Calculate distance in cm

    // Determine if an object is detected
    String objectDetected = (ObjectDetect < 100) ? "Yes" : "NO";

    Serial.print("ObjectDetect: ");
    Serial.println(objectDetected);

    Blynk.virtualWrite(VIRTUAL_PIN_ObjectDetected, objectDetected == "Yes" ? 1 : 0); // Send "Yes" or "No" to Blynk

    // Turn on yellow LED when an object is detected within 100 cm
    bool yellowLedStatus = (ObjectDetect < 100); // Condition to detect an object
    digitalWrite(yellowLedPin, yellowLedStatus ? HIGH : LOW); // Control yellow LED
    Blynk.virtualWrite(VIRTUAL_PIN_YELLOW_LED, yellowLedStatus ? 1 : 0); // Update Blynk

    // Turn on red LED if distance is less than 50 cm and button is pressed or if sound level is high
    bool redLedStatus = ((ObjectDetect < 100 && buttonState == LOW) || analogSoundValue >= 2000);
    digitalWrite(redLedPin, redLedStatus ? HIGH : LOW); // Control red LED
    Blynk.virtualWrite(VIRTUAL_PIN_RED_LED, redLedStatus ? 1 : 0); // Update Blynk

    analogSoundValue = analogRead(analogSoundPin); // Read sound sensor
    Serial.print("Sound Value: ");
    Serial.println(analogSoundValue);
    Blynk.virtualWrite(VIRTUAL_PIN_SOUND, analogSoundValue); // Send sound level to Blynk

    uploadDataToFirebaseDatabase(objectDetected, analogSoundValue, yellowLedStatus, redLedStatus, buttonPressed); // Upload data to Firebase RTDB
    uploadDataToFirebaseStorage(objectDetected, analogSoundValue, yellowLedStatus, redLedStatus, buttonPressed); // Upload data to Firebase Storage

    delay(1000); // Wait 1000 ms before next reading
  }
}

// Function to Classify and Send Sound Data
void classifyAndSendSoundData() {
  analogSoundValue = analogRead(analogSoundPin); // Read sound sensor value
  Blynk.virtualWrite(VIRTUAL_PIN_SOUND, analogSoundValue); // Send to Blynk for visualization
}
