import React, { useEffect, useState } from "react";
import { fetchUserCart, fetchUserWishlist } from "../../API/user/comman";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../helpers/toast";

const Wishlist = () => {
  const [wishlists, setWishlists] = useState([]);
  const [cart, setCart] = useState(null);
  const [added, setAdded] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userId = currentUser?._id;

  const loadWishlist = async () => {
    await fetchUserWishlist(userId, setWishlists);
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
  };

  useEffect(() => {
    loadWishlist();
    loadCart();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const payload = {
        userId: currentUser?._id,
        productId: productId,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/add_to_cart`,
        payload
      );

      if (res.status === 200) {
        setAdded((prev) => ({ ...prev, [productId]: true }));
        showToast("Products added to cart!", "light", "success");
      } else {
        console.error("Failed to add product to cart:", res.data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const payload = {
        userId: currentUser?._id,
        productId,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/remove_wishlist_product`,
        payload
      );
      if (res.status === 200) {
        showToast(res?.data?.message, "light", "success");
        loadWishlist();
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  const findMaxStock = (productId) => {
    const cartProduct = cart?.products.find(
      (product) => product.productId === productId
    );
    return cartProduct ? cartProduct.quantity : 0;
  };

  return (
    <div className="container p-5">
      <h1>Your Wishlists</h1>
      <div className="flex flex-wrap gap-4 mt-12">
        {wishlists && wishlists.products && wishlists.products.length > 0 ? (
          wishlists.products.map((product) => (
            <div
              key={product?._id}
              className="bg-white flex flex-col items-center h-[270px] max-w-[200px] min-w-[200px] hover:scale-105 duration-500 shadow hover:border relative"
            >
              <div className="h-[50%] w-full overflow-hidden">
                <Link to={`/shop/${product?.details?._id}`}>
                  <img
                    className="w-full h-full object-contain p-4 hover:scale-105 duration-500"
                    src={product?.details?.imageUrls[0]}
                    alt={product?.details?.name}
                  />
                </Link>
              </div>
              <div className="flex flex-col w-full h-[50%] justify-between p-2">
                <p className="pop font-medium">
                  {product?.details?.name.length > 17
                    ? `${product?.details?.name.slice(0, 17)}...`
                    : product?.details?.name}
                </p>

                {product?.details?.offerDetails ? (
                  <div className="flex pop justify-center gap-x-6 items-center">
                    <p className="text-lg font-semibold text-green-600">
                      ₹{" "}
                      {product?.details?.price -
                        product?.details?.price *
                          (product?.details?.offerDetails?.discount / 100)}
                    </p>
                    <p className="text-gray-500 line-through font-medium">
                      ₹ {product?.details?.price}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-green-600">
                    ₹ {product?.details?.price}
                  </p>
                )}

                <div>
                  {product.details?.stock <= 2 ||
                  findMaxStock(product.productId) >= 5 ||
                  product.details?.stock - findMaxStock(product.productId) <=
                    2 ? (
                    <button
                      className={
                        product.details?.stock <= 2
                          ? "bg-red-700 w-full justify-center shadow cursor-pointer duration-500 rounded-lg text-white text-xs px-2 py-2 sm:text-sm tracking-widest sm:px-3 sm:py-2 flex items-center sm:gap-x-2"
                          : findMaxStock(product.productId) >= 5 ||
                            findMaxStock(product.productId) - product.details?.stock <=
                              2
                          ? "bg-[#e3c114] w-full justify-center shadow cursor-pointer duration-500 rounded-lg text-white text-xs px-2 py-2 sm:text-sm tracking-widest sm:px-3 sm:py-2 flex items-center sm:gap-x-2"
                          : "bg-green-700 w-full justify-center shadow cursor-pointer duration-500 rounded-lg text-white text-xs px-2 py-2 sm:text-sm tracking-widest sm:px-3 sm:py-2 flex items-center sm:gap-x-2"
                      }
                    >
                      <img
                        src="https://img.icons8.com/?size=100&id=MexKOWjN2DR1&format=png&color=000000"
                        className="w-6"
                        alt="Out of stock icon"
                      />
                      <p className="h1 font-medium tracking-widest">
                        {product.details?.stock <= 2
                          ? "Out of Stock"
                          : findMaxStock(product.productId) >= 5 ||
                            findMaxStock(product.productId) - product.details?.stock <=
                              2
                          ? "Limit Reached"
                          : "In Stock"}
                      </p>
                    </button>
                  ) : added[product.productId] ? (
                    <button
                      onClick={() => navigate("/cart")}
                      className=" bg-green-500 w-full justify-center shadow cursor-pointer duration-500 rounded-lg text-white text-xs px-2 py-2 sm:text-sm tracking-widest sm:px-3 sm:py-2 flex items-center sm:gap-x-2 hover:scale-105"
                    >
                      <img
                        className="w-8"
                        src="https://img.icons8.com/?size=100&id=pMGoyzVDvHJe&format=png&color=000000"
                        alt=""
                      />
                      <p className="h1 text-lg tracking-widest">Go to cart</p>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product.productId)}
                      className="bg-black w-full justify-center shadow cursor-pointer duration-500 rounded-lg text-white text-xs px-2 py-2 sm:text-sm tracking-widest sm:px-3 sm:py-2 flex items-center sm:gap-x-2 hover:scale-105 "
                    >
                      <img
                        className="w-8"
                        src="https://img.icons8.com/?size=100&id=UUgYZvYwoZrF&format=png&color=000000"
                        alt=""
                      />
                      <p className="h1 text-lg tracking-widest">Add to cart</p>
                    </button>
                  )}
                </div>
              </div>

              <img
                onClick={() => handleRemoveProduct(product?.productId)}
                src="https://img.icons8.com/?size=100&id=faXHmzlIKEVi&format=png&color=000000"
                className="absolute w-7 top-2 right-2 hover:scale-105 cursor-pointer"
                alt="Remove from wishlist"
              />
            </div>
          ))
        ) : (
          <div className='flex justify-center items-center flex-col w-full'>
        <img className='w-[400px]' src="https://i.pinimg.com/originals/36/c2/49/36c2497df47cc07d533760f8b5cafa66.gif
" alt="" />
        <p className='h1 text-4xl font-medium text-gray-600 tracking-wider'>wishlist is empty !</p>
        </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
