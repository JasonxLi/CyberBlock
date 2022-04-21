-- Semester One Database Code
-- Create the attack table
-- Attributes: AttackID, Name, Difficulty, Description
CREATE TABLE attack (
AttackID INT NOT NULL AUTO_INCREMENT,
Name VARCHAR(255) NOT NULL,
Difficulty INT NOT NULL,
Description VARCHAR(255) NOT NULL,
PRIMARY KEY (AttackID)
);

-- Apply rows to attack table
INSERT INTO Attack (AttackID, Name, Difficulty)
VALUES (1001, 'Supply Chain Attack (Dark Horse)', 1),
	   (1002,'FCA Required', 1),
	   (1003,'Malware Attack Attempt (Device Compromised)', 1),
	   (1004,'Unintended Use', 1),
	   (1005,'Access Control', 1),
	   (1006,'Device is no longer in the hands of the owner', 1),
	   (1007,'Software Update Required', 1),
	   (1008,'Unreliable Network Connection', 1),
	   (1009,'Malware Attack (Network Compromised)', 1),       
	   (1010,'Power Outage', 1),       
 	   (1011,'Competitor Attack (Dark Horse)', 1);  


-- Create the defense table
-- Attributes: DefenseID, Name, Cost, Difficulty, Description
CREATE TABLE defense (
DefenseID INT NOT NULL AUTO_INCREMENT,
Name VARCHAR(255) NOT NULL,
Cost INT NOT NULL,
Difficulty INT NOT NULL,
PRIMARY KEY (DefenseID)
);

-- Apply rows to defense table
INSERT INTO Defense (DefenseID, Name, Cost, Difficulty)
VALUES (2001, 'Anti-Virus Software', 5, 1),
	   (2002, 'Automatic Network Connection', 5, 1),
	   (2003, '"Break-Glass"- Demo Mode', 5, 1),
	   (2004, 'Certificate Expiration', 7, 1),
	   (2005, 'Certified Suppliers', 8, 1),
	   (2006, 'Data Encryption', 8, 1),
	   (2007, 'Factory Reset After Reboot', 7, 1),
	   (2008, 'Fingerprint Reader', 8, 1),
	   (2009, 'GPS-Based Access', 6, 1),       
	   (2010, 'Historical Records (Patient Repository)', 7, 1),      
	   (2011, 'IFU (Network Specifications)', 2, 1),
	   (2012, 'Integrity Checking', 7, 1),
	   (2013, 'Network Connectivity Checker', 5, 1),
	   (2014, 'Notifications/Error Messages', 4, 1),
	   (2015, 'Password', 3, 1),
	   (2016, 'Privileged Users', 5, 1),
	   (2017, 'Push Notification', 6, 1),
	   (2018, 'Read-Only Software', 7, 1),
	   (2019, 'Remote Software Packages', 8, 1),
	   (2020, 'System Monitoring', 7, 1),
	   (2021, 'Token - Hardware', 8, 1),
	   (2022, 'Token - Software', 6, 1),
	   (2023, 'Traceable Supply Chain (sBOM)', 6, 1),
	   (2024, 'Two-Factor Authentication', 7, 1),
	   (2025, 'Uniquely Identify Devices (Serial Numbers)', 2, 1),
	   (2026, 'Updatable Device', 8, 1);


-- Create the points table
-- Attributes: PointID, Attack_ID, Defense_ID, PointValue
CREATE TABLE points (
PointID INT NOT NULL AUTO_INCREMENT,
Attack_ID INT NOT NULL,
Defense_ID INT NOT NULL,
PointValue INT NOT NULL,
PRIMARY KEY (PointID),
FOREIGN KEY (Attack_ID) REFERENCES attack(AttackID),
FOREIGN KEY (Defense_ID) REFERENCES defense(DefenseID)
);

-- Create the Wildcard table
-- Attributes: WildcardID, Question, Option1, Option2, Option3, Option4
CREATE TABLE wildcard (
WildcardID INT NOT NULL AUTO_INCREMENT,
Question VARCHAR(255) NOT NULL,
Option1 VARCHAR(255),
Option2 VARCHAR(255),
Option3 VARCHAR(255),
Option4 VARCHAR(255),
Answer VARCHAR(255),
PRIMARY KEY (WildcardID)
);

