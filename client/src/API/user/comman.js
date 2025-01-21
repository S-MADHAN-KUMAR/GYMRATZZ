import axios from "axios";
import { USER_API } from "../API.js";

export const fetchCurrentUser = async (id) => {
    try {
      
      const res = await USER_API.get(`/user/get_current_user/${id}`);
  
      if (res.status === 200) {
        const fetchedUser = res?.data?.currentUser;
        if (fetchedUser.status === false) {
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
