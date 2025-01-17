import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { fetchNewArrivals } from '../../API/user/home';
import { MdOutlineStarPurple500 ,MdOutlineStarOutline ,MdOutlineStarHalf  } from "react-icons/md";

const Aside = () => {
   const [newArrivals, setNewArrivals] = useState([]);
  
    const loadNewArrivals = async () => {
      await fetchNewArrivals(setNewArrivals);
    };

    useEffect(()=>{
      loadNewArrivals()
    },[])
  return (
    <div className=' w-[30vw] hidden md:block'
    >
          <h1 className=" tracking-wider text-center font-medium text-3xl p-5">New Arrivals</h1>

          <div className="mb-5">
            {newArrivals.slice(0, 4).map((product) => (
              <Link to={`/shop/${product._id}`} key={product._id}>
                <div className="flex shadow m-4 rounded-sm border overflow-hidden hover:scale-105 duration-500">
                  <div className="w-4/12 h-24">
                  <img src={product.imageUrls[0]} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="w-8/12 p-2 bg-gray-100">
                    <div className="flex items-center justify-between">
                      <h1 className="font-Roboto font-medium text-xs">{product.name}</h1>
                    </div>

                    {/* Product Price */}
                    <div className="flex gap-x-4 text-sm font-Roboto mt-1">
                      <p className="text-black font-medium">₹ {product.price}</p>
                      <p className="line-through text-xs text-gray-500">₹ {product.price + 1000}</p>
                    </div>

                    {/* Product Rating */}
                    <div className="mt-1 flex flex-row items-end justify-between">
                      <div className="text-yellow-300 flex gap-x-1">
                        {[...Array(product.rating)].map((_, index) => (
                          <MdOutlineStarPurple500 key={index} className="w-3" />
                        ))}
                      </div>
                      <p className="mt-1 font-Roboto text-sm text-gray-500">{product.ratingPercentage} %</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
  )
}

export default Aside