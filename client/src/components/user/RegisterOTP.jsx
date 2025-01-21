import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RegisterSuccess } from '../../redux/user/userSlice.js';
import { resendOtpApi, verifyOtpApi } from '../../API/user/otpAPI.js';

const RegisterOTP = ({ setIsOpenPopup, showToast }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [err, setErr] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (element, index) => {
    const value = element.value;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setErr('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const response = await verifyOtpApi(currentUser?.email, otpValue);
      if (response.status === 200) {
        localStorage.setItem('USER_TOKEN', response?.data?.token);
        localStorage.setItem('USER_EMAIL', response?.data?.user?.email);

        showToast('OTP verified successfully!', 'light', 'success');
        setIsOpenPopup(false);
        dispatch(RegisterSuccess(response?.data?.user));
        navigate('/');
      }
    } catch (error) {
      setErr(error.response?.data?.message || 'Failed to verify OTP');
      setResendDisabled(false);
      setTimer(0);
    }
  };

  const handleResendOtp = async () => {
    setErr('');
    try {
      setResendDisabled(true);
      setTimer(60);
      setOtp(new Array(6).fill(''));
      const response = await resendOtpApi(currentUser?.email);

      if (response.status === 200) {
        showToast('OTP resent successfully!', 'light', 'success');
      }
    } catch (error) {
      setErr(error.response?.data?.message || 'Failed to resend OTP');
      setResendDisabled(false);
    }
  };

  useEffect(() => {
    let interval;
    if (resendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [resendDisabled, timer]);

  return (
    <div className="bg-black/80 z-50 fixed flex justify-center items-center top-0 left-0 right-0 bottom-0">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col text-center bg-white rounded-md w-2/5 h-2/3"
      >
        <div className="flex flex-col p-12 justify-between h-full">
          <h1 className="text-4xl uppercase tracking-wider w-full">
            Enter OTP
          </h1>
          <div className="mt-10 flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`border-2 pop border-gray-800 text-center text-xl font-medium placeholder:text-sm w-16 h-16 rounded-md ${
                  resendDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendDisabled}
            className={`mt-4 text-sm ${
              resendDisabled ? 'text-gray-400 cursor-not-allowed pop' : 'pop text-blue-600 cursor-pointer'
            }`}
          >
            {resendDisabled ? `Resend OTP in ${timer}s` : 'Resend OTP'}
          </button>
          {err && <p className="text-red-600 mt-4 text-sm">{err}</p>}
          <div className="flex justify-between items-center pop">
            <button
              type="submit"
              className="bg-green-700 text-white p-3 font-semibold w-1/3 rounded-md"
            >
              Submit
            </button>
            <button
              onClick={() => setIsOpenPopup(false)}
              className="bg-red-700 text-white p-3 font-semibold w-1/3 rounded-md"
            >
              back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterOTP;
