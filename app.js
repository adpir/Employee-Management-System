const cTable = require("console.table");
const gradient = require("gradient-string");
const inquirer = require("inquirer");
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
        console.log(
          gradient.rainbow(
            "*---------------------------------------------------------Update Role --------------------------------------------------------*"
          )
        );
        employeesGenerator();
      });
    });
}

function updatemanager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "Which employee's ID you want to update?",
      },

      {
        type: "list",
        name: "manager_id",
        choices: [
          { name: "Alexandra Drews", value: 1 },
          { name: "Carlos Rodriguez", value: 2 },
          { name: "Carmen Borges", value: 3 },
          { name: "Cathia Piar", value: 4 },
          { name: "Sunny Shine", value: 5 },
          { name: "Jay Borden", value: 6 },
          { name: "Alice Piar", value: 7 },
         
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
          console.log(
            gradient.rainbow(
              "*---------------------------------------------------------Update Manager ---------------------------------------------------*"
            )
          );
          employeesGenerator();
        }
      );
    });
}
function viewEmplmanager() {
  console.log(
    gradient.rainbow(
      "*---------------------------------------------------------View Employee Manager ---------------------------------------------------*"
    )
  );

  const query = `select a.id as '#ID',a.first_name as "First Name",a.last_name as "Last Name", concat(b.first_name,' ',b.last_name) As "Manager" from employee a, employee b where a.manager_id = b.id;
  `;
  connection.query(query, function (err, data) {
    if (err) throw err;
    console.table(data);
    employeesGenerator();
  });
}
function viewEmpldept() {
  console.log(
    gradient.rainbow(
      "*---------------------------------------------------------View Employee Department -------------------------------------------------*"
    )
  );

  const query = `SELECT e.id as '#ID', CONCAT(e.first_name,' ',e.last_name) AS Employee,  d.departmentname as 'Departments' from employee e, roles r, department d where
  e.role_id = r.id and r.department_id = d.id;
  `;
  connection.query(query, function (err, data) {
    if (err) throw err;
    console.table(data);
    employeesGenerator();
  });
}

function viewDept() {
  console.log(
    gradient.rainbow(
      "*---------------------------------------------------------View Department ----------------------------------------------------------*"
    )
  );

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
  console.log(
    gradient.rainbow(
      "*---------------------------------------------------------View Roles ---------------------------------------------------------------*"
    )
  );

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
  const query = `SELECT employee.id AS 'ID#', CONCAT(employee.first_name, " ", employee.last_name) AS 'Employees',
	roles.id AS 'Role ID#', roles.title AS 'Title', roles.salary AS 'Salary',
    department_id AS 'Dept ID#', department.departmentname  AS 'Department',
    CONCAT(e.first_name, ' ', e.last_name) AS 'Manager'
    FROM roles
    LEFT JOIN employee ON employee.role_id = roles.id
    INNER JOIN department ON department.id = roles.department_id
    LEFT JOIN employee e ON employee.manager_id = e.id
    WHERE employee.id IS NOT NULL;`;
  connection.query(query, function (err, data) {
    if (err) throw err;

    console.log(
      gradient.rainbow(
        "*---------------------------------------------------------View All Employees -----------------------------------------------------*"
      )
    );
    console.table(data);

    employeesGenerator();
  });
}
function addDept() {
  console.log(
    gradient.rainbow(
      "*---------------------------------------------------------Add Departments ----------------------------------------------------------*"
    )
  );

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
  console.log(
    gradient.rainbow(
      "*---------------------------------------------------------Add Roles-----------------------------------------------------------------*"
    )
  );

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
              console.log(
                gradient.rainbow(
                  "*-----------------------------------------------------------------------------------------------------------------------*"
                )
              );

              employeesGenerator();
            }
          );
        }
      );
    });
}

