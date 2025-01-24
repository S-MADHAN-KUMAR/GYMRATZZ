import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { calculateCartTotal, calculateCouponDiscountAmt, calculateGrandTotal, loadCart, loadCoupons, loadUserAddresses, placeOrder } from "../../API/user/checkout";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [cart, setCart] = useState(null);
  const [totalAmt, setTotalAmt] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser?._id) {
      loadUserAddresses(currentUser, setAddresses);
      loadCart(currentUser, setCart, setTotalAmt);
      loadCoupons(setCoupons);
    }
  }, [currentUser]);

  const cartTotalAmt = calculateCartTotal(cart);

  const handleCouponSelection = (couponId) => {
    setSelectedCoupon(couponId);
  };

  const handlePlaceOrder = async () => {
    placeOrder(
      currentUser,
      cart,
      selectedAddress,
      paymentMethod,
      selectedCoupon,
      coupons,
      calculateGrandTotal(calculateCartTotal(cart), calculateCouponDiscountAmt(calculateCartTotal(cart), selectedCoupon, coupons)),
      calculateCouponDiscountAmt(cartTotalAmt, selectedCoupon, coupons),
      navigate
    );
  };

  return (
    <div className="container p-3 flex justify-between">
     <div className="flex flex-col gap-y-6 w-4/12">
       
     <div className="w-full p-6 bg-white rounded-lg border pop">
  <h2 className="h1 text-3xl tracking-wider drop-shadow-sm font-medium mb-4 text-left">
    Your Address
  </h2>
  {addresses.length > 0 ? (
    <>
      <select
        name="selectedAddress"
        id="selectedAddress"
        value={selectedAddress?._id || ""}
        className="w-full p-3 border rounded-md bg-gray-50 font-medium"
        onChange={(e) => {
          const selectedId = e.target.value;
          const selected = addresses.find((add) => add._id === selectedId);
          setSelectedAddress(selected);
        }}
      >
        <option value="" disabled>
          Select an Address
        </option>
        {addresses.map((add) => (
          <option key={add._id} value={add._id}>
            {`${add.addressline1}, ${add.city}, ${add.state}, ${add.pincode}`}
          </option>
        ))}
      </select>

      {selectedAddress && (
        <div className="mt-6 p-6 border text-sm border-gray-300 rounded-lg bg-gray-50 shadow-md">
          <h3 className=" font-medium text-gray-800 mb-4">
            Selected Address
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium text-gray-900">Name:</span>{" "}
              {selectedAddress.name}
            </p>
            <p>
              <span className="font-medium text-gray-900">Phone:</span>{" "}
              {selectedAddress.phone}
            </p>
            <p>
              <span className="font-medium text-gray-900">Address 1:</span>{" "}
              {selectedAddress.addressline1}
            </p>
            <p>
              <span className="font-medium text-gray-900">Address 2:</span>{" "}
              {selectedAddress.addressline2 || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-900">City:</span>{" "}
              {selectedAddress.city}
            </p>
            <p>
              <span className="font-medium text-gray-900">State:</span>{" "}
              {selectedAddress.state}
            </p>
            <p>
              <span className="font-medium text-gray-900">Pincode:</span>{" "}
              {selectedAddress.pincode}
            </p>
          </div>
        </div>
      )}
      <a
        href="/profile/address"
        className="text-blue-500 mt-6 inline-block font-medium"
      >
        Add or Edit Address
      </a>
    </>
  ) : (
    <div className="text-gray-500 text-center">
      <p>No addresses available.</p>
      <a
        href="/profile/address"
        className="text-blue-500 mt-6 inline-block font-medium"
      >
        Add an Address
      </a>
    </div>
  )}
</div>


              {/* Coupon Section */}
              <div className="w-full  p-6 bg-white rounded-lg border">
      {coupons && coupons.length > 0 ? (
        <div className="space-y-12">
          <label htmlFor="coupon" className=" h1 text-3xl tracking-wider drop-shadow-sm font-medium">
            Select Coupon
          </label>
          <div id="coupon" className="space-y-6">
            {coupons
              .filter(
                (coupon) =>
                  coupon.minDiscountAmount <= totalAmt &&
                  !coupon.usedBy.some((c) => c.userId === currentUser?._id)
              )
              .map((coupon) => (
                <label
                key={coupon._id}
                htmlFor={`coupon-${coupon._id}`}
                className={`relative flex items-center justify-between w-full max-w-md mx-auto border-2  border-dashed rounded-lg shadow-lg cursor-pointer ${
                  new Date(coupon.endDate) < new Date()
                    ? "border-gray-300 bg-gray-100 cursor-not-allowed"
                    : selectedCoupon === coupon._id
                    ? "border-blue-400 bg-blue-100"
                    : "border-red-400 bg-white hover:shadow-xl"
                }`}
              >
              

                 <div className={selectedCoupon === coupon._id
                    ? "relative w-1/3 flex flex-col justify-center p-5 border-r-2 border-r-blue-400 border-dashed h-full" : "w-1/3 flex flex-col justify-center p-5 border-r-2 border-r-red-400 border-dashed h-full"}>
                 <h2 className='h1 text-5xl font-medium text-red-500'>{coupon.discount} % </h2>
                 <h2 className='h1 text-5xl font-medium'>Off</h2>
                 </div>

                 <div className="w-2/3 h-full flex flex-col ">

              <div className="p-3 ms-4 h-full">
              <h2 className='h1 font-medium text-5xl mb-2'>{coupon.name}</h2>
                 <h2 className='h1 font-medium text-xl mb-2'>code : <span className='bg-gray-900 text-white h1 font-medium text-xl px-4 py-1 tracking-widest w-fit '>{coupon.code}</span></h2>
                 <div className="text-xs pop font-medium ">
                 Expiry Date : <span className='text-blue-600'>{new Date(coupon.endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}</span>
{selectedCoupon === coupon._id && (
  <div
    onClick={() => setSelectedCoupon(null)} 
    className="absolute -top-4 -right-4 bg-red-700 px-2 py-1 rounded-full pop text-white cursor-pointer"
  >
    Remove
  </div>
)}

              </div>
             
                 </div>
                 </div>

                  {/* Hidden Radio Input */}
                  <input
                    type="radio"
                    id={`coupon-${coupon._id}`}
                    name="coupon"
                    value={coupon._id}
                    onChange={() => handleCouponSelection(coupon._id)}
                    disabled={new Date(coupon.endDate) < new Date()}
                    className="hidden"
                  />
                </label>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No coupons available.</div>
      )}
    </div>
     </div>

      {/* Payment Method Section */}
      <div className=" w-3/12 border p-6 bg-white rounded-lg h-fit">
                <h1 className="h1 text-3xl tracking-wider drop-shadow-sm font-medium mb-10 text-left">Payment Method</h1>
                <div className="space-y-4">

                {
                 calculateGrandTotal(calculateCartTotal(cart), calculateCouponDiscountAmt(calculateCartTotal(cart), selectedCoupon, coupons)) <= 1000 &&
   
  <div className={`flex items-center space-x-4 border rounded-lg  ${paymentMethod === 'Cash on delivery' && 'bg-blue-100'}`}>
    {/* Hidden Radio Buttons */}
    <input
      type="radio"
      id="cashOnDelivery"
      name="paymentMethod"
      value="Cash on delivery"
      className="hidden"
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    <label
      htmlFor="cashOnDelivery"
      className={`flex items-center cursor-pointer gap-x-4 h-fit rounded-md pop font-medium ${paymentMethod === 'Cash on delivery' && 'bg-blue-100'}`}
    >
     <div className="w-14">

<img src="https://img.icons8.com/?size=100&id=IqOjfaWLBgco&format=png&color=000000"  className='w-full h-full object-contain' />
    </div>
    <p className='pop font-semibold text-lg'>Cash On Delivery</p>
    </label>
  </div>
              } 

  <div className={`flex items-center space-x-4 border rounded-lg  ${paymentMethod === 'Wallet' && 'bg-blue-100'}`}>
    {/* Hidden Radio Buttons */}
    <input
      type="radio"
      id="wallet"
      name="paymentMethod"
      value="Wallet"
      className="hidden"
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    <label
      htmlFor="wallet"
      className={`flex items-center cursor-pointer gap-x-4 h-fit rounded-md pop font-medium ${paymentMethod === 'Wallet' && 'bg-blue-100'}`}
    >
     <div className="w-14">

<img src="https://img.icons8.com/?size=100&id=MjAYkOMsbYOO&format=png&color=000000"  className='w-full h-full object-contain' />
    </div>
    <p className='pop font-semibold text-lg'>Wallet</p>
    </label>
  </div>

  <div className={`flex items-center space-x-4 border rounded-lg  ${paymentMethod === 'Stripe' && 'bg-blue-100'}`}>
    {/* Hidden Radio Buttons */}
    <input
      type="radio"
      id="stripe"
      name="paymentMethod"
      value="Stripe"
      className="hidden"
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    <label
      htmlFor="stripe"
      className={`flex items-center cursor-pointer gap-x-4 h-fit rounded-md pop font-medium `}
    >
        <div className="w-16">

    <img src="https://img.icons8.com/?size=100&id=IiNwlDiMnWjA&format=png&color=000000"  className='w-full h-full object-contain' />
        </div>
        <p className='pop font-semibold text-lg'>Stripe</p>

    </label>
  </div>
</div>

            </div>


              {/* Cart Section */}
              <div className="w-full md:w-4/12 border p-6 bg-white rounded-lg h-fit ">
                {cart ? (
                    <div className="flex flex-col gap-y-6">
                        <div className="mb-4">
                            <h2 className="h1 text-3xl tracking-wider drop-shadow-sm font-medium mb-10 text-center">Your Orders</h2>
                            <p className=" pop font-semibold">Total items: <span className='text-blue-600'>{cart?.totalQty}</span></p>
                        </div>
                        {cart?.products?.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-b py-4">
                                <img
                                    src={item?.image}
                                    alt={item?.name}
                                    className="w-28 h-28 object-contain border rounded-md p-2"
                                />
                                <div className="flex flex-col w-full mx-4">
                            <p className="pop text-gray-900 tracking-wide font-semibold">
                              {item?.name}
                            </p>
                            <p className="font-medium h1 tracking-widest text-gray-600">
                            {item.offerDetails ? (
          <div className="flex pop  gap-x-6 items-center">
            <p className="text-lg font-semibold text-green-600">
              ₹{" "}
              {item?.price -
                item?.price * (item?.offerDetails?.discount / 100)}
            </p>
            <p className="text-gray-500 line-through font-medium">
              ₹ {item?.price}
            </p>
          </div>
        ) : (
          <p className="pop text-lg font-semibold text-green-600">
            ₹ {item?.price}
          </p>
        )}
</p>

                            <p className="font-medium h1 tracking-widest text-gray-600">
                              Quantity: 
                              <span className="text-red-600 font-medium"> {item?.quantity}</span>
                            </p>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 flex flex-col justify-between pop gap-y-6">
                            <div>
                                <h3 className="text-lg font-semibold">Subtotal : 
                                    <span className='text-blue-600'> ₹ {cartTotalAmt}</span>
                                </h3>
                                <p className="text-sm font-semibold">+ Delivery Charge : <span className='text-red-600'>
                                     ₹ {import.meta.env.VITE_DELIVERY_CHARGE}
                                    </span>
                                </p>
                                {
                                    selectedCoupon && 
                                    (
                                        <p className="text-sm font-semibold">- coupon applied : <span className='text-green-600'>
                                        ₹ {calculateCouponDiscountAmt(calculateCartTotal(cart),selectedCoupon,coupons)}
                                       </span>
                                   </p> 
                                    )
                                  }
                                

                                <p className='text-lg font-semibold border-y my-4 py-4'>
  Grand Total : 
  <span className='text-xl font-semibold ml-2'>
  ₹ {calculateGrandTotal(calculateCartTotal(cart), calculateCouponDiscountAmt(calculateCartTotal(cart), selectedCoupon, coupons))}

  </span>
</p>

                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                className="bg-gray-900 text-white py-2 px-6 rounded-lg flex items-center h1 text-lg tracking-widest gap-x-4 hover:bg-gray-800 shadow-sm justify-center hover:scale-105 duration-500"
                            >
                                <img src="https://img.icons8.com/?size=100&id=bRP0fqzTploE&format=png&color=000000" className="w-8" />
                                Place Order
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>No carts found!</p>
                )}
            </div>
     </div>
  );
};

export default Checkout;
