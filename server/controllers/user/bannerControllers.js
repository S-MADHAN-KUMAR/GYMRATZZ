import BannerModel from "../../models/bannerModel.js";

export const get_all_banners = async(req,res)=>{
    try {
      const banners = await BannerModel.find({status:true})
  
      if(!banners){
        res.status(400).json({message:"No banners found!"})
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