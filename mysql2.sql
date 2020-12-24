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


INSERT INTO department (departmentname)
VALUES ("Data Operations");
INSERT INTO department (departmentname)
VALUES ("Marketing");
INSERT INTO department (departmentname)
VALUES ("Customer Service");
INSERT INTO department (departmentname)
VALUES ("Analytics");
INSERT INTO department (departmentname)
VALUES ("Engineer");
INSERT INTO department (departmentname)
VALUES ("Finance");
INSERT INTO department (departmentname)
VALUES ("Sales");
select * from department;
delete from department where id > 7;


INSERT INTO roles (title,salary,department_id)
VALUES ("Data Operations Manager",13000,1);
INSERT INTO roles (title,salary,department_id)
VALUES ("Marketing Specialist Manager", 14000,2);
INSERT INTO roles (title,salary,department_id)
VALUES ("Customer Service Manager",20000,3);
INSERT INTO roles (title,salary,department_id)
VALUES ("Data Analytics",16000,4);
INSERT INTO roles (title,salary,department_id)
VALUES ("Programmer",20000,5);
INSERT INTO roles (title,salary,department_id)
VALUES ("Accounting",23000,6);
INSERT INTO roles (title,salary,department_id)
VALUES ("Team Lead",1400,7);
SELECT * FROM roles;
delete from roles where id > 7;

INSERT INTO employee ( first_name, last_name, role_id)
VALUES ("Alexandra", "Drews",1);
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ("Carlos", "Rodriguez",2);
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ("Carmen", "Borges",3);
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ("Cathia", "Lopez",4);
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ("Alex", "Drews",5);
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ("Jay", "Borden",6);
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ("Alice", "Piar",7);
SELECT* FROM employee;


INSERT INTO employee ( first_name, last_name, role_id,manager_id)
VALUES ("Xiomara", "Rex",1,1);
INSERT INTO employee ( first_name, last_name, role_id,manager_id)
VALUES ("Anna", "Light",2,2);
INSERT INTO employee ( first_name, last_name, role_id,manager_id)
VALUES ("Julie", "Saas",3,3);

DELETE FROM employee where id > 10;


SELECT* FROM employee;
SELECT 
employee.first_name,
employee.last_name,
employee.role_id,
employee.manager_id,
roles.title
FROM employee
JOIN roles 
ON employee.role_id = roles.title;

