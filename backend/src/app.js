const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errorHandler } = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/logger');

const app = express();

// Security headers
app.use(helmet());


// CORS — allow Vite dev server and same-origin in production
app.use(
  cors({
    origin: [
      'http://localhost:5173', // Vite dev
      'http://localhost:4173', // Vite preview
    ],
    credentials: true,
  })
);

app.use(express.json());

// Request logging — logs all incoming HTTP requests with method, URL, status, duration, IP
app.use(requestLogger);

// Health check
app.get('/', (req, res) =>
  res.json({ status: 'success', message: 'TravelMate API is running' })
);

// Routes
const apiRouter = require('./routes');
app.use('/api', apiRouter);

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;
