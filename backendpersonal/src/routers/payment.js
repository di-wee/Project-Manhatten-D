const express = require('express');
const router = express.Router();
const {
	getAllPaymentDetails,
	getPaymentDetails,
	createNewPayment,
	storePaymentCallback,
} = require('../controllers/payment');

router
	.post('/payment/process', createNewPayment)
	.post('/payment/callback/:id', storePaymentCallback)

	// for checking purposes
	.get('/payment', getAllPaymentDetails)
	.get('/payment/:id', getPaymentDetails);

module.exports = router;
