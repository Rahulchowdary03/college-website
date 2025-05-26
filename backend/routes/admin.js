const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware to verify API key in query parameter
const verifyApiKey = (req, res, next) => {
    const apiKey = req.query.api_key;
    if (!apiKey || apiKey !== 'secure-api-key-2025') {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
    }
    next();
};

// Fetch all contact submissions (read-only)
router.get('/contact', verifyApiKey, async (req, res) => {
    try {
        const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
        const [results] = await db.promise().query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching contact data:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Fetch all registrations (read)
router.get('/registrations', verifyApiKey, async (req, res) => {
    try {
        const query = 'SELECT * FROM registrations ORDER BY created_at DESC';
        const [results] = await db.promise().query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching registrations data:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Update a registration record (edit)
router.put('/registrations/:id', verifyApiKey, async (req, res) => {
    const { id } = req.params;
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = 'UPDATE registrations SET name = ?, email = ?, course = ? WHERE id = ?';
        const [result] = await db.promise().query(query, [name, email, course, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.json({ message: 'Registration updated successfully' });
    } catch (err) {
        console.error('Error updating registration:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;