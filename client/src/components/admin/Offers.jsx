import React from 'react'
import ProductOffers from './ProductOffers'
import CategoriesOffers from './CategoriesOffers'

const Offers = () => {
  return (
    <div className='flex flex-col gap-y-14 bg-gray-900 h-full'>
    <ProductOffers/>
    <CategoriesOffers/>
  </div>
  )
}

export default Offers