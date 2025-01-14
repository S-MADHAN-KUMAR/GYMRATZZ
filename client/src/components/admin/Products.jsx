import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { fetchProducts } from '../../API/admin/dashboard.js'
import { handleDeleteProduct, handleToggleProductBlock } from '../../API/admin/dashboardUpdate.js'

const Products = () => {
  const [products,setProducts]=useState([])
  const loadProducts =async()=>{
    await fetchProducts(setProducts)
  }
  useEffect(()=>{
  loadProducts()
  },[])
  
  return (
    <div className='flex flex-col gap-y-12'>
      <div className="flex items-center justify-between">
        <h1 className='text-gray-300'>Products</h1>
        <a href='/dashboard/add_products' className='button'>
          Add products
        </a>
        </div>
        <table className="min-w-full table-auto pop ">
        <thead className="th">
          <tr>
            <th className="p-4 text-left ">PRODUCT</th>
            <th className="p-4 text-center ">PRICE</th>
            <th className="p-4 text-center ">STATUS</th>
            <th className="p-4 text-center ">STOCK</th>
            <th className="p-4 text-center ">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className=" tb border-y-4 ">
                <td className="p-4 flex items-center gap-4 ">
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded shadow"
                  />
                  <div>
                    <p className="font-medium ">{product.name.length > 15 ? `${product.name.slice(0, 15)}...` : product.name}</p>
                    <p className="text-sm ">{product.description.length > 90 ? `${product.description.slice(0, 90)}...` : product.description}</p>
                  </div>
                </td>
                <td className="p-4 text-center font-semibold  ">₹{product.price}</td>
                <td className="p-4 text-center ">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${product.status ? 'bg-green-500' : 'bg-red-500'}`}
                  >
                    {product.status ? 'ACTIVE' : 'BLOCKED'}
                  </span>
                </td>
                <td className="p-4 text-center font-semibold text-blue-600 ">{product.stock}</td>
                <td className="p-4 text-center ">
                  <div className="flex justify-center gap-4 font-Roboto">
                    <Link to={`/dashboard/edit_products/${product._id}`} className="text-white  font-medium bg-blue-500 px-4 rounded-sm">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleToggleProductBlock(product._id, product.status,loadProducts)}
                      className={`px-4 py-1 text-sm rounded-sm ${product.status ? 'bg-red-500 hover:bg-red-600 text-white font-medium' : 'bg-green-500 font-medium hover:bg-green-600 text-white'}`}
                    >
                      {product.status ? "Block" : "Unblock"}
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id,loadProducts)}
                      className="text-white  font-medium bg-red-500 px-4 rounded-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-600">No Products Available</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Products