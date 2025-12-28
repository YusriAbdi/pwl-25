const express = require('express');
const router = express.Router();

// Import Controller
const campaignController = require('../controllers/campaignController');

// Import Middleware
// Karena kita sudah mengubah auth.js dan validate.js menggunakan module.exports,
// maka variabel 'auth' dan 'validate' di sini sudah langsung berupa FUNGSI.
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

/**
 * CAMPAIGNS ROUTES
 */

// Public: Melihat daftar kampanye
router.get('/', campaignController.getAllCampaigns);
router.get('/:id', campaignController.getCampaignById);

// Private: Admin Only (PENTING: Baris 11 ada di sini)
// Pastikan menggunakan 'auth' dan 'validate' secara langsung, bukan 'auth.authenticateToken'
router.post('/', auth, validate, campaignController.createCampaign);
router.put('/:id', auth, validate, campaignController.updateCampaign);
router.delete('/:id', auth, campaignController.deleteCampaign);

module.exports = router;