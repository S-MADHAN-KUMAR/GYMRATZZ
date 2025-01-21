import axios from 'axios'
import { USER_API } from '../API';

export const fetchCurrentUser = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get_current_user/${userId}`);
      return response?.data?.currentUser;
    } catch (error) {
      throw new Error("Error fetching user data");
    }
  }
  
export const updateUserProfile = async (userData) => {
    try {
      const response = await USER_API.put(`/user/update_profile`, userData);
      return response.data;
    } catch (error) {
      throw new Error("Error updating user profile")
    }
  };