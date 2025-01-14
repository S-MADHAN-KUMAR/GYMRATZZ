import axios from 'axios'

export const fetchBanners = async (setBanners) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get_all_banners`);
      setBanners(response?.data)
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

export const fetchBrands = async (setBrands) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get_all_brands`);
      setBrands(response?.data)
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  }

