import ProductModel from "../../models/productsModel.js";
import UserModel from "../../models/userModel.js";
import WishlistModel from "../../models/wishlistModel.js";

export const add_to_wishlist = async (req, res) => {
    try {
        const { productId, userId } = req.body
        
        const existProduct = await ProductModel.findById(productId)
        
        const user = await UserModel.findById(userId);

        if (!existProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = {
            productId,
            name: existProduct.name,
            price: existProduct.price,
            description: existProduct.description,
            image: existProduct.imageUrls?.[0],
        };

        let wishlist = await WishlistModel.findOne({ userId });

        if (!wishlist) {
            wishlist = new WishlistModel({
                userId,
                products: [product]
            });

            user.wishlist.push({ productId });
            await user.save();
            await wishlist.save();
        } else {
            const productExists = wishlist.products.some(
                (item) => item.productId.toString() === productId
            );

            if (productExists) {
                return res.status(400).json({ message: 'Product already in wishlist' });
            }

            wishlist.products.push(product);
            user.wishlist.push({ productId });

            await user.save();
            await wishlist.save();
        }

        res.status(200).json({ message: 'Product added to wishlist successfully!' });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const remove_wishlist_product = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      const wishlist = await WishlistModel.findOne({ userId });
      const user = await UserModel.findById(userId);
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
  
      wishlist.products = wishlist.products.filter((product) => product.productId.toString() !== productId.toString());
      user.wishlist =  user.wishlist.filter((product) => product.productId.toString() !== productId.toString());
  
      await wishlist.save();
      await user.save();
  
      res.status(200).json({ message: 'Product removed from wishlist successfully' });
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

export const get_user_wishlist = async (req, res) => {
    try {
        const { id } = req.params
        
        // Fetch the wishlist for the user
        const wishlist = await WishlistModel.findOne({ userId:id});

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        const currentDate = new Date();

        // Use aggregation to fetch product and offer details for each product in the wishlist
        const productDetailsPromises = wishlist.products.map(async (product) => {
            // Fetch product details from ProductModel
            const productDetails = await ProductModel.aggregate([
                {
                    $match: {
                        _id: product.productId,
                        status: true, // Ensure the product is active
                    },
                },
                {
                    $lookup: {
                        from: "productoffers",
                        let: { productId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$productId", "$$productId"] },
                                            { $eq: ["$status", true] },
                                            { $lte: ["$startDate", currentDate] },
                                            { $gte: ["$endDate", currentDate] },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: "offerDetails",
                    },
                },
                {
                    $unwind: {
                        path: "$offerDetails",
                        preserveNullAndEmptyArrays: true, // Include products without offers
                    },
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        price: 1,
                        description: 1,
                        stock:1,
                        imageUrls: 1,
                        offerDetails: {
                            _id: 1,
                            discount: 1,
                            startDate: 1,
                            endDate: 1,
                            status: 1,
                        },
                    },
                },
            ]);

            // If productDetails is empty, return null
            return productDetails.length > 0 ? productDetails[0] : null;
        });

        // Resolve all product details
        const productDetails = await Promise.all(productDetailsPromises);

        // Map and format the wishlist products
        const formattedProducts = wishlist.products.map((product, index) => {
            const details = productDetails[index];
            if (!details) return null; // Skip if no product details found
            return {
                productId: product.productId,
                quantity: product.quantity,
                details,
            };
        }).filter(Boolean); // Remove null entries

        // Final response
        res.status(200).json({
            userId: wishlist.userId,
            products: formattedProducts,
        });
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
