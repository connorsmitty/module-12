const connection = require('./db');

function viewAllDepartments() {
    connection.query('SELECT * FROM Departments', (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

function addDepartment() {
    inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:'
    }).then((answer) => {
        connection.query('INSERT INTO Departments (Name) VALUES (?)', [answer.name], (err, res) => {
            if (err) throw err;
            console.log('Department added successfully');
            startApp();
        });
    });
}

module.exports = { viewAllDepartments, addDepartment };