-- Apply rows to attack table
INSERT INTO Wildcard (Question)
VALUES ('What does sBOM stand for?'),
	   ('What is the expected life of a medical device?'),
	   ('Safety is keeping bad products from harming good people; Security is keeping bad people from harming good products.'),
	   ('Which of the following is not a threat modeling technique?'),
	   ('What does CVSS stand for?'),
	   ('What is not a security concern for the FDA?'),
	   ('What does CIA stand for?'),
	   ('A black hat hacker is someone who is ethically hacking.'),
	   ('What does PHI stand for?');

-- Start the database
USE `heroku_6409ef74c48b643`;

-- View the table
SELECT * FROM attack;
SELECT * FROM defense;
SELECT * FROM points;
SELECT * FROM wildcard;

-- Get the number of rows
SELECT COUNT(*) FROM attack;
SELECT COUNT(*) FROM defense;
SELECT COUNT(*) FROM points;
SELECT COUNT(*) FROM wildcard;

-- Get a random trivia question
SELECT wildcard.Question, wildcard.Option1, wildcard.Option2, wildcard.Option3, wildcard.Option4, wildcard.Answer FROM wildcard
ORDER BY RAND() LIMIT 1;

-- Get all defenses that have the difficulty of ${difficulty}
SELECT defense.DefenseID, defense.Name, defense.cost FROM defense
WHERE defense.Difficulty = 1;
SELECT defense.DefenseID, defense.Name, defense.cost FROM defense
WHERE defense.Difficulty = ${difficulty};

-- Get a random attack with a difficulty of ${difficulty}
SELECT attack.AttackID, attack.Name, attack.Description FROM attack 
WHERE attack.Difficulty = 1 
ORDER BY RAND() LIMIT 1;
SELECT attack.AttackID, attack.Name, attack.Description FROM attack 
WHERE attack.Difficulty = ${difficulty} 
ORDER BY RAND() LIMIT 1;

-- Get all defenses that counter ${specificAttackID}
SELECT defense.DefenseID, defense.Name FROM defense
JOIN points ON defense.DefenseID = points.Defense_ID 
WHERE points.Attack_ID = 1035;
SELECT defense.DefenseID, defense.Name FROM defense
JOIN points ON defense.DefenseID = points.Defense_ID 
WHERE points.Attack_ID = ${specificAttackID};

-- Get the point value when successfully countering an attack with defenses
SELECT points.PointValue FROM points
WHERE points.Attack_ID = 1001
AND points.Defense_ID = 2005;
SELECT points.PointValue FROM points
WHERE points.Attack_ID = ${attackID}
AND points.Defense_ID = ${defenseID};


-- Apply rows to attack table
INSERT INTO Attack (AttackID, Name, Difficulty)
VALUES (1012, 'Exploiting Trust in Client', 1),
	   (1013, 'Fuzzing', 1),
	   (1014, 'Adversary in the Middle (AITM)', 1),
	   (1015, 'Brute Force', 1),
	   (1016, 'Privilege Abuse', 1),
	   (1017, 'Identify Spoofing', 1),
	   (1018, 'Reverse Engineering'),
	   (1019, 'Code Injection', 1),
	   (1020, 'Information Elicitation', 1),
       (1021, 'Modification During Manufacture', 1),
       (1022, 'Obstruction', 1),
       (1023, 'Authentication Abuse'),
       (1024, 'Configuration/Enviroment Manipulation', 1),
       (1025, 'Protocol Analysis', 1),
       (1026, 'Functionality Misuse'),
       (1027, 'Modification During Distribution', 1),
       (1028, 'Tampering', 1),
       (1029, 'Hardware Integrity Attack', 1),
       (1030, 'Content Spoofing', 1),
       (1031, 'Software Integrity Attack', 1),
       (1032, 'Human Behavior Manipulation', 1),
       (1033, 'Interception', 1),
       (1034, 'Bypassing Physical Security', 1),
       (1035, 'Physical Theft', 1);


-- Apply rows to attack table
INSERT INTO Defense (DefenseID, Name, Cost, Difficulty)
VALUES (2027, 'Continuous Verification', 8, 1),
	   (2028, 'Segmentation', 3, 1),
       (2029, 'Anti-Fuzzing Design Techniques', 3, 1),
       (2030, 'Monitoring', 5, 1),
       (2031, 'Password Policies', 2, 1),
       (2032, 'User training', 1, 1),
       (2033, 'Tamper Detection', 5, 1),
       (2034, 'Logging', 1, 1),
       (2035, 'Digital Certification', 7, 1),
       (2036, 'Biometrics', 8, 1),
       (2037, 'Comm Channel Encryption', 10, 1),
       (2038, 'Anti-Disassembly Techniques', 3, 1),
       (2039, 'Control Flow Obfuscation', 3, 1),
       (2040, 'Information Hiding (APIs, Strings)', 1, 1),
       (2041, 'Log Monitoring', 5, 1),
       (2042, 'Access Controls', 1, 1),
       (2043, 'Physical Controls', 3, 1),
       (2044, 'Surveillance: Phone Home', 3, 1),
       (2045, 'Geo-Based Controls', 10, 1),
       (2046, 'Tamperproofing', 8, 1),
       (2047, 'Self Destroy', 8, 1);
   
   
   -- Apply rows to attack table
