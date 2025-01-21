import axios from "axios";

export const verifyOtpApi = async (email, otp) => {
    return await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/verify`, { email, otp }, { withCredentials: true });
  };
  
  export const resendOtpApi = async (email) => {
    return await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/resendOtp`, { email });
  };