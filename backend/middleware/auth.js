const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token tidak ditemukan, silakan login' });

    jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, user) => {
        if (err) return res.status(403).json({ message: 'Sesi berakhir atau token tidak valid' });
        req.user = user;
        next();
    });
};

exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Akses ditolak: Peran tidak diizinkan' });
        }
        next();
    };
};