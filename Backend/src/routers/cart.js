const express = require('express');
const router = express.Router();

const {
	getCart,
	addNewCart,
	deleteItemFromCart,
	updateCartItem,
} = require('../controllers/cart');

router.get('/cart', getCart);
router.post('/cart', addNewCart);
router.patch('/cart', updateCartItem);
router.delete('/cart/:productid', deleteItemFromCart);

module.exports = router;
