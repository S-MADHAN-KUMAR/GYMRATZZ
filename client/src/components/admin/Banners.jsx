import React, { useEffect, useState } from 'react'
import { fetchBanners } from '../../API/admin/dashboard'
import { handleToggleBannerBlock } from '../../API/admin/dashboardUpdate'

const Banners = () => {
  const [banners,setBanners]=useState([])
  const loadBanners =async()=>{
    await fetchBanners(setBanners)
  }
  useEffect(()=>{
  loadBanners()
  },[])
  
  return (
    <div className='flex flex-col gap-y-12'>
    <div className="flex items-center justify-between">
      <h1 className='text-gray-300'>Banners</h1>
      <a href='/dashboard/add_banners' className='button'>
        Add Banners
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
          {banners && banners.length > 0 ? (
            banners.map((banner, index) => (
              <tr key={index} className="tb border-y-2 border-black">
                <td className="p-2">
                  <div className="w-40 h-20">
                  <img src={banner.imageUrl} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="p-4">{banner.name}</td>
                <td className="p-4">
                    <span
                      className={`px-8 py-2 font-semibold uppercase ${
                        banner.status === true
                          ? "text-white bg-green-600"
                          : "text-white bg-red-600"
                      }`}
                    >
                      {banner.status === true ? "Active" : "Blocked"}
                    </span>
                  </td>
                <td className="p-4">
                  <button
                    onClick={() =>
                      handleToggleBannerBlock(banner._id, banner.status,loadBanners)
                    }
                    className={`px-8 py-2 font-semibold uppercase ${
                      banner.status
                        ? "text-white bg-red-600"
                        : "text-white bg-green-600"
                    }`}
                  >
                    {banner.status ? "Block" : "Unblock"}
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

export default Banners