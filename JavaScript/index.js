const mysql = require('mysql');
const inquirer = require('inquirer');

// Set up a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'company_db'
});

// Function to view all departments
function viewDepartments() {
  const query = 'SELECT * FROM departments';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('All departments:');
    console.table(res);
    // Call the startApp function to continue the application
    startApp();
  });
}

// Function to view all roles
function viewRoles() {
  const query = 'SELECT * FROM roles';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('All roles:');
    console.table(res);
    // Call the startApp function to continue the application
    startApp();
  });
}

// Function to view all employees
function viewEmployees() {
  const query = 'SELECT * FROM employees';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log('All employees:');
    console.table(res);
    // Call the startApp function to continue the application
    startApp();
  });
}

// Function to add a department
function addDepartment() {
  inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'Enter the name of the new department:'
    }
  ]).then((answer) => {
    // Insert the new department into the database
    const query = `INSERT INTO departments (name) VALUES ('${answer.name}')`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log(`Added department: ${answer.name}`);
      // Call the startApp function to continue the application
      startApp();
    });
  });
}

// Function to add a role
function addRole() {
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the title of the new role:'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary for the new role:'
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'Enter the department ID for the new role:'
    }
  ]).then((answer) => {
    // Insert the new role into the database
    const query = `INSERT INTO roles (title, salary, department_id) VALUES ('${answer.title}', ${answer.salary}, ${answer.department_id})`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log(`Added role: ${answer.title}`);
      // Call the startApp function to continue the application
      startApp();
    });
  });
}

// Function to add an employee
function addEmployee() {
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Enter the first name of the new employee:'
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Enter the last name of the new employee:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the role ID for the new employee:'
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'Enter the manager ID for the new employee (or leave blank if none):'
    }
  ]).then((answer) => {
    // Insert the new employee into the database
    let query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answer.first_name}', '${answer.last_name}', ${answer.role_id}`;
    if (answer.manager_id) {
      query += `, ${answer.manager_id})`;
    } else {
      query += `, NULL)`;
    }
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log(`Added employee: ${answer.first_name} ${answer.last_name}`);
      // Call the startApp function to continue the application
      startApp();
    });
  });
}

// Function to update an employee role
function updateEmployeeRole() {
  // First, view all employees
  viewEmployees();

  inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'Enter the ID of the employee whose role you want to update:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the new role ID for the employee:'
    }
  ]).then((answer) => {
    // Update the employee's role in the database
    const query = `UPDATE employees SET role_id = ${answer.role_id} WHERE id = ${answer.employee_id}`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log(`Updated employee role: ID ${answer.employee_id}`);
      // Call the startApp function to continue the application
      startApp();
    });
  });
}

// Function to start the application
function startApp() {
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ]
  }).then((answer) => {
    // Handle user choice
    switch (answer.action) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Exiting...');
        process.exit();
        break;
    }
  });
}

// Call the startApp function to begin the application
startApp();