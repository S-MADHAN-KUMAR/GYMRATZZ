import CategoriesModel from "../../models/categoryModel.js";
import CategoryOfferModel from '../../models/categoriesOfferModel.js'
import ProductOfferModel from "../../models/productOfferModel.js";
import ProductModel from "../../models/productsModel.js";

export const add_product_offer = async (req, res) => {
  try {
    const { productId, discount, startDate, endDate, status } = req.body; 

    const existOffer = await ProductOfferModel.findOne({ productId });

    if (!existOffer) {
      const newOffer = new ProductOfferModel({
        productId, 
        discount,
        startDate,
        endDate,
        status,
        categoryOffer:false
      });

      await newOffer.save(); 
      res.status(200).json({ message: "Offer added successfully!", newOffer }); 
    } else {
      res.status(400).json({ message: "Offer already exists!",msg:true});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const get_all_product_offer = async (req, res) => {
    try {
      const offers = await ProductOfferModel.find();
  
      if (offers.length === 0) {
        return res.status(404).json({ message: "No product offers found." });
      }
  
      const products = await ProductModel.find();
  
      const offersWithProductDetails = offers.map((offer) => {
        const product = products.find((prod) => prod._id.toString() === offer.productId.toString());
  
        if (product) {
          return {
            ...offer.toObject(),
            productName: product.name,
            productImage: product.imageUrls?.[0],
          };
        }
  
        return offer; 
      });
  
      res.status(200).json(offersWithProductDetails); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
export const toggleBlockProductOffers = async (req, res) => {
    const { id, status } = req.body;
  
    try {
      const productOffer = await ProductOfferModel.findById(id);
  
      if (!productOffer) {
        return res.status(404).json({ message: 'Product offer not found' });
      }
  
      productOffer.status = status;
  
      await productOffer.save();
  
      return res.status(200).json({ message: `Product offer has been ${status ? 'listed' : 'unlisted'}` });
    } catch (error) {
      console.error('Error blocking/unblocking product offer:', error);
      return res.status(500).json({ message: 'Failed to update product offer status' });
    }
  }

  export const add_categories_offer = async (req, res) => {
    try {
      const { categoryId, discount, startDate, endDate, status } = req.body;
  
      const existOffer = await CategoryOfferModel.findOne({ categoryId });
      const appliedProducts = await ProductModel.find({ categoryId });
  
      const productOffers = await ProductOfferModel.find();
  
      if (!existOffer) {
        const newOffer = new CategoryOfferModel({
          categoryId,
          discount,
          startDate,
          endDate,
          status,
        });
  
        await Promise.all(
          appliedProducts.map(async (product) => {
            const productOffer = productOffers.find((offer) => offer.productId.toString() === product._id.toString());
  
            if (productOffer) {
              await ProductOfferModel.updateOne(
                { _id: productOffer._id },
                { discount, categoryOffer: true }
              );
            } else {
              const newProductOffer = new ProductOfferModel({
                productId: product._id,
                discount,
                categoryOffer: true,
              });
              await newProductOffer.save();
            }
          })
        );
  
        await newOffer.save();
        res.status(200).json({ message: "Offer added successfully!", newOffer });
      } else {
        res.status(400).json({ message: "Offer already exists!", msg: true });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const get_all_categories_offer = async (req, res) => {
      try {
        const offers = await CategoryOfferModel.find();
    
        if (offers.length === 0) {
          return res.status(404).json({ message: "No product offers found." });
        }
    
        const categories = await CategoriesModel.find();
    
        const offersWithProductDetails = offers.map((offer) => {
          const category = categories.find((prod) => prod._id.toString() === offer.categoryId.toString());
    
          if (category) {
            return {
              ...offer.toObject(),
              categoriesName: category.name,
              categoriesImage: category.imageUrl,
            };
          }
    
          return offer; 
        });
    
        res.status(200).json(offersWithProductDetails); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
    
 export const toggleBlockCategoryOffers = async (req, res) => {
      const { id, status } = req.body;
    
      try {
        const categoryOffer = await CategoryOfferModel.findById(id);
    
        if (!categoryOffer) {
          return res.status(404).json({ message: 'Category offer not found' });
        }
        
        categoryOffer.status = status;
                
        await categoryOffer.save();
        const appliedProducts = await ProductModel.find({ category: categoryOffer.categoryId });
        
        const productOffers = await ProductOfferModel.find();
        
        await Promise.all(
          appliedProducts.map(async (product) => {
            const productOffer = productOffers.find((offer) => offer.productId.toString() === product._id.toString());
            
            if (productOffer) {
              productOffer.status = status;
              await productOffer.save();
            }
          })
        );
        
        
        return res.status(200).json({
          message: `Category offer and associated product offers have been ${
            status ? 'activated' : 'blocked'
          } successfully.`,
        });
      } catch (error) {
        console.error('Error blocking/unblocking category offer:', error);
        return res.status(500).json({ message: 'Failed to update category offer status' });
      }
    };
    