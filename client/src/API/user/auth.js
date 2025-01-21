import axios from "axios";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/register`,
      userData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (email, otp) => {
    const formdata = { email, otp };
    try {
      const response = await axios.post(`${import.meta.VITE_SERVER_URL}/user/verify`, formdata, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to verify OTP');
    }
  };
  
  export const resendOtp = async (email) => {
    try {
      const response = await axios.post(`${import.meta.VITE_SERVER_URL}/user/resendOtp`, { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to resend OTP');
    }
  }

export const forgotPasswordEmail = async (email) => {
    try {
      
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/forgotPassword/${email}`
      );
      return res;
    } catch (error) {
      throw error;
    }
  };

export const updatePassword = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/updatePassword`, {
        password,
        email,
      });
      return response;
    } catch (error) {
      throw new Error("Error updating password: " + error.message);
    }
  }

  export const handleGoogleAuth = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/handle_google_auth`,
        data,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const passwordVerifyOtp = async (email, otp) => {
    try {
      console.log(email, otp);
      
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/verifyForgotPassword`, {
        email,
        otp,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  export const passwordResendOtp = async (email) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/resendOtpForgotPassword`, { email });
      return response;
    } catch (error) {
      throw error;
    }
  }

 