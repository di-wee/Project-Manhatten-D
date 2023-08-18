const Category = require('../models/Category');

// This method fetches all categories from the database and sends them as a JSON response with a status code of 200.
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// This method fetches a category with the specified ID from the database and sends it as a JSON response with a status code of 200.
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

// This method fetches a category with the specified ID from the database, populates the subcategories field, and sends the subcategories as a JSON response with a status code of 200.
const getSubcategoriesByCategoryId = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId).populate('subcategories');
    res.status(200).json(category.subcategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
};

// This method creates a new category with the data from the request body, saves it to the database, and sends the newly created category as a JSON response with a status code of 201.
const addCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// This method updates a category with the specified ID using the data from the request body, saves it to the database, and sends the updated category as a JSON response with a status code of 200.
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
};

// This method deletes a category with the specified ID from the database and sends a response with a status code of 204 to indicate successful deletion.
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

// Exporting the methods so they can be used in other parts of the application, such as in the router.
module.exports = { getCategories, getCategoryById, getSubcategoriesByCategoryId, addCategory, updateCategory, deleteCategory };
