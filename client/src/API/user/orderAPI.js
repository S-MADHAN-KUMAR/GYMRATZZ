import { showToast } from "../../helpers/toast";
import { USER_API } from "../API";


export const handleFailedPayment = async (id) => {
  try {
    const response = await USER_API.get(`/user/handle_failed_payment/${id}`);
    return response;
  } catch (error) {
    throw new Error("Error handling failed payment: " + error.message);
  }
};

export const handleOrderCancel = async (id,fetchOrderDetail) => {
    try {
      const res = await USER_API.get(`/user/order_cancel/${id}`)
      if (res.status === 200) {
        showToast(res?.data?.message,'light','success')
        fetchOrderDetail()
      }
    } catch (error) {
      console.log(error)
    }
  }

  export const handleOrderReturn = async (id,fetchOrderDetail) => {
    try {
      const res = await USER_API.get(`/user/order_return/${id}`)
      if (res.status === 200) {
        showToast(res?.data?.message,'light','success')
        fetchOrderDetail() 
      }
    } catch (error) {
      console.log(error)
    }
  }