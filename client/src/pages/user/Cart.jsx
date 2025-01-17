import React, { useEffect, useState } from 'react'
import { fetchUserCart } from '../../API/user/comman';
import { showToast } from '../../helpers/toast';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const { currentUser } = useSelector((state) => state.user)


const loadCart = async () => {
      try {
          if (currentUser) {
              const fetchedCart = await fetchUserCart(currentUser?._id,showToast);
              setCart(fetchedCart)
          }
      } catch (err) {
          console.log(err.message || 'Something went wrong.');
      }
}

useEffect(()=>{
  loadCart()
},[])

const totalAmt = cart?.totalAmt || 0

const handleUpdateQty = async (productId, type) => {
  if (!cart) return;
  const cartId = cart._id;

  try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/update_cart_qty`, {
          cartId,
          productId,
          type
      });

      if (res.status === 200) {
          loadCart();
          if (res?.data?.msg) {
              showToast(res?.data?.message,'dark','error');
          }
      } 
  } catch (error) {
      console.log(error.message || 'An error occurred.');
  }
};

const handleRemoveProduct = async (productId) => {
  try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/remove_cart_product/`, {
          productId,
          userId: currentUser?._id
      });

      if (res.status === 200) {
        showToast('product removed from cart !','light','success')
          loadCart()
      }
  } catch (error) {
      console.log(error);
  }
}

  return (
    <div className='container'>
 <div className='mt-16'>
            {cart ? 
(
                <div className=" flex w-[100vw] h-[100vh] justify-around  ">
                    <div className="w-7/12 ">
                        <div className=" flex justify-between items-center mb-10">
                            <h1 className=' h1 text-3xl tracking-wider drop-shadow-sm'>Your carts</h1>
                            <p className=' pop text-xl font-semibold tracking-wider drop-shadow-sm '> Items : <span className="text-blue-600">{cart?.totalQty}</span></p>
                        </div>
                        {
                          cart?.products.length > 0 
                          ?
                        (cart?.products?.map((item, index) => (
                          <div
                          key={index}
                          className="border-b-2 border-gray-100 flex w-full gap-x-4 items-center p-6 relative "
                        >
                          <div className="w-2/12 h-[120px]">
                            <img
                              src={item?.image}
                              alt={item?.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        
                          <div className="flex flex-col justify-around w-7/12">
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
                              Quantity:{" "}
                              <span className="text-red-600 font-medium">{item?.quantity}</span>
                            </p>
                          </div>
                        
                          {/* Quantity Controls Section - 1/4 width (w-3/12) */}
                          <div className="flex w-2/12 items-center justify-between shadow mt-auto  bg-gray-900 h-fit rounded-full ">
                            <button
                              onClick={() => handleUpdateQty(item?.productId, "decrement")}
                              className="hover:scale-105"
                            >
                              <img
                                src="https://img.icons8.com/?size=100&id=PRPnXonbZ2HF&format=png&color=000000"
                                className="w-10"
                                alt="Decrement"
                              />
                            </button>
                            <p className="px-4  h2 text-white">{item?.quantity}</p>
                            <button
                              onClick={() => handleUpdateQty(item?.productId, "increment")}
                              className="hover:scale-105"
                            >
                              <img
                                src="https://img.icons8.com/?size=100&id=UUgYZvYwoZrF&format=png&color=000000"
                                className="w-10"
                                alt="Increment"
                              />
                            </button>
                          </div>
                          <img src="https://img.icons8.com/?size=100&id=0WQnyqK0u4fE&format=png&color=000000" className='absolute top-0 right-0 w-8 hover:scale-105 cursor-pointer'  onClick={() => handleRemoveProduct(item._id)} />
                        </div>
                            ))
                          )
                        :
                        (
                          <div className=' flex justify-center items-center flex-col'>
                          <img className='w-[400px]' src="https://i.pinimg.com/originals/36/c2/49/36c2497df47cc07d533760f8b5cafa66.gif
                  " alt="" />
                          <p className='h1 text-4xl font-medium text-gray-600 tracking-wider'>your cart is empty!</p>
                          </div>
                        )
                        }

                    </div>

                    <div className="border rounded-xl w-3/12 p-4 h-fit hover:scale-105  duration-500 shadow">
                    <img src="https://i.pinimg.com/originals/57/c5/78/57c57898dbec056757561cab08689dec.gif" className="rounded-lg" />

   
                    <p className="my-4 pop font-semibold text-gray-900">
  Subtotal: <span className="text-green-600">₹ {totalAmt.toFixed(2)}</span>
</p>

                        <p className="mb-4  pop font-semibold text-gray-900 ">Overall Items: <span className='text-blue-600'>{cart?.totalQty}</span></p>
                       {
                        cart?.products.length > 0 
                        &&
                        <a href="/checkout" className="hover:scale-105 cursor-pointer duration-500 bg-gray-900 justify-center gap-x-4 flex h1 text-white text-xl tracking-widest items-center p-1 rounded-md"> 
                        <img src="https://img.icons8.com/?size=100&id=Ha75bURlWabT&format=png&color=000000" className="w-10 object-contain" />
                        <span>Go Checkout</span></a>
                       }
                    </div>
                </div>
            ) : (
                <div className='flex justify-center items-center flex-col '>
                <img className='w-[300px]' src="https://media0.giphy.com/media/WSxyc3kHnD9GvVbWDO/giphy.gif?cid=6c09b952ytj5o1pa6h1sxb9seg2bq8rvwkx7kprawg1rmsz7&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="" />
                <p className='h1 text-4xl font-medium mt-6 to-gray-800'>No Cart !</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default Cart