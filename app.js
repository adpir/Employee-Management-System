const inquirer = require("inquirer");
const cTable = require("console.table");
const fs = require("fs");
const Department = require("./Assets/Department");
const Role = require("./Assets/Role");
const Employee = require("./Assets/Employee");


let employeeTracker = [];
function tracker() {
  inquirer.prompt([
    {
      type: "list",
      name: "adding",
      question: "What would you like to do?",
      choices: ["View All Employees, View All Eployees By Department, View All Employees By Manager, Add Employee, Remove Employee, Update Employee Role, Update Employee Manager"],
   
    },
    {
      type: "input",
      name: "department",
      question: "What is the department name?",
    },
    {
      type: "input",
      name: "roles",
      question: "What is the employer roles ?",
    },
    {
      type: "input",
      name: "employee",
      question: "Do you want to add an employee?",
    },
    {
      type: "list",
      name: "view",
      question: "What do you would like do?",
      choices: [
        "View all Departments,View all Employees, View all Roles, View employees by Manager",
      ],
    },
    //   {
    //     type: "input",
    //     name: "department",
    //     question: "Do you want to add a department?",
    //   },
    //   {
    //     type: "input",
    //     name: "roles",
    //     question: "Do you want to add a new role?",
    //   },
    //   {
    //     type: "input",
    //     name: "employee",
    //     question: "Do you want to add an employee?",

    //   },
  ]);
}
