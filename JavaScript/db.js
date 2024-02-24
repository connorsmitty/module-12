const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'the_host',
    user: 'boss',
    password: 'password',
    database: 'employee_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + connection.threadId);
});

module.exports = connection;
