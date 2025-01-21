import { USER_API } from "../API";


export const addAddress = async (addressData) => {
    try {
      const response = await USER_API.post(`/user/add_address`, addressData);
      return response; 
    } catch (error) {
      throw error; 
    }
  }

  export const fetchEditAddress = async (setAddress, data) => {
    try {
      const response = await USER_API.post('/user/get_address', data);
      if (response.status === 200) {
        setAddress(response.data.address);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };
  
  export const updateAddress = async (data) => {
    try {
      const response = await USER_API.put('/user/update_address', data);
      return response;
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  };