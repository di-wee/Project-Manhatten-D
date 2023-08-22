const express = require('express');
const router = express.Router();
const {
	getPaymentStripe,
	createNewPayment,
} = require('../controllers/payment');

router
	.post('/payment/intent/:cartId', createNewPayment)

	// for checking purposes
	.get('/payment/:paymentIntentId', getPaymentStripe);

module.exports = router;
