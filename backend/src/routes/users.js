const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const { getProfile, updateProfile, getAllUsers, updateUserRole } = require('../controllers/userController');

// Protected profile routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin only — list all users and update roles
router.get('/', protect, requireRole('SUPER_ADMIN'), getAllUsers);
router.put('/:id/role', protect, requireRole('SUPER_ADMIN'), updateUserRole);

module.exports = router;
