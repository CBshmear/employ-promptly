const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const askPrompt = require("./generatePrompt");
let db;

async function get_db_conn() {
  if (!db) {
    db = await mysql.createConnection(
      {
        host: "localhost",
        // MySQL username,
        user: "root",
        // TODO: Add MySQL password
        password: "poopypup",
        database: "company_db",
      },
      console.log(`Connected to the company_db database.`)
    );
  }
}

async function viewAllEmp() {
  await get_db_conn();
  const [rows, fields] = await db.query(
    "SELECT employees.*, roles.salary FROM employees JOIN roles ON employees.role_id = roles.id;"
  );
  console.table(rows);
}

// async function viewAllEmp() {
//   try {
//     const results = await db.query("SELECT * FROM employees");
//     console.table(results);
//   } catch (err) {
//     console.log(err);
//   }
// }

async function viewAllRoles() {
  await get_db_conn();
  const [rows, fields] = await db.query("SELECT * FROM roles");
  console.table(rows);
}

async function viewAllDept() {
  await get_db_conn();
  const [rows, fields] = await db.query("SELECT * FROM departments");
  console.table(rows);
}

async function addRole() {
  await get_db_conn();
  const [rows, fields] = await db.query(
    "SELECT department_name, id FROM departments"
  );
  const depts = rows.map((item) => {
    return { name: item.department_name, value: item.id };
  });
  console.log(depts);
  await inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of your new role",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary of this role",
      },
      {
        type: "list",
        name: "departmentId",
        message: "Choose the department this role belongs to",
        choices: depts,
      },
    ])
    .then((answers) => {
      const title = answers.title;
      const salary = answers.salary;
      const department_id = answers.departmentId;

      const query = db.query(
        "INSERT into roles (title, salary, department_id) VALUES (?,?,?)",
        [title, salary, department_id]
      );
      console.log("added role!");
      return query;
    });
}
async function addDept() {
  await get_db_conn();
  await inquirer
    .prompt([
      {
        type: "input",
        name: "newDept",
        message: "Enter the title of your new department",
      },
    ])
    .then((answer) => {
      const value = answer.newDept;

      db.query("INSERT INTO departments (department_name) VALUES (?)", value);
    });
  console.log("Succesfully added new Department!");
}

async function addEmployee() {
  await get_db_conn();
  const [rows, fields] = await db.query("SELECT title, id FROM roles;");
  const roles = rows.map((item) => {
    return { name: item.title, value: item.id };
  });
  console.log(roles);

  await inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employees first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the employees last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is the employees role?",
        choices: roles,
        name: "role",
      },
    ])
    .then((answers) => {
      const first_name = answers.firstName;
      const last_name = answers.lastName;
      const role_id = answers.role;

      const sql = `Insert into employees (first_name, last_name, role_id) VALUES (?,?,?)`;

      const query = db.query(sql, [first_name, last_name, role_id]);
      console.log("Succesfully added employee!");
      return query;
    });
}

async function updateEmployeeRole() {
  await get_db_conn();
  const [rows, fields] = await db.query("SELECT * from employees;");
  const emps = rows.map((item) => {
    return { name: item.first_name, value: item.id };
  });
  console.log(emps);
  await inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee would you like to update?",
        name: "updatedEmp",
        choices: emps,
      },
    ])
    .then((answer) => {
      const query = db.query(
        "UPDATE employees SET role_id = new_role_id FROM employees JOIN roles ON employees.role_id = roles.id WHERE employees.id = employee_id;"
      );
    });
}

function quit() {
  process.exit();
}

module.exports = {
  addRole,
  updateEmployeeRole,
  quit,
  addDept,
  addEmployee,
  viewAllEmp,
  viewAllRoles,
  viewAllDept,
};
