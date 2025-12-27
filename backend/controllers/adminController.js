const db = require('../config/db');
const bcrypt = require('bcryptjs');

/**
 * MENGAMBIL STATISTIK RINGKASAN DASHBOARD
 * Menghitung angka-angka utama untuk kartu statistik di frontend.
 */
exports.getDashboardStats = async (req, res) => {
    try {
        // 1. Hitung Total Donasi yang Berhasil (verified)
        const [donationRes] = await db.query(
            'SELECT SUM(amount) as total FROM donations WHERE status = "verified"'
        );

        // 2. Hitung Jumlah Donatur Unik
        const [donorRes] = await db.query(
            'SELECT COUNT(DISTINCT user_id) as total FROM donations'
        );

        // 3. Hitung Jumlah Kampanye Aktif
        const [campaignRes] = await db.query(
            'SELECT COUNT(*) as total FROM campaigns WHERE status = "active"'
        );

        res.json({
            totalDonations: donationRes[0].total || 0,
            totalDonors: donorRes[0].total || 0,
            activeCampaigns: campaignRes[0].total || 0
        });
    } catch (error) {
        console.error('Error Admin Stats:', error.message);
        res.status(500).json({ message: 'Gagal memuat statistik dashboard' });
    }
};

/**
 * MANAJEMEN TIM: MENGAMBIL DAFTAR ANGGOTA
 * Hanya mengambil user dengan peran 'admin' atau 'staff'.
 */
exports.getManagementList = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT id, name, email, role, created_at FROM users WHERE role IN ("admin", "staff") ORDER BY role ASC, created_at DESC'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error List Tim:', error.message);
        res.status(500).json({ message: 'Gagal memuat daftar anggota tim' });
    }
};

/**
 * MANAJEMEN TIM: TAMBAH ANGGOTA BARU
 * Admin bisa membuat akun baru untuk rekan admin atau petugas lapangan.
 */
exports.addAccount = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Validasi input
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Semua kolom wajib diisi' });
    }

    // Validasi role agar tidak sembarang memasukkan peran lain
    if (!['admin', 'staff'].includes(role)) {
        return res.status(400).json({ message: 'Peran akun tidak valid (Harus admin atau staff)' });
    }

    try {
        // Cek apakah email sudah terdaftar
        const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Email sudah terdaftar di sistem' });
        }

        // Hash password untuk keamanan
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan ke database
        await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );

        res.status(201).json({ message: `Akun ${role} berhasil dibuat untuk ${name}` });
    } catch (error) {
        console.error('Error Tambah Akun:', error.message);
        res.status(500).json({ message: 'Gagal membuat akun tim baru' });
    }
};

/**
 * MANAJEMEN TIM: HAPUS ANGGOTA
 * Menghapus akses anggota tim berdasarkan ID.
 */
exports.deleteAccount = async (req, res) => {
    const { id } = req.params;
    const currentAdminId = req.user.id; // Diambil dari middleware authenticateToken

    try {
        // Keamanan: Admin tidak boleh menghapus dirinya sendiri
        if (parseInt(id) === currentAdminId) {
            return res.status(400).json({ message: 'Anda tidak dapat menghapus akun Anda sendiri' });
        }

        // Jalankan perintah hapus
        const [result] = await db.query(
            'DELETE FROM users WHERE id = ? AND role IN ("admin", "staff")',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Akun tidak ditemukan atau bukan bagian dari tim' });
        }

        res.json({ message: 'Anggota tim berhasil dihapus dari sistem' });
    } catch (error) {
        console.error('Error Hapus Akun:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan saat mencoba menghapus akun' });
    }
};