const Payment = require('../models/Payment');
const Product = require('../models/Products');

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
		const cart = req.session.cart;

		if (!cart || cart.items.length === 0) {
			return res.status(400).json({ error: 'cart is empty' });
		}

		//  total amount from the cart
		const totalAmount = cart.items.reduce((sum, item) => {
			return sum + item.price * item.quantity;
		}, 0);

		// creating the paymentintent
		const paymentIntent = await stripe.paymentIntents.create({
			amount: totalAmount * 100, //stripe only accepts cents
			currency: 'SGD',
		});

		// Respond with the client secret for the frontend to handle
		res.json({
			clientSecret: paymentIntent.client_secret,
			status: 'ok',
			msg: 'payment intent created',
		});
	} catch (error) {
		console.log(error.message);
		res
			.status(500)
			.json({ status: 'error', msg: 'Unable to create payment intent' });
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
