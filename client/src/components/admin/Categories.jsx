import React, { useEffect, useState } from 'react'
import { fetchCategories } from '../../API/admin/dashboard'
import { handleToggleCategoriesBlock } from '../../API/admin/dashboardUpdate'

const Categories = () => {
  const [categories,setCategories]=useState([])
  const loadCategories =async()=>{
    await fetchCategories(setCategories)
  }
  useEffect(()=>{
  loadCategories()
  },[])
  
  return (
    <div className='flex flex-col gap-y-12'>
    <div className="flex items-center justify-between">
      <h1 className='text-gray-300'>Categories</h1>
      <a href='/dashboard/add_categories' className='button'>
        Add Categories
      </a>
      </div>
      <table className="table-auto w-full text-center text-sm">
        {/* Table Head */}
        <thead className="th pop uppercase tracking-wider">
          <tr>

            <th className="p-4">Category Image</th>
            <th className="p-4">Category Name</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={index} className="tb border-y-2 border-black">
                 <td className="p-2">
                 <div className="w-40 h-20">
                 <img src={category.imageUrl} className="w-full h-full object-contain" />
                 </div>
                </td>
                <td className="p-4">{category.name}</td>
                <td className="p-4">
                    <span
                      className={`px-8 py-2 font-semibold uppercase ${
                        category.status === true
                          ? "text-white bg-green-600"
                          : "text-white bg-red-600"
                      }`}
                    >
                      {category.status === true ? "Active" : "Blocked"}
                    </span>
                  </td>
                <td className="p-4">
                  <button
                    onClick={() =>
                      handleToggleCategoriesBlock(category._id, category.status,loadCategories)
                    }
                    className={`px-8 py-2 font-semibold uppercase ${
                      category.status
                        ? "text-white bg-red-600"
                        : "text-white bg-green-600"
                    }`}
                  >
                    {category.status ? "Block" : "Unblock"}
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

export default Categories