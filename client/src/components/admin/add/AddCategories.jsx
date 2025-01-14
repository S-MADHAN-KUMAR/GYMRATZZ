import React from 'react'
import { useFormik } from 'formik'
import { commanValidation } from '../../../validations/admin/productValidations'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { showToast } from '../../../helpers/toast'

const AddCategories = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      image: null, 
    },
    validationSchema: commanValidation,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/admin/add_categories`,
          values, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (res.status === 200) {
          showToast('Category added successfully', 'light', 'success');
          navigate('/dashboard/categories');
        }
      } catch (error) {
        console.error("Error adding :", error.response.data.message); 
        showToast(error.response.data.message, 'dark', 'error');
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
        <button type="submit" className="button">Add Category</button>
      </form>
    </div>
  )
}

export default AddCategories
