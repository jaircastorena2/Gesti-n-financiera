const express = require('express');
const router = express.Router();
const { getCategories } = require('../controllers/category.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);
router.get('/', getCategories);

module.exports = router;
