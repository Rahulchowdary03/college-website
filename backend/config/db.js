const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Rahul@123',
    database: 'college_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        throw err;
    }
    console.log('Connected to MySQL database');
    connection.release();
});

module.exports = pool;