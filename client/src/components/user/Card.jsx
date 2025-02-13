import React, { useEffect, useState } from "react";
import {
  MdOutlineStarPurple500,
  MdOutlineStarOutline,
  MdOutlineStarHalf,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../../helpers/toast";
import { fetchCurrentUser } from "../../API/user/comman";
import { fetchUserCart, handleAddToCart } from "../../API/user/cart";
import { handleAddWishlist } from "../../API/user/wishlistAPI";

const Card = ({ product }) => {
  const [user, setUser] = useState(null);
  const [added, setAdded] = useState({});
  const [cart, setCart] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const userId = currentUser?._id

  const loadUser = async () => {
    const fetchUserData = await fetchCurrentUser(currentUser?._id);
    setUser(fetchUserData);
  };

  const loadCart = async () => {
    try {
      if (currentUser) {
        const fetchedCart = await fetchUserCart(currentUser?._id, showToast);
        setCart(fetchedCart);
      }
    } catch (err) {
      console.log(err.message || "Something went wrong.");
    }
  }
  useEffect(() => {
    loadUser();
  }, [product, user]);


  const isInWishlist = user?.wishlist?.some(
    (item) => item.productId === product?._id
  );

  const rating = product?.rating || 4.5;

  const findMaxStock = (productId) => {
    const cartProduct = cart?.products.find(
      (product) => product.productId === productId
    );
    return cartProduct ? cartProduct.quantity : 0;
  };

  const stockStatus =
    product.stock <= 2 ||
    product.stock === 1 ||
    findMaxStock(product._id) >= 5 ||
    product.stock - findMaxStock(product._id) <= 2;

  return (
    <div className="bg-white flex flex-col items-center h-[270px] max-w-[200px] min-w-[200px] hover:scale-105 duration-500 shadow hover:border relative">
      <div className="h-[50%] p-2 w-full overflow-hidden">
  
         <img
            className="w-full h-full object-contain p-4 hover:scale-105 duration-500"
            src={product?.imageUrls[0]}
            alt={product?.name}
           onClick(()=>navigate(`/shop/${product?._id}`))
          />
    
      </div>
      <div className="flex flex-col w-full h-[50%] justify-between p-2">
        <p className="pop font-medium">
          {product?.name.length > 17
            ? `${product?.name.slice(0, 17)}...`
            : product?.name}
        </p>
        <div className="flex gap-x-3">
          <div className="flex gap-x-1">
            {Array(5)
              .fill(0)
              .map((_, index) => {
                const isFull = index < Math.floor(rating);
                const isHalf =
                  index === Math.floor(rating) && rating % 1 >= 0.5;
                const isEmpty = index >= Math.ceil(rating);

                return (
                  <span key={index}>
                    {isFull && (
                      <MdOutlineStarPurple500 className="text-[#faaf00]" />
                    )}
                    {isHalf && (
                      <MdOutlineStarOutline className="text-[#faaf00]" />
                    )}
                    {isEmpty && (
                      <MdOutlineStarHalf className="text-[#faaf00]" />
                    )}
                  </span>
                );
              })}
          </div>
          <p className="text-xs pop font-medium">4.5 Rating</p>
        </div>

        {product.productDetails ? (
          <div className="flex pop justify-center gap-x-6 items-center">
            <p className="text-lg font-semibold text-green-600">
              ₹{" "}
              {product?.price -
                product?.price * (product?.productDetails?.discount / 100)}
            </p>
            <p className="text-gray-500 line-through font-medium">
              ₹ {product?.price}
            </p>
          </div>
        ) : (
          <p className="text-lg font-semibold text-green-600">
            ₹ {product?.price}
          </p>
        )}

        {/* ADD TO CART BTN */}
        <div className=" items-center flex justify-between ">
          <button
            onClick={()=>handleAddWishlist(userId,product?._id,navigate)}
            className={
              isInWishlist ? "w-7 h-7 cursor-not-allowed " : "w-7 h-7  "
            }
          >
            <img
              src={
                isInWishlist
                  ? "https://img.icons8.com/?size=100&id=BdjA3Y8bTxW8&format=png&color=000000"
                  : "https://img.icons8.com/?size=100&id=16076&format=png&color=000000"
              }
            />
          </button>

          {stockStatus ? (
            <button
              className={
                product.stock <= 2
                  ? "bg-red-700 rounded text-white font-Roboto text-xs px-2 py-1 sm:text-sm tracking-widest sm:px-3 sm:py-1 flex items-center sm:gap-x-2 cursor-not-allowed float-right"
                  : findMaxStock(product._id) >= 5 ||
                    product.stock - findMaxStock(product._id) <= 2
                  ? "bg-[#e3c114] rounded text-white font-Roboto text-xs px-2 py-1 sm:text-sm tracking-widest sm:px-3 sm:py-1 flex items-center sm:gap-x-2 cursor-not-allowed float-right"
                  : "bg-green-700 rounded text-white font-Roboto text-xs px-2 py-1 sm:text-sm tracking-widest sm:px-3 sm:py-1 flex items-center sm:gap-x-2 cursor-pointer float-right"
              }
            >
              <img
                src="https://img.icons8.com/?size=100&id=MexKOWjN2DR1&format=png&color=000000"
                className="w-6"
                alt="Out of stock icon"
              />
              <p className="h1 font-medium tracking-widest">
                {product.stock <= 2
                  ? "Out of Stock"
                  : findMaxStock(product._id) >= 5 ||
                    product.stock - findMaxStock(product._id) <= 2
                  ? "Limit Reached"
                  : "In Stock"}
              </p>
            </button>
          ) : added[product._id] ? (
            <button
              onClick={() => navigate("/cart")}
              className="bg-green-500 rounded text-white font-Roboto text-xs px-2 py-1 sm:text-sm tracking-widest sm:px-3 sm:py-1 flex items-center sm:gap-x-2 hover:scale-105 float-right"
            >
              <img
                src="https://img.icons8.com/?size=100&id=pMGoyzVDvHJe&format=png&color=000000"
                className="w-6"
                alt="Cart icon"
              />
              <p className="h1 font-medium tracking-widest">Go to cart</p>
            </button>
          ) : (
            <button
            onClick={()=>handleAddToCart(userId, product?._id, setAdded,navigate)}
              className="bg-black rounded text-white font-Roboto text-xs px-2 py-1 sm:text-sm tracking-widest sm:px-3 sm:py-1 flex items-center sm:gap-x-2 hover:scale-105 float-right"
            >
      
                <div className="flex items-center gap-x-2">
                  <img
                    src="https://img.icons8.com/?size=100&id=UUgYZvYwoZrF&format=png&color=000000"
                    className="w-6"
                    alt="Add to cart icon"
                  />
                  <p className="h1 font-medium tracking-widest">Add to cart</p>
                </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
