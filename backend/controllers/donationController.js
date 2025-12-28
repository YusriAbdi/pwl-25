const db = require('../config/db');

/**
 * Mencatat donasi baru
 * Public: Bisa diakses siapa saja
 */
const createDonation = async (req, res, next) => {
    const { campaign_id, amount, donor_name, message } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Nominal donasi tidak valid' });
    }

    try {
        // 1. Catat transaksi donasi
        // Gunakan donor_name (String) dan amount (Number) sesuai instruksi tugas
        const sql = `INSERT INTO donations (campaign_id, donor_name, amount, message, donation_date, payment_status) 
                     VALUES (?, ?, ?, ?, NOW(), 'Success')`;
        
        const [result] = await db.query(sql, [campaign_id, donor_name, amount, message]);

        // 2. Sinkronisasi saldo terkumpul di tabel kampanye (Logika angka)
        await db.query(
            'UPDATE campaigns SET current_amount = current_amount + ? WHERE id = ?',
            [amount, campaign_id]
        );

        res.status(201).json({ 
            status: 'success',
            message: 'Donasi berhasil. Terima kasih atas kebaikan Anda!',
            id: result.insertId
        });
    } catch (error) {
        next(error); // Lempar ke errorHandler
    }
};

/**
 * Mengambil SEMUA riwayat donasi (Untuk Admin)
 * Digunakan oleh router.get('/donations', auth, ...)
 */
const getAllDonations = async (req, res, next) => {
    try {
        const query = `
            SELECT 
                d.*, 
                c.title AS campaign_title
            FROM donations d
            JOIN campaigns c ON d.campaign_id = c.id
            ORDER BY d.donation_date DESC
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createDonation,
    getAllDonations
};