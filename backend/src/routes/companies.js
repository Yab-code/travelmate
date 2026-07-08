const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');

// GET /api/companies/pending — admin views pending
router.get('/pending', protect, requireRole('SUPER_ADMIN'), async (req, res) => {
  res.json({ status: 'success', companies: [] });
});

// GET /api/companies/my-company — planner views their company
router.get('/my-company', protect, requireRole('EVENT_PLANNER'), async (req, res) => {
  res.json({ status: 'success', company: null });
});

// POST /api/companies — register a new company
router.post('/', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  res.status(201).json({ status: 'success', message: 'Company registration coming soon.' });
});

// GET /api/companies/:id
router.get('/:id', async (req, res) => {
  res.json({ status: 'success', company: null });
});

// PUT /api/companies/:id/approve — admin approves/rejects
router.put('/:id/approve', protect, requireRole('SUPER_ADMIN'), async (req, res) => {
  res.json({ status: 'success', message: 'Approval coming soon.' });
});

module.exports = router;
