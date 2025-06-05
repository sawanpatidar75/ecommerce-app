const express = require('express');
const {
  addProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails
} = require('../controllers/productController');
const upload = require('../middlewares/upload');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// @route   POST /api/products
// @desc    Add a product
router.post('/', protect, adminOnly, upload.array('image', 5), addProduct);

// @route   PUT /api/products/:id
// @desc    Edit a product
router.put('/:id', protect, adminOnly, upload.array('image', 5), editProduct);

// @route   DELETE /api/products/:id
// @desc    Delete a product
router.delete('/:id', protect, adminOnly, deleteProduct);

// @route   GET /api/products
// @desc    Get all products
router.get('/', getAllProducts);

// @route   GET /api/products/:id
// @desc    Get product details
router.get('/:id', getProductDetails);

module.exports = router;
