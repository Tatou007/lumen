-- Orbit Explorer crew-support request schema
CREATE DATABASE IF NOT EXISTS orbit_explorer CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE orbit_explorer;
CREATE TABLE IF NOT EXISTS medical_requests (
 id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
 crew_name VARCHAR(120) NOT NULL,
 support_type ENUM('Physical / medical','Psychological','General well-being','Other') NOT NULL,
 contact_channel VARCHAR(255) NOT NULL,
 summary TEXT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 status ENUM('new','reviewing','closed') NOT NULL DEFAULT 'new'
) ENGINE=InnoDB;

-- Suit inquiries from medical.html (suit designs page)
CREATE TABLE IF NOT EXISTS suit_inquiries (
 id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
 customer_name VARCHAR(120) NOT NULL,
 suit ENUM('Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune') NOT NULL,
 contact VARCHAR(255) NOT NULL,
 message TEXT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 status ENUM('new','answered','closed') NOT NULL DEFAULT 'new'
) ENGINE=InnoDB;
