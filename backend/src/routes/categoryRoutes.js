const express = require('express');
const { getAllCategories } = require('../controllers/categoryController');
const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
router.get('/', getAllCategories);

module.exports = router;
