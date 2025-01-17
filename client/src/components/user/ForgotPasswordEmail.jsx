import React, { useState } from "react";
import axios from "axios";
import ForgotPasswordOTP from "./ForgotPasswordOTP";

const ForgotPasswordEmail = ({ setIsOpenEmailPopup, showToast }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [IsOpenOtpPopup, setIsOpenOtpPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(email);

    if (!email) {
      setError("Email field cannot be empty.");
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError(""); 
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/user/forgotPassword/${email}`
        );

        if (res.status === 200) {
          console.log(res.data.message);
          showToast(res.data.message, "light", "success");
          setIsOpenOtpPopup(true);
        } else {
          console.log(res.data.message);
          showToast(res.data.message, "dark", "error");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          showToast(error.response.data.message, "dark", "error");
        } else {
          setError("An error occurred, please try again later.");
        }
      }
    }
  };

  return (
    <div className="bg-black/90 z-50 fixed flex justify-center items-center top-0 left-0 right-0 bottom-0">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="relative flex flex-col text-center bg-white rounded-md w-2/5 h-2/3"
      >
        <div className="flex flex-col p-12 pop justify-between h-full">
          <h1 className="text-5xl h1 uppercase  tracking-wider w-full mb-6">
            Enter Your Email
          </h1>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />

            {error && (
              <span className="text-red-600 text-sm mt-2">{error}</span>
            )}


          <div className="flex justify-between items-center w-full ">
          <button className="bg-red-700 text-white p-3 font-semibold w-1/3 rounded-md" onClick={()=>setIsOpenEmailPopup(false)} >
              <span> back</span>
            </button>
            <button type="submit"  className="bg-blue-700 text-white p-3 font-semibold w-1/3 rounded-md" > 
              <span> Next</span>
            </button>
          </div>
        </div>
      </form>

      {IsOpenOtpPopup ? (
        <ForgotPasswordOTP
        setIsOpenOtpPopup={setIsOpenOtpPopup}
          showToast={showToast}
          email={email}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ForgotPasswordEmail;
