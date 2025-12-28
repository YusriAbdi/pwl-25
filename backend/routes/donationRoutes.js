const express = require('express');
const router = express.Router();

// Import Controller
const donationController = require('../controllers/donationController');

// Import Middleware
// Karena auth.js dan validate.js menggunakan module.exports = fungsi,
// maka variabel di bawah ini sudah langsung berupa FUNGSI.
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

/**
 * DONATIONS ROUTES
 */

// Public: Orang bisa mengirim donasi
// Baris 7: Pastikan 'validate' dan 'donationController.createDonation' adalah fungsi
router.post('/', validate, donationController.createDonation);

// Private: Admin bisa melihat riwayat semua donasi
router.get('/', auth, donationController.getAllDonations);

module.exports = router;