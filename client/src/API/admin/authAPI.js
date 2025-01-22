import axios from 'axios';

export const loginAPI = async (values) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/admin/login`,
      values,
      { withCredentials: true }
    );
    return response; // Return the response to handle it in the calling component
  } catch (error) {
    throw error; // Rethrow the error to handle it in the calling component
  }
};
