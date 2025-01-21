import { USER_API } from "../../API/API";
import { showToast } from "../../helpers/toast";

export const fetchUserWishlist = async (id, setWishlists) => {
  try {
    const res = await USER_API.get(`/user/get_user_wishlist/${id}`);

    if (res.status === 200) {
      setWishlists(res?.data);
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error.message);
    return null;
  }
};

export  const handleAddToCart = async (userId,productId,setAdded) => {
    try {
      const payload = {
        userId,
        productId: productId,
      };

      const res = await USER_API.post(
        `/user/add_to_cart`,
        payload
      );

      if (res.status === 200) {
        setAdded((prev) => ({ ...prev, [productId]: true }));
        showToast("Products added to cart!", "light", "success");
      } else {
        console.error("Failed to add product to cart:", res.data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
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
