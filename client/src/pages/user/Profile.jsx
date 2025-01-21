import React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'; 
import {  useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../../API/user/Send.js';

const Profile = () => {
  const {currentUser}=useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-full h-[90vh] flex">
    <div className=" h1 tracking-widest bg-black text-xl flex flex-col items-center justify-evenly w-[25vw] h-[90vh] overflow-y-hidden">
      <div className=" flex flex-col gap-10 text-white text-lg">
        <NavLink 
          to="/profile/general" 
          className={({ isActive }) => isActive ? "text-blue-500 bg-blue-200/10 px-10 py-2 rounded-lg" : " hover:text-[#b88cff] px-10 py-2"}
        >
          General
        </NavLink>
        <NavLink 
          to="/profile/address" 
          className={({ isActive }) => isActive ? "text-blue-500 bg-blue-200/10 px-10 py-2 rounded-lg" : " hover:text-[#b88cff] px-10 py-2"}
        >
          Address
        </NavLink>
        <NavLink 
          to="/profile/orders" 
          className={({ isActive }) => isActive ? "text-blue-500 bg-blue-200/10 px-10 py-2 rounded-lg" : " hover:text-[#b88cff] px-10 py-2"}
        >
          Orders
        </NavLink>
        <NavLink 
          to="/profile/wallet" 
          className={({ isActive }) => isActive ? "text-blue-500 bg-blue-200/10 px-10 py-2 rounded-lg" : " hover:text-[#b88cff] px-10 py-2"}
        >
          Wallet
        </NavLink>
      </div>
{
  currentUser
  ?
<button 
  onClick={() => handleLogout(dispatch, navigate)} 
  className="button mt-4"
>
  <span>Logout</span>
</button>
  :
  <button 
  onClick={()=>navigate('/login')} 
  className="button mt-4"
  >
  <span>Login</span>
  
  </button>
}


    </div>
    <div className=" w-full max-h-[100vh] overflow-x-hidden">
      <Outlet />
    </div>
  </div>

  );
};

export default Profile;
