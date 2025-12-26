const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Publik bisa melihat semua kampanye
router.get('/', campaignController.getAllCampaigns);
router.get('/:id', campaignController.getCampaignById);

// Hanya Admin dan Field Worker yang bisa membuat kampanye
router.post('/', authenticateToken, authorizeRole('admin', 'field_worker'), campaignController.createCampaign);

module.exports = router;