const express = require('express');
const mysql = require('mysql2/promise');
const dbConfig = require('../config/db');
const router = express.Router();

// API endpoint for contact form submissions
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.query(
            'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );
        connection.end();
        res.status(200).json({ message: 'Contact saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;