const express = require('express');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contact');
const registerRoutes = require('./routes/register');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Mount route handlers
app.use('/api/contact', contactRoutes);
app.use('/api/register', registerRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 