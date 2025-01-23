import React,{ useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { fetchCurrentUser } from "../../API/user/comman";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const token = localStorage.getItem('USER_TOKEN'); 
    const loadUser = async () => {
      const fetchUserData = await fetchCurrentUser(currentUser?._id);
      setUser(fetchUserData);
    };
  
    useEffect(() => {
      loadUser();
    }, []);

  return (
   <div className="flex flex-col items-center justify-center sticky top-0 z-50">
     <nav className='bg-white flex items-center w-full justify-around border p-2 border-gray-800  '>
        {/* LOGO */}
       <Link to={'/'}>
       <div className="flex gap-x-1">
            <img src="/logo.png" className="w-8 md:w-12" />
            <h2 className='h1 tracking-wider text-2xl md:text-5xl text-[#252126]'>GYM RATZ</h2>
        </div>
       </Link>
         {/* Desktop Links */}
         <div className=" hidden text-gray-900 px-4 py-1 h4  md:flex md:space-x-6  h1 tracking-wider text-2xl">
            <a href="/shop" className="hover:text-red-500 transition-colors drop-shadow-sm">
              Shop
            </a>
            <a href="/about" className="hover:text-red-500 transition-colors drop-shadow-sm">
              About
            </a>
            <a href="/contact" className="hover:text-red-500 transition-colors drop-shadow-sm">
              Contact
            </a>
          </div>
        {/* ICONS */}
        <div className="flex gap-x-2 md:gap-x-8">
       <div className="flex items-center gap-x-2 cursor-pointer" onClick={()=>navigate('/wishlist')}>
       <h1 className=" text-2xl hidden md:block">wishlist</h1>
        <img
        src="https://img.icons8.com/?size=100&id=5twNojKL5zU7&format=png&color=000000"
        className="w-7 md:w-9 hover:scale-110 cursor-pointer "
      />
       </div>
       <div className="flex items-center gap-x-2 cursor-pointer" onClick={()=>navigate('/cart')}>
       <h1 className=" text-2xl hidden md:block">cart</h1>
       <img
        src="https://img.icons8.com/?size=100&id=pMGoyzVDvHJe&format=png&color=000000"
        className="w-7 md:w-9 hover:scale-110 cursor-pointer"
      />
        </div>
        </div>
        {/* PROFILE */}
        <div className="">
            <div onClick={
  !currentUser || !user?.isVerified || !user?.status
    ? () => navigate('/login')
    : () => navigate('/profile/general') 
}
 className="flex items-center gap-x-2 cursor-pointer">
          <h1 className="text-4xl hidden md:block">profile</h1>
          <img   className='w-8 cursor-pointer md:w-12' src={user?.profilePicture ? user?.profilePicture : "https://img.icons8.com/?size=100&id=492ILERveW8G&format=png&color=000000"}/>
            </div>
        </div>

        <GiHamburgerMenu onClick={()=>setIsMenuOpen((prev)=>!prev)} className='md:hidden text-gray-800 w-6 h-6' />
         
 
{
    isMenuOpen &&
    <>
    {/* Desktop Links */}
    <div
  className={`fixed top-12 gap-y-4 flex flex-col w-full items-center md:hidden bg-gray-900 text-gray-50 px-4 py-3 md:space-x-6 h1 tracking-wider text-lg font-medium transition-all duration-800 ease-in-out ${
    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
  }`}
>
            <a href="/shop" className="hover:text-red-500 transition-colors drop-shadow-sm">
              Shop
            </a>
            <a href="/about" className="hover:text-red-500 transition-colors drop-shadow-sm">
              About
            </a>
            <a href="#contact" className="hover:text-red-500 transition-colors drop-shadow-sm">
              Contact
            </a>
            {
  (!user?.isVerified || !token || !user?.status) && (
    <div className="flex gap-x-4">
      <a href="login" className="hover:text-red-500 transition-colors drop-shadow-sm">
        Login
      </a>
      <p>/</p>
      <a href="register" className="hover:text-red-500 transition-colors drop-shadow-sm">
        Register
      </a>
    </div>
  )
}

          </div>
    </>
}
</nav>
   </div>
    
  )
}

export default Navbar
