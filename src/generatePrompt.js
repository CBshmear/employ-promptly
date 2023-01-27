const inquirer = require("inquirer");
const mysql = require("mysql2");
const {
  empByDept,
  deptBudget,
  updateEmployeeRole,
  addRole,
  quit,
  addDept,
  addEmployee,
  viewAllEmp,
  viewAllDept,
  viewAllRoles,
} = require("./functions");

function askPrompt() {
  console.log(`-+-+-+-+-+-+-+-+-+-+-+-+-`);
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "chooseAction",
        choices: [
          "View all Employees",
          "Add Employee",
          "Update Employee Role",
          "View all Roles",
          "Add Role",
          "View all Departments",
          "Add Department",
          "Department Budget",
          "Quit",
        ],
      },
    ])
    .then(async (answers) => {
      if (answers.chooseAction === "View all Employees") {
        await viewAllEmp();
        askPrompt();
      } else if (answers.chooseAction === "Add Employee") {
        await addEmployee();
        askPrompt();
      } else if (answers.chooseAction === "Update Employee Role") {
        await updateEmployeeRole();
        askPrompt();
      } else if (answers.chooseAction === "View all Roles") {
        await viewAllRoles();
        askPrompt();
      } else if (answers.chooseAction === "Add Role") {
        await addRole();
        askPrompt();
      } else if (answers.chooseAction === "View all Departments") {
        await viewAllDept();
        askPrompt();
      } else if (answers.chooseAction === "Add Department") {
        await addDept();
        askPrompt();
      } else if (answers.chooseAction === "Department Budget") {
        await deptBudget();
        askPrompt();
      } else if (answers.chooseAction === "Quit") {
        quit();
      }
    });
}

module.exports = askPrompt;
