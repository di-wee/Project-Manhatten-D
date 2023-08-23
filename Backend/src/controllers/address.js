const Address = require('../models/Address');

//for user to add address
const putAddress = async (req, res) => {
	try {
		const createAddress = new Address({
			fullName: req.body.fullName,
			addressLine1: req.body.addressLine1,
			addressLine2: req.body.addressLine2,
			city: req.body.city,
			state: req.body.state,
			country: req.body.country,
			postalCode: req.body.postalCode,
			emailAddress: req.body.emailAddress,
		});
		await createAddress.save();
		res.json({ status: 'ok', msg: 'saved', addressId: createAddress._id });
	} catch (error) {
		console.log(error.message);
		res.json({ status: 'error', message: error.message });
	}
};

//for admin to retrieve all addresses
const getAllAddresses = async (req, res) => {
	try {
		const address = await Address.find();
		res.json(address);
	} catch (error) {
		console.log(error.message);
		res.json({ status: 'error', message: error.message });
	}
};

//for admin to retrieve 1 address
const postAddress = async (req, res) => {
	try {
		const address = await Address.findById(req.params.id);
		res.json(address);
	} catch (error) {
		console.log(error.message);
		res.json({ status: 'error', message: error.message });
	}
};

//for admin to edit address
const patchAddress = async (req, res) => {
	try {
		const updateAddress = await Address.updateOne(
			{
				_id: req.params.id,
			},
			{
				fullName: req.body.fullName,
				addressLine1: req.body.addressLine1,
				addressLine2: req.body.addressLine2,
				city: req.body.city,
				state: req.body.state,
				country: req.body.country,
				postalCode: req.body.postalCode,
				emailAddress: req.body.emailAddress,
			}
		);
		res.json({ status: 'ok', msg: 'saved' });
	} catch (error) {
		console.log(error.message);
		res.json({ status: 'error', message: error.message });
	}
};

//for admin to delete address
const deleteAddress = async (req, res) => {
	try {
		const deleteAddress = await Address.deleteOne({
			_id: req.params.id,
		});
		res.json({ status: 'ok', msg: 'deleted' });
	} catch (error) {
		console.log(error.message);
		res.json({ status: 'error', message: error.message });
	}
};

module.exports = {
	putAddress,
	getAllAddresses,
	postAddress,
	patchAddress,
	deleteAddress,
};
