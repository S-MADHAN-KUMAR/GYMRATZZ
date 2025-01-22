import React, { useEffect, useState } from 'react'
import { fetchCategoriesOffers } from '../../API/admin/dashboard'
import { handleBlockCategoryOffers } from '../../API/admin/dashboardUpdate'

const CategoriesOffers = () => {
  const [categoriesOffers,setCategoriesOffers]=useState([])
  const loadCategoriesOffers =async()=>{
    await fetchCategoriesOffers(setCategoriesOffers)
  }
  useEffect(()=>{
  loadCategoriesOffers()
  },[])
  
  return (
    <div className='flex flex-col gap-y-12'>
    <div className="flex items-center justify-between">
      <h1 className='text-gray-300'>categories Offers</h1>
      <a href='/dashboard/add_categories_offers' className='button'>
        Add CategoriesOffers
      </a>
      </div>
      <table className="table-auto w-full text-center text-sm">
          {/* Table Head */}
          <thead className="th pop uppercase tracking-wider">
            <tr>
              <th className="p-4">Categories Image</th>
              <th className="p-4">Categories Name</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Expiry Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {categoriesOffers && categoriesOffers.length > 0 ? (
              categoriesOffers.map((offer, index) => (
                <tr key={index} className="tb border-y-4 border-black">
                  <td className="p-2">
                  <div className="w-40 h-20">
                  <img src={offer.categoriesImage} className="w-full h-full object-cover" alt={offer.categoriesName} />
                  </div>
                  </td>
                  <td className="p-4">{offer.categoriesName}</td>
                  <td className="p-4">{offer.discount}%</td>
                  <td className="p-4">{new Date(offer.endDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span
                      className={`px-8 py-2 font-semibold uppercase ${
                        offer.status === true ? 'text-white bg-green-600' : 'text-white bg-red-600'
                      }`}
                    >
                      {offer.status === true ? 'Active' : 'Blocked'}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleBlockCategoryOffers(offer._id, offer.status,loadCategoriesOffers)} 
                      className={`px-8 py-2 font-semibold uppercase ${
                        offer.status ? 'text-white bg-red-600' : 'text-white bg-green-600'
                      }`}
                    >
                      {offer.status ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No product offers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
  </div>
  )
}

export default CategoriesOffers