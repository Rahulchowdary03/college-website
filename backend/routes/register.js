const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/register', async (req, res) => {
    const { name, email, course } = req.body;
    if (!name || !email || !course) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = 'INSERT INTO registrations (name, email, course) VALUES (?, ?, ?)';
        await db.promise().query(query, [name, email, course]);
        res.status(200).json({ message: 'Registration successful' });
    } catch (err) {
        console.error('Error saving registration data:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;