import React from 'react'
import { MdOutlineStarPurple500 ,MdOutlineStarOutline ,MdOutlineStarHalf  } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Card = ({product}) => {
    const rating = 4.5
  return (
    <div className='flex flex-col items-center h-[270px] max-w-[200px] min-w-[200px] hover:scale-105 duration-500 shadow hover:border relative'>
       <div className="h-[50%] w-full overflow-hidden">
       <Link to={`/shop/${product?._id}`}>
            <img className='w-full h-full object-contain p-4 hover:scale-105 duration-500' src={product?.imageUrls[0]} alt="" />
       </Link>
        </div>
        <div className="flex flex-col w-full h-[50%] justify-between p-2 ">
            <p className='pop font-medium '>{product?.name.length > 17 ? `${product?.name.slice(0,17)}...`:product?.name}</p>
        <div className="flex gap-x-3 ">

            <div className="flex gap-x-1  ">
          {Array(5)
        .fill(0)
        .map((_, index) => {
          const isFull = index < Math.floor(rating)
          const isHalf = index === Math.floor(rating) && rating % 1 >= 0.5
          const isEmpty = index >= Math.ceil(rating)

          return (
            <span key={index}>
              {isFull && <MdOutlineStarPurple500 className="text-[#faaf00]" />}
              {isHalf && <MdOutlineStarOutline className="text-[#faaf00]" />}
              {isEmpty && <MdOutlineStarHalf className="text-[#faaf00]" />}
            </span>
          );
        })}
          </div>

          <p className='text-xs pop font-medium'>4.5 Rating</p>
        </div>
        
       {
            product.productDetails ?
            <div className="flex pop justify-center gap-x-6 items-center">
        <p className='text-lg font-semibold text-green-600'>₹ {product?.price - (product?.price * (product?.productDetails?.discount / 100))}</p>
        <p className='text-gray-500 line-through font-medium'>₹ {product?.price}</p>
        </div>
        :
        <p className='text-lg font-semibold text-green-600'>₹ {product?.price}</p>
        }
      
         <button className='bg-black pop text-white uppercase w-full py-2 tracking-wider'>
                add to cart
            </button>
    </div>
    <div className="text-gray-600 absolute top-2 right-2">
       {/* <FaRegHeart className='w-5 h-5 cursor-pointer'/> */}
       <FaHeart className='text-red-600 w-5 h-5'/>
       </div>
    </div>
  )
}

export default Card