import React from "react";
import { assets } from "../assets/assets";
import purpleHotelGif from "../assets/Purple Modern Online Hotel Booking Instagram Post.gif";

const NewsLetter = () => {
  return (
    <div className="w-full bg-slate-100 pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 md:pb-24 lg:pb-36 px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 text-white">
      <div className="max-w-7xl mx-auto mt-4 sm:mt-6 md:mt-8 mb-3">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 relative">
          {/* Left side - Purple GIF */}
          <div className="w-full lg:w-1/2">
            <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden">
              <img 
                src={purpleHotelGif} 
                alt="Hotel Booking" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Vertical Divider Line - Only visible on lg screens and up */}
          <div className="hidden lg:block absolute h-[100%] w-px bg-gray-300 left-[47%] -top-2"></div>

          {/* Right side - Newsletter Subscription */}
          <div className="w-full lg:w-1/2 bg-gray-600 p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center font-playfair mb-3 sm:mb-4 md:mb-6">
              Find Your Next Destination
            </h2>
            <p className="text-center mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base leading-relaxed">
              Subscribe to our newsletter to be the first to hear about exciting
              travel spots, exclusive discounts, and trip ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 pointer-events-none">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input
                  type="email"
                  className="block w-full p-2.5 sm:p-3 md:p-4 pl-6 sm:pl-8 md:pl-10 text-xs sm:text-sm text-white border border-gray-600 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="group px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg border border-white hover:border-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Subscribe
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3 sm:mt-4 text-center mb-3 leading-relaxed">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
