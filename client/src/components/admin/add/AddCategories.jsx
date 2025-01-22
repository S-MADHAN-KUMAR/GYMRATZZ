import React, { useState } from 'react'
import { useFormik } from 'formik'
import { commanValidation } from '../../../validations/admin/productValidations'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { showToast } from '../../../helpers/toast'
import { addCategory } from '../../../API/admin/addAPI'
import BtnLoader from '../../../helpers/btnLoader'

const AddCategories = () => {
  const navigate = useNavigate()
      const [loading, setLoading] = useState(false)
  
  const formik = useFormik({
    initialValues: {
      name: '',
      image: null, 
    },
    validationSchema: commanValidation,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const res = await addCategory(values)

        if (res.status === 200) {
          setLoading(false);

          showToast('Category added successfully', 'light', 'success');
          navigate('/dashboard/categories');
        }
      } catch (error) {
        setLoading(false);

        const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
        console.error("Error adding category:", errorMessage);
        showToast(errorMessage, 'dark', 'error');
      }
    },
  })

  return (
    <div className='flex flex-col gap-6'>
      <div className="flex w-full justify-between items-center mb-14">
        <h1 className="text-gray-300">Add categories</h1>
        <a href="/dashboard/categories" className="button">
          <span>Back to categories</span>
        </a>
      </div>

      {/* FORM */}
      <form onSubmit={formik.handleSubmit} className="form-theme flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {/* Name */}
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            placeholder="Enter category name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input-field"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500">{formik.errors.name}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {/* Image Upload */}
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            name="image"
            onChange={(event) => {
              formik.setFieldValue('image', event.currentTarget.files[0]) 
            }}
            onBlur={formik.handleBlur}
            className="input-field"
          />
          {formik.errors.image && formik.touched.image && (
            <p className="text-red-500">{formik.errors.image}</p>
          )}
           {!formik.errors.image && formik.touched.image && formik.values.image && (
            <div className="my-4">
              <img
                src={URL.createObjectURL(formik.values.image)}
                alt="Preview"
                className="h-40 w-auto border border-gray-500 rounded-md"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="button" disabled={loading}>
            {loading ? <BtnLoader /> : 'Add Category'}
          </button>
      </form>
    </div>
  )
}

export default AddCategories
