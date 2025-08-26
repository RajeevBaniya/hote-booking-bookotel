import React, { useEffect, useState } from "react";
import Navbar from "../../components/hotelOwner/Navbar";
import Sidebar from "../../components/hotelOwner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { isOwner, navigate, authLoading } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !isOwner) {
      navigate("/");
    }
  }, [authLoading, isOwner]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (authLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar onMenuClick={toggleSidebar} />
      <div className="flex h-full" style={{ height: "calc(100vh - 72px)" }}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-auto md:ml-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
