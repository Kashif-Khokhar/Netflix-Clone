import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";

function Nav() {
  const [show, handleShow] = useState(false);
  const location = useLocation();

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
    <div className={`fixed top-0 flex justify-between items-center w-full px-4 md:px-12 h-16 z-50 transition-all duration-300 ease-in-out ${show ? "bg-[#141414]" : "bg-gradient-to-b from-black/90 via-black/40 to-transparent"}`}>
      <div className="flex items-center gap-x-6">
        <Link to="/">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
            alt="Netflix" 
            className="w-20 md:w-24 cursor-pointer object-contain shrink-0"
          />
        </Link>
        <ul className="hidden lg:flex gap-x-5 text-[14px] text-[#e5e5e5] font-normal items-center shrink-0">
          <Link to="/" className={`whitespace-nowrap cursor-pointer hover:text-[#b3b3b3] transition-colors duration-200 ${location.pathname === "/" ? "font-bold text-white" : ""}`}>Home</Link>
          <Link to="/tv-shows" className={`whitespace-nowrap cursor-pointer hover:text-[#b3b3b3] transition-colors duration-200 ${location.pathname === "/tv-shows" ? "font-bold text-white" : ""}`}>TV Shows</Link>
          <Link to="/movies" className={`whitespace-nowrap cursor-pointer hover:text-[#b3b3b3] transition-colors duration-200 ${location.pathname === "/movies" ? "font-bold text-white" : ""}`}>Movies</Link>
          <Link to="/new-popular" className={`whitespace-nowrap cursor-pointer hover:text-[#b3b3b3] transition-colors duration-200 ${location.pathname === "/new-popular" ? "font-bold text-white" : ""}`}>New & Popular</Link>
          <Link to="/my-list" className={`whitespace-nowrap cursor-pointer hover:text-[#b3b3b3] transition-colors duration-200 ${location.pathname === "/my-list" ? "font-bold text-white" : ""}`}>My List</Link>
          <Link to="/browse-by-languages" className={`whitespace-nowrap cursor-pointer hover:text-[#b3b3b3] transition-colors duration-200 ${location.pathname === "/browse-by-languages" ? "font-bold text-white" : ""}`}>Browse by Languages</Link>
        </ul>
      </div>

      <div className="flex items-center gap-x-5 text-white shrink-0">
        <Search className="w-5 h-5 cursor-pointer shrink-0" />
        <span className="hidden md:inline cursor-pointer text-[14px] hover:text-[#b3b3b3] whitespace-nowrap">Kids</span>
        <Bell className="w-5 h-5 cursor-pointer shrink-0" />
        <div className="flex items-center gap-x-2 cursor-pointer group shrink-0">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Avatar" className="w-8 h-8 rounded shrink-0" />
          <span className="border-t-4 border-l-4 border-r-4 border-transparent border-t-white mt-1 group-hover:rotate-180 transition-transform hidden md:block"></span>
        </div>
      </div>
    </div>
  );
}

export default Nav;
