import CategoriesModel from "../../models/categoryModel.js";
import ProductModel from "../../models/productsModel.js";
import { imageUploadUtil } from "../../utils/imageUploadUtil.js";

export const get_all_categories = async (req, res) => {
    try {
      const categories = await CategoriesModel.find()
      res.status(200).json(categories)
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      res.status(500).send({
        message: 'Error fetching categories',
        error: error.message,
      });
    }
  };

export const add_categories = async (req, res) => {
    try {
      const { name } = req.body;
      const image = req.file;
  
      if (!name || !image) {
        return res.status(400).json({ message: 'Please provide all the fields including image.' });
      }

      const existCategory = await CategoriesModel.findOne({name})

      if (existCategory) {
        return res.status(400).json({ message: 'Category name already exist!' });
      }
  
      const uploadImage = await imageUploadUtil(image.buffer); 
  
      const newCategory = new CategoriesModel({
        name,
        imageUrl: uploadImage,  
      });
  
      await newCategory.save(); 
  
      return res.status(200).json({
        message: 'Category added successfully!',
        category: newCategory
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while adding the category.', error: error.message });
    }
  }

export const get_edit_categories = async (req, res) => {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ message: 'Category ID is required' });
      }
  
      const Category = await CategoriesModel.findById(id);
  
      if (Category) {
        return res.status(200).json({ category: Category });
      } else {
        console.log(`Category with id ${id} not found.`);
        return res.status(404).json({ message: `Category with id ${id} not found.` });
      }
    } catch (error) {
      console.error('Error retrieving Category details:', error);
      return res.status(500).json({ message: 'Error retrieving Category details', error: error.message });
    }
  }

export const update_categories = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, status } = req.body;
      const image = req.file;
  
      let uploadImage;
      if (image) {
        uploadImage = await imageUploadUtil(image.buffer);
      } else {
        const existingCategory = await CategoriesModel.findById(id);
        if (!existingCategory) {
          return res.status(404).json({ message: 'Category not found.' });
        }
        uploadImage = existingCategory.imageUrl;
      }
  
      const newUpdateCategory = {
        name,
        status,
        imageUrl: uploadImage,
      };
  
      const updatedCategory = await CategoriesModel.findByIdAndUpdate(id, newUpdateCategory, { new: true });
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found.' });
      }
  
      res.status(200).json({
        message: 'Category updated successfully!',
        category: updatedCategory,
      });
    } catch (error) {
      console.error('Error while updating category:', error.message);
      return res.status(500).json({
        message: 'An error occurred while updating the category.',
        error: error.message
      });
    }
  };

export const toggleBlockCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedCategory = await CategoriesModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });

      
    }
    if (status === false) {
      const updatedProducts = await ProductModel.updateMany(
        { category: id }, // Find products with this category ID
        { status: false } // Set their status to false
      );

      console.log(`${updatedProducts.modifiedCount} products updated.`);
    }

    res.status(200).json({
      message: "Category status updated successfully.",
      updatedCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
  };
  