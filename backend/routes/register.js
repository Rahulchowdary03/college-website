const express = require('express');
const mysql = require('mysql2/promise');
const dbConfig = require('../config/db');
const router = express.Router();

// API endpoint for course registration
router.post('/', async (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.query(
            'INSERT INTO registrations (name, email, course) VALUES (?, ?, ?)',
            [name, email, course]
        );
        connection.end();
        res.status(200).json({ message: 'Registration saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;