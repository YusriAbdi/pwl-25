const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

/**
 * Proteksi Global: 
 * Pengguna harus login dan memiliki peranan 'admin'.
 */
router.use(authenticateToken);
router.use(isAdmin);

// Definisi Rute API Admin (Pastikan nama fungsi controller padan)
router.get('/stats', adminController.getStats);
router.get('/management-list', adminController.getTeamList);
router.get('/donors-list', adminController.getDonorList);

// PEMBETULAN: Menggunakan addAccount dan deleteAccount sesuai export di controller
router.post('/add-account', adminController.addAccount);
router.delete('/delete-account/:id', adminController.deleteAccount);

module.exports = router;