const db = require('../config/db');

/**
 * Mengambil semua kampanye yang aktif.
 */
exports.getAllCampaigns = async (req, res) => {
    try {
        // PERBAIKAN: Menghapus typo 'v' pada ORDER BY
        const [rows] = await db.query(
            'SELECT * FROM campaigns WHERE status = "active" ORDER BY id DESC'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error getAllCampaigns:', error.message);
        res.status(500).json({ message: 'Gagal mengambil data kampanye' });
    }
};

/**
 * Membuat kampanye baru.
 */
exports.createCampaign = async (req, res) => {
    const { title, description, target_amount, foto } = req.body;
    const created_by = req.user.id;

    if (!title || !target_amount) {
        return res.status(400).json({ message: 'Judul dan target donasi wajib diisi' });
    }

    try {
        /**
         * PERBAIKAN: Nama kolom di bawah ini HARUS 'foto' agar sesuai 
         * dengan perintah ALTER TABLE di atas.
         */
        const query = `
            INSERT INTO campaigns (title, description, foto, target_amount, current_amount, status, created_by) 
            VALUES (?, ?, ?, ?, 0, 'active', ?)
        `;
        
        await db.query(query, [title, description, foto || null, target_amount, created_by]);
        
        res.status(201).json({ message: 'Kampanye berhasil dibuat' });
    } catch (error) {
        console.error('DATABASE ERROR:', error.message);
        res.status(500).json({ message: 'Gagal menyimpan ke database: ' + error.message });
    }
};

/**
 * Detail Kampanye
 */
exports.getCampaignById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM campaigns WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Kampanye tidak ditemukan' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};