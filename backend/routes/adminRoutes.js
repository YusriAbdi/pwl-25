const express = require('express');
const router = express.Router();

// Import Middleware
// Karena kita sudah mengubah auth.js menggunakan module.exports = auth,
// maka variabel 'auth' di sini sudah langsung berupa FUNGSI.
const auth = require('../middleware/auth');

// Contoh penggunaan di baris 10
// Jika sebelumnya router.use(auth.authenticateToken), ubah menjadi:
router.use(auth); 

// Import Controller (Pastikan file ini ada)
const campaignController = require('../controllers/campaignController');

/**
 * Rute khusus Admin
 */
router.get('/dashboard-stats', auth, campaignController.getStats);

module.exports = router;