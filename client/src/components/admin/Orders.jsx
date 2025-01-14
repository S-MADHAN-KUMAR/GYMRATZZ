import React, { useEffect, useState } from 'react'
import { fetchOrders } from '../../API/admin/dashboard'
import { handleChangeOrderStatus } from '../../API/admin/dashboardUpdate';

const Orders = () => {
  const [orders,setOrders]=useState([])
  const [selectedStatus, setSelectedStatus] = useState({});

  const statusOptions = [
    "Pending",
    "Payment Failed",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returned",
  ];

  const handleStatusChange = (orderId, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [orderId]: status,
    }));
  };

  const loadOrders =async()=>{
    await fetchOrders(setOrders)
  }
  useEffect(()=>{
  loadOrders()
  },[])
  
  return (
    <div className='flex flex-col gap-y-12'>
    <div className="flex items-center justify-between">
      <h1 className='text-gray-300'>Orders</h1>
      <button className='button'>
        Add Orders
      </button>
      </div>
      <table className="table-auto w-full text-center text-sm">
          <thead className="th uppercase pop tracking-wider">
            <tr>
              <th className="p-4">Order Id</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Change Order Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className="border-y-4 tb">
                  <td className="p-4">{order._id}</td>
                  <td className="p-4">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className="px-8 py-2 font-semibold uppercase">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">{order.paymentMethod || 'N/A'}</td>
                  <td className="p-4">
                    <select
                      className="p-2 bg-black rounded-md"
                      value={selectedStatus[order._id] || order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option className="bg-[#141414]" value="" disabled>
                        Select Status
                      </option>
                      {statusOptions.map((status, idx) => (
                        <option key={idx} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleChangeOrderStatus(order._id,selectedStatus,loadOrders)}
                      className="px-8 py-2 text-white bg-blue-600 rounded-sm hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
  </div>
  )
}

export default Orders