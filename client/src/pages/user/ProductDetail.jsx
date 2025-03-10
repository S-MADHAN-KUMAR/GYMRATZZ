import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdOutlineStarPurple500 ,MdOutlineStarOutline ,MdOutlineStarHalf  } from "react-icons/md";
import { fetchProductDetail } from '../../API/productDetail.js';
import { SiTicktick } from "react-icons/si";
import { CgUnavailable } from "react-icons/cg";
import { fetchUserCart, handleAddToCart } from '../../API/user/cart.js';
import { showToast } from '../../helpers/toast.js';
import { useSelector } from "react-redux";
import RelatedProducts from '../../components/user/RelatedProducts.jsx';

const ProductDetail = () => {
    const rating = 4.5
    const {id} = useParams()
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [images, setImages] = useState([])
    const [isHovered, setIsHovered] = useState(false);
    const [zoomStyle, setZoomStyle] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    const [cart, setCart] = useState(null);
    const [added, setAdded] = useState(false);
    const navigate = useNavigate()
    const userId = currentUser?._id

    const imgRef = useRef(null);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
  
    const handleMouseMove = (e) => {
      if (imgRef.current) {
        const { width, height, top, left } =
          imgRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const xPercent = (x / width) * 100;
        const yPercent = (y / height) * 100;
        setZoomStyle({ backgroundPosition: `${xPercent}% ${yPercent}%` });
      }
    };
  
    const handleImageClick = (image) => setMainImage(image);

      const loadCart = async () => {
        try {
          if (currentUser) {
            const fetchedCart = await fetchUserCart(currentUser?._id, showToast);
            setCart(fetchedCart);
          }
        } catch (err) {
          console.log(err.message || "Something went wrong.");
        }
      };
 
         useEffect(()=>{
      const loadProductDetail = async()=>{
        await fetchProductDetail(setProduct, setMainImage, setImages, id)
      }
     loadProductDetail()
     window.scrollTo(0, 0);
    },[id])

    const findMaxStock = (productId) => {
      const cartProduct = cart?.products.find(
        (product) => product.productId === productId
      );
      return cartProduct ? cartProduct.quantity : 0;
    };
  
    const stockStatus =
      product?.stock <= 2 ||
      product?.stock === 1 ||
      findMaxStock(product?._id) >= 5 ||
      product?.stock - findMaxStock(product?._id) <= 2;

    

  return (
   <div>
     <div className='md:h-[90vh] w-full flex flex-col md:flex-row justify-between items-center'>

<div className="flex md:flex-row flex-col-reverse h-[60vh] md:h-[80vh] md:p-5 md:w-6/12 w-full">
  {/* SIDE IMAGES */}
  <div className="flex md:flex-col justify-around h-[12vh] md:h-full p-2 md:p-4">
         {images.map((image, index) => (
           <div
             key={index}
             className="md:w-20 h-12 w-12 md:h-20 cursor-pointer"
           >
             <img
               src={image}
               alt={`image-${index}`}
               className={`w-full h-full object-cover ${
                 mainImage === image ? "border-gray-300 border-2" : ""
               }`}
               onClick={() => handleImageClick(image)}
             />
           </div>
         ))}
       </div>
   
   {/* MAIN IMAGE*/}
   <div
     className=" md:w-full p-5 overflow-hidden cursor-crosshair relative h-[48vh] md:h-full "
     onMouseEnter={handleMouseEnter}
     onMouseLeave={handleMouseLeave}
     onMouseMove={handleMouseMove}
   >
     <img
       src={mainImage}
       alt="Zoomable"
       ref={imgRef}
       className="w-full h-full object-contain"
       style={{
         transition: "transform 0.3s ease",
         transform: isHovered ? "scale(1.5)" : "scale(1)",
         transformOrigin: "center center",
       }}
     />
     {isHovered && (
       <div
         className="absolute top-0 left-0 w-full h-full"
         style={{
           backgroundImage: `url(${mainImage})`,
           backgroundSize: "200%",
           backgroundRepeat: "no-repeat",
           backgroundPosition: zoomStyle.backgroundPosition,
           pointerEvents: "none",
         }}
       />
     )}
   </div>
</div>
     
 <div className="flex flex-col justify-between h-[120vh] md:h-[80vh] p-2 md:p-5 w-full md:w-6/12">
 <p className='pop text-2xl md:text-4xl font-medium text-gray-800'>{product?.name}</p>
 <div className="flex gap-x-3 items-center">

     <div className="flex gap-x-1  ">
   {Array(5)
 .fill(0)
 .map((_, index) => {
   const isFull = index < Math.floor(rating)
   const isHalf = index === Math.floor(rating) && rating % 1 >= 0.5
   const isEmpty = index >= Math.ceil(rating)

   return (
     <span key={index}>
       {isFull && <MdOutlineStarPurple500 className="text-[#faaf00]" />}
       {isHalf && <MdOutlineStarOutline className="text-[#faaf00]" />}
       {isEmpty && <MdOutlineStarHalf className="text-[#faaf00]" />}
     </span>
   );
 })}
   </div>

   <p className='md:text-base text-xs pop font-medium'>4.5 Rating</p>
 </div>
 {
     product?.productDetails ?
     <div className="flex pop gap-x-6 items-center">
 <p className='text-4xl font-semibold text-green-600'>₹ {product?.price - (product?.price * (product?.productDetails?.discount / 100))}</p>
 <p className='text-gray-400 text-2xl line-through font-medium'>₹ {product?.price}</p>
 </div>
 :
 <p className='text-4xl font-semibold text-green-600'>₹ {product?.price}</p>
 }
 {
     product?.stock > 2 
     ?
    <div className="text-green-600 flex gap-x-2 text-lg items-center pop font-medium ">
     <SiTicktick className='w-6 h-6 '/>
     <p>In Stock</p>
    </div>
     :
     <div className="text-red-600 flex gap-x-2 text-lg items-center pop font-medium ">
     <CgUnavailable className='w-6 h-6'/>
     <p>Out Of Stock</p>
     </div>
 }
 {/* ADD TO CART BTN */}

          {stockStatus ? (
            <button
              className={
                product.stock <= 2
                  ? "bg-red-700 rounded text-white w-fit px-8 py-3 "
                  : findMaxStock(product._id) >= 5 ||
                    product.stock - findMaxStock(product._id) <= 2
                  ? "bg-[#e3c114] rounded text-white w-fit px-8 py-3"
                  : "bg-green-700 rounded text-white w-fit px-8 py-3"
              }
            >
              <p  className="pop uppercase text-xl font-semibold tracking-wider">
                {product.stock <= 2
                  ? "Out of Stock"
                  : findMaxStock(product._id) >= 5 ||
                    product.stock - findMaxStock(product._id) <= 2
                  ? "Limit Reached"
                  : "In Stock"}
              </p>
            </button>
          ) : added ? (
            <button
              onClick={() => navigate("/cart")}
              className="bg-green-600 rounded text-white w-fit px-8 py-3"
            >
              <p className="pop uppercase text-xl font-semibold tracking-wider">Go to cart</p>
            </button>
          ) : (
            <button
              onClick={()=>handleAddToCart(userId,product?._id,setAdded)}
              className="bg-black rounded text-white w-fit px-8 py-3 "
            >
                  <p className="pop uppercase text-xl font-semibold tracking-wider">Add to cart</p>
            </button>
          )}


 <div >
     <p className='text-gray-800 pop font-medium text-sm mb-1'>About product</p>
    <p className="flex flex-col pop text-xs tracking-wider text-gray-600 font-medium">
    {
         product?.description
     }
    </p>
    
 </div>

 <hr />

 <div className="flex flex-col pop text-xs tracking-wider font-medium text-gray-500">
     <p>100% Original product.</p>
     <p>{`Cash on delivery is ${product?.price <= 1000 ? "available" : "not available"} on this product.`}</p>
     <p>Easy return and exchange policy within 7 days.</p>
 </div>
 </div>
 </div>
 <RelatedProducts id={id}/>
   </div>
  )
}

export default ProductDetail
