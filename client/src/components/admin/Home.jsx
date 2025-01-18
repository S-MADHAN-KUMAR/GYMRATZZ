import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ADMIN_API } from '../../API/API';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; 
import * as XLSX from 'xlsx'; 
import { Bar, Pie, Line, Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement,
    Filler,
    RadialLinearScale
} from 'chart.js';
import { ADMIN_API } from '../../API/API';
import { fetchBestSellingBrands, fetchBestSellingCategories, fetchBestSellingProducts, fetchStatistics } from '../../API/admin/dashboardStatistics';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement,
    Filler,
    RadialLinearScale
);





const Home = () => {
  const [filters, setFilters] = useState({ day: '', month: '', week: '', year: '', startDate: '', endDate: '' });
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState();
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [bestSellingCategories, setBestSellingCategories] = useState([]);
  const [bestSellingBrands, setBestSellingBrands] = useState([]);

  useEffect(()=>{
    fetchStatistics(setStatistics)
    fetchBestSellingProducts(setBestSellingProducts)
    fetchBestSellingCategories(setBestSellingCategories)
    fetchBestSellingBrands(setBestSellingBrands)
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedFilters = { ...filters, [name]: value };

    if (name === 'day') {
      updatedFilters.startDate = value;
      updatedFilters.endDate = value;
    } else if (name === 'month') {
      const [year, month] = value.split('-');
      updatedFilters.startDate = `${year}-${month}-01`;
      updatedFilters.endDate = new Date(year, month, 0).toISOString().split('T')[0];
    } else if (name === 'week') {
      const weekStart = new Date(value);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6); 
      updatedFilters.startDate = weekStart.toISOString().split('T')[0];
      updatedFilters.endDate = weekEnd.toISOString().split('T')[0];
    } else if (name === 'year') {
      updatedFilters.startDate = `${value}-01-01`;
      updatedFilters.endDate = `${value}-12-31`;
    }

    setFilters(updatedFilters);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (filters.startDate && !filters.endDate) {
      setFilters({ ...filters, endDate: filters.startDate });
    }

    try {
      console.log(filters);

      const response = await ADMIN_API.post(`/admin/sales_report`, null, {
        params: {
          startDate: filters.startDate,
          endDate: filters.endDate
        }
      });
      setReport(response.data);
      console.log(response?.data);
      
    } catch (error) {
      console.error('Error fetching sales report:', error);
      setError('Failed to fetch sales report. Please try again.');
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Sales Report', 14, 20);

    const headers = ['Date', 'Order ID', 'Total Amount', 'Payment Method','Coupon ID','Discount Amount'];
    const rows = report.orders.map(sale => [
      sale.date, 
      sale.orderId, 
      sale.totalAmt, 
      sale.payMethod,
      sale.coupon || '-',
      sale.discount || '-'
    ]);

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 30, 
    });

    doc.text(`Total Sales: Rs.${report.grandTotal}`, 14, doc.lastAutoTable.finalY + 10);

    doc.save('sales_report.pdf');
  };

  const downloadExcel = () => {
    const salesData = report.orders.map(sale => ({
      'Date': sale.date,
      'Order ID': sale.orderId,
      'Total Amount': sale.totalAmt,
      'Payment Method': sale.payMethod,
    }));

    const ws = XLSX.utils.json_to_sheet(salesData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sales Report');

    XLSX.writeFile(wb, 'sales_report.xlsx');
  }

const barData = {
  labels: ['Monthly'],
  datasets: [
      {
          label: 'Monthly Revenue',
          data: [statistics?.monthlyRevenue],
          backgroundColor: 'rgba(34, 202, 236, 0.5)', 
          borderColor: 'rgba(34, 202, 236, 1)', 
          borderWidth: 1
      },
      {
          label: 'Monthly Sales Count',
          data: [statistics?.monthlySalesCount],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)', 
          borderWidth: 1
      }
  ]
};

const pieData = {
  labels: ['Monthly Revenue', 'Overall Revenue'],
  datasets: [
      {
          data: [statistics?.monthlyRevenue, statistics?.overallRevenue],
          backgroundColor: [
              'rgba(34, 202, 236, 0.5)', 
              'rgba(255, 159, 64, 0.5)'  
          ],
          borderColor: [
              'rgba(34, 202, 236, 1)', 
              'rgba(255, 159, 64, 1)' 
          ],
          borderWidth: 1
      }
  ]
};

const lineData = {
  labels: ['January', 'February', 'March'],
  datasets: [
      {
          label: 'Monthly Revenue',
          data: [statistics?.monthlyRevenue, 0, 0],
          borderColor: 'rgba(34, 202, 236, 1)', 
          backgroundColor: 'rgba(34, 202, 236, 0.2)',
          fill: true
      },
      {
          label: 'Monthly Sales Count',
          data: [statistics?.monthlySalesCount, 0, 0],
          borderColor: 'rgba(255, 99, 132, 1)', 
          backgroundColor: 'rgba(255, 99, 132, 0.2)', 
          fill: true
      }
  ]
};

