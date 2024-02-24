const connection = require('./db');

function viewAllRoles() {
    connection.query('SELECT * FROM Roles', (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the role:'
        },
        {
            name: 'salary',
            type: 'number',
            message: 'Enter the salary for the role:'
        },
        {
            name: 'department',
            type: 'input',
            message: 'Enter the department for the role:'
        }
    ]).then((answers) => {
        connection.query('INSERT INTO Roles (Title, Salary, Department) VALUES (?, ?, ?)', [answers.title, answers.salary, answers.department], (err, res) => {
            if (err) throw err;
            console.log('Role added successfully');
            startApp();
        });
    });
}

module.exports = { viewAllRoles, addRole };
