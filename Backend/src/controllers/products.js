const Product = require('../models/Products')

// Get all products
const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find({});
    // Respond with a 200 status code and the list of products
    res.status(200).json(products);
  } catch (error) {
    // Handle errors and respond with a 500 status code and error message
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get a product by its ID
const getProductById = async (req, res) => {
  try {
    // Fetch the product with the specified ID from the database
    const product = await Product.findById(req.params.productId);
    // Respond with a 200 status code and the product details
    res.status(200).json(product);
  } catch (error) {
    // Handle errors and respond with a 500 status code and error message
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Search for products based on category and price range
const searchProducts = async (req, res) => {
  try {
    // Extract search criteria from the request query parameters
    const { category, minPrice, maxPrice } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = minPrice;
    if (maxPrice) filter.price.$lte = maxPrice;
    // Fetch products that match the search criteria
    const products = await Product.find(filter);
    // Respond with a 200 status code and the list of matching products
    res.status(200).json(products);
  } catch (error) {
    // Handle errors and respond with a 500 status code and error message
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    // Create a new product using the data from the request body
    const newProduct = new Product(req.body);
    // Save the new product to the database
    await newProduct.save();
    // Respond with a 201 status code and the new product details
    res.status(201).json(newProduct);
  } catch (error) {
    // Handle errors and respond with a 500 status code and error message
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Update a product by its ID
const updateProduct = async (req, res) => {
  try {
    // Update the product with the specified ID using the data from the request body
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    // Respond with a 200 status code and the updated product details
    res.status(200).json(updatedProduct);
  } catch (error) {
    // Handle errors and respond with a 500 status code and error message
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete a product by its ID
const deleteProduct = async (req, res) => {
  try {
    // Remove the product with the specified ID from the database
    await Product.findByIdAndDelete(req.params.productId);
    // Respond with a 204 status code indicating successful deletion
    res.status(204).send();
  } catch (error) {
    // Handle errors and respond with a 500 status code and error message
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = { getAllProducts, getProductById, searchProducts, addProduct, updateProduct, deleteProduct } 
