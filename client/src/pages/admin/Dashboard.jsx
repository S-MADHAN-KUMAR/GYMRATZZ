import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { BiSolidCoupon } from "react-icons/bi";
import { RiMessage2Fill } from "react-icons/ri";
import { HiMiniUsers } from "react-icons/hi2";
import { TbBrandSupabase } from "react-icons/tb";
import { PiFlagBannerFoldFill } from "react-icons/pi";
import { RiHome9Fill } from "react-icons/ri";
import { FaCartFlatbed } from "react-icons/fa6";
import { IoMdLogIn } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowLeft,MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { showBlockConfirmation } from "../../helpers/Sweat";
import { AdminLogout } from "../../redux/admin/adminSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const handleLogout = async () => {
      showBlockConfirmation('Do you want to LOGOUT', 'LOGOUT', async () => {
        try {
          dispatch(AdminLogout());
          navigate('/admin_login');
        } catch (error) {
          console.error('Error logging out:', error); // Updated log message for clarity
        }
      });
    };
  const [isMenuOpen,setIsMenuOpen] = useState(false)
  return (
    <div className="flex overflow-x-hidden bg-gray-800 w-full h-screen text-[#e8e8e8]">
      {/* Sidebar */}
      <aside className={`${isMenuOpen ? "w-[50vw] md:w-[20vw]  h-full tracking-widest bg-black text-xl flex flex-col items-center justify-between py-6 flex-shrink-0" 
        :"h-full tracking-widest bg-black text-xl flex flex-col items-center justify-evenly flex-shrink-0 w-[15vw] md:w-[5vw]"}`}>
         
        <div className={`${isMenuOpen ? "flex gap-2 items-center " 
          :
          "flex flex-col-reverse gap-y-6  items-center"
        }`}>
        <NavLink
          to="/dashboard/home"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 h1 flex gap-x-3 md:text-3xl tracking-widest"
              : "hover:text-[#b88cff] h1 flex gap-x-3 md:text-3xl tracking-widest"
          }
        >
          {
            isMenuOpen 
            ? 
            <p className={`${isMenuOpen ? 'black' : "hidden"}`}  >Dashboard</p>
            :
            <RiHome9Fill className="w-5"/>
          }
          
        </NavLink>
        <button onClick={()=>setIsMenuOpen((prev)=>!prev)}>
            {
              isMenuOpen ?
              <MdOutlineKeyboardDoubleArrowLeft className="md:w-8 md:h-8 w-6 h-6"/>
              :
              <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4 md:w-8 md:h-8 "/>
            }
          </button>

        </div>
        {/* Links */}
        <div className="h1 flex flex-col gap-7 font-medium tracking-widest text-sm md:text-[17px]">
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              isActive ? "text-blue-500 " : "hover:text-[#b88cff]"
            }
          >
            <div className="flex gap-x-3 items-center">
              <HiMiniUsers />
              <p className={`${isMenuOpen ? 'black' : "hidden"}`} >Users</p>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/products"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "hover:text-[#b88cff]"
            }
          >
            <div className="flex gap-x-3 items-center">
              <AiFillProduct />
              <p className={`${isMenuOpen ? 'black' : "hidden"}`} >Products</p>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/coupons"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "hover:text-[#b88cff]"
            }
          >
            <div className="flex gap-x-3 items-center">
              <BiSolidCoupon />
              <p className={`${isMenuOpen ? 'black' : "hidden"}`} >Coupons</p>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/brands"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "hover:text-[#b88cff]"
            }
          >
            <div className="flex gap-x-3 items-center">
              <TbBrandSupabase />
              <p className={`${isMenuOpen ? 'black' : "hidden"}`} >Brands</p>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/banners"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "hover:text-[#b88cff]"
            }
          >
            <div className="flex gap-x-3 items-center">
              <PiFlagBannerFoldFill />
              <p className={`${isMenuOpen ? 'black' : "hidden"}`} >Banners</p>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/orders"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "hover:text-[#b88cff]"
            }
          >
            <div className="flex gap-x-3 items-center">
              <FaCartFlatbed />
              <p className={`${isMenuOpen ? 'black' : "hidden"}`} >Orders</p>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/categories"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "hover:text-[#b88cff]"
            }
          >
            <div className="flex gap-x-3 items-center">
              <MdCategory />
              <p className={`${isMenuOpen ? 'black' : "hidden"}`} >Categories</p>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/offers"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "hover:text-[#b88cff]"
            }
          >
            <div className="flex gap-x-3 items-center">
              <BiSolidOffer />
              <p className={`${isMenuOpen ? 'black' : "hidden"}`} >Offers</p>
            </div>
          </NavLink>
{/*           <NavLink
            to="/dashboard/reviews"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "hover:text-[#b88cff]"
            }
          >
            <div className="flex gap-x-3 items-center">
              <RiMessage2Fill/>
              <p className={`${isMenuOpen ? 'black' : "hidden"}`} >Reviews</p></div>
          </NavLink> */}
        </div>
 {/* Logout Button */}
 <button onClick={handleLogout}>
 <p className={`${isMenuOpen ? ' hover:scale-105 duration-500  button ' : "hidden"}`} >Logout</p>
        {!isMenuOpen &&   <IoMdLogIn/>}
        </button>
      
      </aside>

      {/* Main content */}
      <div className="h-full bg-gray-900 p-8 w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
