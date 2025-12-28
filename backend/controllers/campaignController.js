const db = require('../config/db');

/**
 * 1. Mengambil semua data kampanye
 */
const getAllCampaigns = async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM campaigns');
        res.json(rows);
    } catch (err) { 
        next(err); 
    }
};

/**
 * 2. Mengambil satu kampanye berdasarkan ID
 * Fungsi ini WAJIB ada karena dipanggil di routes/api.js baris 28
 */
const getCampaignById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM campaigns WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ 
                status: 'error',
                message: 'Kampanye tidak ditemukan' 
            });
        }
        
        res.json(rows[0]);
    } catch (err) { 
        next(err); 
    }
};

/**
 * 3. Mengambil statistik ringkasan (Total Donasi, Kampanye Sukses, Kategori)
 */
const getStats = async (req, res, next) => {
    try {
        // Menghitung total donasi dari semua kampanye
        const [[{ total_donation }]] = await db.query('SELECT SUM(current_amount) as total_donation FROM campaigns');
        
        // Menghitung kampanye yang sudah mencapai target
        const [[{ total_success }]] = await db.query('SELECT COUNT(*) as total_success FROM campaigns WHERE current_amount >= target_amount');
        
        // Menghitung jumlah kategori unik
        const [[{ total_reach }]] = await db.query('SELECT COUNT(DISTINCT category) as total_reach FROM campaigns');

        res.json({
            totalDonation: total_donation || 0,
            campaignsSuccess: total_success || 0,
            reach: total_reach || 0
        });
    } catch (err) { 
        next(err); 
    }
};

/**
 * 4. Membuat kampanye baru
 */
const createCampaign = async (req, res, next) => {
    try {
        const { title, description, target_amount, start_date, end_date, category } = req.body;
        const sql = `INSERT INTO campaigns (title, description, target_amount, current_amount, start_date, end_date, category) 
                     VALUES (?, ?, ?, 0, ?, ?, ?)`;
        const [result] = await db.query(sql, [title, description, target_amount, start_date, end_date, category]);
        
        res.status(201).json({ 
            status: 'success',
            message: 'Kampanye berhasil dibuat', 
            id: result.insertId 
        });
    } catch (err) { 
        next(err); 
    }
};

/**
 * 5. Memperbarui data kampanye
 */
const updateCampaign = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, target_amount, end_date } = req.body;
        
        await db.query(
            'UPDATE campaigns SET title = ?, target_amount = ?, end_date = ? WHERE id = ?', 
            [title, target_amount, end_date, id]
        );
        
        res.json({ 
            status: 'success',
            message: 'Kampanye berhasil diperbarui' 
        });
    } catch (err) { 
        next(err); 
    }
};

/**
 * 6. Menghapus kampanye
 */
const deleteCampaign = async (req, res, next) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM campaigns WHERE id = ?', [id]);
        
        res.json({ 
            status: 'success',
            message: 'Kampanye berhasil dihapus' 
        });
    } catch (err) { 
        next(err); 
    }
};

// EKSPOR SEMUA FUNGSI (Pastikan getCampaignById ada di sini)
module.exports = { 
    getAllCampaigns, 
    getCampaignById, 
    getStats, 
    createCampaign, 
    updateCampaign, 
    deleteCampaign 
};