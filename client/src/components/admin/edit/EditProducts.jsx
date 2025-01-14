import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { addProductValidation } from "../../../validations/admin/productValidations.js";
import {
  fetchBrands,
  fetchCategories,
  fetchEditProduct,
} from "../../../API/admin/dashboardUpdate";
import axios from "axios";
import { showToast } from "../../../helpers/toast";
import { useNavigate, useParams } from "react-router-dom";

const EditProducts = () => {
    const {id}=useParams()
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const cropperRef = useRef(null);
  const [showCropper, setShowCropper] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(null);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetchEditProduct(id,setProduct)
    fetchCategories(setCategories);
    fetchBrands(setBrands);
  }, []);

  const convertToBlob = async (file) => {
    if (typeof file === "string" && file.startsWith("data:image/")) {
      const [metadata, base64Data] = file.split(",");
      const mimeType = metadata.match(/data:(image\/[a-zA-Z]+);base64/)[1];
      const binaryData = atob(base64Data);
      const arrayBuffer = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        arrayBuffer[i] = binaryData.charCodeAt(i);
      }
      return new Blob([arrayBuffer], { type: mimeType });
    } else if (typeof file === "string" && file.startsWith("http")) {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Failed to fetch image from URL: ${file}`);
      }
      return await response.blob();
    } else if (file instanceof File || file instanceof Blob) {
      return file;
    } else {
      throw new Error(`Unsupported file format: ${file}`);
    }
  };
  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || "",
      stock: product?.stock || "",
      category: product?.category || "",
      brand: product?.brand || "",
      description: product?.description || "",
      price: product?.price || "",
      images: product?.imageUrls || [],
      status: true,
    },
    validationSchema: addProductValidation,
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
  
      for (let key in values) {
        if (key === "images") {
          // Ensure all images are converted to Blob before appending
          const blobImages = await Promise.all(
            values.images.map(async (image, index) => {
              const blob = await convertToBlob(image);
              return blob;
            })
          );
    
          // Append the converted blob images to FormData
          blobImages.forEach((blob, index) => {
            formData.append("images", blob, `image-${index}`);
          });
        } else {
          formData.append(key, values[key]);
        }
      }
  
      setSubmitting(false);
  
      try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/admin/update_product/${id}`, formData )
  
        if (response.status === 200) {
          showToast("Product Updated successfully!",'light','success');
          navigate("/dashboard/products");
        }
      } catch (error) {
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
  
      cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) {
          const updatedCroppedImages = [...formik.values.images];
  
          updatedCroppedImages[imageIndex] = blob;
  
          formik.setFieldValue("images", updatedCroppedImages);
          setShowCropper(false);
        }
      }, "image/jpeg");
    }

    console.log(formik.images);
    
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
                  {cat?.name                  }
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
                  {cat?.name}
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

    const imageURL =
      typeof image === "string" ? image : URL.createObjectURL(image);

    return (
      <div
        key={index}
        className="w-32 h-32 shadow shadow-black/40 relative"
      >
        {/* Display the image */}
        <img
          src={imageURL}
          alt={`Product image ${index + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Remove Image Button */}
        <img
          className="hover:scale-110 w-7 h-7 absolute -top-3 -right-3 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            removeImage(index); // Ensure this function handles both string and file inputs
          }}
          src="https://img.icons8.com/?size=100&id=faXHmzlIKEVi&format=png&color=000000"
        />

        {/* Crop Image Button */}
        <img
          src="https://img.icons8.com/?size=100&id=pLN47yX6z9KR&format=png&color=000000"
          className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 cursor-pointer"
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
                src={currentImage}
                style={{ width: "400px", height: "400px" }}
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
        <button type="submit" className="button">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
