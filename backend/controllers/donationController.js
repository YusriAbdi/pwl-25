const db = require('../config/db');

/**
 * Proses Donasi Baru
 */
exports.createDonation = async (req, res) => {
    const { campaign_id, amount } = req.body;
    const user_id = req.user.id;

    try {
        // 1. Simpan transaksi donasi
        await db.query(
            'INSERT INTO donations (user_id, campaign_id, amount, status) VALUES (?, ?, ?, "verified")',
            [user_id, campaign_id, amount]
        );

        // 2. Update jumlah terkumpul di tabel kampanye
        await db.query(
            'UPDATE campaigns SET current_amount = current_amount + ? WHERE id = ?',
            [amount, campaign_id]
        );

        res.status(201).json({ message: 'Terima kasih! Donasi Anda berhasil diproses' });
    } catch (error) {
        console.error('Error createDonation:', error.message);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Riwayat donasi user tertentu
 * PERBAIKAN: Menggunakan alias 'foto' agar sinkron dengan Frontend (c.foto)
 */
exports.getUserDonations = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT d.*, c.title as campaign_title, c.foto as foto
             FROM donations d 
             JOIN campaigns c ON d.campaign_id = c.id 
             WHERE d.user_id = ? ORDER BY d.created_at DESC`, 
            [req.user.id]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error getUserDonations:', error.message);
        res.status(500).json({ message: error.message });
    }
};