const express = require('express');
const router = express.Router();
const {
    getExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
    getStats
} = require('../controllers/expense.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All routes require authentication
router.use(authMiddleware);

// CRUD routes
router.get('/', getExpenses);
router.get('/stats', getStats);
router.get('/:id', getExpenseById);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
