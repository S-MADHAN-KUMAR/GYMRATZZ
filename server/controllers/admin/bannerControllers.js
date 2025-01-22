import BannerModel from '../../models/bannerModel.js'
import { imageUploadUtil } from '../../utils/imageUploadUtil.js'

export const get_all_banners = async(req,res)=>{
    try {
      const banners = await BannerModel.find()
  
      if(!banners){
        res.status(400).json({message:"No products found!"})
      }
  
      res.status(200).json(banners)
  
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }
    
export const add_banners = async(req,res)=>{
    try {
      const {name} = req.body
      const image = req.file
      
      const existNameBanner = await BannerModel.findOne({ name });

    if (existNameBanner) {
      return res.status(400).json({
        success: false,
        message: "Banner Name Already Exist In Banners"
      });
    } 
  
      const uploadImage = await imageUploadUtil(image.buffer);
  
      const newBanner = new BannerModel({
        name,
        imageUrl: uploadImage,  
      });
  
      await newBanner.save(); 
  
      return res.status(200).json({
        success:true,
        message: 'Brand added successfully!',
        banner: newBanner
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
    
export const get_edit_banners = async (req, res) => {
    try {
      const { id } = req.params;
  
      if(!id){
        res.status(400).json({
          message: 'Brand Id is required!',
        });
        
      }
  
      const foundBanner = await BannerModel.findById(id);
  
      if (!foundBanner) {
        return res.status(400).json({
          message: 'Brand not found',
        });
      }
  
      res.status(200).json({
        message: 'Brand retrieved successfully',
        banner: foundBanner,
      });
    } catch (error) {
      console.error('Error fetching brand:', error.message);
  
      res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }
    
export const update_banners = async (req, res) => {
    try {
      const { name, id } = req.body;
      const image = req.file;
  
      if (!id || !name) {
        return res.status(400).json({
          message: 'Brand ID and Name are required!',
        });
      }
  
      const foundBanner = await BannerModel.findById(id);
      if (!foundBanner) {
        return res.status(404).json({
          message: 'Brand not found',
        });
      }
  
      let uploadedImageUrl = foundBanner.image
      if (image) {
        const uploadImage = await imageUploadUtil(image.buffer);
        uploadedImageUrl = uploadImage.url
      }
  
      foundBanner.name = name;
      foundBanner.image = uploadedImageUrl;
  
      await foundBanner.save();
  
      return res.status(200).json({
        message: 'Brand updated successfully!',
        banner: foundBanner,
      });
    } catch (error) {
      console.error('Error updating brand:', error.message);
  
      res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }

  export const toggleBlockBanners = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const updatedBanner = await BannerModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
  
      if (!updatedBanner) {
        return res.status(404).json({ message: "Banner not found." });
      }
  
      res.status(200).json({
        message: "Banner status updated successfully.",
        updatedBanner,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