INSERT INTO Points (PointID, Attack_ID, Defense_ID, PointValue)
VALUES (100001, 1001, 2005, 3),
       (100002, 1001, 2010, 1),
       (100003, 1001, 2023, 4),
       (100004, 1001, 2025, 2),
       (100005, 1002, 2010, 3),
       (100006, 1002, 2017, 4),
       (100007, 1002, 2019, 5),
	(100008, 1002, 2023,	2),
       (100009, 1002, 2025,	1),
       (100010, 1002, 2026,	5),
       (100011, 1003, 2001,	3),
       (100012, 1003, 2006,	1),
       (100013, 1003, 2007,	5),
       (100014, 1003, 2011,	1),
       (100015, 1003, 2012,	4),
       (100016, 1003, 2016,	2),
       (100017, 1003, 2018,	5),
       (100018, 1003, 2020,	3),
       (100019, 1004, 2001,	1),
       (100020, 1004, 2007,	4),
       (100021, 1004, 2011,	5),
       (100022, 1004, 2016,	2),
       (100023, 1004, 2018,	3),
       (100024, 1005, 2003,	1),
       (100025, 1005, 2004,	3),
       (100026, 1005, 2008,	4),
       (100027, 1005, 2009,	1),
       (100028, 1005, 2015,	4),
       (100029, 1005, 2016,	3),
       (100030, 1005, 2018,	1),
       (100031, 1005, 2021,	5),
       (100032, 1005, 2022,	5),
       (100033, 1005, 2024,	5),
       (100034, 1006, 2004,	1),
       (100035, 1006, 2006,	4),
       (100036, 1006, 2008,	4),
       (100037, 1006, 2009,	1),
       (100038, 1006, 2015,	3),
       (100039, 1006, 2016,	3),
       (100040, 1006, 2018,	3),
       (100041, 1006, 2021,	5),
       (100042, 1006, 2022,	5),
       (100043, 1006, 2024,	5),
       (100044, 1007, 2002,	4),
       (100045, 1007, 2014,	1),
       (100046, 1007, 2017,	3),
       (100047, 1007, 2019,	5),
       (100048, 1007, 2026,	5),
       (100049, 1008, 2001,	1),
       (100050, 1008, 2007,	1),
       (100051, 1008, 2011,	2),
       (100052, 1008, 2012,	3),
       (100053, 1008, 2013,	5),
       (100054. 1008, 2016,	1),
       (100055, 1008, 2018,	1),
       (100056, 1008, 2020,	3),
       (100057, 1009, 2001,	3),
       (100058, 1009, 2006,	1),
       (100059, 1009, 2007,	4),
       (100060, 1009, 2011,	2),
       (100061, 1009, 2012,	4),
       (100062, 1009, 2016,	3),
       (100063, 1009, 2018,	4),
       (100064, 1009, 2020,	4),
       (100065, 1010, 2012,	3),
       (100066, 1010, 2014,	2),
       (100067, 1010, 2020,	3),
       (100068, 1011, 2001,	2),
       (100069, 1011, 2007,	3),
       (100070, 1011, 2012,	3),
       (100071, 1011, 2016,	3),
       (100072, 1011, 2018,	4),
       (100073, 1011, 2020,	3),
       (100074, 1012, 2027,	4),
       (100075, 1012, 2028,	2),
       (100076, 1013, 2029,	4),
       (100077, 1014, 2006,	5),
       (100078, 1015, 2031,	2),
       (100079, 1015, 2030,	1),
       (100080, 1016, 2015,	2),
       (100081, 1016, 2021,	3),
       (100082, 1016, 2022,	2),
       (100083, 1016, 2008,	4),
       (100084, 1016, 2009,	5),
       (100085, 1016, 2024,	5),
       (100086, 1017, 2024,	5),
       (100087, 1017, 2015,	2),
       (100088, 1017, 2021,	5),
       (100089, 1017, 2035,	4),
       (100090, 1017, 2036,	4),
       (100091, 1018, 2006,	5),
       (100092, 1018, 2038,	4),
       (100093, 1018, 2039,	3),
       (100094, 1018, 2040,	3),
       (100095, 1019, 2027,	4),
       (100096, 1020, 2032,	2),
       (100097, 1020, 2006,	1),
       (100098, 1021, 2012,	5),
       (100099, 1021, 2033,	3),
       (100100, 1021, 2005,	3),
       (100101, 1021, 2032,	1),
       (100102, 1022, 2014,	1),
       (100103. 1022, 2018,	2),
       (100104, 1022, 2007,	4),
       (100105, 1022, 2019,	3),
       (100106, 1023, 2015,	2),
       (100107, 1023, 2021,	3),
       (100108, 1023, 2022,	2),
       (100109, 1023, 2008,	4),
       (100110, 1023, 2009,	5),
       (100111, 1023, 2024,	5),
       (100112, 1024, 2018,	4),
       (100113, 1024, 2020,	3),
       (100114, 1024, 2012,	1),
       (100115, 1024, 2002,	3),
       (100116, 1025, 2006,	5),
       (100117, 1026, 2017,	2),
       (100118, 1026, 2011,	1),
       (100119, 1026, 2034,	2),
       (100120, 1027, 2012,	5),
       (100121, 1027, 2033,	3),
       (100122, 1028, 2033,	3),
       (100123, 1029, 2012,	5),
       (100124, 1029, 2005,	3),
       (100125, 1029, 2019,	3),
       (100126, 1012, 2021,	2),
       (100127, 1012, 2022,	4),
       (100128, 1030, 2006,	5),
       (100129, 1030, 2035,	4),
       (100130, 1017, 2015,	1),
       (100131, 1031, 2006,	5),
       (100132, 1031, 2018,	3),
       (100133, 1031, 2033,	1),
       (100134, 1031, 2020,	2),
       (100135, 1031, 2007, 4),
       (100136, 1031, 2019,	2),
       (100137, 1032, 2032,	3),
       (100138, 1032, 2011,	2),
       (100139, 1033, 2006,	3),
       (100140, 1033, 2037,	5),
       (100141, 1034, 2041,	2),
       (100142, 1034, 2042,	3),
       (100143, 1034, 2032,	1),
       (100144, 1034, 2043,	3),
       (100145, 1035, 2044,	1),
	(100146, 1035, 2045,	1),
       (100147, 1035, 2046,	2),
       (100148, 1035, 2047,	4);
   
       
       
-- Drop tables for revisions
DROP Table Attack;
DROP Table Defense;
DROP Table Points;
DROP Table Wildcard;


-- Semester Two Database Code

