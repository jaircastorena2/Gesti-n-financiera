const pool = require('../config/db');

// Get all expenses for user
const getExpenses = async (req, res) => {
    try {
        const [expenses] = await pool.query(
            `SELECT e.*, c.name as category_name, c.icon, c.color 
             FROM expenses e 
             LEFT JOIN categories c ON e.category_id = c.id 
             WHERE e.user_id = ? 
             ORDER BY e.expense_date DESC`,
            [req.user.id]
        );
        res.json(expenses);
    } catch (error) {
        console.error('GetExpenses error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get expense by ID
const getExpenseById = async (req, res) => {
    try {
        const [expenses] = await pool.query(
            `SELECT e.*, c.name as category_name, c.icon, c.color 
             FROM expenses e 
             LEFT JOIN categories c ON e.category_id = c.id 
             WHERE e.id = ? AND e.user_id = ?`,
            [req.params.id, req.user.id]
        );

        if (expenses.length === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        res.json(expenses[0]);
    } catch (error) {
        console.error('GetExpenseById error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Create new expense
const createExpense = async (req, res) => {
    try {
        const { category_id, amount, description, expense_date } = req.body;

        if (!category_id || !amount || !expense_date) {
            return res.status(400).json({ error: 'Category, amount, and date are required' });
        }

        const [result] = await pool.query(
            `INSERT INTO expenses (user_id, category_id, amount, description, expense_date) 
             VALUES (?, ?, ?, ?, ?)`,
            [req.user.id, category_id, amount, description || '', expense_date]
        );

        const [newExpense] = await pool.query(
            `SELECT e.*, c.name as category_name, c.icon, c.color 
             FROM expenses e 
             LEFT JOIN categories c ON e.category_id = c.id 
             WHERE e.id = ?`,
            [result.insertId]
        );

        res.status(201).json(newExpense[0]);
    } catch (error) {
        console.error('CreateExpense error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update expense
const updateExpense = async (req, res) => {
    try {
        const { category_id, amount, description, expense_date } = req.body;

        // Check if expense exists and belongs to user
        const [existing] = await pool.query(
            'SELECT id FROM expenses WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        await pool.query(
            `UPDATE expenses 
             SET category_id = ?, amount = ?, description = ?, expense_date = ? 
             WHERE id = ? AND user_id = ?`,
            [category_id, amount, description, expense_date, req.params.id, req.user.id]
        );

        const [updated] = await pool.query(
            `SELECT e.*, c.name as category_name, c.icon, c.color 
             FROM expenses e 
             LEFT JOIN categories c ON e.category_id = c.id 
             WHERE e.id = ?`,
            [req.params.id]
        );

        res.json(updated[0]);
    } catch (error) {
        console.error('UpdateExpense error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete expense
const deleteExpense = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM expenses WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('DeleteExpense error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get expense statistics
const getStats = async (req, res) => {
    try {
        // Total spent this month
        const [monthTotal] = await pool.query(
            `SELECT COALESCE(SUM(amount), 0) as total 
             FROM expenses 
             WHERE user_id = ? 
             AND MONTH(expense_date) = MONTH(CURRENT_DATE()) 
             AND YEAR(expense_date) = YEAR(CURRENT_DATE())`,
            [req.user.id]
        );

        // By category
        const [byCategory] = await pool.query(
            `SELECT c.name, c.icon, c.color, COALESCE(SUM(e.amount), 0) as total 
             FROM categories c 
             LEFT JOIN expenses e ON c.id = e.category_id AND e.user_id = ? 
             GROUP BY c.id 
             ORDER BY total DESC`,
            [req.user.id]
        );

        // By month (last 6 months)
        const [byMonth] = await pool.query(
            `SELECT 
                DATE_FORMAT(expense_date, '%Y-%m') as month,
                SUM(amount) as total 
             FROM expenses 
             WHERE user_id = ? 
             AND expense_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
             GROUP BY DATE_FORMAT(expense_date, '%Y-%m') 
             ORDER BY month`,
            [req.user.id]
        );

        res.json({
            monthTotal: monthTotal[0].total,
            byCategory,
            byMonth
        });
    } catch (error) {
        console.error('GetStats error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
    getStats
};
