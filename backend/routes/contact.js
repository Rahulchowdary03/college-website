const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
        await db.promise().query(query, [name, email, message]);
        res.status(200).json({ message: 'Contact form submitted successfully' });
    } catch (err) {
        console.error('Error saving contact data:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;