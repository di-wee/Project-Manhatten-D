const stripe = require('stripe')(process.env.TEST_KEY);

//this is solely for stripe API

const Cart = require('../models/Cart');
const Product = require('../models/Products');

const getPaymentStripe = async (req, res) => {
	try {
		//retrieving paymentintent from stripe server via params.id
		const paymentIntent = await stripe.paymentIntents.retrieve(
			req.params.paymentIntentId
		);
		res.json(paymentIntent);
	} catch (error) {
		console.log(error.message);
		res
			.status(500)
			.send({ status: 'error', msg: 'failed to retrieve payment intent' });
	}
};
const createNewPayment = async (req, res) => {
	try {
		const cart = await Cart.findById(req.params.cartId);

		if (!cart || cart.items.length === 0) {
			return res.status(400).json({ error: 'cart is empty' });
		}

		// to reserve the items in the cart by decrementing their stock
		for (let cartItem of cart.items) {
			const product = await Product.findById(cartItem.product);
			if (!product) {
				throw new Error(`Product with ID ${cartItem.product} not found`);
			}
			if (product.stock < cartItem.quantity) {
				throw new Error(`Not enough stock for product ${product.name}`);
			}
			product.stock -= cartItem.quantity; //decrementing stock
			await product.save();
		}

		// creating the paymentintent
		const paymentIntent = await stripe.paymentIntents.create({
			amount: cart.totalAmount * 100, //stripe only accepts cents
			currency: 'SGD',
		});

		// respond with the client secret for the frontend to handle
		res.json({
			clientSecret: paymentIntent.client_secret,
			paymentIntentId: paymentIntent.id,
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

module.exports = {
	getPaymentStripe,
	createNewPayment,
};
