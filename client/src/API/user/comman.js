import axios from "axios";
import { USER_API } from "../API";

export const fetchCurrentUser = async (userId) => {
    try {
      const id=userId
      
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get_current_user/${id}`);
  
      if (res.status === 200) {
        const fetchedUser = res?.data?.currentUser;
        if (fetchedUser.status === false) {
          console.log('User blocked...');
          return null;
        }
        return fetchedUser;
      }
    } catch (error) {
      console.error('Error in fetchCurrUser:', error.message);
      return null; 
    }
  }

export const fetchUserAddress = async (userId,setAddresses) => {
    try {
      const id=userId
      
      const res = await USER_API.get(`/user/get_current_address/${id}`);
  
      if (res.status === 200) {
        setAddresses(res?.data?.address?.addresses)
      }
    } catch (error) {
      console.error('Error in fetchCurrUser:', error.message);
      return null; 
    }
  }

export const fetchEditAddress = async (setAddress,data) => {
    try {
      const res = await USER_API.post(`/user/get_edit_address`,data);
  
      if (res.status === 200) {
        setAddress(res?.data)
      }
    } catch (error) {
      console.error('Error in fetchCurrUser:', error.message);
      return null; 
    }
  }

export const fetchUserWishlist = async (userId,setWishlists) => {
    try {
      const id=userId
      
      const res = await USER_API.get(`/user/get_user_wishlist/${id}`);
  
      if (res.status === 200) {
        setWishlists(res?.data)
      }
    } catch (error) {
      console.error('Error in fetchCurrUser:', error.message);
      return null; 
    }
  }

  export const fetchUserCart = async (id,showToast) => {
    try {
      if (!id) {
        throw new Error('User ID is missing.');
      }
  
      const res = await USER_API.get(`/user/get_user_cart/${id}`);
      if (res.status === 200) {
        return res?.data || []
      } else if (res.status === 403){
        showToast(res.data.message,'dark','error')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  export const fetchCoupons = async (setCoupons) => {
    try {
  
      const res = await USER_API.get(`/user/get_all_coupons`);
      if (res.status === 200) {
        setCoupons( res?.data || [])
      } else if (res.status === 403){
        alert(res.data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  export  const fetchOrders = async (id,setOrders) => {
    try {
      const res = await USER_API.get(`/user/get_user_orders/${id}`);
      if (res.status === 200) {
        setOrders(res?.data || []); 
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  export  const fetchOrderDetail = async (id,setOrders) => {
      try {
        const res = await USER_API.get(`/user/get_user_order_detail/${id}`)
        if (res.status === 200) {
          setOrders(res?.data)
        }
      } catch (error) {
        console.log(error.message)
      } 
    }

    export  const fetchWallet = async (userId,setWallet) => {
      try {
        const res = await USER_API.post(`/user/get_user_wallet`, { userId });
        if (res.status === 200) {
          setWallet(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
