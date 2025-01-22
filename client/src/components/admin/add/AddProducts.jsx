import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { addProductValidation } from "../../../validations/admin/productValidations";
import {
  fetchBrands,
  fetchCategories,
} from "../../../API/admin/dashboardUpdate";
import { showToast } from "../../../helpers/toast";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../../API/admin/addAPI";
import BtnLoader from "../../BtnLoader";

const AddProducts = () => {
  const [loading,setLoading]=useState(false)
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const cropperRef = useRef(null);
  const [showCropper, setShowCropper] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories(setCategories);
    fetchBrands(setBrands);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      stock: "",
      category: "",
      brand: "",
      description: "",
      price: "",
      images: [],
      status: true,
    },
    validationSchema: addProductValidation,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true)
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((image) => formData.append("images", image));
        } else {
          formData.append(key, value);
        }
      });

      setSubmitting(false);

      try {
        const response = await addProduct(formData);
        setLoading(false)

        if (response.status === 200) {
          showToast("Product added successfully!", "light", "success");
          navigate("/dashboard/products");
        }
      } catch (error) {
        setLoading(false)
        console.error("Error adding product:", error);
      }
    },
  });

  

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue("images", files);
  }

  const removeImage = (index) => {
    const updatedImages = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue("images", updatedImages);
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const canvas = cropper.getCroppedCanvas();
      const croppedImageUrl = canvas.toDataURL();
  
      const blobBin = atob(croppedImageUrl.split(',')[1]);
      const array = [];
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      const file = new Blob([new Uint8Array(array)], { type: 'image/jpeg' }); 
  
      const updatedCroppedImages = [...formik.values.images];
      updatedCroppedImages[imageIndex] = file; 
  
      formik.setFieldValue("images", updatedCroppedImages);
      setShowCropper(false);
    }
  
    console.log('formik.images', formik.values.images);
  };
  

  const openCropper = (file, index) => {
    setCurrentImage(file);
    setImageIndex(index); 
    setShowCropper(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between items-center mb-14">
        <h1 className="text-gray-300">Add product</h1>
        <a href="/dashboard/products" className="button">
          <span> Back to products</span>
        </a>
      </div>

      {/* FORM */}
      <form
        onSubmit={formik.handleSubmit}
        className="form-theme flex flex-col gap-4"
      >
        <div className="flex w-full justify-between">
          {["name", "price", "stock"].map((field) => (
            <div className="input-group" key={field}>
              <label htmlFor={field}>{field}:</label>
              <input
                type={
                  field === "stock" || field === "price" ? "number" : "text"
                }
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

        <div className="flex flex-col gap-2">
          {/* description */}
          <label htmlFor="description">description:</label>
          <textarea
            type="text"
            name="description"
            placeholder="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input-field "
          />
          {formik.errors.description && formik.touched.description && (
            <p className="text-red-500">{formik.errors.description}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            {/* Category */}
            <label htmlFor="category">category :</label>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              className={`w-full border rounded-md p-2 focus:outline-none ff ${
                formik.errors.category ? "border-red-500" : "border-gray-600"
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {formik.errors.category && formik.touched.category && (
              <p className="text-red-500">{formik.errors.category}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {/* brands */}
            <label htmlFor="category">Brand :</label>
            <select
              name="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              className={`w-full border rounded-md p-2 focus:outline-none ff ${
                formik.errors.brand ? "border-red-500" : "border-gray-600"
              }`}
            >
              <option value="">Select a brand</option>
              {brands.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {formik.errors.brand && formik.touched.brand && (
              <p className="text-red-500">{formik.errors.brand}</p>
            )}
          </div>
          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label>Upload Product Images (min: 3, max: 5)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className="file-input"
            />
            {formik.errors.images && (
              <p className="text-red-500">{formik.errors.images}</p>
            )}
          </div>
        </div>

        <div className="flex gap-x-10 mt-10">
  {formik.values.images.map((image, index) => {

    const imageURL = URL.createObjectURL(image)

    return (
      <div
        key={index}
        className="w-32 h-32 shadow shadow-black/40 relative"
      >
        <img
          src={imageURL}
          alt={`Product image ${index + 1}`}
          className="w-full h-full object-cover"
        />
        <img
          className="hover:scale-110 w-7 h-7 absolute -top-3 -right-3"
          onClick={(e) => {
            e.stopPropagation();
            removeImage(index);
          }} 
          src="https://img.icons8.com/?size=100&id=faXHmzlIKEVi&format=png&color=000000"
        />
        <img
          src="https://img.icons8.com/?size=100&id=pLN47yX6z9KR&format=png&color=000000"
          className=" w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 "
          onClick={() => openCropper(image, index)}
        />
      </div>
    );
  })}
</div>

         {/* Show Cropper */}
         {showCropper && (
          <div className="fixed -top-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-md shadow-md">
              <Cropper
                ref={cropperRef}
                src={URL.createObjectURL(currentImage)}
                style={{ width: "100%", height: "400px" }}
                aspectRatio={1}
                guides={false}
              />
              <button
                onClick={handleCrop}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Crop Image
              </button>
              <button
                onClick={() => setShowCropper(false)}
                className="mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="button" disabled={loading}>
  {loading ? <BtnLoader/> : 'Add Product'}
</button>

      </form>
    </div>
  );
};

export default AddProducts;
