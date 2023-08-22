const express = require('express');
const router = express.Router();

const {
	getCart,
	addNewCart,
	deleteItemFromCart,
	updateCartItem,
	addNewCart,
} = require('../controllers/cart');

router.get('/cart', getCart);
router.post('/cart', addNewCart);
router.patch('/cart', updateCartItem);
router.delete('/cart', deleteItemFromCart);

module.exports = router;
