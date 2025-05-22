const mysql = require('mysql2/promise');

// MySQL connection configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Rahul@123', // Replace with your MySQL password
    database: 'college_db',
};

module.exports = dbConfig;