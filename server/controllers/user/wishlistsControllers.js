import ProductModel from "../../models/productsModel.js";
import UserModel from "../../models/UserModel.js";
import WishlistModel from "../../models/wishlistModel.js";

export const add_to_wishlist = async (req, res) => {
    try {
        const { productId, userId } = req.body;

        const existProduct = await ProductModel.findById(productId);
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
                products: product
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
};

export const get_user_wishlist = async (req, res) => {
    try {
        const { id } = req.params; 
        const wishlist = await WishlistModel.findOne({ userId: id });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        res.status(200).json({ wishlist });
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

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
