import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-white/20 py-4 bg-white/80 backdrop-blur-lg shadow-lg transition-all duration-300">
      {/* Left side - Menu icon + Logo */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo - Hidden on mobile, visible on desktop */}
        <Link to="/" className="hidden md:flex">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center">
              <img
                src={assets.favicon}
                alt="favicon"
                className="h-5 w-5 brightness-0 invert"
              />
            </div>
            <h1 className="text-2xl font-bold text-black">Bookotel</h1>
          </div>
        </Link>
      </div>

      {/* Right side - User button */}
      <UserButton />
    </div>
  );
};

export default Navbar;
