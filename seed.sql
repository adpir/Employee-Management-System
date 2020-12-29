
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


SELECT * FROM employee;

INSERT INTO employee ( first_name, last_name, role_id,manager_id)
VALUES ("Xiomara", "Rex",1,1);
INSERT INTO employee ( first_name, last_name, role_id,manager_id)
VALUES ("Anna", "Light",2,2);
INSERT INTO employee ( first_name, last_name, role_id,manager_id)
VALUES ("Julie", "Saas",3,3);
INSERT INTO employee ( first_name, last_name, role_id,manager_id)
VALUES ("Joshua", "Lolo",4,4);
INSERT INTO employee ( first_name, last_name, role_id,manager_id)
VALUES ("Dunes", "Star",5,5);
INSERT INTO employee ( first_name, last_name, role_id,manager_id)
VALUES ("Jasmine", "Radiance",6,6);
INSERT INTO employee ( first_name, last_name, role_id,manager_id)
VALUES ("Luz", "Blue",7,7);

UPDATE employee
SET first_name = 'Xiomara',last_name ='Rex'
WHERE manager_id = 1;

SELECT * FROM employee WHERE first_name= "whatever";



UPDATE employee 
SET role_id = 2
WHERE employee.id = 15;



SELECT * FROM employee 
INNER JOIN roles
ON roles.id = role_id;





