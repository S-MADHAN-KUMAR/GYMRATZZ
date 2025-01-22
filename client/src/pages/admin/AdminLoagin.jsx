import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginValidationSchema } from '../../validations/userValidations.js';
import { showToast } from '../../helpers/toast.js';
import { AdminLoginFailure, AdminLoginStart, AdminLoginSuccess } from '../../redux/admin/adminSlice.js';
import { loginAPI } from '../../API/admin/authAPI.js';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      dispatch(AdminLoginStart());
      try {
        const response = await loginAPI(values);

        if (response.status === 200) {
          // Store token in localStorage
          localStorage.setItem('ADMIN_TOKEN', response?.data?.token);

          // Update Redux state
          showToast('Login successful!', 'light');
          dispatch(AdminLoginSuccess(response?.data?.admin));
          navigate('/dashboard');
        } else {
          showToast('Unexpected error during login.', 'light', 'success');
          dispatch(AdminLoginFailure());
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || 'Error logging in. Please try again later.';
        setErrors({ server: errorMessage });
        showToast(errorMessage, 'dark', 'error');
        dispatch(AdminLoginFailure());
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="overflow-hidden">
      <div className="max-h-full min-h-[100vh] w-[1366px] flex justify-between bg-black">
      <div className="flex flex-col items-center justify-center w-[50vw] gap-y-10">
      <h1 className="h1 text-white/80  text-5xl tracking-wide uppercase">
              ADMIN LOGIN
            </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-6 ">

          {/* Email Input */}
          <div className="mb-1">
          <label className='text-gray-400 pop font-medium text-sm ' >Email</label>

            <input
              type="email"
              placeholder="Enter email"
              name="email"
              className="bg-gray-900 w-full p-3 text-white pop rounded-sm my-1 placeholder:pop border-gray-800 placeholder:text-sm "              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
          <label className='text-gray-400 pop font-medium text-sm ' >Password</label>

            <input
              type="password"
              placeholder="Enter password"
              name="password"
              className="bg-gray-900 w-full p-3 text-white pop rounded-sm my-1 placeholder:pop border-gray-800 placeholder:text-sm "              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-sm">{formik.errors.password}</p>
            )}
          </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`button w-full  ${
                formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
             <span> {formik.isSubmitting ? 'Logging in...' : 'LOGIN'}</span>
            </button>
        </form>
      </div>

        {/* Right Section */}
        <div className="bg-white w-1/2 p-5">

          <img
            src="https://i.pinimg.com/originals/c0/82/91/c082911f2a616883a1e0652bff686f73.gif"
            className="mt-20 mx-auto"
          />
        </div>
      </div>

    </div>
  );
};

export default AdminLogin;
