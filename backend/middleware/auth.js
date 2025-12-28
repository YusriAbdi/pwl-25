const jwt = require('jsonwebtoken');

/**
 * Middleware: Verifikasi Token JWT
 * Memastikan pengguna sudah login sebelum mengakses rute tertentu.
 */
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan, silakan login kembali' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Sesi berakhir atau token tidak valid. Silakan login ulang.' });
        }
        // Lampirkan data user (termasuk id, role, name) ke request agar bisa diakses controller
        req.user = user;
        next();
    });
};

/**
 * Middleware: Otorisasi Berdasarkan Peran (Role)
 * Mendukung pengecekan banyak peran sekaligus (e.g., 'admin', 'field_worker').
 */
exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        // Jika user tidak ada atau rolenya tidak terdaftar dalam daftar peran yang diizinkan
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Akses ditolak: Peran '${req.user?.role || 'tanpa peran'}' tidak memiliki izin untuk akses ini.` 
            });
        }
        next();
    };
};

/**
 * ALIAS HELPER (Opsi Cepat)
 * Menambahkan alias yang sinkron dengan database (menggunakan 'field_worker' bukan 'staff')
 */

// Hanya Administrator
exports.isAdmin = exports.authorizeRole('admin');

// Hanya Petugas Lapangan
exports.isFieldWorker = exports.authorizeRole('field_worker');

// Administrator ATAU Petugas Lapangan (Staff Operasional)
exports.isStaffOrAdmin = exports.authorizeRole('admin', 'field_worker');

// User Biasa / Donatur (User lama Anda)
exports.isUser = exports.authorizeRole('user');