const connection = require('./db');

function viewAllEmployees() {
    connection.query('SELECT * FROM Employees', (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Enter the first name of the employee:'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Enter the last name of the employee:'
        },
        {
            name: 'role',
            type: 'input',
            message: 'Enter the role for the employee:'
        },
        {
            name: 'department',
            type: 'input',
            message: 'Enter the department for the employee:'
        },
        {
            name: 'manager',
            type: 'input',
            message: 'Enter the manager for the employee:'
        }
    ]).then((answers) => {
        connection.query('INSERT INTO Employees (FirstName, LastName, Role, Department, Manager) VALUES (?, ?, ?, ?, ?)', [answers.firstName, answers.lastName, answers.role, answers.department, answers.manager], (err, res) => {
            if (err) throw err;
            console.log('Employee added successfully');
            startApp();
        });
    });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: 'employeeId',
            type: 'number',
            message: 'Enter the ID of the employee to update:'
        },
        {
            name: 'newRole',
            type: 'input',
            message: 'Enter the new role for the employee:'
        }
    ]).then((answers) => {
        connection.query('UPDATE Employees SET Role = ? WHERE ID = ?', [answers.newRole, answers.employeeId], (err, res) => {
            if (err) throw err;
            console.log('Employee role updated successfully');
            startApp();
        });
    });
}

module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole };
