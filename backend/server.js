const express = require('express');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contact');
const registerRoutes = require('./routes/register');
const adminRoutes = require('./routes/admin');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Mount route handlers
app.use('/api/admin', adminRoutes);  // Mount admin routes at /api/admin
app.use('/api', contactRoutes);      // Handles /api/contact (POST)
app.use('/api', registerRoutes);     // Handles /api/register (POST)

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});