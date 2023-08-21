const Payment = require('../models/Payment');

const getAllPaymentDetails = async (req, res) => {
	try {
		const getPaymentDetails = await Payment.find();
		res.json(getPaymentDetails);
	} catch (error) {
		console.log(error.message);
		res
			.status(400)
			.json({ status: 'error', msg: 'error getting all payments' });
	}
};

const getPaymentDetails = async (req, res) => {
	try {
		const getPaymentDetailsById = await Payment.findById(req.params.id);
		res.json(getPaymentDetailsById);
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ status: 'error', msg: 'error getting payments' });
	}
};

const createNewPayment = async (req, res) => {
	try {
		const createPayment = {
			orderId: req.body.orderId,
			paymentGateway: req.body.paymentGateway,
			paymentDetails: {
				paymentMethod: 'CreditCard',
				cardNumber: req.body.cardNumber,
				cardHolder: req.body.cardHolder,
				expirationDate: req.body.expirationDate,
			},
		};

		const savedPayment = await Payment.create(createPayment);
		res.json({ status: 'ok', msg: 'payment created' });
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ status: 'error', msg: 'error getting payment' });
	}
};

const storePaymentCallback = async (req, res) => {
	try {
		const payment = await Payment.findById(req.params.id);
		if (!payment) {
			return res.status(404).json({ message: 'Payment not found' }); //payment false === not found
		}
		payment.gatewayResponse = req.body;
		await payment.save();
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ status: 'error', msg: 'error getting payment' });
	}
};

module.exports = {
	getAllPaymentDetails,
	getPaymentDetails,
	createNewPayment,
	storePaymentCallback,
};
