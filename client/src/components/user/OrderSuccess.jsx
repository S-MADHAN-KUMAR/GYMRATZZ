import React, { useEffect } from "react";
import confetti from 'canvas-confetti';

const OrderSuccess = () => {


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
      spread: 120, // Increased spread
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 150, // Increased spread
    });
    fire(0.35, {
      spread: 200, // Increased spread
      decay: 0.92, // Slower fall (increased decay value)
      scalar: 1.0 // Adjust scalar to control the size and speed of particles
    });
    fire(0.1, {
      spread: 300, // Increased spread
      startVelocity: 30, // Slower start velocity for a more dramatic fall
      decay: 0.93, // Slower fall
      scalar: 1.4 // Larger particles with slower fall time
    });
    fire(0.1, {
      spread: 400, // Increased spread for maximum effect
      startVelocity: 50,
      decay: 0.94, // Even slower fall for the last group of particles
    });
  };
  
  useEffect(()=>{
    success()
  },[])
  return (
    <div className=" flex justify-center items-center flex-col w-full h-[100vh] overflow-hidden">
      <img src="https://i.gifer.com/origin/11/1184b4c0aa977f925dde58d2075772dd_w200.gif" className="w-80 " />
      <h1 className="h1 text-6xl tracking-widest text-[#78b53f]">Payment Successful!</h1>
      <p className="pop font-semibold text-2xl my-4">Thank you for your order ! 🎉 Your payment has been processed successfully.</p>
      <button className="flex items-center shadow hover:scale-105 duration-500  gap-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg 
      ">
      <img className="w-8" src="https://img.icons8.com/?size=100&id=iJzm3AFQCS4W&format=png&color=000000" alt="" />
      <a href="/" className="font-medium h1 tracking-widest text-lg ">
        Return to Home
      </a>
      </button>


    </div>
  );
};

export default OrderSuccess;
