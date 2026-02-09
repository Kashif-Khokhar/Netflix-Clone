import React, { useState, useEffect } from "react";
import { Search, Bell, User } from "lucide-react";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className={`fixed top-0 flex justify-between items-center w-full px-4 md:px-12 h-16 z-50 transition-all duration-300 ease-in-out ${show ? "bg-[#111] shadow-2xl" : "bg-gradient-to-b from-black/70 to-transparent"}`}>
      <div className="flex items-center space-x-8">
        <h1 className="text-[#e50914] font-black text-2xl md:text-3xl tracking-tighter cursor-pointer hover:scale-105 transition-transform duration-200 shrink-0">
          STREAMFLOW
        </h1>
        <ul className="hidden md:flex space-x-4 text-[14px] text-[#e5e5e5] font-normal">
          <li className="cursor-pointer hover:text-white transition-colors duration-200 font-semibold">Home</li>
          <li className="cursor-pointer hover:text-white transition-colors duration-200">TV Shows</li>
          <li className="cursor-pointer hover:text-white transition-colors duration-200">Movies</li>
          <li className="cursor-pointer hover:text-white transition-colors duration-200">New & Popular</li>
          <li className="cursor-pointer hover:text-white transition-colors duration-200">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-6 text-white">
        <Search className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
        <Bell className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
        <div className="w-8 h-8 cursor-pointer rounded overflow-hidden hover:ring-2 hover:ring-white transition-all">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Nav;
