const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const prisma = require('../config/prisma');

// GET /api/packages — public listing
router.get('/', async (req, res) => {
  res.json({ status: 'success', packages: [] });
});

// GET /api/packages/:id — public detail
router.get('/:id', async (req, res) => {
  res.json({ status: 'success', package: null });
});

// POST /api/packages — event planner creates
router.post('/', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  res.status(201).json({ status: 'success', message: 'Package creation coming soon.' });
});

// PUT /api/packages/:id
router.put('/:id', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  res.json({ status: 'success', message: 'Package update coming soon.' });
});

// DELETE /api/packages/:id
router.delete('/:id', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  res.json({ status: 'success', message: 'Package delete coming soon.' });
});

module.exports = router;
