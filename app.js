 //const table = require("console.table");
// console.log(logo(config).render());
// // console.log(chalkAnimation.rainbow)
// const gradient = require('gradient-string');

// console.log(gradient('cyan', 'pink')('Hello world!'));
// console.log(c.yellow(`foo ${c.red.bold('red')} bar ${c.cyan('cyan')} baz`));
// const c = require('ansi-colors');

const inquirer = require("inquirer");
const chalkAnimation = require("chalk-animation");
const connection = require("./Assets/mysql.js");
const logo = require("./node_modules/asciiart-logo");
const config = require("./package.json");
config.font = "Jazmine";
config.logoColor = "bold-magenta";
config.textColor = "cyan";
(config.lineChars = 3),
  (config.padding = 2),
  (config.margin = 3),
  (config.borderColor = "cyan");
console.log(logo(config).render());
employeesGenerator();
function employeesGenerator() {
  inquirer
    .prompt({
      name: "employees",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Employees By Department",
        "View All Employees By Manager",
        "View Budget Salary by Department",
        "View Salary Of Employees",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Add Roles",
        "Remove Roles",
        "Add Departments",
        "Remove Departments",
        "Exit",
        
      ],
    })

    .then(function (response) {
      switch (response.employees) {
        case "View All Employees":
          viewEmployee();
          break;

        case "View All Departments":
          viewDept();
          break;

        case "View All Employees By Department":
          viewEmpldept();
          break;

        case "View All Employees By Manager":
          viewEmplmanager();
          break;

        case "View Budget Salary by Department":
          salaryDept();
          break;

        case "View Salary Of Employees":
          viewSalary();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Role":
          updateRole();
          break;

        case "Update Employee Manager":
          updatemanager();
          break;

        case "Add Roles":
          addRoles();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "Remove Roles":
          removeRoles();
          break;

        case "Add Departments":
          addDept();
          break;

        case "Remove Departments":
          removeDept();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function updateRole() {
  inquirer
    .prompt([
      {
        type: "number",
        name: "employee_id",
        message:
          "What is the id number of the employee that you want to update?",
      },

      {
        type: "number",
        name: "role_id",
        message: "What is the role id number of the updated position?",
      },
    ])
    .then((response) => {
      const query = `UPDATE employee
    SET role_id = ${response.role_id}
    WHERE employee.id = ${response.employee_id};`;
      console.log(response);
      connection.query(query, function (err, res) {
        if (err) {
          console.log(err);
        }
        console.table(res);
        employeesGenerator();
      });
    });
}

function updatemanager() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee_id",
        choices: [
          { name: "Alex Drews", value: 5 },
          { name: "Cathia Lopez", value: 4 },
          { name: "Jay Borden", value: 6 },
        ],
        message: "Which employee's you want to update?",
      },

      {
        type: "list",
        name: "manager_id",
        choices: [
          { name: "Alex Lopez", value: 19 },
          { name: "Karl Green", value: 20 },
          { name: "Jo flower", value: 21 },
          { name: "Sunny loves", value: 22 },
          { name: "World lives", value: 23 },
        ],
        message: "Choose a new manager?",
      },
    ])
    .then((response) => {
      console.log(response);
      connection.query(
        `UPDATE employee SET  manager_id = ?  WHERE employee.id = ? ;`,
        [response.employee_id, response.manager_id],
        function (err, res) {
          if (err) {
            console.log(err);
          }
          console.table(res);
          employeesGenerator();
        }
      );
    });
}
function viewEmplmanager() {
  const query = `select a.id,a.first_name,a.last_name, concat(b.first_name ," ",b.last_name) "Manager" from employee a, employee b where a.manager_id = b.id;
  `;
  connection.query(query, function (err, data) {
    if (err) throw err;
    console.table(data);
    employeesGenerator();
  });
}
function viewEmpldept() {
  const query = `SELECT e.id as '#ID', CONCAT_WS(' ', e.first_name,e.last_name) AS Employers,  d.departmentname as 'Departments' from employee e, roles r, department d where
  e.role_id = r.id and r.department_id = d.id;
  `;
  connection.query(query, function (err, data) {
    if (err) throw err;
    console.table(data);
    employeesGenerator();
  });
}

function viewDept() {
  connection.query(
    `SELECT 
  department.id as 'Dept #ID',
  departmentname as 'Departments'
  from department;`,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      employeesGenerator();
    }
  );
}
function viewRoles() {
  connection.query(
    `SELECT 
  roles.id as 'Role #ID',
  roles.title as 'Position',
  roles.salary as 'Salary',
  roles.department_id as 'Dept #ID',
  departmentname as 'Departments'
   FROM roles
   JOIN department
  ON department.id = department_id;
  `,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      employeesGenerator();
    }
  );
}

function viewEmployee() {
  const query = `SELECT
  employee.id as '#ID',
  employee.first_name as 'First Name',
  employee.last_name as 'Last Name',
  roles.title as 'Position',
  roles.salary as ' Salary',
  roles.id as 'Role #ID',
department.departmentname as 'Departments',
  employee.manager_id as 'Manager'
  FROM employee
  RIGHT JOIN roles
  ON employee.role_id = roles.id
Left JOIN department
  ON roles.department_id= department.id
  WHERE employee.id IS NOT NULL;`;
  connection.query(query, function (err, data) {
    if (err) throw err;
    console.table(data);
    
    employeesGenerator();
  });
}
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentname",
        message: "What is the departments's name?",
      },
    ])
    .then((response) => {
      console.log(response);
      connection.query(
        "INSERT INTO department SET ?",
        {
          departmentname: response.departmentname,
        },
        function (err, res) {
          if (err) {
            console.log(err);
          }
          console.table(res);
          employeesGenerator();
        }
      );
    });
}
function addRoles() {
  
      inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the job's title?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the employees annual salary",
        },
        {
          type: "input",
          name: "department_id",
          message: "Please enter the department ID",
        },
      ])
      .then((response) => {
        console.log(response);
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: response.title,
            salary: response.salary,
            department_id: response.department_id,
          },
          function (err, res) {
            if (err) {
              console.log(err);
              console.table(res);
              employeesGenerator();
            }
            connection.query(
              `SELECT * FROM roles
      LEFT JOIN department
      ON department.id = department_id
      ORDER BY departmentname;`,
              (err, data) => {
                if (err) throw err;
                console.log(err);
                console.table(data);
                employeesGenerator();
              }
            );
          }
        );
      });
};

function addEmployee() {
  const query = `SELECT
  employee.id as '#ID',
  employee.first_name as 'First Name',
  employee.last_name as 'Last Name',
  roles.title as 'Position',
  roles.salary as ' Salary',
  roles.id as 'Role #ID',
  department.departmentname as 'Departments',
  employee.manager_id as 'Manager'
  FROM employee
  RIGHT JOIN roles
  ON employee.role_id = roles.id
Left JOIN department
  ON roles.department_id= department.id;`;
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },

      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role's ID?",
        choices: [5,8,9,10,11,12,13,14,15,17],
      },

      {
        type: "list",
        name: "manager_id",
        message: "What is the employee's manager's ID?",
        choices: [1,2,3,4,5,6,7],
      },
    ])
    .then((response) => {
      connection.query(query, function (err, data) {
        if (err) throw err;
      console.log(response)
      console.log(data);
      },
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: response.first_name,
          last_name: response.last_name,
          role_id: response.role_id,
          manager_id: response.manager_id,
        },
        function (err, data) {
          if (err) {
            console.log(err);
          }
          console.table(data);
          employeesGenerator();
        }
      ));
    });
  };
