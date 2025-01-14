import React, { useEffect, useState } from 'react'
import { fetchUsers } from '../../API/admin/dashboard'
import { handleToggleBlock } from '../../API/admin/dashboardUpdate'

const Users = () => {
  const[users,setUsers]=useState([])
  const loadUsers =async()=>{
    await fetchUsers(setUsers)
  }
   useEffect(()=>{
    loadUsers()
    },[])
  
  return (
    <div className='flex flex-col gap-y-12'>
    <div className="flex items-center justify-between">
      <h1 className='text-gray-300'>Users</h1>
      </div>
      <table className="table-auto w-full text-center text-sm">
          <thead className="th uppercase pop tracking-wider">
            <tr>
              <th className="p-4">profile</th>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Registered On</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="border-y-4 tb tbc">
                  <td className="p-4">
                    <img
                      src={user.profilePicture || "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"}
                      alt="Profile"
                      className="w-14 h-14 rounded-sm object-contain"
                    />
                  </td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-8 py-2 font-semibold uppercase ${
                        user.status === true
                          ? "text-white bg-green-600"
                          : "text-white bg-red-600"
                      }`}
                    >
                      {user.status === true ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      className={`px-8 py-3 text-[white] font-medium rounded-sm  ${
                        user.status === true
                          ? "bg-red-600"
                          : "bg-green-600"
                      }`}
                      title="Block User"
                      onClick={() => handleToggleBlock(user._id, user.status,loadUsers)}
                    >
                      {user.status === true ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  )
}

export default Users