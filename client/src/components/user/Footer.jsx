import React from 'react'
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
<div className="bg-gray-800 h-auto md:h-[600px] flex flex-col md:flex-row justify-center items-center overflow-hidden">
<div className="bg-gray-800 p-6 md:p-10 mt-6 md:mt-12 w-full max-w-[1200px]">
  {/* Logo Section */}
  <div className="flex h4 gap-x-4 items-center mb-4 tracking-widest">
  <img src="/public/logo.png" className="w-12 h-12 " />    
  <h1 className="text-5xl text-white">
   gym rats
  </h1>
      </div>
  

  <hr className="border-gray-500" />

  <footer className="text-gray-400 pop tracking-widest">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-10 tracking-widest ">
      <div>
        <p className="text-xl font-semibold mb-4 text-white uppercase">Company</p>
        <ul className="space-y-2">
          <li>About Us</li>
          <li>Careers</li>
          <li>Our Story</li>
          <li>Investors</li>
          <li>Suppliers</li>
        </ul>
      </div>

      <div>
        <p className="text-xl font-semibold mb-4 text-white uppercase ">Communities</p>
        <ul className="space-y-2">
          <li>For Fitness Enthusiasts</li>
          <li>Fitness Trainers</li>
          <li>Partners</li>
          <li>Investors</li>
          <li>Suppliers</li>
        </ul>
      </div>

      <div>
        <p className="text-xl font-semibold mb-4 text-white uppercase">Useful links</p>
        <ul className="space-y-2">
          <li>Support</li>
          <li>Free Mobile App</li>
        </ul>
      </div>

      <div>
        <p className=" text-xl font-semibold mb-4 text-white uppercase">GYMRATS Plans</p>
        <ul className="space-y-2">
          <li>Premium Membership</li>
          <li>Group Training</li>
          <li>Family Plans</li>
          <li>Student Discounts</li>
          <li>Free Membership</li>
        </ul>
      </div>
    </div>

    <hr className="border-gray-500 mt-8" />

    <div className="privacy-icons flex flex-col md:flex-row items-center justify-between mt-6 md:mt-12 text-center md:text-left">
      <div className="flex space-x-4">
        <button>
          <FaInstagram className="w-8 h-8 md:w-10 md:h-10 text-white hover:text-orange-500" />
        </button>
        <button>
          <FaTwitter className="w-8 h-8 md:w-10 md:h-10 text-white hover:text-orange-500" />
        </button>
        <button>
          <FaFacebook className="w-8 h-8 md:w-10 md:h-10 text-white hover:text-orange-500" />
        </button>
      </div>
      <p className="mt-4 md:mt-0 text-white">© 2024 GYM RATS. All rights reserved</p>
    </div>
  </footer>
</div>
</div>
  )
}

export default Footer