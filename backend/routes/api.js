const express = require('express');
const router = express.Router();

// Import Controllers
const authController = require('../controllers/authController');
const campaignController = require('../controllers/campaignController');
const donationController = require('../controllers/donationController');

// Import Middlewares (Disamakan namanya agar tidak error)
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

/**
 * AUTH ROUTES
 */
router.post('/login', validate, authController.login);

/**
 * STATS ROUTE (Dinamis untuk Dashboard & Home)
 */
router.get('/stats', campaignController.getStats);

/**
 * CAMPAIGNS ROUTES (Tabel 1)
 */
// Public: Siapa saja bisa melihat daftar kampanye
router.get('/campaigns', campaignController.getAllCampaigns);
router.get('/campaigns/:id', campaignController.getCampaignById);

// Private: Hanya Admin yang bisa menambah, mengubah, atau menghapus (Perlu JWT)
router.post('/campaigns', auth, validate, campaignController.createCampaign);
router.put('/campaigns/:id', auth, validate, campaignController.updateCampaign);
router.delete('/campaigns/:id', auth, campaignController.deleteCampaign);

/**
 * DONATIONS ROUTES (Tabel 2 - Relasi 1-to-Many)
 */
// Public: Orang bisa mengirim donasi
router.post('/donations', validate, donationController.createDonation);

// Private: Admin bisa melihat riwayat semua donasi
router.get('/donations', auth, donationController.getAllDonations);

module.exports = router;