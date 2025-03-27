const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// All cart routes are protected
router.get('/', protect, cartController.getCart);
router.post('/', protect, cartController.addToCart);
router.put('/:productId', protect, cartController.updateCartItem);
router.delete('/:productId', protect, cartController.removeFromCart);
router.delete('/', protect, cartController.clearCart);

module.exports = router;
