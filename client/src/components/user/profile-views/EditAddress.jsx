import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { addressValidation } from '../../../validations/userValidations';
import { showToast } from '../../../helpers/toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchEditAddress, updateAddress } from '../../../API/user/addressAPI';
import BtnLoader from '../../BtnLoader';

const EditAddress = () => {
  const { id } = useParams();
  const [address, setAddress] = useState(null);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const data = {
    userId: currentUser?._id,
    addressId: id,
  };

  const loadEditAddress = async () => {
    await fetchEditAddress(setAddress, data);
  };

  useEffect(() => {
    loadEditAddress();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: address?.name || '',
      mobile: address?.mobile || '',
      addressline1: address?.addressline1 || '',
      addressline2: address?.addressline2 || '',
      city: address?.city || '',
      state: address?.state || '',
      pincode: address?.pincode || '',
    },
    validationSchema: addressValidation,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const response = await updateAddress({
          userId: currentUser?._id,
          addressId: id,
          newAddress: values,
        });
        if (response.status === 200) {
          setLoading(false)
          showToast('Address updated successfully!', 'light', 'success');
          navigate('/profile/address');
        }
      } catch (error) {
        setLoading(false)
        console.error('Error during address update:', error);
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred!';
        showToast(errorMessage, 'dark', 'error');
      }
    },
  });

  return (
    <div>
      <div className="form-theme flex flex-col h-[90vh]">
        <h1>Edit your Address</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and mobile Fields */}
          <div className="flex justify-between gap-5">
            {['name', 'mobile'].map((field) => (
              <div className="input-group my-2 w-1/2" key={field}>
                <label htmlFor={field} className="block font-medium mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type={field === 'mobile' ? 'number' : 'text'}
                  name={field}
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={`Enter ${field}`}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <p className="error-text text-red-500 text-sm mt-1">
                    {formik.errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Address Line 1 and Address Line 2 */}
          <div className="flex justify-between gap-5">
            {['addressline1', 'addressline2'].map((field) => (
              <div className="input-group my-2 w-1/2" key={field}>
                <label htmlFor={field} className="block font-medium mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type="text"
                  name={field}
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={`Enter ${field}`}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <p className="error-text text-red-500 text-sm mt-1">
                    {formik.errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* City, State, and Pincode */}
          <div className="flex justify-between gap-5">
            {['city', 'state', 'pincode'].map((field) => (
              <div className="input-group my-2 w-1/3" key={field}>
                <label htmlFor={field} className="block font-medium mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type={field === 'pincode' ? 'number' : 'text'}
                  name={field}
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={`Enter ${field}`}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <p className="error-text text-red-500 text-sm mt-1">
                    {formik.errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
          <button type="submit" className="button" disabled={loading}>
  {loading ? <BtnLoader/> : 'Save'}
</button>

            <button
              type="button"
              className="button bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => navigate('/profile/address')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;
