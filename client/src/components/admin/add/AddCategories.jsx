import React from 'react'
import { useFormik } from 'formik'
import { commanValidation } from '../../../validations/admin/productValidations'

const AddCategories = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      image: null, 
    },
    validationSchema: commanValidation,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <div className='flex flex-col gap-6'>
      <div className="flex w-full justify-between items-center mb-14">
        <h1 className="text-gray-300">Add categories</h1>
        <a href="/dashboard/coupons" className="button">
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
        </div>

        {/* Submit Button */}
        <button type="submit" className="button">Add Category</button>
      </form>
    </div>
  )
}

export default AddCategories
