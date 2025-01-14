import axios from 'axios'

export const fetchProductDetail = async (setProduct, setMainImage, setImages, id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/products_details/${id}`);
      if (res.status === 200) {
        const product = res?.data
        setProduct(product);
        setMainImage(product?.imageUrls?.[0]);
        setImages(product?.imageUrls);
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Error fetching product details');
    }
  }