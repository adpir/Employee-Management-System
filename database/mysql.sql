DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
departmentname VARCHAR (30) NOT NULL,
PRIMARY KEY (id)

);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR (30) NOT NULL,
salary DECIMAL (8,2) NOT NULL,
department_id INT NOT NULL,
CONSTRAINT FK_1 FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT NOT NULL,
manager_id INT ,
CONSTRAINT FK_2 FOREIGN KEY (role_id) REFERENCES ROLES(ID)
);

