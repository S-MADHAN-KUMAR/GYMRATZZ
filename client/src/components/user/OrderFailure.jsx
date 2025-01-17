import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
// import { USER_API } from "../../api/api";

const OrderFailure = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("order_id"); 

  useEffect(() => {
    const failedPayment = async () => {
      if (!id) {
        console.error("Order ID not found in query parameters");
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/handle_failed_payment/${id}`);
        if (res.status === 200) {
          console.log("Payment failure handled successfully.");
          success(); // Trigger the success animation
        }
      } catch (error) {
        console.error("Error handling failed payment:", error);
      }
    };

    failedPayment();
  }, [id]); // Only dependent on `id`, runs once when `id` is available

  return (
    <div className="flex justify-center items-center flex-col w-full h-[100vh] overflow-hidden">
      <img
        src="https://brightonconsultancyrc.org/wp-content/plugins/cus-form-pay//images/error.gif"
        alt="Error"
        className="w-46 mb-10"
      />
      <h1 className="h1 text-6xl tracking-widest text-[#fc584c]">Payment Failed!</h1>
      <p className="pop font-semibold text-2xl my-2">
        We're sorry, but your payment could not be processed.
      </p>
      <p className="pop font-semibold text-xl my-4">
        Please try again or contact support for assistance.
      </p>
      <button
        className="flex items-center shadow hover:scale-105 duration-500 gap-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg"
      >
        <img
          className="w-8"
          src="https://img.icons8.com/?size=100&id=iJzm3AFQCS4W&format=png&color=000000"
          alt="Home Icon"
        />
        <a href="/" className="font-medium h1 tracking-widest text-lg">
          Return to Home
        </a>
      </button>
    </div>
  );
};

export default OrderFailure;
