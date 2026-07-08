const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');

// GET /api/events — public listing
router.get('/', async (req, res) => {
  res.json({ status: 'success', events: [] });
});

// GET /api/events/:id
router.get('/:id', async (req, res) => {
  res.json({ status: 'success', event: null });
});

// POST /api/events
router.post('/', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  res.status(201).json({ status: 'success', message: 'Event creation coming soon.' });
});

// PUT /api/events/:id
router.put('/:id', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  res.json({ status: 'success', message: 'Event update coming soon.' });
});

// DELETE /api/events/:id
router.delete('/:id', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  res.json({ status: 'success', message: 'Event delete coming soon.' });
});

module.exports = router;
