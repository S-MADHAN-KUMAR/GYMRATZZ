import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { addToWallet, fetchWalletData } from '../../../API/user/walletAPI';
import { showToast } from '../../../helpers/toast';

const stripePromise = loadStripe(import.meta.env.VITE_LOAD_STRIPE);

const Wallet = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [wallet, setWallet] = useState({});
  const [amount, setAmount] = useState('');

  const handleAddAmount = async () => {
    if (!amount || amount <= 0) {
      showToast('Enter a valid amount.','dark','error');
      return;
    }

    try {
      const stripe = await stripePromise;

      // Call the separate API function
      const { sessionId } = await addToWallet(currentUser?._id, parseFloat(amount));

      // Redirect to Stripe checkout
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error adding amount:', error);
    }
  };

  useEffect(() => {
    if (currentUser?._id) {
      fetchWalletData(currentUser?._id)
        .then((data) => setWallet(data))
        .catch((error) => console.error('Error fetching wallet data:', error));
    }
  }, [currentUser]);

  return (
    <>
      {currentUser ? (
        <div className="p-12 flex justify-between">
          <div>
            <h1 className="h1 tracking-wider text-5xl mb-10">My Wallet</h1>

            <div className="hover:scale-105 duration-700 mb-12 flex pop flex-col justify-around bg-gray-800 p-4 border border-white border-opacity-30 rounded-lg shadow-md w-[340px] h-[200px] mx-auto">
              <div className="flex flex-row items-center justify-between mb-3">
                <p className=" text-white font-semibold text-lg tracking-widest uppercase">
                  {currentUser?.name}
                </p>
                <div className="flex items-center justify-center relative w-14 h-9 bg-gray-800 border border-white border-opacity-20 rounded-md">
                  <svg
                    className="text-white fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 48 48"
                  >
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col space-y-8">
                <div className="flex flex-col gap-y-1">
                  <p className="text-[10px] tracking-widest text-gray-400 ">current balance</p>
                  <p className="text-3xl font-semibold text-green-600">Rs . {wallet?.balance}</p>
                </div>

                <p className="text-xs tracking-widest text-gray-400 ">
                  MAIL ID : {currentUser?.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex pop items-center justify-center bg-gray-800 overflow-hidden p-1 border border-white border-opacity-30 rounded-lg shadow-md h-[50px]">
                <input
                  className="w-42 h-full border-none outline-none bg-gray-800 text-white font-medium caret-orange-500 pl-2 "
                  type="number"
                  name="text"
                  id="input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Add amount"
                />
                <div className="flex items-center justify-center relative w-10 h-6 bg-gray-800 border border-white border-opacity-20 rounded-md">
                  <svg
                    className="text-white fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 48 48"
                  >
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path>
                  </svg>
                </div>
              </div>
              <button onClick={handleAddAmount} className="flex items-center justify-center gap-x-4 p-1 text-gray-100 h1 text-lg tracking-widest rounded-lg px-14 bg-black">
                <img
                  className="w-10"
                  src="https://img.icons8.com/?size=100&id=JQX2fDPyQq4E&format=png&color=000000"
                  alt=""
                />
                <span> Add Amount</span>
              </button>
            </div>
          </div>

          <div className=" w-1/2 p-4 border-2 border-black rounded-lg">
            <h1 className="h1 tracking-wider text-4xl mb-10">Wallet History</h1>
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 text-lg pop font-medium">
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Amount</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {wallet.history?.length > 0 ? (
                  wallet.history.map((entry, index) => (
                    <tr key={index} className="text-md">
                      <td className="border px-4 py-2">{new Date(entry.date).toLocaleString()}</td>
                      <td className="border px-4 py-2">₹ {entry.amount}</td>
                      <td
                        className={`border px-4 py-2 ${
                          entry.status === 'completed'
                            ? 'text-green-500'
                            : entry.status === 'pending'
                            ? 'text-yellow-500'
                            : 'text-red-500'
                        }`}
                      >
                        {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border px-4 py-2" colSpan="3">
                      No history available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col w-full h-full">
          <img
            className="w-[300px]"
            src="https://i.pinimg.com/originals/f8/c4/22/f8c422a0a0e6793b3f9113d419c5143a.gif"
            alt=""
          />
          <p className="h1 text-4xl font-medium mt-6 to-gray-800 tracking-widest"> Wallet Data not Available!</p>
        </div>
      )}
    </>
  );
};

export default Wallet;
