const db = require('../config/db');

/**
 * Menampilkan semua kampanye yang berstatus aktif
 */
exports.getAllCampaigns = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM campaigns WHERE status = "active" ORDER BY id DESC'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error getAllCampaigns:', error.message);
        res.status(500).json({ message: 'Gagal mengambil data kampanye publik' });
    }
};

/**
 * Membuat kampanye baru (Oleh Admin atau Field Worker)
 */
exports.createCampaign = async (req, res) => {
    const { title, description, target_amount, foto } = req.body;
    const created_by = req.user.id;

    if (!title || !target_amount) {
        return res.status(400).json({ message: 'Judul dan target dana wajib diisi' });
    }

    try {
        const query = `
            INSERT INTO campaigns (title, description, foto, target_amount, current_amount, status, created_by) 
            VALUES (?, ?, ?, ?, 0, 'active', ?)
        `;
        
        await db.query(query, [title, description, foto || null, target_amount, created_by]);
        
        res.status(201).json({ message: 'Kampanye kemanusiaan berhasil dipublikasikan' });
    } catch (error) {
        console.error('Error createCampaign:', error.message);
        res.status(500).json({ message: 'Gagal menyimpan kampanye ke database' });
    }
};

/**
 * Menghapus Kampanye
 */
exports.deleteCampaign = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM campaigns WHERE id = ?', [id]);
        res.json({ message: 'Kampanye berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus kampanye' });
    }
};