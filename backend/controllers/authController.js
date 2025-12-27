const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * REGISTRASI PUBLIK (Hanya untuk Donatur)
 * Secara otomatis menetapkan role sebagai 'user'.
 */
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validasi input dasar
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Semua data wajib diisi' });
        }

        // Cek apakah email sudah terdaftar
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Paksa role menjadi 'user' untuk pendaftaran publik
        const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, "user")';
        await db.query(query, [name, email, hashedPassword]);
        
        res.status(201).json({ message: 'Registrasi Donatur berhasil! Silakan login.' });
    } catch (error) {
        console.error('Register Error:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server saat pendaftaran' });
    }
};

/**
 * LOGIN TUNGGAL (Deteksi Role Otomatis)
 * Mengarahkan user berdasarkan role yang tersimpan di database.
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        // 1. Cek User
        if (users.length === 0) {
            return res.status(401).json({ message: 'Email tidak ditemukan' });
        }

        const user = users[0];

        // 2. Cek Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password salah' });
        }

        // 3. Buat Token JWT
        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name },
            process.env.JWT_SECRET || 'supersecret_key_123',
            { expiresIn: '1d' }
        );

        // 4. Kirim Respon ke Frontend
        res.json({
            token,
            role: user.role, // Penting untuk pengalihan halaman di frontend
            name: user.name,
            message: `Selamat datang kembali, ${user.name}!`
        });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan pada server saat login' });
    }
};

/**
 * REGISTRASI KHUSUS PETUGAS (Oleh Admin)
 * Fungsi ini nantinya digunakan di Panel Admin untuk membuat akun staff.
 */
exports.registerStaff = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        // Role diset manual sebagai 'staff' atau 'field_worker'
        const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, "staff")';
        await db.query(query, [name, email, hashedPassword]);
        
        res.status(201).json({ message: 'Akun Petugas Lapangan berhasil dibuat oleh Admin' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal membuat akun petugas: ' + error.message });
    }
};