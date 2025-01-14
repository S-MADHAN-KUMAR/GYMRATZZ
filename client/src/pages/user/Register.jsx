import React from 'react';
import { showToast } from '../../helpers/toast.js';
import { useFormik } from 'formik';
import { RegisterValidation } from '../../validations/userValidations.js';
import {Link} from 'react-router-dom'

const Register = () => {
  const formik = useFormik({
    initialValues: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    },
    validationSchema: RegisterValidation,
    onSubmit: async (values) => {
      try {
        // const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/login`, values);
        // if (response.status === 200) {
        //   showToast('Logged in successfully!', 'success');
        // }
      } catch (error) {
        console.error('Error during login:', error);
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred!';
        showToast(errorMessage, 'dark', 'error');
      }
    },
  });

  return (
    <div className="flex min-h-[100vh]">
      <form
      noValidate
        className="form-theme flex flex-col gap-y-4 w-full md:w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <h1>Register Form</h1>
        <div className='flex flex-col md:flex-row gap-4 justify-between'>
        {['name', 'phone'].map((field) => (
          <div className="input-group" key={field}>
            <label htmlFor={field}>{field}:</label>
            <input
              type={field === 'password' ? 'password' : 'email'}
              name={field}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={`Enter ${field}`}
              className="input"
            />
            {formik.touched[field] && formik.errors[field] && (
              <p className="error-text">{formik.errors[field]}</p>
            )}
          </div>
        ))}
        </div>
        <div >
        {['email'].map((field) => (
          <div className="input-group" key={field}>
            <label htmlFor={field}>{field}:</label>
            <input
              type={field === 'password' ? 'password' : 'email'}
              name={field}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={`Enter ${field}`}
              className="input"
            />
            {formik.touched[field] && formik.errors[field] && (
              <p className="error-text">{formik.errors[field]}</p>
            )}
          </div>
        ))}
        </div>

        <div className='flex flex-col md:flex-row gap-4 justify-between'>
        {['password', 'confirmPassword'].map((field) => (
          <div className="input-group" key={field}>
            <label htmlFor={field}>{field}:</label>
            <input
              type={field === 'password' ? 'password' : 'email'}
              name={field}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={`Enter ${field}`}
              className="input"
            />
            {formik.touched[field] && formik.errors[field] && (
              <p className="error-text">{formik.errors[field]}</p>
            )}
          </div>
        ))}
        </div>

        <div className="flex justify-between mt-2 gap-x-5">
          <button type="submit" className="button">
            Log in
          </button>
        </div>

{/* Signup Link */}
<div className="text-center">
<small >
           Already have an account?{' '}
           <Link to={'/login'}>
             <span >LOGIN</span>
           </Link>
         </small>
</div>

      </form>
      <div className=" w-1/2 hidden md:block p-5">
          <img
            src="https://i.pinimg.com/originals/c0/82/91/c082911f2a616883a1e0652bff686f73.gif"
            className="w-full h-full object-contain "
          />
        </div>
    </div>
  );
};

export default Register;
