import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { addProductOffer, fetchProducts } from '../../../API/admin/addAPI';
import BtnLoader from '../../../helpers/btnLoader';
import { productOfferValidation } from '../../../validations/admin/productValidations';
import { showToast } from '../../../helpers/toast';
import { useNavigate } from 'react-router-dom';

function AddProductOffers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const formik = useFormik({
    initialValues: {
      productId: '',
      discount: '',
      startDate: '',
      endDate: '',
      status: true,
    },
    validationSchema: productOfferValidation,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await addProductOffer(values);
        showToast(response.data.message || 'Product offer added successfully!','light','success');
        navigate('/dashboard/offers')
        resetForm();
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className='flex flex-col gap-6'>
    <div className="flex w-full justify-between items-center mb-14">
    <h1 className="text-gray-300">Add Products offers</h1>
    <a href="/dashboard/offers" className="button">
      <span>Back to offers</span>
    </a>
  </div>
    <form onSubmit={formik.handleSubmit} className="space-y-4 form-theme flex flex-col p-5">
      {error && <p >{error}</p>}

      <div>
        <label htmlFor="productId" className="">
          Products
        </label>
        <select
          id="productId"
          {...formik.getFieldProps('productId')}
          className="w-full"
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
        {formik.touched.productId && formik.errors.productId ? (
          <p >{formik.errors.productId}</p>
        ) : null}
      </div>

    <div className="flex w-full justify-between gap-x-12">
    <div>
        <label htmlFor="discount" className="">
          Discount
        </label>
        <input
          id="discount"
          type="number"
          {...formik.getFieldProps('discount')}
          className=""
        />
        {formik.touched.discount && formik.errors.discount ? (
          <p >{formik.errors.discount}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="endDate" className="">
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          {...formik.getFieldProps('endDate')}
          className=""
        />
        {formik.touched.endDate && formik.errors.endDate ? (
          <p>{formik.errors.endDate}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="startDate" className="">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          {...formik.getFieldProps('startDate')}
          className=""
        />
        {formik.touched.startDate && formik.errors.startDate ? (
          <p>{formik.errors.startDate}</p>
        ) : null}
      </div>
    </div>


   


      <button
        type="submit"
        className="button"
        disabled={loading}
      >
        {loading ? <BtnLoader/> : 'Add Product Offer'}
      </button>
    </form>
    </div>
  );
}

export default AddProductOffers;
