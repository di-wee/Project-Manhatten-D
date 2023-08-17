const express = require('express');
const router = express.Router();

router
	.get('/category', getAllCategories)
	.get('/category/:id', getCategory)
	.post('/category', createCategory)
	.put('/category/:id', updateCategory)
	.delete('/category/:id', deleteCategory);

module.exports = router;
