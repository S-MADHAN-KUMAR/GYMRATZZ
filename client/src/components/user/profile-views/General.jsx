import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { profileValidation } from "../../../validations/userValidations";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { fetchCurrentUser } from "../../../API/user/comman";
import axios from "axios";
import { showToast } from "../../../helpers/toast";

const General = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [isEditable, setIsEditable] = useState(false);
  const loadUser = async () => {
    const fetchUserData = await fetchCurrentUser(currentUser?._id);
    setUser(fetchUserData);
  };

  useEffect(() => {
    loadUser();
  }, []);
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id:user?._id || currentUser?._id || '',
      name: user?.name || " ",
      phone: user?.phone ,
      email: user?.email || " ",
      password: user?.password ,
    },
    validationSchema: profileValidation,
    onSubmit: async (values) => {
      try {
        const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/user/update_profile`, values);
        if (res.status === 200) {
          showToast('Logged in successfully!', 'light','success');
          setIsEditable(false)
          loadUser()
        }
      } catch (error) {
        console.error("Error during login:", error);
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred!";
        showToast(errorMessage, "dark", "error");
      }
    },
  });
  return (
    <>
    {
      user 
      ?
      (
        <div className="flex justify-between">
        <div className="form-theme flex flex-col h-[90vh] w-1/2">
          <h1>update you profile</h1>
          <form action="">
          {["name", "email", "phone", "password"].map((field) => (
    <div className="input-group my-2" key={field}>
      <label htmlFor={field}>{field}:</label>
      <input
        type={
          field === "password"
            ? "password"
            : field === "email"
            ? "email"
            : field === "phone"
            ? "tel"
            : "text"
        }
        name={field}
        value={formik.values[field] || ""}
        onChange={formik.handleChange}
        readOnly={
          !isEditable || field === "email" || field === "password" || formik.values.password === undefined
        }
        onBlur={formik.handleBlur}
        placeholder={
          field === "password"
            ? formik.values.password !== undefined
              ? "Enter your password"
              : "Create password"
            : field === "phone"
            ? formik.values.phone !== undefined
              ? "Enter your phone number"
              : "Add phone number"
            : `Enter ${field}`
        }
        className="input"
      />
      {formik.touched[field] && formik.errors[field] && (
        <p className="error-text">{formik.errors[field]}</p>
      )}
    </div>
  ))}
  
  
  {!isEditable ? (
    <button className="w-full button" onClick={() => setIsEditable(true)}>
      <span> Edit</span>
    </button>
  ) : (
    <div className="flex justify-between">
      <button className="w-40 button" onClick={formik.handleSubmit}>
        <span> Save</span>
      </button>
      <button className="btn w-40 button" onClick={() => setIsEditable(false)}>
        <span>Cancel</span>
      </button>
    </div>
  )}
          </form>
        </div>
  
        <div className="w-1/2 h-[90vh] flex flex-col justify-center items-center">
  {
    user ?
    
  
    <>
    <div className="w-30">
      <img
        className="w-full h-full object-cover"
        src={user?.profilePicture}
        alt=""
      />
    </div>
    <div className="flex flex-col justify-center items-center gap-y-2 mt-4">
    <p className="pop text-3xl font-semibold">{user?.name}</p>
      <div className="flex items-center font-medium gap-x-4">
        <FaPhone />
        <p>{user?.phone ? `91+ ${user.phone}` : "No Phone Number"}</p>
      </div>
      <div className="flex items-center font-medium gap-x-4">
        <MdEmail />
        <p>{user?.email}</p>
      </div>
    </div>
    </>
    
  
    :
   <div className="flex flex-col items-center justify-center">
     <div className="w-52 h-52 ">
  <img src="https://i.pinimg.com/originals/5e/53/12/5e5312ab982e6620087882ce7ff1ac23.gif" className="w-full h-full object-cover" />
  
  </div>
  <h1>no profile data</h1>
   </div>
  }
  </div>
       
      </div>
      )
      :
      (
        <div className='flex justify-center items-center flex-col w-full h-full'>
        <img className='w-[300px]' src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/49c16a38805735.57701dcdd452c.gif
    " alt="" />
        <p className='h1 text-4xl font-medium mt-6 to-gray-800'>No Profile Data !</p>
        </div>
      )
    }
    </>



    

  );
};

export default General;
