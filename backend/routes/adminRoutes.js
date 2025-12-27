const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

/**
 * Semua rute di bawah ini diproteksi:
 * 1. Harus Login (authenticateToken)
 * 2. Harus Admin (isAdmin)
 */
router.use(authenticateToken);
router.use(isAdmin);

router.get('/stats', adminController.getStats);
router.get('/management-list', adminController.getTeamList);
router.post('/add-account', adminController.addTeamMember);
router.delete('/delete-account/:id', adminController.deleteMember);

module.exports = router;