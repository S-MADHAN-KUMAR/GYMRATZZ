import axios from 'axios'


export const getAllproducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get_all_products`);
      if (res.status === 200) {
        return res.data;
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  export const fetchRelatedProducts = async (id,setProducts) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get_related_products/${id}`);
      if (res.status === 200) {
        setProducts(res?.data?.relatedProducts )
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };