import React from "react";
import { assets } from "../../assets/assets";
import { NavLink, useLocation, Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const sidebarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
    { name: "List Room", path: "/owner/list-room", icon: assets.listIcon },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        w-64 bg-gray-900 border-r border-gray-800 text-base flex flex-col transition-all duration-300 shadow-lg
        md:relative md:translate-x-0 md:h-full
        fixed top-0 left-0 h-screen z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
        style={{
          backgroundColor: "#051F20",
        }}
      >
        {/* Sidebar Header - Only visible on mobile/tablet */}
        <div
          className="flex items-center justify-between p-4 border-b border-gray-800 md:hidden"
          style={{ borderBottomColor: "#0a3235" }}
        >
          {/* Brand Text Only - Mobile/Tablet only - Clickable */}
          <Link to="/" onClick={onClose}>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-white rounded-lg flex items-center justify-center">
                <img
                  src={assets.favicon}
                  alt="favicon"
                  className="h-4 w-4 brightness-0"
                />
              </div>
              <h1 className="text-xl font-bold text-white hover:opacity-80 transition-opacity cursor-pointer">
                Bookotel
              </h1>
            </div>
          </Link>

          {/* Close button for mobile/tablet */}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-800 transition-colors"
            style={{ "--tw-bg-opacity": "1" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0a3235")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            <svg
              className="w-6 h-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto pt-4 md:pt-6">
          {sidebarLinks.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              end={item.path === "/owner"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center py-4 px-6 gap-3 mx-4 mb-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg"
                    : "hover:shadow-md text-gray-300"
                }`
              }
              style={({ isActive }) =>
                !isActive
                  ? {
                      transition: "background-color 0.3s ease",
                    }
                  : {}
              }
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("bg-gradient-to-r")) {
                  e.currentTarget.style.backgroundColor = "#0a3235";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.classList.contains("bg-gradient-to-r")) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={`min-h-6 min-w-6 transition-all duration-300 ${
                      isActive
                        ? "brightness-0 invert"
                        : "brightness-0 invert opacity-80"
                    }`}
                  />
                  <p className="font-medium">{item.name}</p>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
