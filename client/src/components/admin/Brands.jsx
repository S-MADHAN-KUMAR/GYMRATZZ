import React, { useEffect, useState } from 'react'
import { fetchBrands } from '../../API/admin/dashboard'
import { handleToggleBrandsBlock } from '../../API/admin/dashboardUpdate'

const Brands = () => {
  const [brands,setBrands]=useState([])
  const loadBrands =async()=>{
    await fetchBrands(setBrands)
  }
  useEffect(()=>{
  loadBrands()
  },[])
  
  return (
    <div className='flex flex-col gap-y-12'>
    <div className="flex items-center justify-between">
      <h1 className='text-gray-300'>Brands</h1>
      <a href='/dashboard/add_brands' className='button'>
        Add brands
      </a>
      </div>
      <table className="table-auto w-full text-center text-sm">
        {/* Table Head */}
        <thead className="th pop uppercase tracking-wider">
          <tr>

            <th className="p-4">Brand Image</th>
            <th className="p-4">Brand Name</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {brands && brands.length > 0 ? (
            brands.map((brand, index) => (
              <tr key={index} className="tb border-y-2 border-black">
                <td className="p-2">
                 <div className="w-40 h-20">
                 <img src={brand.imageUrl} className="w-full h-full object-contain" />
                 </div>
                </td>
                <td className="p-4">{brand.name}</td>
                <td className="p-4">
                    <span
                      className={`px-8 py-2 font-semibold uppercase ${
                        brand.status === true
                          ? "text-white bg-green-600"
                          : "text-white bg-red-600"
                      }`}
                    >
                      {brand.status === true ? "Active" : "Blocked"}
                    </span>
                  </td>
                <td className="p-4">
                  <button
                    onClick={() =>
                      handleToggleBrandsBlock(brand._id, brand.status,loadBrands)
                    }
                    className={`px-8 py-2 font-semibold uppercase ${
                      brand.status
                        ? "text-white bg-red-600"
                        : "text-white bg-green-600"
                    }`}
                  >
                    {brand.status ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No coupons found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

  </div>
  )
}

export default Brands