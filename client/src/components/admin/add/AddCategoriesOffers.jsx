import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { categoryOfferValidation } from '../../../validations/admin/productValidations';
import { addCategoryOffer, fetchCategories } from '../../../API/admin/addAPI';
import { showToast } from '../../../helpers/toast';
import { useNavigate } from 'react-router-dom';

const AddCategoriesOffers = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories. Please try again later.');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      categoryId: '',
      discount: '',
      startDate: '',
      endDate: '',
      status: 'true',
    },
    validationSchema: categoryOfferValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        const offerData = {
          ...values,
          status: values.status === 'true',
        };
        setLoading(true);
        await addCategoryOffer(offerData);
        showToast('Category offer added successfully!','light','sucess');
        navigate('/dashboard/offers')
        resetForm();
      } catch (error) {
        showToast(error.response?.data?.message || 'Failed to add category offer','dark','error');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className='flex flex-col gap-6'>
    <div className="flex w-full justify-between items-center mb-14">
    <h1 className="text-gray-300">Add category offers</h1>
    <a href="/dashboard/offers" className="button">
      <span>Back to offers</span>
    </a>
  </div>
    <form onSubmit={formik.handleSubmit} className="space-y-4 form-theme flex flex-col p-5">
      <div>
        <label htmlFor="categoryId">
          Categories
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {formik.touched.categoryId && formik.errors.categoryId && (
          <p >{formik.errors.categoryId}</p>
        )}
      </div>
      <div className="flex w-full justify-between gap-x-12">
      <div>
        <label htmlFor="discount" >
          Discount
        </label>
        <input
          id="discount"
          name="discount"
          type="number"
          value={formik.values.discount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          
        />
        {formik.touched.discount && formik.errors.discount && (
          <p >{formik.errors.discount}</p>
        )}
      </div>

      <div>
        <label htmlFor="startDate" >
          Start Date
        </label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
         
        />
        {formik.touched.startDate && formik.errors.startDate && (
          <p >{formik.errors.startDate}</p>
        )}
      </div>

      <div>
        <label htmlFor="endDate" >
          End Date
        </label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          value={formik.values.endDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          
        />
        {formik.touched.endDate && formik.errors.endDate && (
          <p >{formik.errors.endDate}</p>
        )}
      </div>

      </div>
      <button
        type="submit"
        className="button"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Add Category Offer'}
      </button>
    </form>
    </div>
  );
};

export default AddCategoriesOffers;
