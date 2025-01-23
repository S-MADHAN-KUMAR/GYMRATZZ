import { USER_API } from "../../API/API";
import { showToast } from "../../helpers/toast";

export const fetchUserWishlist = async (userId, setWishlists) => {
  try {
    const id = userId
    const res = await USER_API.get(`/user/get_user_wishlist/${id}`);

    if (res.status === 200) {
      setWishlists(res?.data);
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error.message);
    return null;
  }
};

export  const handleRemoveProduct = async (userId,productId,loadWishlist) => {
    try {
      const payload = {
        userId,
        productId,
      };
      const res = await USER_API.put(
        `/user/remove_wishlist_product`,
        payload
      );
      if (res.status === 200) {
        showToast(res?.data?.message, "light", "success");
        loadWishlist();
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

export const handleAddWishlist = async (userId,productId,navigate) => {
    try {
      const payload = {
        userId,
        productId
      };
      const res = await USER_API.post(
        `/user/add_to_wishlist`,
        payload
      );

      if (res.status === 200) {
        showToast("Product Added to Wishlist!", "dark", "success");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error.message);
    }
  };
