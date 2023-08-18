const express = require('express');
const router = express.Router();
const {
	getAllSubcategories,
	getSubcategoryById,
	getSubcategoriesByParentCategoryId,
	addSubcategory,
	updateSubcategory,
	deleteSubcategory,
} = require('../controllers/subcategory');

router.get('/subcategory', getAllSubcategories);
router.get('/:subcategoryId', getSubcategoryById);
router.get('/parent/:parentCategoryId', getSubcategoriesByParentCategoryId);
router.post('/subcategory', addSubcategory);
router.put('/:subcategoryId', updateSubcategory);
router.delete('/:subcategoryId', deleteSubcategory);

module.exports = router;
