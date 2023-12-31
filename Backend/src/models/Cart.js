const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
	product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, //id from Products collection
	price: { type: Number, required: true },
	quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
	items: [CartItemSchema],
	totalAmount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Cart', CartSchema);
