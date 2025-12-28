const db = require('../config/db');

/**
 * Mencatat donasi baru dan memperbarui saldo kampanye
 */
exports.createDonation = async (req, res) => {
    const { campaign_id, amount } = req.body;
    const user_id = req.user.id;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Nominal donasi tidak valid' });
    }

    try {
        // 1. Catat transaksi (Status verified untuk simulasi instan)
        await db.query(
            'INSERT INTO donations (user_id, campaign_id, amount, status) VALUES (?, ?, ?, "verified")',
            [user_id, campaign_id, amount]
        );

        // 2. Sinkronisasi saldo terkumpul di tabel kampanye
        await db.query(
            'UPDATE campaigns SET current_amount = current_amount + ? WHERE id = ?',
            [amount, campaign_id]
        );

        res.status(201).json({ message: 'Donasi berhasil. Terima kasih atas kebaikan Anda!' });
    } catch (error) {
        console.error('Error createDonation:', error.message);
        res.status(500).json({ message: 'Gagal memproses transaksi donasi' });
    }
};

/**
 * Mengambil riwayat donasi milik pengguna yang sedang login
 * Menggunakan alias 'foto' agar sinkron dengan UI
 */
exports.getUserDonations = async (req, res) => {
    try {
        const query = `
            SELECT 
                d.id, 
                d.amount, 
                d.created_at, 
                c.title AS campaign_title, 
                c.foto AS foto
            FROM donations d
            JOIN campaigns c ON d.campaign_id = c.id
            WHERE d.user_id = ?
            ORDER BY d.created_at DESC
        `;
        const [rows] = await db.query(query, [req.user.id]);
        res.json(rows);
    } catch (error) {
        console.error('Error getUserDonations:', error.message);
        res.status(500).json({ message: 'Gagal mengambil riwayat donasi' });
    }
};