function addEmployee() {
  console.log(
    gradient.rainbow(
      "*---------------------------------------------------------Add Employee--------------------------------------------------------------*"
    )
  );
  inquirer
    .prompt([
      {
        type: "list",
        name: "manager",
        message: "Is the employee has a manager in charge?",
        choices: ["Yes", "No"],
      },
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
        type: "input",
        name: "role_id",
        message: "What is the employee's role's ID?",

      },

      {
        type: "list",
        name: "ManagerId",
        choices: [
          { name: "Alexandra Drews", value: 1 },
          { name: "Carlos Rodriguez", value: 2 },
          { name: "Carmen Borges", value: 3 },
          { name: "Cathia Piar", value: 4 },
          { name: "Sunny Shine", value: 5 },
          { name: "Jay Borden", value: 6 },
          { name: "Alice Piar", value: 7 },
          { name: "None", value: null },
        ],
        message: "What Manager Id?",
      },
      {
        type: "number",
        name: "ManId",
        message:
          "What is the Manager ID?",
        when: (response) => {
          return response.manager === "NO";

        },
      },

    ])


    .then((response) => {
      console.log(response);
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: response.first_name,
          last_name: response.last_name,
          role_id: response.role_id,
          manager_id: response.ManagerId,

        },
        function (err) {
          if (err) {
            console.log(err);
            employeesGenerator();
          } else {
            connection.query(
              `SELECT employee.id AS 'ID#', CONCAT(employee.first_name, " ", employee.last_name) AS 'Employees',
              roles.id AS 'Role ID#', roles.title AS 'Title', roles.salary AS 'Salary',
                department_id AS 'Dept ID#', department.departmentname  AS 'Department',
                CONCAT(e.first_name, ' ', e.last_name) AS 'Manager'
                FROM roles
                LEFT JOIN employee ON employee.role_id = roles.id
                INNER JOIN department ON department.id = roles.department_id
                LEFT JOIN employee e ON employee.manager_id = e.id
                WHERE employee.id IS NOT NULL;`,
              (err, res) => {
                if (err) throw err;
                console.log(err);
                console.table(res);
                console.log(
                  gradient.rainbow(
                    "*--------------------------------------------------------------------------------------------------------------------*"
                  )
                );

                employeesGenerator();
              }
            );
          }
        }
      );
    });
}
function removeEmployee() {
  console.log(
    gradient.rainbow(
      "*---------------------------------------------------------Remove Employees -----------------------------------------------------*"
    )
  );
  connection.query(
    ` SELECT employee.id AS 'ID#', CONCAT(employee.first_name, " ", employee.last_name) AS 'Employees',
    role_id as 'Role #ID', manager_id as 'Manager' from employee;`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
  inquirer
    .prompt([
      {
        type: "number",
        name: "remove_id",
        message: "Which employee ID you want to remove?",
      },
    ])
    .then((response) => {
      const query = `DELETE FROM employee WHERE employee.id = ${response.remove_id};`;
      connection.query(query, (err) => {
        if (err) throw err;
        connection.query(
          `SELECT employee.id AS 'ID#', CONCAT(employee.first_name, " ", employee.last_name) AS 'Employees',
              roles.id AS 'Role ID#', roles.title AS 'Title', roles.salary AS 'Salary',
                department_id AS 'Dept ID#', department.departmentname  AS 'Department',
                CONCAT(e.first_name, ' ', e.last_name) AS 'Manager'
                FROM roles
                LEFT JOIN employee ON employee.role_id = roles.id
                INNER JOIN department ON department.id = roles.department_id
                LEFT JOIN employee e ON employee.manager_id = e.id
                WHERE employee.id IS NOT NULL;
                ;`,
          (err, data) => {
            if (err) throw err;
            console.log(err);
            console.table(data);
            console.log(
              gradient.rainbow(
                "*---------------------------------------------Employee has been remove, table updated-------------------------------------*"
              )
            );

            employeesGenerator();
          }
        );
      });
    });
}
