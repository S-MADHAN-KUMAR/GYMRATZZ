import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { fetchOrderDetail } from '../../../API/user/comman'
import { handleOrderCancel, handleOrderReturn } from '../../../API/user/orderAPI'

const OrderDetails = () => {
  const { id } = useParams()

  const [order, setOrders] = useState(null)

  const loadOrderDetails=async()=>{
    fetchOrderDetail(id,setOrders)
  }
  useEffect(() => {
    loadOrderDetails()
  }, [id])

  const downloadInvoice = async () => {
    if (!order) return;
  
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Invoice', 105, 10, { align: 'center' });
  
    // Order Details
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 10, 20);
    doc.text(`Total Amount: Rs.${order.totalAmt.toFixed(2)}`, 10, 30);
    if (order.couponUsed) {
      doc.text(`Coupon Applied: ${order.couponOfferPercentage}%`, 10, 40);
    }
    doc.text(`Order Status: ${order.status}`, 10, 50);
    doc.text(`Payment Method: ${order.paymentMethod}`, 10, 60);
  
    // Helper function to convert image URLs to Base64
    const getImageBase64 = (url) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png')); // Convert image to Base64
        };
        img.onerror = reject;
        img.src = url;
      });
  
    // Table for Products
    const tableData = await Promise.all(
      order.products.map(async (product) => {
        const base64Image = await getImageBase64(product.image);
        return [
          {
            content: '',
            image: base64Image, // Pass the Base64 string
            width: 20,
            height: 20,
          },
          product.name,
          `Rs${product.offerAmt ? (product.price - product.offerAmt).toFixed(2) : product.price.toFixed(2)}`,
          product.quantity,
        ];
      })
    );
  
    // Render table with increased body cell height
    doc.autoTable({
      startY: 70,
      head: [['Product Image', 'Product Name', 'Price', 'Quantity']],
      body: tableData,
      columnStyles: {
        0: { cellWidth: 30, halign: 'center', valign: 'middle' }, // Image cell
        1: { cellWidth: 'auto', halign: 'left' },
        2: { cellWidth: 'auto', halign: 'right' },
        3: { cellWidth: 'auto', halign: 'center' },
      },
      didDrawCell: (data) => {
        if (data.column.index === 0 && data.cell.raw && data.cell.raw.image) {
          const { image, width, height } = data.cell.raw;
          doc.addImage(image, 'PNG', data.cell.x + 2, data.cell.y + 2, width, height);
        }
      },
      // Increase padding for body rows only
      bodyStyles: {
        cellPadding: 10, // Increase padding in the body
      },
      margin: { top: 10, left: 10, right: 10, bottom: 10 },
    });
  
    // Save the PDF
    doc.save(`Invoice_${order._id}.pdf`);
  }

  return (
<div className="w-full mx-auto p-6">
  <h1 className=" text-gray-800 mb-6 text-center">Order Details</h1>

  {order ? (
    <div className="mt-20 w-full flex flex-col md:flex-row justify-between gap-16 px-8">
      {/* Product Images Section */}
      <div className="w-full md:w-full flex flex-col space-y-4">
        <h3 className="text-3xl tracking-widest font-medium text-gray-800 h1">Products</h3>
        <div className=" flex flex-col justify-center gap-4 w-full">
          {order.products?.map((product) => (
            <div key={product._id} className="border-b w-full flex gap-x-4 items-center">
              <div className="w-[160px] h-[160px] overflow-hidden p-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="flex flex-col w-full pop">
                <p className="text-gray-900 font-semibold text-lg">{product?.name}</p>
                <p className="font-medium text-gray-600">
                  price :
                    <span className="text-green-600 font-medium">₹{product.price.toFixed(2)}</span>
                </p>
                <p className="font-medium text-gray-600">
                  Quantity: <span className="text-red-600 font-medium">{product?.quantity}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Section */}
      <div className="w-full h-fit shadow hover:scale-105 duration-500 md:w-2/3 space-y-4 pop border-2 rounded-lg p-6 ">
        <p className="text-lg font-medium text-gray-800">
          Order ID: <span className="font-normal text-gray-600">{order._id}</span>
        </p>
        <p className="text-lg font-medium text-gray-800">
          Total Amount: ₹<span className="font-normal text-gray-600">{order.totalAmt}</span>
        </p>
        {order.couponUsed && (
          <p className="text-lg font-medium text-gray-800">
            Coupon Applied: <span className="font-normal text-gray-600">{order.couponOfferPercentage} % Offers</span>
          </p>
        )}
        <p className='text-lg font-medium text-gray-800'>Status:
        <span
          className={`
            ms-4 px-4 py-1 rounded-full text-sm 
            ${order.status === "Pending" ? "text-yellow-500 bg-yellow-100" : ""}
            ${order.status === "Cancelled" ? "text-red-500 bg-red-100" : ""}
            ${order.status === "Payment Failed" ? "text-red-500 bg-red-100" : ""}
            ${order.status === "Shipped" ? "text-blue-500 bg-blue-100" : ""}
            ${order.status === "Delivered" ? "text-green-500 bg-green-100" : ""}
            ${order.status === "Returned" ? "text-purple-500 bg-purple-100" : ""}
          `}
        >
           {order.status}
        </span>
        </p>


<div className="flex gap-x-4 ">
          {/* Cancel Order Button (only show if status is not 'Cancelled') */}
          {order.status !== 'Cancelled' && order.status !== 'Payment Failed' && order.status !== 'Returned' ? (
  order.status !== 'Delivered' ? (
    <button
      onClick={()=>handleOrderCancel(id,loadOrderDetails)}
      className="w-full md:w-48 px-6 py-3 mt-6 bg-red-600 text-white font-medium rounded-full hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
    >
      Cancel Order
    </button>
  ) : (
    <button
      onClick={()=>handleOrderReturn(id,loadOrderDetails)}
      className="w-full md:w-48 px-6 py-3 mt-6 bg-red-600 text-white font-medium rounded-full hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
    >
      Return Order
    </button>
  )
) : null}


        {/* Download Invoice Button */}
        <button
          onClick={downloadInvoice}
          className="w-full md:w-48 px-6 py-3 mt-6 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        >
          Download Invoice
        </button>
</div>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-600">No order details found</p>
  )}
</div>

  )
}

export default OrderDetails
