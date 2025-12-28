/**
 * Middleware untuk memeriksa agar input tidak kosong
 */
const validate = (req, res, next) => {
    const bodies = req.body;
    
    // Periksa setiap field di body
    for (const key in bodies) {
        if (bodies[key] === null || bodies[key] === '' || bodies[key] === undefined) {
            return res.status(400).json({ 
                status: 'error',
                message: `Field '${key}' tidak boleh kosong` 
            });
        }
    }
    
    next();
};

module.exports = validate;