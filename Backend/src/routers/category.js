const express = require('express');
const router = express.Router();
const {
	getCategories,
	getCategoryById,
	addCategory,
	updateCategory,
	deleteCategory,
} = require('../controllers/Category');

// Get all categories
router.get('/category', getCategories);

// Get a category by ID
router.get('/:categoryId', getCategoryById);

// Add a new category
router.post('/category', addCategory);

// Update a category
router.put('/:categoryId', updateCategory);

// Delete a category
router.delete('/:categoryId', deleteCategory);

module.exports = router;
