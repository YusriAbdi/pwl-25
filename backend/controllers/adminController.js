const db = require('../config/db');
const bcrypt = require('bcryptjs');

/**
 * Mengambil Statistik Dashboard (Total Donasi, Donatur, dan Kampanye)
 */
exports.getStats = async (req, res) => {
    try {
        const [donations] = await db.query('SELECT SUM(amount) as total FROM donations WHERE status = "verified"');
        const [donors] = await db.query('SELECT COUNT(DISTINCT user_id) as total FROM donations');
        const [campaigns] = await db.query('SELECT COUNT(*) as total FROM campaigns WHERE status = "active"');

        res.json({
            totalDonations: donations[0].total || 0,
            totalDonors: donors[0].total || 0,
            activeCampaigns: campaigns[0].total || 0
        });
    } catch (error) {
        console.error('Error getStats:', error.message);
        res.status(500).json({ message: 'Gagal memuat statistik platform' });
    }
};

/**
 * Manajemen Tim: List Admin dan Petugas Lapangan
 * Sinkron dengan ENUM 'field_worker' di database
 */
exports.getTeamList = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT id, name, email, role, created_at FROM users WHERE role IN ("admin", "field_worker") ORDER BY role ASC, created_at DESC'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error getTeamList:', error.message);
        res.status(500).json({ message: 'Gagal memuat daftar tim operasional' });
    }
};

/**
 * Daftar Donatur: List user dengan role 'user'
 */
exports.getDonorList = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT id, name, email, role, created_at FROM users WHERE role = "user" ORDER BY created_at DESC'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error getDonorList:', error.message);
        res.status(500).json({ message: 'Gagal memuat database donatur' });
    }
};

/**
 * Menambah Anggota Tim Baru
 * Memperbaiki isu ENUM: 'staff' (frontend) -> 'field_worker' (database)
 */
exports.addAccount = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Semua kolom wajib diisi' });
    }

    // Mapping role frontend ke database ENUM
    const dbRole = role === 'staff' ? 'field_worker' : role;

    try {
        const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Alamat email sudah terdaftar' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, dbRole]
        );

        res.status(201).json({ message: `Akun ${dbRole} berhasil dibuat` });
    } catch (error) {
        console.error('Error addAccount Detail:', error);
        res.status(500).json({ message: 'Terjadi kesalahan sistem saat membuat akun' });
    }
};

/**
 * Hapus Akun (Admin, Staff, atau Donatur)
 */
exports.deleteAccount = async (req, res) => {
    const { id } = req.params;
    const currentAdminId = req.user.id;

    try {
        if (parseInt(id) === currentAdminId) {
            return res.status(400).json({ message: 'Keamanan: Anda tidak bisa menghapus akun Anda sendiri' });
        }

        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Akun tidak ditemukan' });
        }

        res.json({ message: 'Akun telah dihapus secara permanen' });
    } catch (error) {
        console.error('Error deleteAccount:', error.message);
        res.status(500).json({ message: 'Gagal menghapus akun' });
    }
};