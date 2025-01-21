import { showToast } from "../../helpers/toast";
import { USER_API } from "../API";
import { fetchUserCart } from "./cart";
import { fetchCoupons, fetchUserAddress } from "./comman";

export const calculateCouponDiscountAmt = (cartTotalAmt, selectedCoupon, coupons) => {
    if (!selectedCoupon) return 0;
  
    const selectedCouponData = coupons.find((coupon) => coupon._id === selectedCoupon);
    if (!selectedCouponData || !selectedCouponData.discount) return 0;
  
    const discount = selectedCouponData.discount;
    const discountAmount = (parseFloat(cartTotalAmt) * discount) / 100;
  
    if (discountAmount > selectedCouponData?.maxDiscountAmount) {
      return selectedCouponData.maxDiscountAmount.toFixed(2)
    }
  
    return discountAmount.toFixed(2);
  }

  export const calculateGrandTotal = (cartTotalAmt, couponDiscount) => {
    return (parseFloat(cartTotalAmt) - parseFloat(couponDiscount) + parseFloat(import.meta.env.VITE_DELIVERY_CHARGE)).toFixed(2);
  };
  

export const calculateCartTotal = (cart) => {
    return cart?.products?.reduce((total, item) => {
      if (!item) return total;
  
      // Extract price and quantity
      const price = item?.price || 0;
      const quantity = item?.quantity || 0;
  
      // Handle discount calculation if offerDetails exists
      const discount = item?.offerDetails?.discount || 0;
      const discountedPrice = price - (price * discount) / 100;
  
      // Accumulate total
      return total + discountedPrice * quantity;
    }, 0);
  } 
  
export const calculateCouponDiscount = (selectedCoupon, coupons, cartTotalAmt) => {
    if (!selectedCoupon) return 0;
  
    const selectedCouponData = coupons.find((coupon) => coupon._id === selectedCoupon);
    if (!selectedCouponData || !selectedCouponData.discount) return 0;
  
    const discount = selectedCouponData.discount;
    const discountAmount = cartTotalAmt * (discount / 100);
  
    if (discountAmount > selectedCouponData?.maxDiscountAmount) {
      return selectedCouponData.maxDiscountAmount.toFixed(2);
    }
  
    return discountAmount.toFixed(2);
  }

  export const loadCart = async (currentUser, setCart, setTotalAmt) => {
    try {
      if (currentUser) {
        const fetchedCart = await fetchUserCart(currentUser._id);
        setCart(fetchedCart);
        setTotalAmt(fetchedCart?.totalAmt);
      }
    } catch (err) {
      console.error(err.message || "Something went wrong.");
    }
  }

  export const loadUserAddresses = async (currentUser, setAddresses) => {
    try {
      await fetchUserAddress(currentUser._id, setAddresses);
    } catch (err) {
      console.error(err.message || "Failed to fetch addresses.");
    }
  }

  export const loadCoupons = async (setCoupons) => {
    try {
      await fetchCoupons(setCoupons);
    } catch (err) {
      console.error(err.message || "Failed to fetch coupons.");
    }
  }

  export const placeOrder = async (
    currentUser,
    cart,
    selectedAddress,
    paymentMethod,
    selectedCoupon,
    coupons,
    calculateGrandTotal,
    calculateCouponDiscountAmt,
    navigate
  ) => {
    if (!selectedAddress) {
      showToast("Please select an address.", "dark", "error");
      return;
    }
    if (!paymentMethod) {
      showToast("Please select a payment method.", "dark", "error");
      return;
    }
  
    // Check if a coupon is selected
    const appliedCoupon = selectedCoupon
      ? coupons.find((coupon) => coupon._id === selectedCoupon)
      : null;
  
    try {
      const payload = {
        userId: currentUser?._id,
        products: cart?.products?.map((product) => {
            if (!product) return null;
          
            if (product?.offerDetails) {
              const discount = product.offerDetails.discount || 0;
          
              return {
                ...product,
                categoryId: product.categoryId,
                price: product.price - (product.price * discount) / 100, 
                brandId: product.brandId,
                offerAmt: (product.price * discount) / 100, 
                offerPercentage: discount, 
                offerID: product.offerDetails._id,
              };
            }
          
            return {
              ...product, 
            };
          }) || [],          
        address: selectedAddress,
        totalAmt: calculateGrandTotal,
        couponOfferPercentage: appliedCoupon ? appliedCoupon.discount : null,
        couponId: appliedCoupon ? appliedCoupon._id : null,
        paymentMethod,
        couponUsed: appliedCoupon ? true : false,
        maxDiscountAmount: appliedCoupon ? appliedCoupon.maxDiscountAmount : null,
        couponDiscountAmt: calculateCouponDiscountAmt,
        minDiscountAmount: appliedCoupon ? appliedCoupon.minDiscountAmount : null,
      };
  
      console.log(payload);
      const res = await USER_API.post(`/user/place_order`, payload);
  
      if (res.data.success) {
        if (res.data.session_url) {
          window.location.href = res.data.session_url;
          
        } else {
          showToast("Order placed successfully.", "light", "success");
          navigate("/order-success");
        }
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      console.error("Order Placement Error:", error);
  
      if (errorMessage) {
        showToast(errorMessage);
      } else if (error?.message) {
        showToast(`Error: ${error.message}`, "dark", "error");
      } else {
        showToast("Failed to place the order. Please try again.", "dark", "error");
      }
    }
  };