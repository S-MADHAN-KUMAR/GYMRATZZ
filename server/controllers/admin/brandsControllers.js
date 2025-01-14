import BrandModel from '../../models/brandsModel.js'
import { imageUploadUtil } from '../../utils/imageUploadUtil.js'

export const get_all_brands = async(req,res)=>{
    try {
      const brands = await BrandModel.find()
  
      if(!brands){
        res.status(400).json({message:"No brands found!"})
      }
  
      res.status(200).json(brands)
  
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }
    
export const add_brands = async(req,res)=>{
    try {
      const {name} = req.body
      const image = req.file

      console.log(name,image);
      
  
      const uploadImage = await imageUploadUtil(image.buffer);
  
      const newBrand = new BrandModel({
        name,
        imageUrl: uploadImage,  
      });
  
      await newBrand.save(); 
  
      return res.status(200).json({
        success:true,
        message: 'Brand added successfully!',
        brand: newBrand
      });
  
  
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        success:false,
        message: 'Server error',
        error: error.message,
      });
    }
  }
    
export const get_edit_brands = async (req, res) => {
    try {
      const { id } = req.params;
  
      if(!id){
        res.status(400).json({
          message: 'Brand Id is required!',
        });
        
      }
  
      const foundBrand = await BrandModel.findById(id);
  
      if (!foundBrand) {
        return res.status(400).json({
          message: 'Brand not found',
        });
      }
  
      res.status(200).json({
        message: 'Brand retrieved successfully',
        brand: foundBrand,
      });
    } catch (error) {
      console.error('Error fetching brand:', error.message);
  
      res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }
    
export const update_brands = async (req, res) => {
    try {
      const { name, id } = req.body;
      const image = req.file;
  
      if (!id || !name) {
        return res.status(400).json({
          message: 'Brand ID and Name are required!',
        });
      }
  
      const foundBrand = await BrandModel.findById(id);
      if (!foundBrand) {
        return res.status(404).json({
          message: 'Brand not found',
        });
      }
  
      let uploadedImageUrl = foundBrand.image
      if (image) {
        const uploadImage = await imageUploadUtil(image.buffer);
        uploadedImageUrl = uploadImage.url
      }
  
      foundBrand.name = name;
      foundBrand.image = uploadedImageUrl;
  
      await foundBrand.save();
  
      return res.status(200).json({
        message: 'Brand updated successfully!',
        brand: foundBrand,
      });
    } catch (error) {
      console.error('Error updating brand:', error.message);
  
      res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }
