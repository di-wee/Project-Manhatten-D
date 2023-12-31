const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	image: [{ type: String, required: true }],
	category: { type: String, enum: [`Men`, `Women`], required: true },
	subcategory: {
		type: String,
		enum: ['Bottoms', 'Shoes', 'Bags', 'Tops', 'Accessories'],
		required: true,
	},
	stock: { type: Number, default: 5 },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
