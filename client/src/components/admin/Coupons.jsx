import React, { useEffect, useState } from 'react'
import { fetchCoupons } from '../../API/admin/dashboard'
import { handleToggleCouponBlock } from '../../API/admin/dashboardUpdate'

const Coupons = () => {
  const [coupons,setCoupons]=useState([])
  const loadCoupons =async()=>{
    await fetchCoupons(setCoupons)
  }
  useEffect(()=>{
  loadCoupons()
  },[])
  
  return (
    <div className='flex flex-col gap-y-12'>
      <div className="flex items-center justify-between">
        <h1 className='text-gray-300'>Coupons</h1>
        <a href='/dashboard/add_coupons' className='button'>
          Add coupons
        </a>
        </div>
        <table className="table-auto w-full text-center text-sm">
          {/* Table Head */}
          <thead className="th pop uppercase tracking-wider">
            <tr>
              <th className="p-4">Coupon Name</th>
              <th className="p-4">Coupon Code</th>
              <th className="p-4">Status</th>
              <th className="p-4">Discount Percentage</th>
              <th className="p-4">Expiry Date</th>
              <th className="p-4">Action</th>
            </tr>   
          </thead>

          {/* Table Body */}
          <tbody>
            {coupons && coupons.length > 0 ? (
              coupons.map((coupon, index) => (
                <tr key={index} className="tb border-y-2 border-black">
                  <td className="p-4">{coupon.name}</td>
                  <td className="p-4">{coupon.code}</td>
                  <td className="p-4">
                    <span
                      className={`px-8 py-2 font-semibold uppercase ${
                        coupon.status === true
                          ? "text-white bg-green-600"
                          : "text-white bg-red-600"
                      }`}
                    >
                      {coupon.status === true ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="p-4">{coupon.discount}%</td>
                  <td className="p-4">
                    {new Date(coupon.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleToggleCouponBlock(coupon._id, coupon.status,loadCoupons)
                      }
                      className={`px-8 py-2 font-semibold uppercase ${
                        coupon.status
                          ? "text-white bg-red-600"
                          : "text-white bg-green-600"
                      }`}
                    >
                      {coupon.status ? "Block" : "Unblock"}
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


export default Coupons