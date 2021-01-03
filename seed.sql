select * from department;
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

delete from department where id > 85;

SELECT * FROM roles;
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
INSERT INTO roles (title,salary,department_id)
VALUES ("Senior Manager Enginner ",40000,5);
delete from roles where id > 7;

SELECT * FROM employee;

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
delete from employee where id > 554;




select * from roles where title like '%Manager%' order by department_id;

select * From employee ;
INSERT INTO employee ( first_name, last_name, role_id,manager_id) 
 VALUES ("Estrella", "shine",1,1);
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

Delete from employee where id  > 617;
SELECT first_name, last_name, id 
       FROM employee 
           WHERE (employee.id) IN (SELECT manager_id FROM employee);

select * from employee e, roles r, department d where
e.role_id = r.id and r.department_id = d.id order by d.id,r.id,e.id
;

SELECT * FROM employee e
INNER JOIN roles
ON roles.id =e.role_id
WHERE title like '%Manager%';

UPDATE employee 
SET role_id = 2
WHERE employee.id = 15;
UPDATE employee 
SET manager_id = 3
WHERE employee.id = 12;



SELECT * FROM employee 
INNER JOIN roles
ON roles.id = role_id;

select a.id,a.first_name,a.last_name, concat(b.first_name ," ",b.last_name) "Manager" from employee a, employee b where a.manager_id = b.id;
select e.id,e.first_name,e.last_name,d.departmentname from employee e, roles r, department d where
e.role_id = r.id and r.department_id = d.id;







