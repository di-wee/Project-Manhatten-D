const express = require('express');
const router = express.Router();

const {
	getCart,
	addNewCart,
	deleteItemFromCart,
	updateCartItem,
	createEmptyCart,
} = require('../controllers/cart');

router.post('/cart', createEmptyCart);
router.get('/cart/:id', getCart);
router.put('/cart', addNewCart);
router.patch('/cart', updateCartItem);
router.delete('/cart', deleteItemFromCart);

module.exports = router;
