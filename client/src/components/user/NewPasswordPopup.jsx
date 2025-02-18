// components/NewPasswordPopup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../API/user/auth";

const NewPasswordPopup = ({ setIsOpenNewPopup, showToast, email }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { password: "", confirmPassword: "" };

    // Check if password is empty or less than 8 characters
    if (!formData.password) {
      newErrors.password = "Password cannot be empty.";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      isValid = false;
    }

    // Check if confirm password is empty or does not match
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password cannot be empty.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await updatePassword(email, formData.password); // Use the service here
        if (res.status === 200) {
          showToast("Password updated successfully!");
          setFormData({ password: "", confirmPassword: "" });
          navigate('/');
        }
      } catch (error) {
        console.error("Error updating password:", error);
        showToast("Failed to update password.");
      }
    }
  };

  return (
    <div className="bg-black/10 z-50 fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 font-Roboto">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col text-center bg-white rounded-md w-2/5 h-2/3 "
      >
        <div className="flex flex-col p-10 h-full justify-between">
          <h1 className="text-3xl uppercase tracking-wider w-full">
            Enter Your New Password
          </h1>

          <input
            type="password"
            placeholder="New Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm w-11/12 mx-auto">
              {errors.password}
            </p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm w-11/12 mx-auto">
              {errors.confirmPassword}
            </p>
          )}

          <div className="flex justify-between w-full">
            <button
              type="submit"
              className="bg-black text-white p-3 font-semibold w-1/3 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsOpenNewPopup(false)}
              className="bg-black text-white p-3 font-semibold w-1/3 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPasswordPopup;
