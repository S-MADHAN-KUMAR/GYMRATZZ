// utils/fetchProductDetail.js
import axios from 'axios';

export const fetchProductDetail = async (setProduct, setMainImage, setImages, id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/${id}`);
    const productData = response.data;
    setProduct(productData);
    setMainImage(productData?.images?.[0] || '');
    setImages(productData?.images || []);
  } catch (error) {
    console.error("Error fetching product details:", error.message);
  }
};

// utils/loadCart.js
import { fetchUserCart } from '../API/user/comman';
import { showToast } from '../helpers/toast';

export const loadCart = async (currentUser, setCart) => {
  try {
    if (currentUser) {
      const fetchedCart = await fetchUserCart(currentUser?._id, showToast);
      setCart(fetchedCart);
    }
  } catch (err) {
    console.error(err.message || "Something went wrong.");
  }
};

// utils/findMaxStock.js
export const findMaxStock = (cart, productId) => {
  const cartProduct = cart?.products.find(
    (product) => product.productId === productId
  );
  return cartProduct ? cartProduct.quantity : 0;
};

// utils/handleAddToCart.js
export const handleAddToCart = async (currentUser, productId, setAdded, showToast) => {
  try {
    const payload = {
      userId: currentUser?._id,
      productId: productId,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/add_to_cart`,
      payload
    );

    if (res.status === 200) {
      setAdded(true);
      showToast("Products added to cart!", "light", "success");
    } else {
      console.error("Failed to add product to cart:", res.data.message);
    }
  } catch (error) {
    console.error("Error adding to cart:", error.message);
  }
};