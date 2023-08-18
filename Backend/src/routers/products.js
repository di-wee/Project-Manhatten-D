const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  searchProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');

// Route to handle fetching all products
router.get('/', getAllProducts); 

// Route to handle fetching a product by its ID
router.get('/:productId', getProductById);

// Route to handle searching for products based on category and price range
router.get('/search', searchProducts); 

// Route to handle adding a new product
router.post('/', addProduct); 

// Route to handle updating a product by its ID
router.put('/:productId', updateProduct);

// Route to handle deleting a product by its ID
router.delete('/:productId', deleteProduct); 

module.exports = router;

