import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { addressValidation} from '../../../validations/userValidations';
import { showToast } from '../../../helpers/toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchEditAddress } from '../../../API/user/comman';
import axios from 'axios';

const EditAddress = () => {
  const {id} = useParams()
  const [address,setAddress]=useState(null)
  const navigate = useNavigate()
  const {currentUser}=useSelector((state)=>state.user)

  const data ={
    userId:currentUser?._id,
    addressId:id
  }

  const loadEditAddress=async()=>{
    await fetchEditAddress(setAddress,data)
  }

  useEffect(()=>{
    loadEditAddress()
  },[])

  
   const formik = useFormik({
    enableReinitialize:true,
        initialValues: {
          name:address?.name ||'',
          phone: address?.phone ||'',
          addressline1: address?.addressline1 ||'',
          addressline2: address?.addressline2 ||'',
          city: address?.city ||'',
          state: address?.state ||'',
          pincode: address?.pincode ||'',
        },
        validationSchema: addressValidation,
        onSubmit: async (values) => {
          try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/user/update_address`, {userId:currentUser?._id,
              addressId:id, newAddress:values});
            if (response.status === 200) {
              showToast('Address updated successfully!','light', 'success');
              navigate('/profile/address')
            }
          } catch (error) {
            console.error('Error during login:', error);
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred!';
            showToast(errorMessage, 'dark', 'error');
          }
        },
      });
  return (
    <div>
       <div className="form-theme flex flex-col h-[90vh]">
        <h1>Edit your Address</h1>
        <form action="">
  {/* Name and Phone Fields */}
  <div className="flex justify-between gap-5">
    {["name", "phone"].map((field) => (
      <div className="input-group my-2 w-1/2" key={field}>
        <label htmlFor={field} className="block font-medium mb-1">
          {field.charAt(0).toUpperCase() + field.slice(1)}:
        </label>
        <input
          type={field === "phone" ? "number" : "text"}
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
    {["addressline1", "addressline2"].map((field) => (
      <div className="input-group my-2 w-1/2" key={field}>
        <label htmlFor={field} className="block font-medium mb-1">
          {field.charAt(0).toUpperCase() + field.slice(1)}:
        </label>
        <input
          type="text"
          name={field}
          value={formik.values[field] }
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
    {["city", "state", "pincode"].map((field) => (
      <div className="input-group my-2 w-1/3" key={field}>
        <label htmlFor={field} className="block font-medium mb-1">
          {field.charAt(0).toUpperCase() + field.slice(1)}:
        </label>
        <input
          type={field === "pincode" ? "number" : "text"}
          name={field}
          value={formik.values[field] }
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
  
<button 
  type="submit" 
  className="button bg-blue-500 text-white px-4 py-2 rounded"
  onClick={formik.handleSubmit} // Ensure the form submits correctly
>
  Update
</button>


<button 
  type="button" 
  className="button bg-gray-500 text-white px-4 py-2 rounded"
  onClick={() => navigate("/profile/address")} // Navigate back to address page
>
  Cancel
</button>
</div>

</form>

      </div>
    </div>
  )
}

export default EditAddress