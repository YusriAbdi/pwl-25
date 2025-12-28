/**
 * Entry Point Utama - Website Donasi Kemanusiaan
 * PERBAIKAN: Menambahkan limit payload agar foto Base64 bisa terkirim.
 */
const adminRoutes = require('./routes/adminRoutes');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const donationRoutes = require('./routes/donationRoutes');


const app = express();

// Global Middleware
// PERBAIKAN: Limit ditingkatkan ke 50mb agar data foto tidak ditolak server
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// --- Definisi Route ---
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/admin', adminRoutes);

// Root test route
app.get('/', (req, res) => {
    res.send('API Humanity Care is Running...');
});

// Port Handling
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`Server berjalan di: http://localhost:${PORT}`);
    console.log(`Payload Limit: 50MB (Foto Aktif)`);
    console.log(`========================================`);
}); 