import React, { useState } from 'react'
import { useFormik } from 'formik'
import { commanValidation } from '../../../validations/admin/productValidations'
import { showToast } from '../../../helpers/toast'
import { useNavigate } from 'react-router-dom'
import { addBannerAPI } from '../../../API/admin/addAPI'
import BtnLoader from '../../../helpers/btnLoader'

const AddBanner = () => {
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
        const res = await addBannerAPI(values);

        if (res?.status === 200) {
          setLoading(false);

          showToast('Banner added successfully', 'light', 'success');
          navigate('/dashboard/banners');
        } else {
          const errorMessage =
            res?.data?.message || 'Something went wrong. Please try again.';
          showToast(errorMessage, 'dark', 'error');
        }
      } catch (error) {
        setLoading(false);
        let errorMessage = 'Something went wrong. Please try again.';
        if (error?.response) {
          errorMessage = error.response?.data?.message || errorMessage;
        } else if (error?.message) {
          errorMessage = error.message || errorMessage;
        }

        console.error('Error adding banner:', errorMessage);
        showToast(errorMessage, 'dark', 'error');
      }
    },
  });


  return (
    <div className='flex flex-col gap-6'>
      <div className="flex w-full justify-between items-center mb-14">
        <h1 className="text-gray-300">Add Banner</h1>
        <a href="/dashboard/banners" className="button">
          <span>Back to Banner</span>
        </a>
      </div>

      {/* FORM */}
      <form onSubmit={formik.handleSubmit} className="form-theme flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {/* Name */}
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            placeholder="Enter banner name"
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
            {loading ? <BtnLoader /> : 'Add Banner'}
          </button>      </form>
    </div>
  )
}

export default AddBanner
