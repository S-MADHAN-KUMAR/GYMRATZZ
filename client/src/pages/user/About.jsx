import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <h1 className="text-5xl text-gray-800 text-center">
          About <span className="text-blue-600">GymRatz</span>
        </h1>
        <div className="pop grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="h-2/3">
            <img
              src="https://i.pinimg.com/originals/0d/fa/22/0dfa222a62b6002b7d53bd487e4e4421.gif"
              alt="GymRatz store"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div>
            <p className="text-gray-700 leading-relaxed mb-6 ">
              Welcome to <span className="font-medium pop text-blue-600">GymRatz</span>, 
              your one-stop destination for all things fitness! Whether you're a 
              beginner starting your fitness journey or a seasoned athlete, we 
              offer the best in gym equipment, apparel, supplements, and more to 
              help you crush your goals.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              At GymRatz, we believe in empowering individuals to lead healthier, 
              stronger, and more confident lives. Every product in our store is 
              carefully selected to ensure the highest quality and durability, 
              making sure you get the best bang for your buck.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Join the GymRatz family today and discover why thousands of fitness 
              enthusiasts trust us for their workout essentials. Let’s take your 
              fitness game to the next level—because here, we’re not just building 
              bodies; we’re building a community of champions!
            </p>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 pop">
            Why Choose <span className="text-blue-600">GymRatz</span>?
          </h2>
          <ul className="text-gray-700 space-y-3 pop font-medium">
            <li>✅ Premium Quality Gym Gear and Accessories</li>
            <li>✅ Affordable Prices for Every Budget</li>
            <li>✅ Fast and Reliable Shipping</li>
            <li>✅ 24/7 Customer Support</li>
            <li>✅ Exclusive Offers and Discounts for Members</li>
          </ul>
          <a
            href="/shop"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 transition duration-300"
          >
            Explore Our Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
