import CategoriesModel from "../../models/categoryModel.js";

export const get_all_categories = async (req, res) => {
    try {
      const catgories = await CategoriesModel.find({ status: true })
  
      if (!catgories || catgories.length === 0) {
        return res.status(400).json({ message: "No categories found!" })
      }
  
      res.status(200).json(catgories);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }