const express = require('express');
const router = express.Router();

// GET /api/destinations — public
router.get('/', async (req, res) => {
  res.json({ status: 'success', destinations: [] });
});

// POST /api/destinations
router.post('/', async (req, res) => {
  res.status(201).json({ status: 'success', message: 'Destination creation coming soon.' });
});

module.exports = router;