-- Create the attack table
-- Attributes: AttackID, AttackNumber, Difficulty, Name, Description
CREATE TABLE Attack (
AttackID INT NOT NULL,
AttackNumber INT NOT NULL,
Difficulty INT NOT NULL,
Name VARCHAR(255) NOT NULL,
Description VARCHAR(2000) NOT NULL,
PRIMARY KEY (AttackID)
);

-- Apply rows to attack table
INSERT INTO Attack (AttackID, AttackNumber, Difficulty, Name)
VALUES (2001, 1, 1, 'Exploiting Trust in Client - A'),
	(2002, 2, 1, 'Fuzzing'), 
       (2003, 3, 1, 'Adversary in the Middle (AITM) - A'),
       (2004, 4, 1, 'Brute Force'),
       (2005, 5, 1, 'Privilege Abuse - A'),
       (2006, 6, 1, 'Identity Spoofing - A'),
       (2007, 7, 1, 'Reverse Engineering - A'),
       (2008, 8, 1, 'Code Injection'),
       (2009, 9, 1, 'Information Elicitation'),
       (2010, 10, 1, 'Modification During Manufacture - A'),
       (2011, 11, 1, 'Tampering'),
       (2012, 12, 1, 'Obstruction - A'),
       (2013, 13, 1, 'Authentication Abuse'),
       (2014, 14, 1, 'Privilege Abuse - B'),
       (2015, 15, 1, 'Infrastructure Manipulation'),
       (2016, 16, 1, 'Configuration/Environment Manipulation'),
       (2017, 17, 1, 'Reverse Engineering - B'),
       (2018, 18, 1, 'Protocol Analysis'),
       (2019, 19, 1, 'Functionality Misuse'),
       (2020, 20, 1, 'Modification During Manufacture - B'),
       (2021, 21, 1, 'Modification During Distribution'),
       (2022, 22, 1, 'Hardware Integrity Attack'),
       (2023, 23, 1, 'Obstruction - B'),
       (2024, 24, 1, 'Exploiting Trust in Client - B'),
       (2025, 25, 1, 'Adversary in the Middle (AITM) - B'),
       (2026, 26, 1, 'Manipulation Human Behavior - A'),
       (2027, 27, 1, 'Identity Spoofing - B'),
       (2028, 28, 1, 'Obstruction - C'),
       (2029, 29, 1, 'Software Integrity Attack - A'),
       (2030, 30, 1, 'Modification During Manufacture'),
       (2031, 31, 1, 'Manipulation During Distribution'),
       (2032, 32, 1, 'Hardware Integrity Attack - A'),
       (2033, 33, 1, 'Identity Spoofing - C'),
       (2034, 34, 1, 'Software Integrity Attack - B'),
       (2035, 35, 1, 'Information Elicitation'),
	   (2036, 36, 1, 'Manipulation Human Behavior - B'),
       (2037, 37, 1, 'Obstruction - D'),
       (2038, 38, 1, 'Interception'),
       (2039, 39, 1, 'Reverse Engineering - C'),
       (2040, 40, 1, 'Bypassing Physical Security'),
       (2041, 41, 1, 'Hardware Integrity Attack - B'),
       (2042, 42, 1, 'Physical Theft');


-- Create the defense table
-- Attributes: DefenseID, DefenseNumber, Cost, Difficulty, Name, Description
CREATE TABLE Defense (
DefenseID INT NOT NULL,
DefenseNumber INT NOT NULL,
Cost INT NOT NULL,
Difficulty INT NOT NULL,
Name VARCHAR(255) NOT NULL,
Description VARCHAR(2000) NOT NULL,
PRIMARY KEY (DefenseID)
);

