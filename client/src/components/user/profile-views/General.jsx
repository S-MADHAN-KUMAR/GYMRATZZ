import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { profileValidation } from "../../../validations/userValidations";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { showToast } from "../../../helpers/toast";
import { fetchCurrentUser, updateUserProfile } from "../../../API/user/profileAPI";
import BtnLoader from "../../BtnLoader";

const General = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch user data
  const loadUser = async () => {
    const fetchUserData = await fetchCurrentUser(currentUser?._id);
    setUser(fetchUserData);
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Formik configuration
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user?._id || currentUser?._id || "",
      name: user?.name || "",
      mobile: user?.mobile || "",
      email: user?.email || "",
      password: user?.password || "", // Empty if password doesn't exist
    },
    validationSchema: profileValidation,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await updateUserProfile(values);
        if (res.success) {
          showToast("Profile updated successfully!", "light", "success");
          setIsEditable(false);
          loadUser(); // Refresh user data
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        showToast(error.message || "An unexpected error occurred!", "dark", "error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {user ? (
        <div className="flex justify-between">
          <div className="form-theme flex flex-col h-[90vh] w-1/2">
            <h1>Update Your Profile</h1>
            <form onSubmit={formik.handleSubmit}>
              {["name", "email", "mobile", "password"].map((field) => (
                <div className="input-group my-2" key={field}>
                  <label htmlFor={field}>{field}:</label>
                  <input
                    type={
                      field === "password"
                        ? "password"
                        : field === "email"
                        ? "email"
                        : field === "mobile"
                        ? "tel"
                        : "text"
                    }
                    name={field}
                    value={formik.values[field] || ""}
                    onChange={formik.handleChange}
                    readOnly={
                      !isEditable || (field === "password" && formik.values[field])
                    } // Password is non-editable if it exists
                    onBlur={formik.handleBlur}
                    placeholder={
                      field === "password" && !formik.values[field]
                        ? "Add your password"
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
                <button
                  type="button"
                  className="w-full button"
                  onClick={() => setIsEditable(true)}
                >
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="button"
                    disabled={loading}
                  >
                    {loading ? <BtnLoader /> : "Save"}
                  </button>
                  <button
                    type="button"
                    className="btn w-40 button"
                    onClick={() => setIsEditable(false)}
                  >
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="w-1/2 h-[90vh] flex flex-col justify-center items-center">
            {user ? (
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
                    <p>{user?.mobile ? `91+ ${user.mobile}` : "No mobile Number"}</p>
                  </div>
                  <div className="flex items-center font-medium gap-x-4">
                    <MdEmail />
                    <p>{user?.email}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="w-52 h-52">
                  <img
                    src="https://i.pinimg.com/originals/5e/53/12/5e5312ab982e6620087882ce7ff1ac23.gif"
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <h1>No profile data</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col w-full h-full">
          <img
            className="w-[300px]"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/49c16a38805735.57701dcdd452c.gif"
            alt=""
          />
          <p className="h1 text-4xl font-medium mt-6 to-gray-800">
            No Profile Data!
          </p>
        </div>
      )}
    </>
  );
};

export default General;
