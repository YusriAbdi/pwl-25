const jwt = require('jsonwebtoken');

/**
 * Middleware: Verifikasi Token JWT
 * Memastikan pengguna sudah login sebelum mengakses rute tertentu.
 */
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan, silakan login' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Sesi berakhir atau token tidak valid' });
        }
        // Lampirkan data user (termasuk id, role, name) ke request
        req.user = user;
        next();
    });
};

/**
 * Middleware: Otorisasi Berdasarkan Peran (Role)
 * Mendukung pengecekan banyak peran sekaligus (e.g., 'admin', 'staff').
 */
exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Akses ditolak: Peran '${req.user?.role || 'unknown'}' tidak diizinkan` 
            });
        }
        next();
    };
};

/**
 * Alias Helper (Opsi Cepat)
 * Agar penulisan di file Routes lebih singkat dan mudah dibaca.
 */
exports.isAdmin = exports.authorizeRole('admin');
exports.isStaffOrAdmin = exports.authorizeRole('admin', 'staff');