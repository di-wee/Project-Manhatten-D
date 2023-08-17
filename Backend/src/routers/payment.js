const express = require('express');
const router = express.Router();

router
	.post('/payment/process', createNewPayment)
	.post('/payment/callback', storePaymentCallback);

module.exports = router;
