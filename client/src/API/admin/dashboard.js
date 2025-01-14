import axios from "axios";

export const fetchProducts = async (setProducts) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/get_all_products`);
      if (res.status === 200) {
        setProducts(res?.data)
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Error fetching');
    }
}

export const fetchUsers = async (setUsers) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/get_all_users`);
      if (res.status === 200) {
        setUsers(res?.data)
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Error fetching');
    }
}

export const fetchCoupons = async (setCoupons) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/get_all_coupons`);
      if (res.status === 200) {
        setCoupons(res?.data)
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Error fetching ');
    }
}

export const fetchBrands = async (setBrands) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/get_all_brands`);
      if (res.status === 200) {
        setBrands(res?.data)
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Error fetching ');
    }
}

export const fetchOrders = async (setOrders) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/get_all_orders`);
      if (res.status === 200) {
        setOrders(res?.data)
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Error fetching ');
    }
}

export const fetchBanners = async (setBanners) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/get_all_banners`);
      if (res.status === 200) {
        setBanners(res?.data)
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Error fetching ');
    }
}

export const fetchCategories = async (setCategories) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/get_all_categories`);
      if (res.status === 200) {
        setCategories(res?.data)
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Error fetching ');
    }
}

export const fetchProductOffers = async (setProductOffers) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/get_all_product_offer`);
      if (res.status === 200) {
        setProductOffers(res?.data)
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Error fetching ');
    }
}

export const fetchCategoriesOffers = async (setCategoriesOffers) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/get_all_categories_offer`);
      if (res.status === 200) {
        setCategoriesOffers(res?.data)
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Error fetching ');
    }
}