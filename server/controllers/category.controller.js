const pool = require('../config/db');

// Get all categories
const getCategories = async (req, res) => {
    try {
        const [categories] = await pool.query(
            `SELECT * FROM categories WHERE user_id IS NULL OR user_id = ? ORDER BY name`,
            [req.user.id]
        );
        res.json(categories);
    } catch (error) {
        console.error('GetCategories error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getCategories };
