const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/store-password', userController.storePassword);
router.post('/verify-password', userController.verifyPassword);

module.exports = router;
