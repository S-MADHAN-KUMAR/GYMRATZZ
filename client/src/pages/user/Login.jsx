import React, { useState } from 'react';
import { showToast } from '../../helpers/toast.js';
import { useFormik } from 'formik';
import { loginValidationSchema } from '../../validations/userValidations.js';
import { Link ,useNavigate } from 'react-router-dom';
import GoogleAuthBtn from '../../components/user/GoogleAuthBtn.jsx';
import ForgotPasswordEmail from '../../components/user/ForgotPasswordEmail.jsx';
import { useDispatch } from 'react-redux';
import { handleLoginSubmit } from '../../API/user/Send.js';

const Login = () => {
  const [IsOpenEmailPopup, setIsOpenEmailPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      handleLoginSubmit(values, dispatch, navigate);
    },
  });

  return (
    <div className="flex container max-h-[90vh] ">
      <form
        noValidate
        className="form-theme flex flex-col gap-y-4 w-full md:w-1/2 md:px-32 "
        onSubmit={formik.handleSubmit}
      >
        <h1>Login Form</h1>
        {['email', 'password'].map((field) => (
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

        <h2
          onClick={() => setIsOpenEmailPopup(true)}
          className="cursor-pointer text-sm mb-4 text-center pop tracking-wider text-gray-300"
        >
          Forgot Your Password ?
        </h2>

        <div className="flex justify-between mt-2 gap-x-5">
          <button type="submit" className="w-full button">
            Log in
          </button>
          <GoogleAuthBtn />
        </div>

        {/* Signup Link */}
        <div className="text-center">
          <Link to={'/register'}>
            <small>
              New to this? <span>REGISTER</span>
            </small>
          </Link>
        </div>
      </form>
      <div className="w-1/2 hidden md:block p-5">
        <img
          src="https://i.pinimg.com/originals/c0/82/91/c082911f2a616883a1e0652bff686f73.gif"
          className="w-full h-full object-contain"
        />
      </div>
      {IsOpenEmailPopup && (
        <ForgotPasswordEmail
          setIsOpenEmailPopup={setIsOpenEmailPopup}
          showToast={showToast}
        />
      )}
    </div>
  );
};

export default Login;
