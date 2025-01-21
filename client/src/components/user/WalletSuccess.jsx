import confetti from 'canvas-confetti';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { handlePaymentSuccess } from '../../API/user/walletAPI';

const WalletSuccess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const session_id = params.get('session_id');

  const hasCalled = useRef(false); 

  const success = () => {
    var count = 200;
    var defaults = {
      origin: { y: 0.7 }
    };
    
    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }
    
    fire(0.25, {
      spread: 120, 
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 150,
    });
    fire(0.35, {
      spread: 200, 
      decay: 0.92, 
      scalar: 1.0
    });
    fire(0.1, {
      spread: 300, 
      startVelocity: 30, 
      decay: 0.93, 
      scalar: 1.4 
    });
    fire(0.1, {
      spread: 400,
      startVelocity: 50,
      decay: 0.94, 
    });
  };

  useEffect(() => {
    handlePaymentSuccess(session_id, hasCalled, success);
  }, [session_id]);

  return (
    <div className="flex justify-center items-center flex-col w-full h-[100vh] overflow-hidden">
      <img 
        src="https://i.pinimg.com/originals/1a/3b/d2/1a3bd2b9bb77b8297ee5a1a693ae9d29.gif" 
        className="w-80" 
        alt="Success Animation" 
      />
      <h1 className="h1 text-6xl tracking-widest text-[#78b53f]">
        Amount Successfully Added to Your Wallet
      </h1>
      <p className="pop font-semibold text-2xl my-4">
        Thank you for your payment! 🎉 Your payment has been processed successfully.
      </p>

      <button className="flex items-center shadow hover:scale-105 duration-500 gap-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg">
        <img 
          className="w-8" 
          src="https://img.icons8.com/?size=100&id=AyHHKGHt204t&format=png&color=000000" 
          alt="Wallet Icon" 
        />
        <a href="/profile/wallet" className="font-medium h1 tracking-widest text-lg">
          Return to Wallet
        </a>
      </button>
    </div>
  );
};

export default WalletSuccess;
