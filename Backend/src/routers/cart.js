const express = require('express');
const router = express.Router();

const {
	getCart,
	addNewCart,
	deleteCart,
	patchCart,
} = require('../controllers/cart');

router.get('/cart', getCart);
router.post('/cart', addNewCart);
router.patch('/cart/:id', patchCart);
router.delete('/cart/item/:id', deleteCart);

module.exports = router;
