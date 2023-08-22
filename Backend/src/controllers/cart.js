const cartModel = require('../models/Cart');
const Product = require('../models/Products');

const getCart = async (req, res) => {
	try {
		res.json(req.session.cart || { items: [], totalAmount: 0 });
	} catch (error) {
		console.log(error.message);
		res.json({ status: 'error', msg: 'error getting cart' });
	}
};

const addNewCart = async (req, res) => {
	try {
		const product = await Product.findById(req.body.id);
		if (!product) {
			res.status(400).json({ status: 'error', msg: 'product not found!' });
		}

		let cart = req.session.cart; //creating a variable for the cart for a particular session

		//if no active session for cart; to create empty cart array
		if (!cart) {
			cart = {
				items: [],
				totalAmount: 0,
			};
		}
		//managing quanities for cart

		//finding the index in the cart if the item that is added matches
		const findIndex = cart.items.findIndex(
			(item) => item.product.toString() === req.body.id // item.products is essentially the objectID of a product
		);

		// if the product is in the cart, update its quantity
		if (findIndex > -1) {
			cart.items[findIndex].quantity += req.body.quantity;
			cart.totalAmount += product.price * req.body.quantity;

			//or else just add it into cart as a new item
		} else {
			const cartItem = {
				product: req.body.id,
				price: product.price,
				quantity: req.body.quantity || 1,
			};
			cart.items.push(cartItem);
			cart.totalAmount += cartItem.price * cartItem.quantity;
		}
		req.session.save();
		res.status(200).json({
			status: 'ok',
			msg: 'item added to cart!',
			cart: req.session.cart,
		});
	} catch (error) {
		console.log(error.message);
		res
			.status(500)
			.json({ status: 'error', msg: 'unable to add item to cart' });
	}
};

const deleteItemFromCart = async (req, res) => {
	try {
		let cart = req.session.cart;
		if (!cart) {
			return res.status(400).json({ status: 'error', msg: 'no cart found!' });
		}

		const productId = req.params.id;

		// find if item already exist in cart
		const findIndex = cart.items.findIndex(
			(item) => item.product.toString() === productId
		);

		if (findIndex === -1) {
			return res
				.status(404)
				.json({ status: 'error', msg: 'Product not found in cart!' });
		}

		// update the totalAmount in cart
		cart.totalAmount -=
			cart.items[findIndex].price * cart.items[findIndex].quantity;

		// Remove the product from the cart
		cart.items.splice(findIndex, 1);

		req.session.cart = cart;
		req.session.save(); //saving session

		res.status(200).json({
			status: 'ok',
			msg: 'item removed from cart!',
			cart: req.session.cart,
		});
	} catch (error) {
		console.log(error.message);
		res
			.status(500)
			.json({ status: 'error', msg: 'error removing item from cart' });
	}
};

const updateCartItem = async (req, res) => {
	try {
		const productId = req.body.id;
		const newQuantity = req.body.quantity;

		let cart = req.session.cart;
		if (!cart) {
			return res.status(404).json({ status: 'error', msg: 'no cart found!' });
		}

		// find the item index
		const findIndex = cart.items.findIndex(
			(item) => item.product.toString() === productId
		);

		if (findIndex === -1) {
			return res
				.status(404)
				.json({ status: 'error', msg: 'Product not found in cart!' });
		}

		// update the totalAmount to subtract the old product amount and add the new product amount
		cart.totalAmount -=
			cart.items[findIndex].price * cart.items[findIndex].quantity;

		cart.items[findIndex].quantity = newQuantity;

		cart.totalAmount += cart.items[findIndex].price * newQuantity;

		req.session.cart = cart;
		req.session.save();

		res.status(200).json({
			status: 'ok',
			msg: 'cart item updated!',
			cart: req.session.cart,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ status: 'error', msg: 'error updating cart item' });
	}
};

module.exports = {
	getCart,
	addNewCart,
	deleteItemFromCart,
	updateCartItem,
	addNewCart,
};
