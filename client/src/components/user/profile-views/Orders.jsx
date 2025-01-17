import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../../../API/user/comman';

const Orders = () => {

const [orders,setOrders]=useState([])
const { currentUser } = useSelector((state) => state.user);
const navigate = useNavigate()

 const loadOrders = async () => {
    await fetchOrders(currentUser?._id,setOrders);
  };

  useEffect(() => {
    loadOrders();
  }, [])

  return (
    <div className=" mx-auto p-8">
    {orders.length === 0 ? (
      <div className='flex justify-center items-center flex-col w-full h-full '>
      <img className='w-[300px]' src="https://media0.giphy.com/media/WSxyc3kHnD9GvVbWDO/giphy.gif?cid=6c09b952ytj5o1pa6h1sxb9seg2bq8rvwkx7kprawg1rmsz7&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="" />
      <p className='h1 text-4xl font-medium mt-6 to-gray-800'>No Orders !</p>
      </div>
    ) : (
      <div>
        <h2 className="text-5xl tracking-widest drop-shadow h1 mb-10 text-left">Your Orders</h2>
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border p-4 rounded-lg shadow-md bg-white flex gap-x-5  flex-wrap items-start justify-around">
  
              {/* image section */}
  
             <div className="flex flex-row- items-center relative">
    {order.products?.map((product, index) => (
      <div className="">
        {index === 0 || index === 1 ? (
          <div className={index === 1 ? "rounded-full overflow-hidden w-[120px] h-[120px] p-3 shadow border-gray-200 border-2 relative right-8  z-40 bg-white " :"bg-white rounded-full overflow-hidden w-[120px] h-[120px] p-3 shadow border-gray-200 border-2"}>
            <img
              key={product._id}
              src={product.image} // Corrected the image reference
              alt={product.name}  // Alternative text for accessibility
              className="object-contain w-full h-full" // Optional styling for the image
            />
          </div>
        ) : null}
      </div>
    ))}
    {order.products?.length > 2 && (
      <div className="rounded-full absolute -right-10 z-40 h1 text-4xl tracking-widest font-medium  w-[120px] h-[120px] flex items-center justify-center bg-gray-800 text-white  border-gray-200 border-2">
        +{order.products.length - 2}
      </div>
    )}
  </div>
  
              <div className="flex flex-col justify-between pop gap-y-3">
                <p className="text-lg font-medium text-gray-800">Order ID : <span className="text-blue-600 ms-4">{order._id}</span></p>
                <p className="text-lg font-medium text-gray-800">Total Amount : <span className="text-green-600 ms-4"> ₹{order.totalAmt}</span></p>
                <p className="text-lg font-medium text-gray-800">
    Status: 
    <span 
      className={`
        ms-4 px-4 py-1 rounded-full text-sm 
        ${order.status === "Pending" ? "text-yellow-500 bg-yellow-100" : ""}
        ${order.status === "Cancelled" ? "text-red-500 bg-red-100" : ""}
        ${order.status === "Payment Failed" ? "text-red-500 bg-red-100" : ""}
        ${order.status === "Shipped" ? "text-blue-500 bg-blue-100" : ""}
        ${order.status === "Delivered" ? "text-green-500 bg-green-100" : ""}
        ${order.status === "Returned" ? "text-purple-500 bg-purple-100" : ""}
      `}
    >
      {order.status}
    </span>
  </p>
  
              </div>
              <div onClick={()=>navigate(`/profile/order_details/${order?._id}`)} className="button ">
                <span>View Order</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  )
}

export default Orders