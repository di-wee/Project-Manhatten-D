const Subcategory = require('../models/subCategory');

// Get all subcategories
const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({});
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
};

// Get a subcategory by ID
const getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.subcategoryId);
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subcategory' });
  }
};

// Get subcategories by parent category ID
const getSubcategoriesByParentCategoryId = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({ parentCategory: req.params.parentCategoryId });
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
};

// Add a new subcategory
const addSubcategory = async (req, res) => {
  try {
    const newSubcategory = new Subcategory(req.body);
    await newSubcategory.save();
    res.status(201).json(newSubcategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create subcategory' });
  }
};

// Update a subcategory by its ID
const updateSubcategory = async (req, res) => {
  try {
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(req.params.subcategoryId, req.body, { new: true });
    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subcategory' });
  }
};

// Delete a subcategory by its ID
const deleteSubcategory = async (req, res) => {
  try {
    await Subcategory.findByIdAndDelete(req.params.subcategoryId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subcategory' });
  }
};

module.exports = {
    getAllSubcategories,
    getSubcategoryById,
    getSubcategoriesByParentCategoryId,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory
  };
  