-- Apply rows to defense table
INSERT INTO Defense (DefenseID, DefenseNumber, Cost, Difficulty, Name)
VALUES (1001, 1, 8, 1, 'Zero-Trust:Continuious Verification'),
	(1002, 2, 3, 1, 'Zero Trust:Segmentation'), 
       (1003, 3, 3, 1, 'Anti-Fuzzing Design Techniques'),
       (1004, 4, 10, 1, 'Encryption'),
       (1005, 5, 2, 1, 'Authorization:Password Policies'),
       (1006, 6, 5, 1, 'System Monitoring'),
       (1007, 7, 1, 1, 'Authentication:Password'),
       (1008, 8, 8, 1, 'Authentication:Token-Hardware'),
       (1009, 9, 6, 1, 'Authentication:Token-Software'),
       (1010, 10, 8, 1, 'Authentication:Biometrics'),
       (1011, 11, 10, 1, 'Authentication:GPS-Based Access'),
       (1012, 12, 7, 1, 'Authentication:Two-Factor '),
       (1013, 13, 1, 1, 'Training:User '),
       (1014, 14, 3, 1, 'Integrity Checking'),
       (1015, 15, 5, 1, 'Tamper Detection'),
       (1016, 16, 2, 1, 'Certified Suppliers'),
       (1017, 17, 1, 1, 'Notification / Error Message '),
       (1018, 18, 2, 1, 'Read-Only Software'),
       (1019, 19, 5, 1, 'Factory Reset After Reboot'),
       (1020, 20, 7, 1, 'Remote Software Install '),
       (1021, 21, 2, 1, 'Push Notifications'),
       (1022, 22, 1, 1, 'Logging'),
       (1023, 23, 7, 1, 'Redundency'),
       (1024, 24, 7, 1, 'Authentication:Digital Certificates'),
       (1025, 25, 5, 1, 'Authorization '),
       (1026, 26, 0, 1, 'No-op'),
       (1027, 27, 3, 1, 'Anti-Disassembly Techniques'),
       (1028, 28, 3, 1, 'Control Flow Obfuscation'),
       (1029, 29, 3, 1, 'Surveillance:Phone Home'),
       (1030, 30, 8, 1, 'Physical Control:Tamperproofing '),
       (1031, 31, 8, 1, 'Physical Control:Self Destroy   '),
       (1032, 32, 3, 1, 'Physical Controls:Locks'),
       (1033, 33, 1, 1, 'Automatic Network Connection');


-- Create the points table
-- Attributes: PointsID, Defense_ID, DefenseNumber, Attack_ID, AttackNumber, PointValue
CREATE TABLE Points (
PointID INT NOT NULL,
Defense_ID INT NOT NULL,
DefenseNumber INT NOT NULL,
Attack_ID INT NOT NULL,
AttackNumber INT NOT NULL,
PointValue INT NOT NULL,
PRIMARY KEY (PointID),
FOREIGN KEY (Attack_ID) REFERENCES attack(AttackID),
FOREIGN KEY (Defense_ID) REFERENCES defense(DefenseID)
);