const radarData = {
  labels: ['Revenue', 'Sales Count'],
  datasets: [
      {
          label: 'Monthly',
          data: [statistics?.monthlyRevenue, statistics?.monthlySalesCount],
          backgroundColor: 'rgba(34, 202, 236, 0.5)', 
          borderColor: 'rgba(34, 202, 236, 1)', 
          borderWidth: 1
      },
      {
          label: 'Overall',
          data: [statistics?.overallRevenue, statistics?.overallSalesCount],
          backgroundColor: 'rgba(255, 159, 64, 0.5)', 
          borderColor: 'rgba(255, 159, 64, 1)', 
          borderWidth: 1
      }
  ]
};

  return (
<div className="p-6 mx-auto bg-gray-900">
  
  <div className="w-full flex justify-between mb-20 gap-x-6">

    <div className="bg-[#1f2a38] flex-1 shadow-black/40 shadow p-4 rounded-lg ">
      <h1 className='h1 text-3xl tracking-wider text-gray-300 mb-6'>Total Revenue</h1>
      <p className='h1 text-6xl text-green-600'>₹ {statistics?.overallRevenue}</p>
    </div>
    <div className="bg-[#1f2a38] flex-1 shadow-black/40 shadow p-4 rounded-lg ">
      <h1 className='h1 text-3xl tracking-wider text-gray-300 mb-6'>Total Orders</h1>
      <p className='h1 text-6xl text-blue-600'>{statistics?.overallSalesCount}</p>
    </div>

    <div className="bg-[#1f2a38] flex-1 shadow-black/40 shadow p-4 rounded-lg ">
      <h1 className='h1 text-3xl tracking-wider text-gray-300 mb-6'>This Month sales</h1>
      <p className='h1 text-6xl text-green-600'>₹ {statistics?.monthlyRevenue}</p>
    </div>
    <div className="bg-[#1f2a38] flex-1 shadow-black/40 shadow p-4 rounded-lg ">
      <h1 className='h1 text-3xl tracking-wider text-gray-300 mb-6'>Monthly Earning</h1>
      <p className='h1 text-6xl text-red-600'>{statistics?.monthlySalesCount}</p>
    </div>
  </div>

  

  <div>
    <h2 className="h1 text-5xl tracking-wider mb-8 text-center">
        Charts for Monthly and Overall Data
    </h2>

    {/* Grid for Charts */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {/* Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-black/40 shadow">
            <h3 className="pop text-xl font-medium tracking-wider mb-20 text-center">
                Monthly Revenue vs Sales Count
            </h3>
            <Bar data={barData} />
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-black/40 shadow">
            <h3 className="pop text-xl font-medium tracking-wider mb-4 text-center">
                Revenue Distribution
            </h3>
            <Pie data={pieData} />
        </div>

        {/* Line Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-black/40 shadow">
            <h3 className="pop text-xl font-medium tracking-wider mb-20 text-center">
                Monthly Revenue and Sales Trend
            </h3>
            <Line data={lineData} />
        </div>

        {/* Radar Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-black/40 shadow">
            <h3 className="pop text-xl font-medium tracking-wider mb-4 text-center">
                Comparison of Monthly and Overall Data
            </h3>
            <Radar data={radarData} />
        </div>
    </div>
</div>


<div className=" mx-auto px-4">
  <h1 className="text-5xl text-center text-gray-300 tracking-wider mt-20 mb-6 h1">Sales Report</h1>

  {/* Form Section */}
  <div className="mb-10">
    <form
      onSubmit={handleSubmit}
      className="form-theme shadow-md rounded-md flex flex-wrap gap-6 items-end"
    >
      {/* Day */}
      <div className="form-group flex-1 min-w-[250px]">
        <label htmlFor="day" className="block text-sm font-medium text-gray-700">
          Select Day
        </label>
        <input
          type="date"
          id="day"
          name="day"
          value={filters.day}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Month */}
      <div className="form-group flex-1 min-w-[250px]">
        <label htmlFor="month" className="block text-sm font-medium text-gray-700">
          Select Month
        </label>
        <input
          type="month"
          id="month"
          name="month"
          value={filters.month}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Week */}
      <div className="form-group flex-1 min-w-[250px]">
        <label htmlFor="week" className="block text-sm font-medium text-gray-700">
          Select Week
        </label>
        <input
          type="week"
          id="week"
          name="week"
          value={filters.week}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Year */}
      <div className="form-group flex-1 min-w-[250px]">
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Select Year
        </label>
        <input
          type="number"
          id="year"
          name="year"
          value={filters.year}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter the year"
        />
      </div>

      {/* Start Date */}
      <div className="form-group flex-1 min-w-[250px]">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* End Date */}
      <div className="form-group flex-1 min-w-[250px]">
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Submit Button */}
      <div className="form-group">
        <button
          type="submit"
          className="button "
        >
          Generate Report
        </button>
      </div>
    </form>
  </div>

  {/* Error Handling */}
  {error && <p className="mt-4 text-red-500">{error}</p>}

  {/* Report Section */}
  {report && (
    <div className="bg-gray-100 text-gray-900 p-6 shadow-md pop">
      <h2 className="text-2xl font-bold mb-4  uppercase">Report Summary</h2>
      <p className="text-lg">
        Total Sales: <span className="font-bold text-green-600">₹ {report.grandTotal}</span>
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Sales Details</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-sky-900 text-gray-100 border-b">
              <th className="py-2 px-4 text-left text-sm font-semibold">Date</th>
              <th className="py-2 px-4 text-left text-sm font-semibold">Order ID</th>
              <th className="py-2 px-4 text-left text-sm font-semibold">Total Amount</th>
              <th className="py-2 px-4 text-left text-sm font-semibold">Payment Method</th>
              <th className="py-2 px-4 text-left text-sm font-semibold">Coupon ID</th>
              <th className="py-2 px-4 text-left text-sm font-semibold">Discount Amount</th>
            </tr>
          </thead>
          <tbody>
            {report.orders.length > 0 ? (
              report.orders.map((sale) => (
                <tr key={sale._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-sm">{sale.date}</td>
                  <td className="py-2 px-4 text-sm">{sale.orderId}</td>
                  <td className="py-2 px-4 text-sm">₹ {sale.totalAmt}</td>
                  <td className="py-2 px-4 text-sm">{sale.payMethod}</td>
                  <td className="py-2 px-4 text-sm">{sale.coupon || '-'}</td>
                  <td className="py-2 px-4 text-sm">{sale.discount || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-600">
                  No reports found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Download Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={downloadPDF}
          className="py-2 px-4 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Download PDF
        </button>
        <button
          onClick={downloadExcel}
          className="py-2 px-4 bg-yellow-600 text-white font-medium rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        >
          Download Excel
        </button>
      </div>
    </div>
  )}
</div>

  {/* Best selling products */}
<h1 className="text-5xl text-gray-300 text-center tracking-wider mt-20 mb-14 h1">Best selling products</h1>
  {
  bestSellingProducts.length > 0 ? (
    <div className="flex justify-between gap-x-3">
      {bestSellingProducts.map((product, index) => (
        <div key={index} className="hover:scale-105 duration-500 flex flex-col h-[40vh] w-full overflow-hidden rounded-lg shadow-black/50 shadow">
         <div className="h-[70%] w-full bg-white p-3">
         <img src={product?.productDetails?.imageUrls[0]} className="object-contain w-full h-full" />
         </div>
         <div className="h-[30%] w-full p-2 bg-[#1f2a38]">
          <p className='pop tracking-wide text-white'>{product?.productDetails?.name.length > 15 ?`${product?.productDetails?.name.slice(0,15)}...`:product?.productDetails?.name}</p>
          <p className='text-lg pop font-semibold text-green-500'>₹ {product?.productDetails?.price}</p>
         </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No Best selling products</p>
  )
}

{/* Best selling categories */}
<h1 className="text-5xl text-center text-gray-300 tracking-wider mt-20 mb-14 h1">Best selling caegories</h1>
 
{
  bestSellingCategories.length > 0 ? (
    <div className="flex justify-between gap-x-3">
      {bestSellingCategories.map((category, index) => (
        <div key={index} className="hover:scale-105 duration-500 flex flex-col h-[40vh] w-full overflow-hidden rounded-lg shadow-black/50 shadow">
         <div className="h-[70%] w-full bg-white">
         <img src={category?.categoryDetails?.imageUrl} className="object-cover w-full h-full" />
         </div>
         <div className="h-[30%] w-full p-2 bg-[#1f2a38]  flex justify-center items-center">
          <p className='pop tracking-wide text-white text-xl'>{category?.categoryDetails?.name.length > 15 ?`${category?.categoryDetails?.name.slice(0,15)}...`:category?.categoryDetails?.name}</p>
         </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No Best selling Categories</p>
  )
}

{/* Best selling categories */}
<h1 className="text-5xl text-center text-gray-300 tracking-wider mt-20 mb-14 h1">Best selling Brands</h1>
 
{
  bestSellingBrands.length > 0 ? (
    <div className="flex justify-between gap-x-3">
      {bestSellingBrands.map((brand, index) => (
        <div key={index} className="hover:scale-105 duration-500 flex flex-col h-[40vh] w-full overflow-hidden rounded-lg shadow-black/50 shadow">
         <div className="h-[70%] w-full bg-white">
         <img src={brand?.brandDetails?.imageUrl} className="object-cover w-full h-full" />
         </div>
         <div className="h-[30%] w-full p-2 bg-[#1f2a38] flex justify-center items-center">
          <h1 className='pop tracking-wide text-white text-xl'>{brand?.brandDetails?.name}</h1>
         </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No Best selling Brands</p>
  )
}

</div>

  );
};

export default Home;
