const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Magical91*',
        database: 'work'
    },
    console.log('Connected to the work database.')
);

module.exports = db;