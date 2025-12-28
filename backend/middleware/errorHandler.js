/**
 * Middleware Global Error Handler
 * Berfungsi untuk menangkap semua error yang terjadi di aplikasi
 * dan mengembalikannya dalam format JSON yang rapi.
 */

const errorHandler = (err, req, res, next) => {
    // Logging error ke konsol untuk keperluan debugging developer
    console.error('--- ERROR LOG ---');
    console.error(err.stack);
    console.error('-----------------');

    // Menentukan status code (default 500 jika tidak ditentukan)
    const statusCode = err.statusCode || 500;
    
    // Mengirim response JSON sesuai ketentuan tugas
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Terjadi kesalahan pada server internal',
        // Jika dalam mode development, tampilkan stack trace (opsional)
        error_details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;