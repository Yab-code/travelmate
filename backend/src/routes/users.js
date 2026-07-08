const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const { getProfile, updateProfile, getAllUsers } = require('../controllers/userController');

// Protected profile routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin only — list all users
router.get('/', protect, requireRole('SUPER_ADMIN'), getAllUsers);

module.exports = router;
