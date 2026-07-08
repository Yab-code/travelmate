const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
const apiRouter = require('./routes');
app.use('/api', apiRouter);

// Health check
app.get('/', (req, res) => res.json({ status: 'success', message: 'TravelMate API is running' }));

module.exports = app;
