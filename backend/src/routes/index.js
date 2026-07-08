const express = require('express');
const router = express.Router();

router.get('/health', (req, res) =>
	res.json({ status: 'success', message: 'TravelMate API is running' })
);

module.exports = router;
