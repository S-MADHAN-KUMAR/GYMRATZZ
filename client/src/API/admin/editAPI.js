import { ADMIN_API } from "../API";

export const updateProduct = async (id, formData) => {
    try {
      const response = await ADMIN_API.put(
        `/admin/update_product/${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };
  