import React, { useEffect, useState } from 'react'
import { fetchRelatedProducts } from '../../API/shop'
import Card from './Card'

const RelatedProducts = ({id}) => {
    const [products,setproducts]=useState([])

    useEffect(()=>{
        fetchRelatedProducts(id,setproducts)
    },[])


  return (
    <div className='container  px-5'>
        <div className="border-t-2 p-10 flex flex-col gap-y-12">
            <h1>Related products</h1>
{/* PRODUCTS */}
<div className=" w-full relative  grid md:grid-cols-4 mb-4 place-content-center gap-10">
            {products.length > 0 ? (
              products.map((product) => (
                <Card key={product._id} product={product} />
              ))
            ) : (
              <div className='flex flex-col w-full justify-center items-center absolute top-12 left-1/2 transform -translate-x-1/2 '>
                <img className='w-[200px] md:w-[300px]' src="https://media0.giphy.com/media/WSxyc3kHnD9GvVbWDO/giphy.gif?cid=6c09b952ytj5o1pa6h1sxb9seg2bq8rvwkx7kprawg1rmsz7&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="" />
                <p className='h1 whitespace-nowrap text-lg md:text-4xl font-medium mt-6 to-gray-600 tracking-wider'>No related products found !</p>
                </div>
            )}
          </div>

        </div>

    </div>
  )
}

export default RelatedProducts