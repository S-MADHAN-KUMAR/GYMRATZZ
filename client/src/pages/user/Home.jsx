import React, { useEffect, useState } from "react";
import Card from "../../components/user/Card";
import { GoSearch } from "react-icons/go";
import { fetchBanners, fetchBrands, fetchCategories, fetchNewArrivals } from "../../API/user/home.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {

  const [banners, setBanners] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  const loadBanners = async () => {
    await fetchBanners(setBanners);
  };
  const loadBrands = async () => {
    await fetchBrands(setBrands);
  };
  const loadCategories = async () => {
    await fetchCategories(setCategories);
  };
  const loadNewArrivals = async () => {
    await fetchNewArrivals(setNewArrivals);
  };

  useEffect(() => {
    loadBanners();
    loadBrands();
    loadCategories()
    loadNewArrivals()
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <div className="h-full w-full">
      {/* BANNER */}
      <div className="w-full overflow-hidden relative">
        {banners.length > 0 ? (
          <Slider {...settings}>
            {banners.map((banner, index) => (
              <div
                key={`${banner._id}-${index}`}
                className="min-w-full h-full"
              >
                <img
                  src={banner?.imageUrl}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <h1>No banners found</h1>
        )}
      </div>
      {/* BRANDS */}
      <div className="w-full px-2 md:px-12  my-9 md:my-12 ">
        <h1 className="header mb-3  md:mb-5">Top Brands</h1>

        <div className="marquee justify-evenly h-[18vh] md:h-[30vh] flex items-center z-10 ">
          <div>
            <span className="flex justify-evenly items-center h-full gap-x-4">
              {brands.length > 0 ? (
                brands.slice(0,6).map((brand, index) => (
                  <img key={index} src={brand?.imageUrl} className="w-40 hover:scale-105 duration-500" />
                ))
              ) : (
                <h1>No brands found</h1>
              )}
            </span>
            <span className="hidden md:flex justify-evenly items-center h-full gap-x-4">
              {brands.length > 0 ? (
                brands.slice(0,6).map((brand, index) => (
                    <img key={index} src={brand?.imageUrl} className="w-40 hover:scale-105 duration-500" />
                  ))
              ) : (
                <h1>No brands found</h1>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* POPULAR PRODUCTS */}
      <div className="w-full px-2 md:px-12 my-16">
        <h1 className="header mb-3  md:mb-5 ">Popular products</h1>
        <div className="flex gap-x-10 w-full overflow-x-auto scrollbar-none py-6">
        {newArrivals.length > 0 ? (
                newArrivals.map((product) => 
                  {
                    return <Card key={product?._id} product={product} />;
                  }
                  )
              ) : (
                <h1>No popular products found</h1>
              )}
        </div>
      </div>

      {/* POPULAR CATEGORIES */}
      <div className="w-full px-2 md:px-12 my-16">
        <h1 className="header mb-3  md:mb-5 ">Popular products</h1>
        <div className="flex gap-x-10 w-full overflow-x-auto scrollbar-none py-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="min-w-[360px] h-[200px] rounded-xl overflow-hidden hover:scale-105 duration-500 shadow"
            >
              <img
                src={category?.imageUrl}
                className="w-full h-full object-center"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CAROSEL */}
      <div className="bg-[#e3fff2] flex items-center justify-between w-[97%] h-[400px] rounded-3xl mx-auto px-2 md:px-12 my-16">
        <div className="flex flex-col justify-around h-full">
          <div>
            <h2 className="pop text-4xl md:text-5xl font-semibold text-gray-800 leading-normal">
              Stay home & get your daily needs from our shop
            </h2>
            <p className="text-gray-500 pop md:text-2xl mt-3">
              Start You'r Daily Shopping with Nest Mart
            </p>
          </div>
          <div className="flex">
            <input
              className="w-full md:w-2/3 placeholder:text-lg p-2 md:p-4 rounded-s-full px-8 pop"
              type="text"
              placeholder="Your Email Address"
            />
            <div className="bg-gray-500 w-[70px] rounded-e-full flex justify-center items-center ">
              <GoSearch className="w-8 h-8 text-gray-100" />
            </div>
          </div>
        </div>

        <img
          className="hidden md:block w-[400px] object-contain"
          src="https://ecommerce-fullstack-web-app.netlify.app/static/media/newsletter.5931358dd220a40019fc.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Home;
