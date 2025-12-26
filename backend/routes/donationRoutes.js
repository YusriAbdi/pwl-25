const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { authenticateToken } = require('../middleware/auth');

// Pastikan baris ini ada dan benar
router.post('/', authenticateToken, donationController.createDonation);
router.get('/my-donations', authenticateToken, donationController.getUserDonations);

module.exports = router;