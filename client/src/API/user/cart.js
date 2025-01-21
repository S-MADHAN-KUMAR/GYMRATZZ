import { showToast } from "../../helpers/toast";
import { USER_API } from "../API";

export const fetchUserCart = async (userId) => {
  try {
    const response = await USER_API.get(`/user/get_user_cart/${userId}`);
    if (response.status === 200) {
      return response.data; 
    } else {
      showToast('Error fetching cart data.', 'dark', 'error');
      return null;
    }
  } catch (error) {
    console.error(error.message || 'Something went wrong.');
    return null;
  }
};

export const updateCartQuantity = async (cartId, productId, type) => {
  try {
    const response = await USER_API.post(`/user/update_cart_qty`, {
      cartId,
      productId,
      type,
    });
    return response;
  } catch (error) {
    console.error(error.message || 'An error occurred.');
    throw error;
  }
};

export const removeProductFromCart = async (productId, userId) => {
  try {
    const response = await USER_API.post(`/user/remove_cart_product/`, {
      productId,
      userId,
    });
    return response;
  } catch (error) {
    console.error(error.message || 'An error occurred.');
    throw error;
  }
}

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