const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
	orderId: {
		type: mongoose.Schema.Types.ObjectId, //getting the id pregenerated from mongoose
		required: true,
		ref: '', // reference from Orders schema [Jol take note]
	},

	//what was used for payment e.g Stripe, Paypal etc
	paymentGateway: {
		type: String,
		required: true,
	},

	paymentStatus: {
		type: String,
		enum: ['Pending', 'Paid', 'Failed'],
		default: 'Pending',
	},
	paymentDetails: {
		paymentMethod: {
			type: String,
			enum: ['CreditCard'],
			required: true,
		},
		cardNumber: {
			type: String,
			//to add validation later
		},
		cardHolder: {
			type: String,
		},
		expirationDate: {
			type: String,
			//to add validation later
		},
	},

	//to store info from payment gateway call back for transaction verification
	gatewayResponse: {
		type: Object,
	},

	timestamp: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Payment', PaymentSchema);
