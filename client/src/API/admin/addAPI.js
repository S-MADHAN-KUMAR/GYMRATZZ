import { showToast } from "../../helpers/toast";
import { ADMIN_API } from "../API";

export const addBannerAPI = async (values) => {
    try {
      const response = await ADMIN_API.post(
        `/admin/add_banners`,
        values,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  export const addProduct = async (formData) => {
    try {
      const response = await ADMIN_API.post(`/admin/add_product`, formData);
      return response;
    } catch (error) {
      console.error("Error adding product:", error);
  
      let errorMessage = 'An unexpected error occurred. Please try again later.';
  
      // Check for specific error message about file size
      if (error?.response?.data?.message) {
        const errorMsg = error.response.data.message;
  
        if (errorMsg.includes('File size too large')) {
          errorMessage = 'The image file is too large. Please upload a smaller file.';
        } else {
          // Use any other specific error message provided by the API
          errorMessage = errorMsg;
        }
      } else if (error.message) {
        // Use the error message if it's not related to the API response
        errorMessage = error.message;
      }
  
      // Show toast notification with the error message
      showToast(errorMessage, "dark", "error");
  
      // Rethrow error for further handling if needed
      throw error;
    }
  };
  
  export const addCoupon = async (couponData) => {
    try {
      const response = await ADMIN_API.post(
        `/admin/add_coupon`,
        couponData
      );
      return response;
    } catch (error) {
      throw error.response?.data?.message || 'Error adding coupon';
    }
  };

  export const addBrand = async (brandData) => {
    try {
      const response = await ADMIN_API.post(
        `/admin/add_brands`,
        brandData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  export const addCategory = async (values) => {
    try {
      const res = await ADMIN_API.post(
        `/admin/add_categories`,
        values, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  export const fetchProducts = async () => {
    try {
      const response = await ADMIN_API.get('/admin/get_all_products');
      return response.data;
    } catch (err) {
      throw new Error('Failed to fetch products. Please try again later.');
    }
  };

  export const addProductOffer = async (offerData) => {
    try {
      const response = await ADMIN_API.post('/admin/add_product_offer', offerData);
      return response;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to add product offer.');
    }
  };

  export const fetchCategories = async () => {
    return await ADMIN_API.get('/admin/get_all_categories');
  };
  
  export const addCategoryOffer = async (offerData) => {
    return await ADMIN_API.post('/admin/add_categories_offer', offerData);
  };