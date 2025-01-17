import React, { useState } from "react";
import { showToast } from "../../helpers/toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add API call or form submission logic here
    showToast("Thank you for reaching out! We'll get back to you soon.",'light','success');
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <h1 className="text-5xl text-gray-800 text-center mb-8">
          Contact <span className="text-blue-600">GymRatz</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div className="bg-white pop p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your message here"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="text-gray-700 pop">
            <h2 className="text-3xl uppercase font-semibold text-gray-800 mb-12">
              Contact Information
            </h2>
            <p className="mb-12">
              <span className="font-medium">Address:</span> 123 Fitness Avenue,
              Gym City, FitLand 54321
            </p>
            <p className="mb-12">
              <span className="font-medium">Phone:</span> +1 (800) 123-4567
            </p>
            <p className="mb-12">
              <span className="font-medium">Email:</span>{" "}
              <a
                href="mailto:support@gymratz.com"
                className="text-blue-600 hover:underline"
              >
                support@gymratz.com
              </a>
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Follow Us
            </h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-blue-600 hover:text-blue-800"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://instagram.com"
                className="text-pink-600 hover:text-pink-800"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://twitter.com"
                className="text-blue-400 hover:text-blue-600"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://linkedin.com"
                className="text-blue-700 hover:text-blue-900"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
