 const inquirer = require("inquirer");
  const cTable = require("console.table");
 const fs = require("fs");
 const connection= require ("./Assets/mysql.js")
// const colors =require("colors")
const employeeTracker = [];
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
      ]
    })
    .then(function(response) {
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
        updateEmployee();
        break;

       case "Update Employee Manager":
        updateEmplmanager();
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
};

function viewDept(){
connection.query("select * from department;", function(err, data ){
  if (err) throw err;
  console.table(data);
  employeesGenerator();
})

}

function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name:"first_name",
      message:"What is the employee's first name?"
    },

    {
      type: "input",
      name:"last_name",
      message:"What is the employee's last name?"
    },
    {
      type: "input",
      name:"role_id",
      message:"What is the employee's role's id?"
    },

    {
      type: "input",
      name:"manager_id",
      message:"What is the employee's manager's id?"
    },
   
])
.then((response) => {
  console.log(response);
 connection.query (
   "INSERT INTO employee SET ?",
 {
      first_name: response.firstName,
      last_name: response.lastName,
      role_id: response.roleId,
      manager_id: response.managerId
 },
 function(err) {
   if (err) {
     console.log(err);
     console.cTable(res);
   }
 }

 );




  

  
      

     
})};
//    employeeTracker();
// employeesGenerator();