-- Apply rows to points table
INSERT INTO Points (PointID, DefenseNumber, Cost, Difficulty, Name)
VALUES (1, 1001, 1,	2001, 1, 4),
          (2, 1002, 2, 2001, 1, 2), 
          (3, 1003, 3, 2002, 2, 4),
	   (4, 1004, 4, 2003, 3, 5),
	   (5, 1005, 5, 2004, 4, 2),
          (6, 1006, 6, 2004, 4, 4),
	   (7, 1007, 7, 2005, 5, 2),
	   (8, 1008, 8, 2005, 5, 3),
	   (9, 1009, 9, 2005, 5, 2),
	   (10, 1010, 10, 2005, 5, 4),
	   (11, 1011, 11, 2005, 5, 5),
	   (12, 1012, 12, 2005, 5, 5),
	   (13, 1012, 12, 2006, 6, 5),
	   (14, 1004, 4, 2007, 7, 5),
	   (15, 1001, 1, 2008, 8, 4),
	   (16, 1013, 13, 2009, 9, 2),
	   (17, 1014, 14, 2010, 10, 5),
	   (18, 1013, 13, 2011, 11, 1),
	   (19, 1015, 15, 2011, 11, 3),
	   (20, 1016, 16, 2011, 11, 3),
	   (21, 1017, 17, 2012, 12, 1),
	   (22, 1018, 18, 2012, 12, 2),
	   (23, 1019, 19, 2012, 12, 4),
	   (24, 1020, 20, 2012, 12, 3),
	   (25, 1007, 7, 2013, 13, 2),
	   (26, 1008, 8, 2013, 13, 3),
	   (27, 1009, 9, 2013, 13, 2),
	   (28, 1010, 10, 2013, 13, 4),
	   (29, 1011, 11, 2013, 13, 5),
	   (30, 1012, 12, 2013, 13, 5),
	   (31, 1007, 7, 2014, 14, 2),
	   (32, 1008, 8, 2014, 14, 3),
	   (33, 1009, 9, 2014, 14, 2),
	   (34, 1010, 10, 2014, 14, 4),
	   (35, 1011, 11, 2014, 14, 5),
	   (36, 1012, 12, 2014, 14, 4),
	   (37, 1006, 6, 2015, 15, 4),
	   (38, 1006, 6, 2016, 16, 4),
	   (39, 1014, 14, 2016, 16, 1),
	   (40, 1018, 18, 2016, 16, 4),
	   (41, 1033, 33, 2016, 16, 3),
	   (42, 1004, 4, 2017, 17, 5),
	   (43, 1004, 4, 2018, 18, 5),
	   (44, 1013, 13, 2019, 19, 1),
	   (45, 1021, 21, 2019, 19, 2),
	   (46, 1022, 22, 2019, 19, 2),
	   (47, 1013, 13, 2020, 20, 1),
	   (48, 1014, 14, 2020, 20, 5),
	   (49, 1015, 15, 2020, 20, 3),
	   (50, 1016, 16, 2020, 20, 3),
	   (51, 1014, 14, 2021, 21, 5),
	   (52, 1015, 15, 2021, 21, 3),
	   (53, 1014, 14, 2022, 22, 5),
	   (54, 1018, 18, 2023, 23, 2),
	   (55, 1019, 19, 2023, 23, 4),
	   (56, 1020, 20, 2023, 23, 3),
	   (57, 1023, 23, 2023, 23, 1),
	   (58, 1008, 8, 2024, 24, 4),
	   (59, 1009, 9, 2024, 24, 2),
	   (61, 1004, 4, 2026, 26, 5),
	   (62, 1013, 13, 2026, 26, 2),
	   (63, 1024, 24, 2026, 26, 4),
	   (64, 1007, 7, 2027, 27, 1),
	   (65, 1018, 18, 2028, 28, 2),
	   (66, 1019, 19, 2028, 28, 4),
	   (67, 1020, 20, 2028, 28, 2),
	   (68, 1023, 23, 2028, 28, 1),
	   (69, 1004, 4, 2029, 29, 5),
	   (70, 1015, 15, 2029, 29, 1),
	   (71, 1018, 18, 2029, 29, 3),
	   (72, 1013, 13, 2030, 30, 1),
	   (73, 1014, 14, 2030, 30, 5),
	   (74, 1015, 15, 2030, 30, 3),
	   (75, 1016, 16, 2030, 30, 3),
	   (76, 1014, 14, 2031, 31, 5),
	   (77, 1015, 15, 2031, 31, 3),
	   (78, 1014, 14, 2032, 32, 5),
	   (79, 1016, 16, 2032, 32, 3),
	   (80, 1020, 20, 2032, 32, 3),
	   (81, 1008, 8, 2033, 33, 5),
	   (82, 1010, 10, 2033, 33, 4),
	   (83, 1012, 12, 2033, 33, 5),
	   (84, 1024, 24, 2033, 33, 4),
	   (85, 1025, 25, 2033, 33, 2),
	   (86, 1006, 6, 2034, 34, 2),
	   (87, 1019, 19, 2034, 34, 4),
	   (88, 1020, 20, 2034, 34, 2),
	   (89, 1004, 4, 2035, 35, 1),
	   (90, 1013, 13, 2035, 35, 3),
	   (91, 1013, 13, 2036, 36, 3),
	   (92, 1019, 19, 2037, 37, 4),
	   (93, 1020, 20, 2037, 37, 2),
	   (94, 1023, 23, 2037, 37, 3),
	   (95, 1023, 23, 2037, 37, 1),
	   (96, 1004, 4, 2038, 38, 3),
	   (97, 1004, 4, 2038, 38, 5),
	   (98, 1027, 27, 2039, 39, 4),
	   (99, 1028, 28, 2039, 39, 3),
	   (100, 1028, 28, 2039, 39, 3),
	   (101, 1013, 13, 2040, 40, 1),
	   (102, 1023, 23, 2040, 40, 2),
	   (103, 1025, 25, 2040, 40, 3),
	   (104, 1032, 32, 2040, 40, 3),
	   (105, 1014, 14, 2041, 41, 5),
	   (106, 1016, 16, 2041, 41, 3),
	   (107, 1020, 20, 2041, 41, 3),
	   (108, 1011, 11, 2042, 42, 1),
	   (109, 1029, 29, 2042, 42, 1),
	   (110, 1030, 30, 2042, 42, 2),
	   (111, 1031, 31, 2042, 42, 4);
       
     
