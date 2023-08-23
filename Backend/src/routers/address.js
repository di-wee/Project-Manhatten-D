const express = require('express');
const router = express.Router();

const {
	putAddress,
	getAllAddresses,
	postAddress,
	patchAddress,
	deleteAddress,
} = require('../controllers/address');

router.put('/address', putAddress);
router.get('/address', getAllAddresses);
router.post('/address/:id', postAddress);
router.patch('/address/:id', patchAddress);
router.delete('/address/:id', deleteAddress);

module.exports = router;
