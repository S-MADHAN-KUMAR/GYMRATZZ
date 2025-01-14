import React from 'react'
import { useFormik } from 'formik'
import { couponValidation } from '../../../validations/admin/productValidations'
import axios from 'axios'
import { showToast } from '../../../helpers/toast.js'
import { useNavigate } from 'react-router-dom'

const AddCoupons = () => {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      discount: '',
      minDiscountAmount: '',
      maxDiscountAmount: '',
      startDate: '',
      endDate: '',
      status:true
    },
    validationSchema: couponValidation,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/admin/add_coupon`,
         values,
       
        )
        if (res.status === 200) {
          showToast('Coupon added successfully', 'light', 'success');
          navigate('/dashboard/coupons');
        }
      } catch (error) {
        console.error("Error adding coupon:", error.response.data.message); 
        showToast(error.response.data.message, 'dark', 'error');
      }
    }
    
  });
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between items-center mb-14">
        <h1 className="text-gray-300">Add Coupon</h1>
        <a href="/dashboard/coupons" className="button">
          <span>Back to Coupons</span>
        </a>
      </div>

      {/* FORM */}
      <form onSubmit={formik.handleSubmit} className="form-theme flex flex-col gap-6">

  {/* FORM FIELDS */}
  <div className="flex flex-col gap-4">

    {/* Name and Coupon Code */}
    <div className="flex gap-6">
      {/* Name */}
      <div className="flex flex-col gap-2 w-full md:w-1/2">
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          placeholder="Enter coupon name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-field"
        />
        {formik.errors.name && formik.touched.name && (
          <p className="text-red-500">{formik.errors.name}</p>
        )}
      </div>

      {/* Coupon Code */}
      <div className="flex flex-col gap-2 w-full md:w-1/2">
        <label htmlFor="code">Coupon Code:</label>
        <input
          name="code"
          placeholder="Enter coupon code"
          value={formik.values.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-field"
        />
        {formik.errors.code && formik.touched.code && (
          <p className="text-red-500">{formik.errors.code}</p>
        )}
      </div>
    </div>

    {/* Discount Percentage */}
    <div className="flex flex-col gap-2">
      <label htmlFor="discount">Discount Percentage:</label>
      <input
        name="discount"
        type="number"
        placeholder="Enter discount percentage"
        value={formik.values.discount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="input-field"
      />
      {formik.errors.discount && formik.touched.discount && (
        <p className="text-red-500">{formik.errors.discount}</p>
      )}
    </div>

    {/* Minimum and Maximum Discount Amount */}
    <div className="flex gap-6">
      {/* Minimum Discount Amount */}
      <div className="flex flex-col gap-2 w-full md:w-1/2">
        <label htmlFor="minDiscountAmount">Minimum Discount Amount:</label>
        <input
          name="minDiscountAmount"
          type="number"
          placeholder="Enter minimum discount amount"
          value={formik.values.minDiscountAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-field"
        />
        {formik.errors.minDiscountAmount && formik.touched.minDiscountAmount && (
          <p className="text-red-500">{formik.errors.minDiscountAmount}</p>
        )}
      </div>

      {/* Maximum Discount Amount */}
      <div className="flex flex-col gap-2 w-full md:w-1/2">
        <label htmlFor="maxDiscountAmount">Maximum Discount Amount:</label>
        <input
          name="maxDiscountAmount"
          type="number"
          placeholder="Enter maximum discount amount"
          value={formik.values.maxDiscountAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-field"
        />
        {formik.errors.maxDiscountAmount && formik.touched.maxDiscountAmount && (
          <p className="text-red-500">{formik.errors.maxDiscountAmount}</p>
        )}
      </div>
    </div>

    {/* Start and End Date */}
    <div className="flex gap-6">
      {/* Start Date */}
      <div className="flex flex-col gap-2 w-full md:w-1/2">
        <label htmlFor="startDate">Start Date:</label>
        <input
          name="startDate"
          type="date"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-field"
        />
        {formik.errors.startDate && formik.touched.startDate && (
          <p className="text-red-500">{formik.errors.startDate}</p>
        )}
      </div>

      {/* End Date */}
      <div className="flex flex-col gap-2 w-full md:w-1/2">
        <label htmlFor="endDate">End Date:</label>
        <input
          name="endDate"
          type="date"
          value={formik.values.endDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="input-field"
        />
        {formik.errors.endDate && formik.touched.endDate && (
          <p className="text-red-500">{formik.errors.endDate}</p>
        )}
      </div>
    </div>

    {/* Submit Button */}
    <button type="submit" className="button mt-6">Add Coupon</button>
  </div>
</form>

    </div>
  )
}

export default AddCoupons
