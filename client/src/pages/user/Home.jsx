import React, { useEffect, useState } from "react";
import Card from "../../components/user/Card";
import { GoSearch } from "react-icons/go";
import { fetchBanners, fetchBrands } from "../../API/user/home.js";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const Home = () => {
  const products = [
    {
      _id: "6784c4ea212627c004ca8a26",
      name: "pTron Bassbuds Viper in Ear TWS Earbuds",
      price: 2000,
      description:
        "TWS Earbuds with AptSense 40ms Low Latency Mobile Gaming | Immersive Stereo Sound Quality with Deep Bass | 32Hrs Total Playtime with the Charging Case | Ergo-fit Bluetooth Earphones with Touch Controls. HD Mic with TruTalk ENC (Environmental Noise Cancellation) for Enhanced Voice Calls | Ultra Low-Latency Game & Music Modes for Mobile Entertainment | BT v5.3 with 1-Step Pairing & 10m Stable Wireless Connect",
      stock: 2000,
      status: true,
      category: "67655698ef5a0933139c0913",
      brand: "67804997f2c3c401aefe58e9",
      popularity: 351,
      imageUrls: [
        "https://assets.ajio.com/medias/sys_master/root/20241128/4ggq/67483172c148fa1b30f29cb0/-473Wx593H-700817714-greymelange-MODEL.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/jhjc09uty87l7wozsvcd.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20240930/KBlE/66fac4b3260f9c41e845c4a1/-473Wx593H-700517025-greymelange-MODEL4.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/owxwqvnrr3jj5ntdmqj1.jpg",
      ],
      createdAt: 1734696814635,
      updatedAt: 1736694871763,
      __v: 0,
    },
    {
      _id: "6784c4ea212627c004ca8a26",
      name: "pTron Bassbuds Viper in Ear TWS Earbuds",
      price: 1800,
      orginalPrice: 2000,
      description:
        "TWS Earbuds with AptSense 40ms Low Latency Mobile Gaming | Immersive Stereo Sound Quality with Deep Bass | 32Hrs Total Playtime with the Charging Case | Ergo-fit Bluetooth Earphones with Touch Controls. HD Mic with TruTalk ENC (Environmental Noise Cancellation) for Enhanced Voice Calls | Ultra Low-Latency Game & Music Modes for Mobile Entertainment | BT v5.3 with 1-Step Pairing & 10m Stable Wireless Connect",
      stock: 2000,
      status: true,
      category: "67655698ef5a0933139c0913",
      brand: "67804997f2c3c401aefe58e9",
      popularity: 351,
      imageUrls: [
        "https://assets.ajio.com/medias/sys_master/root/20241128/4ggq/67483172c148fa1b30f29cb0/-473Wx593H-700817714-greymelange-MODEL.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/jhjc09uty87l7wozsvcd.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20240930/KBlE/66fac4b3260f9c41e845c4a1/-473Wx593H-700517025-greymelange-MODEL4.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/owxwqvnrr3jj5ntdmqj1.jpg",
      ],
      createdAt: 1734696814635,
      updatedAt: 1736694871763,
      __v: 0,
    },
    {
      _id: "6784c4ea212627c004ca8a26",
      name: "pTron Bassbuds Viper in Ear TWS Earbuds",
      price: 2000,
      description:
        "TWS Earbuds with AptSense 40ms Low Latency Mobile Gaming | Immersive Stereo Sound Quality with Deep Bass | 32Hrs Total Playtime with the Charging Case | Ergo-fit Bluetooth Earphones with Touch Controls. HD Mic with TruTalk ENC (Environmental Noise Cancellation) for Enhanced Voice Calls | Ultra Low-Latency Game & Music Modes for Mobile Entertainment | BT v5.3 with 1-Step Pairing & 10m Stable Wireless Connect",
      stock: 2000,
      status: true,
      category: "67655698ef5a0933139c0913",
      brand: "67804997f2c3c401aefe58e9",
      popularity: 351,
      imageUrls: [
        "https://assets.ajio.com/medias/sys_master/root/20241128/4ggq/67483172c148fa1b30f29cb0/-473Wx593H-700817714-greymelange-MODEL.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/jhjc09uty87l7wozsvcd.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20240930/KBlE/66fac4b3260f9c41e845c4a1/-473Wx593H-700517025-greymelange-MODEL4.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/owxwqvnrr3jj5ntdmqj1.jpg",
      ],
      createdAt: 1734696814635,
      updatedAt: 1736694871763,
      __v: 0,
    },
    {
      _id: "6784c4ea212627c004ca8a26",
      name: "pTron Bassbuds Viper in Ear TWS Earbuds",
      price: 2000,
      description:
        "TWS Earbuds with AptSense 40ms Low Latency Mobile Gaming | Immersive Stereo Sound Quality with Deep Bass | 32Hrs Total Playtime with the Charging Case | Ergo-fit Bluetooth Earphones with Touch Controls. HD Mic with TruTalk ENC (Environmental Noise Cancellation) for Enhanced Voice Calls | Ultra Low-Latency Game & Music Modes for Mobile Entertainment | BT v5.3 with 1-Step Pairing & 10m Stable Wireless Connect",
      stock: 2000,
      status: true,
      category: "67655698ef5a0933139c0913",
      brand: "67804997f2c3c401aefe58e9",
      popularity: 351,
      imageUrls: [
        "https://assets.ajio.com/medias/sys_master/root/20241128/4ggq/67483172c148fa1b30f29cb0/-473Wx593H-700817714-greymelange-MODEL.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/jhjc09uty87l7wozsvcd.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20240930/KBlE/66fac4b3260f9c41e845c4a1/-473Wx593H-700517025-greymelange-MODEL4.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/owxwqvnrr3jj5ntdmqj1.jpg",
      ],
      createdAt: 1734696814635,
      updatedAt: 1736694871763,
      __v: 0,
    },
    {
      _id: "6784c4ea212627c004ca8a26",
      name: "pTron Bassbuds Viper in Ear TWS Earbuds",
      price: 2000,
      description:
        "TWS Earbuds with AptSense 40ms Low Latency Mobile Gaming | Immersive Stereo Sound Quality with Deep Bass | 32Hrs Total Playtime with the Charging Case | Ergo-fit Bluetooth Earphones with Touch Controls. HD Mic with TruTalk ENC (Environmental Noise Cancellation) for Enhanced Voice Calls | Ultra Low-Latency Game & Music Modes for Mobile Entertainment | BT v5.3 with 1-Step Pairing & 10m Stable Wireless Connect",
      stock: 2000,
      status: true,
      category: "67655698ef5a0933139c0913",
      brand: "67804997f2c3c401aefe58e9",
      popularity: 351,
      imageUrls: [
        "https://assets.ajio.com/medias/sys_master/root/20241128/4ggq/67483172c148fa1b30f29cb0/-473Wx593H-700817714-greymelange-MODEL.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/jhjc09uty87l7wozsvcd.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20240930/KBlE/66fac4b3260f9c41e845c4a1/-473Wx593H-700517025-greymelange-MODEL4.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/owxwqvnrr3jj5ntdmqj1.jpg",
      ],
      createdAt: 1734696814635,
      updatedAt: 1736694871763,
      __v: 0,
    },
    {
      _id: "6784c4ea212627c004ca8a26",
      name: "pTron Bassbuds Viper in Ear TWS Earbuds",
      price: 2000,
      description:
        "TWS Earbuds with AptSense 40ms Low Latency Mobile Gaming | Immersive Stereo Sound Quality with Deep Bass | 32Hrs Total Playtime with the Charging Case | Ergo-fit Bluetooth Earphones with Touch Controls. HD Mic with TruTalk ENC (Environmental Noise Cancellation) for Enhanced Voice Calls | Ultra Low-Latency Game & Music Modes for Mobile Entertainment | BT v5.3 with 1-Step Pairing & 10m Stable Wireless Connect",
      stock: 2000,
      status: true,
      category: "67655698ef5a0933139c0913",
      brand: "67804997f2c3c401aefe58e9",
      popularity: 351,
      imageUrls: [
        "https://assets.ajio.com/medias/sys_master/root/20241128/4ggq/67483172c148fa1b30f29cb0/-473Wx593H-700817714-greymelange-MODEL.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/jhjc09uty87l7wozsvcd.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20240930/KBlE/66fac4b3260f9c41e845c4a1/-473Wx593H-700517025-greymelange-MODEL4.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/owxwqvnrr3jj5ntdmqj1.jpg",
      ],
      createdAt: 1734696814635,
      updatedAt: 1736694871763,
      __v: 0,
    },
    {
      _id: "6784c4ea212627c004ca8a26",
      name: "pTron Bassbuds Viper in Ear TWS Earbuds",
      price: 2000,
      description:
        "TWS Earbuds with AptSense 40ms Low Latency Mobile Gaming | Immersive Stereo Sound Quality with Deep Bass | 32Hrs Total Playtime with the Charging Case | Ergo-fit Bluetooth Earphones with Touch Controls. HD Mic with TruTalk ENC (Environmental Noise Cancellation) for Enhanced Voice Calls | Ultra Low-Latency Game & Music Modes for Mobile Entertainment | BT v5.3 with 1-Step Pairing & 10m Stable Wireless Connect",
      stock: 2000,
      status: true,
      category: "67655698ef5a0933139c0913",
      brand: "67804997f2c3c401aefe58e9",
      popularity: 351,
      imageUrls: [
        "https://assets.ajio.com/medias/sys_master/root/20241128/4ggq/67483172c148fa1b30f29cb0/-473Wx593H-700817714-greymelange-MODEL.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/jhjc09uty87l7wozsvcd.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20240930/KBlE/66fac4b3260f9c41e845c4a1/-473Wx593H-700517025-greymelange-MODEL4.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/owxwqvnrr3jj5ntdmqj1.jpg",
      ],
      createdAt: 1734696814635,
      updatedAt: 1736694871763,
      __v: 0,
    },
    {
      _id: "6784c4ea212627c004ca8a26",
      name: "pTron Bassbuds Viper in Ear TWS Earbuds",
      price: 2000,
      description:
        "TWS Earbuds with AptSense 40ms Low Latency Mobile Gaming | Immersive Stereo Sound Quality with Deep Bass | 32Hrs Total Playtime with the Charging Case | Ergo-fit Bluetooth Earphones with Touch Controls. HD Mic with TruTalk ENC (Environmental Noise Cancellation) for Enhanced Voice Calls | Ultra Low-Latency Game & Music Modes for Mobile Entertainment | BT v5.3 with 1-Step Pairing & 10m Stable Wireless Connect",
      stock: 2000,
      status: true,
      category: "67655698ef5a0933139c0913",
      brand: "67804997f2c3c401aefe58e9",
      popularity: 351,
      imageUrls: [
        "https://assets.ajio.com/medias/sys_master/root/20241128/4ggq/67483172c148fa1b30f29cb0/-473Wx593H-700817714-greymelange-MODEL.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/jhjc09uty87l7wozsvcd.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20240930/KBlE/66fac4b3260f9c41e845c4a1/-473Wx593H-700517025-greymelange-MODEL4.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/owxwqvnrr3jj5ntdmqj1.jpg",
      ],
      createdAt: 1734696814635,
      updatedAt: 1736694871763,
      __v: 0,
    },
    {
      _id: "6784c4ea212627c004ca8a26",
      name: "pTron Bassbuds Viper in Ear TWS Earbuds",
      price: 2000,
      description:
        "TWS Earbuds with AptSense 40ms Low Latency Mobile Gaming | Immersive Stereo Sound Quality with Deep Bass | 32Hrs Total Playtime with the Charging Case | Ergo-fit Bluetooth Earphones with Touch Controls. HD Mic with TruTalk ENC (Environmental Noise Cancellation) for Enhanced Voice Calls | Ultra Low-Latency Game & Music Modes for Mobile Entertainment | BT v5.3 with 1-Step Pairing & 10m Stable Wireless Connect",
      stock: 2000,
      status: true,
      category: "67655698ef5a0933139c0913",
      brand: "67804997f2c3c401aefe58e9",
      popularity: 351,
      imageUrls: [
        "https://assets.ajio.com/medias/sys_master/root/20241128/4ggq/67483172c148fa1b30f29cb0/-473Wx593H-700817714-greymelange-MODEL.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/jhjc09uty87l7wozsvcd.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20240930/KBlE/66fac4b3260f9c41e845c4a1/-473Wx593H-700517025-greymelange-MODEL4.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/owxwqvnrr3jj5ntdmqj1.jpg",
      ],
      createdAt: 1734696814635,
      updatedAt: 1736694871763,
      __v: 0,
    },
    {
      _id: "6784c4ea212627c004ca8a26",
      name: "pTron Bassbuds Viper in Ear TWS Earbuds",
      price: 2000,
      description:
        "TWS Earbuds with AptSense 40ms Low Latency Mobile Gaming | Immersive Stereo Sound Quality with Deep Bass | 32Hrs Total Playtime with the Charging Case | Ergo-fit Bluetooth Earphones with Touch Controls. HD Mic with TruTalk ENC (Environmental Noise Cancellation) for Enhanced Voice Calls | Ultra Low-Latency Game & Music Modes for Mobile Entertainment | BT v5.3 with 1-Step Pairing & 10m Stable Wireless Connect",
      stock: 2000,
      status: true,
      category: "67655698ef5a0933139c0913",
      brand: "67804997f2c3c401aefe58e9",
      popularity: 351,
      imageUrls: [
        "https://assets.ajio.com/medias/sys_master/root/20241128/4ggq/67483172c148fa1b30f29cb0/-473Wx593H-700817714-greymelange-MODEL.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/jhjc09uty87l7wozsvcd.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20240930/KBlE/66fac4b3260f9c41e845c4a1/-473Wx593H-700517025-greymelange-MODEL4.jpg",
        "https://res.cloudinary.com/dhcjyofjl/image/upload/v1736493310/owxwqvnrr3jj5ntdmqj1.jpg",
      ],
      createdAt: 1734696814635,
      updatedAt: 1736694871763,
      __v: 0,
    },
  ];

  const catergories = [
    {
      imageUrl:
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/6e8f3e35-03fa-45f9-9922-b0480e9f8d9b.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
      name: "Headphones",
    },
    {
      imageUrl:
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/6e8f3e35-03fa-45f9-9922-b0480e9f8d9b.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
      name: "Headphones",
    },
    {
      imageUrl:
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/6e8f3e35-03fa-45f9-9922-b0480e9f8d9b.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
      name: "Headphones",
    },
    {
      imageUrl:
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/6e8f3e35-03fa-45f9-9922-b0480e9f8d9b.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
      name: "Headphones",
    },
    {
      imageUrl:
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/6e8f3e35-03fa-45f9-9922-b0480e9f8d9b.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
      name: "Headphones",
    },
    {
      imageUrl:
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/6e8f3e35-03fa-45f9-9922-b0480e9f8d9b.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
      name: "Headphones",
    },
    {
      imageUrl:
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/6e8f3e35-03fa-45f9-9922-b0480e9f8d9b.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
      name: "Headphones",
    },
  ];

  const[banners,setBanners]=useState([])
  const[brands,setBrands]=useState([])

  const loadBanners=async()=>{
    await fetchBanners(setBanners)
  }
  const loadBrands=async()=>{
    await fetchBrands(setBrands)
  }

  useEffect(()=>{
    loadBanners()
    loadBrands()
  },[])
  
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
    fade:true
  };

  return (
    <div className="h-full w-full">
     {/* BANNER */}
     <div className="w-full overflow-hidden relative">
     {
  banners.length > 0
    ? (
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={`${banner._id}-${index}`} className="min-w-full h-[60vh]">
            <img src={banner?.imageUrl} className="w-full h-full object-cover" />
          </div>
        ))}
      </Slider>
    )
    : <h1>No banners found</h1>
}

    </div>
      {/* BRANDS */}
      <div className="w-full px-2 md:px-12  my-9 md:my-12 ">
        <h1 className="header mb-3  md:mb-5">Top Brands</h1>

        <div className="marquee justify-evenly h-[18vh] md:h-[30vh] flex items-center z-10 ">
          <div>
            <span className="flex justify-evenly items-center h-full gap-x-4">
              <img
                className="w-40"
                src="https://www.meritshot.com/wp-content/uploads/2024/04/Hm-banner1.png"
                alt=""
              />
              <img
                className="w-40"
                src="https://www.meritshot.com/wp-content/uploads/2024/04/Hm-banner1.png"
                alt=""
              />
              <img
                className="w-40"
                src="https://www.meritshot.com/wp-content/uploads/2024/04/Hm-banner1.png"
                alt=""
              />
              <img
                className="w-40"
                src="https://www.meritshot.com/wp-content/uploads/2024/04/Hm-banner1.png"
                alt=""
              />
              <img
                className="w-40"
                src="https://www.meritshot.com/wp-content/uploads/2024/04/Hm-banner1.png"
                alt=""
              />
            </span>
            <span className="hidden md:flex justify-evenly items-center h-full">
              <img
                className="w-40"
                src="https://www.meritshot.com/wp-content/uploads/2024/04/Hm-banner1.png"
                alt=""
              />
              <img
                className="w-40"
                src="https://www.meritshot.com/wp-content/uploads/2024/04/Hm-banner1.png"
                alt=""
              />
              <img
                className="w-40"
                src="https://www.meritshot.com/wp-content/uploads/2024/04/Hm-banner1.png"
                alt=""
              />
              <img
                className="w-40"
                src="https://www.meritshot.com/wp-content/uploads/2024/04/Hm-banner1.png"
                alt=""
              />
              <img
                className="w-40"
                src="https://www.meritshot.com/wp-content/uploads/2024/04/Hm-banner1.png"
                alt=""
              />
            </span>
          </div>
        </div>
      </div>

      {/* POPULAR PRODUCTS */}
      <div className="w-full px-2 md:px-12 my-16">
        <h1 className="header mb-3  md:mb-5 ">Popular products</h1>
        <div className="flex gap-x-10 w-full overflow-x-auto scrollbar-none py-6">
          {products.map((product) => {
            return <Card key={product?._id} product={product} />;
          })}
        </div>
      </div>

       {/* POPULAR CATEGORIES */}
       <div className="w-full px-2 md:px-12 my-16">
        <h1 className="header mb-3  md:mb-5 ">Popular products</h1>
        <div className="flex gap-x-10 w-full overflow-x-auto scrollbar-none py-6">
          {catergories.map((category,index) =>
          (
            <div key={index} className="min-w-[360px] h-[200px] rounded-xl overflow-hidden hover:scale-105 duration-500 shadow" >
            <img src={category?.imageUrl} className="w-full h-full object-center" />
          </div>
          )
          )}
        </div>
      </div>

      {/* CAROSEL */}
      <div className="bg-[#e3fff2] flex items-center justify-between w-[97%] h-[400px] rounded-3xl mx-auto px-2 md:px-12 my-16">
       <div className="flex flex-col justify-around h-full">
       <div >
          <h2 className="pop text-4xl md:text-5xl font-semibold text-gray-800 leading-normal">Stay home & get your daily
needs from our shop
</h2>
<p className="text-gray-500 pop md:text-2xl mt-3">Start You'r Daily Shopping with Nest Mart</p>
        </div>
        <div className="flex">
          <input className="w-full md:w-2/3 placeholder:text-lg p-2 md:p-4 rounded-s-full px-8 pop" type="text" placeholder="Your Email Address" />
        <div className="bg-gray-500 w-[70px] rounded-e-full flex justify-center items-center ">
        <GoSearch className="w-8 h-8 text-gray-100" />
        </div></div>
       </div>

        <img className="hidden md:block w-[400px] object-contain" src="https://ecommerce-fullstack-web-app.netlify.app/static/media/newsletter.5931358dd220a40019fc.png" alt="" />
      </div>

    </div>
  );
};

export default Home;