-- Create the Wildcard table
-- Attributes: WildcardID, Question, Option1, Option2, Option3, Option4
CREATE TABLE Wildcard (
WildcardID INT NOT NULL AUTO_INCREMENT,
Question VARCHAR(255) NOT NULL,
Option1 VARCHAR(255),
Option2 VARCHAR(255),
Option3 VARCHAR(255),
Option4 VARCHAR(255),
Answer VARCHAR(255),
PRIMARY KEY (WildcardID)
);

-- Apply rows to wildcard table
INSERT INTO Wildcard (Question)
VALUES ('What does sBOM stand for?'),
	   ('What is the expected life of a medical device?'),
	   ('Safety is keeping bad products from harming good people; Security is keeping bad people from harming good products.'),
	   ('Which of the following is not a threat modeling technique?'),
	   ('What does CVSS stand for?'),
	   ('What is not a security concern for the FDA?'),
	   ('What does CIA stand for?'),
	   ('A black hat hacker is someone who is ethically hacking.'),
	   ('What does PHI stand for?');


-- Set foreign key to 0
SET FOREIGN_KEY_CHECKS = 0;

-- Start the database
USE `heroku_6409ef74c48b643`;

-- View the table
SELECT * FROM attack;
SELECT * FROM defense;
SELECT * FROM points;
SELECT * FROM wildcard;

-- Get the number of rows
SELECT COUNT(*) FROM attack;
SELECT COUNT(*) FROM defense;
SELECT COUNT(*) FROM points;
SELECT COUNT(*) FROM wildcard;



-- Get a random trivia question
SELECT wildcard.Question, wildcard.Option1, wildcard.Option2, wildcard.Option3, wildcard.Option4, wildcard.Answer FROM wildcard;

-- Get all defenses that have the difficulty of ${difficulty}
SELECT defense.DefenseID, defense.Name, defense.Cost, defense.Description FROM defense
WHERE defense.Difficulty = 1;
SELECT defense.DefenseID, defense.Name, defense.Cost, defense.Description FROM defense
WHERE defense.Difficulty = ${difficulty};

-- Get a random attack with a difficulty of ${difficulty}
SELECT attack.AttackID, attack.Name, attack.Description FROM attack 
WHERE attack.Difficulty = 1
ORDER BY RAND() LIMIT 1;
SELECT attack.AttackID, attack.Name, attack.Description FROM attack 
WHERE attack.Difficulty = ${difficulty} 
ORDER BY RAND() LIMIT 1;

-- Get all defenses that counter ${specificAttackID}
SELECT defense.DefenseID, defense.Name, defense.Description, points.PointValue FROM defense
JOIN points ON defense.DefenseID = points.Defense_ID
WHERE points.Attack_ID = 2012;
SELECT defense.DefenseID, defense.Name, defense.Description, points.PointValue FROM defense
JOIN points ON defense.DefenseID = points.Defense_ID
WHERE points.Attack_ID = ${specificAttackID};

-- Get the point value when successfully countering an attack with defenses
SELECT points.PointValue FROM points
WHERE points.Attack_ID = 2012
AND points.Defense_ID = 1017;
SELECT points.PointValue FROM points
WHERE points.Attack_ID = ${attackID}
AND points.Defense_ID = ${defenseID};
