const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	subcategories: [
		{
			name: {
				type: String,
				required: true,
			},
		},
	],
});

module.exports = new mongoose.model('Category', CategorySchema);
