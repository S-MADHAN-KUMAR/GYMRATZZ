import { USER_API } from "../API";

export const handlePaymentSuccess = async (session_id, hasCalled, success) => {
    if (!session_id) {
      console.error('Session ID is missing');
      return;
    }
  
    if (hasCalled.current) {
      console.log('Request already made, skipping...');
      return;
    }
  
    hasCalled.current = true;
    try {
      const res = await USER_API.get(`/user/handle_successful_payment/${session_id}`);
      if (res.status === 200) {
        console.log('Successfully added...');
        success();  
      }
    } catch (error) {
      console.log(error);
    }
  }

  export const fetchWalletData = async (id) => {
    try {
      const response = await USER_API.get(`/user/get_user_wallet/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      throw error;
    }
  };
  
  export const addToWallet = async (userId, amount) => {
    try {
      const response = await USER_API.post('/user/add_wallet_amount', { userId, amount });
      return response.data; 
    } catch (error) {
      console.error('Error adding amount:', error);
      throw error;
    }
  };