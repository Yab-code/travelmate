const express = require('express');
const router = express.Router();

// Health check
router.get('/health', (req, res) =>
  res.json({ status: 'success', message: 'TravelMate API is running' })
);

// Mount sub-routers
router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/packages', require('./packages'));
router.use('/events', require('./events'));
router.use('/companies', require('./companies'));
router.use('/destinations', require('./destinations'));
router.use('/bookings', require('./bookings'));
router.use('/interests', require('./interests'));

module.exports = router;

