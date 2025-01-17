import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchUserAddress } from '../../../API/user/comman';

const Addresses = () => {
const [addresses,setAddresses]=useState([])
const { currentUser } = useSelector((state) => state.user);

 const loadUserAddresses = async () => {
    await fetchUserAddress(currentUser?._id,setAddresses);
  };

  useEffect(() => {
    loadUserAddresses();
  }, [])
  

    return ( 
    <div className=' h-full p-10'>
    <div className="flex justify-between items-start">
      <h1 className='text-5xl tracking-widest drop-shadow Header mb-10'>Address settings</h1>
      <a href='/profile/add_address' className='flex items-center gap-x-2 bg-gray-900 py-2 h1 text-white text-lg tracking-widest px-6 rounded-lg hover:scale-105 shadow duration-500'>
        <img src="https://img.icons8.com/?size=100&id=NBy8CeB6XWYW&format=png&color=000000" className="w-6" />
        Add Address
      </a>
    </div>
      <div className="flex mb-1 flex-wrap gap-4">
        {addresses?.length > 0 ? (
          addresses.map((add) => (
            <div className="relative p-6 border pop border-gray-300 rounded-lg text-blue-700 bg-gray-50 shadow-md w-1/3 hover:scale-105 duration-500" key={add._id}>
              <p>
                <span className="font-medium text-gray-900">Name:</span> {add?.name}
              </p>
              <p>
                <span className="font-medium text-gray-900">Phone:</span> {add?.phone}
              </p>
              <p>
                <span className="font-medium text-gray-900">Address 1:</span> {add?.addressline1}
              </p>
              <p>
                <span className="font-medium text-gray-900">Address 2:</span> {add?.addressline2 || 'N/A'}
              </p>
              <p>
                <span className="font-medium text-gray-900">City:</span> {add?.city}
              </p>
              <p>
                <span className="font-medium text-gray-900">State:</span> {add?.state}
              </p>
              <p>
                <span className="font-medium text-gray-900">Pincode:</span> {add?.pincode}
              </p>
              <a href={`/profile/edit_address/${add?._id}`} className='bottom-2 right-2 absolute flex items-center gap-x-2 bg-gray-900 py-2 h1 text-white tracking-widest px-4 rounded-lg hover:scale-105 shadow duration-500'>
                <img src="https://img.icons8.com/?size=100&id=6rM43YNMgkta&format=png&color=000000" className="w-6" />
                Edit Address
              </a>
            </div>
          ))
        ) : (
          <div className='flex justify-center w-full items-center flex-col'>
            <img className='w-[300px]' src="https://i.gifer.com/MZZO.gif" alt="" />
            <p className='h1 text-4xl font-medium mt-6 text-gray-800'>No Address!</p>
          </div>
        )}
      </div>
  </div>
  )
}

export default Addresses