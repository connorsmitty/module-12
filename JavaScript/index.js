// Import the inquirer module using require
const inquirer = require('inquirer');

// Start the application
function startApp() {
    // Prompt the user with options
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
                console.log('View all departments selected');
                break;
            case 'View all roles':
                console.log('View all roles selected');
                break;
            case 'View all employees':
                console.log('View all employees selected');
                break;
            case 'Add a department':
                console.log('Add a department selected');
                break;
            case 'Add a role':
                console.log('Add a role selected');
                break;
            case 'Add an employee':
                console.log('Add an employee selected');
                break;
            case 'Update an employee role':
                console.log('Update an employee role selected');
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
