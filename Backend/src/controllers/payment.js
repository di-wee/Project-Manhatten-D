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
		const product = await Product.findById(req.params.id);

		//if product not found = false
		if (!product) {
			return res.status(404).json({ error: 'product not found' });
		}

		const paymentIntent = await stripe.checkout.sessions.create({
			line_items: [
				{
					name: product.name,
					description: product.description,
					amount: product.price * 100, // stripe wants currency in cents
					currency: 'SGD',
					quantity: 1,
				},
			],
			mode: 'payment', //indicate for one-time payment and not subscription payment etc.
			success_url: `${process.env.DOMAIN}/shopping-cart/checkout/payment`, //page after payment is successful
			cancel_url: `${process.env.DOMAIN}/shopping-cart`, //page if payment is unsuccessful
		});
		res
			.send({
				clientSecret: paymentIntent.client_secret, //one-time-use token provided by stripe required by frontend to complete payment
			})
			.json({ status: 'ok', msg: 'payment intent created' });
	} catch (error) {
		console.log(error.message);
		res
			.status(500)
			.json({ status: 'error', msg: 'unable to create payment intent' });
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
