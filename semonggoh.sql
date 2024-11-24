CREATE DATABASE IF NOT EXISTS semonggoh_wildlife_database;
USE semonggoh_wildlife_database;

CREATE TABLE roles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);
INSERT INTO roles (role_name) VALUES ('admin'), ('user');
SELECT * FROM roles;

CREATE TABLE wildlife (
    id INT AUTO_INCREMENT PRIMARY KEY,
    species_name VARCHAR(255),
    common_name VARCHAR(255),
    scientific_name VARCHAR(255),
    population_estimate INT,
    status ENUM('Endangered', 'Vulnerable', 'Threatened', 'Least Concern'),
    last_seen TIMESTAMP
);
-- INSERT INTO wildlife (species_name, common_name, scientific_name, population_estimate, status, last_seen) 
-- VALUES 
-- ('Pygmy Elephant', 'Bornean Pygmy Elephant', 'Elephas maximus borneensis', 150, 'Endangered', NOW()),
-- ('Clouded Leopard', 'Bornean Clouded Leopard', 'Neofelis diardi', 250, 'Vulnerable', NOW()),
-- ('Proboscis Monkey', 'Proboscis Monkey', 'Nasalis larvatus', 800, 'Endangered', NOW()),
-- ('Banteng', 'Bornean Banteng', 'Bos javanicus lowi', 350, 'Endangered',  NOW()),
-- ('Saltwater Crocodile', 'Bornean Saltwater Crocodile', 'Crocodylus porosus', 1000,  'Least Concern', NOW()),
-- ('Bornean Gibbon', 'Bornean White-bearded Gibbon', 'Hylobates albibarbis', 500, 'Vulnerable', NOW()),
-- ('Malay Civet', 'Malay Civet', 'Viverra tangalunga', 1200, 'Least Concern', NOW()),
-- ('Flying Fox', 'Bornean Flying Fox', 'Pteropus vampyrus', 1800,  'Least Concern', NOW()),
-- ('Helmeted Hornbill', 'Helmeted Hornbill', 'Rhinoplax vigil', 250, 'Endangered', NOW());


CREATE TABLE donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    amount DECIMAL(10, 2),
    donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message TEXT,
    UNIQUE (name, email)
);
-- INSERT INTO donations (email, amount, message)
-- SELECT email, ROUND(RAND() * 100, 2) AS amount, 'Sample donation message'
-- FROM users
-- ORDER BY RAND()
-- LIMIT 5;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    pass VARCHAR(100) NOT NULL,
    session_id VARCHAR(64) DEFAULT NULL,
    role_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE sensorData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sensor_id VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
