const express = require('express');
const { placeOrder, getUserOrders, updateOrderStatus, getOrders } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// @route   POST /api/orders
// @desc    Place a new order
// @access  Protected (requires authentication)
router.post('/', protect, placeOrder);

router.get('/my-orders', protect, getUserOrders);
router.get('/', protect, adminOnly, getOrders);

router.patch('/:id/status', protect, adminOnly, updateOrderStatus); // Admin updates status

module.exports = router;
