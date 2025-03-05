import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/assets_frontend/logo.svg";
import dropdown_icon from "../assets/assets_frontend/dropdown_icon.svg";
import cross_icon from "../assets/assets_frontend/cross_icon.png";
import menu_icon from "../assets/assets_frontend/menu_icon.svg";
import profile_pic from "../assets/assets_frontend/profile_pic.png";
import { ParentContext } from "../context/ParentContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const { pToken, setPToken } = useContext(ParentContext);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const logout = () => {
    if (pToken) {
      setPToken("");
      localStorage.removeItem("pToken");
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".mobile-menu") && showMenu) {
        setShowMenu(false);
      }
      if (!event.target.closest(".profile-menu") && showDropdown) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMenu, showDropdown]);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="Logo"
        className="w-44 cursor-pointer"
      />

      {/* Navigation Links (Desktop) */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/" className="py-4" aria-label="Home">
          <li>HOME</li>
        </NavLink>
        <NavLink to="/attendence" className="py-4" aria-label="Attendance">
          <li>ATTENDANCE</li>
        </NavLink>
        <NavLink to="/student-marks" className="py-4" aria-label="Mark">
          <li>MARK</li>
        </NavLink>
        <NavLink to="/announcement" className="py-4" aria-label="Announcement">
          <li>ANNOUNCEMENT</li>
        </NavLink>
      </ul>

      {/* Profile & Language Selector */}
      <div className="flex items-center gap-4">
        {/* Profile Dropdown */}
        <div className="flex items-center gap-2 relative profile-menu">
          <img 
            className="w-8 rounded-full cursor-pointer"
            src={profile_pic}
            alt="Profile"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          <img className="w-2.5" src={dropdown_icon} alt="Dropdown Icon" />
          
          {showDropdown && (
            <div className="absolute top-12 right-0 bg-white shadow-md rounded-md p-4 w-48">
              <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">My Profile</p>
              <p onClick={() => navigate("/feedback")} className="hover:text-black cursor-pointer">Feedback</p>
              <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
            </div>
          )}
        </div>

        {/* Google Translate Element */}
        <div id="google_translate_element" className="bg-primary text-white p-2 rounded-md"></div>
        

        {/* Mobile Menu Icon */}
        <img 
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={menu_icon}
          alt="Menu Icon"
        />

        {/* Mobile Menu */}
        {showMenu && (
          <div className="fixed top-0 right-0 w-full h-full bg-white z-20 mobile-menu">
            <div className="flex items-center justify-between px-5 py-6">
              <img className="w-36" src={logo} alt="Logo" />
              <img 
                className="w-7 cursor-pointer" 
                onClick={() => setShowMenu(false)} 
                src={cross_icon} 
                alt="Close Icon" 
              />
            </div>

            {/* Mobile Navigation */}
            <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
              <NavLink onClick={() => setShowMenu(false)} to="/" aria-label="Home">
                HOME
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/attendence" aria-label="Attendance">
                ATTENDANCE
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/mark" aria-label="Mark">
                MARK
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/announcement" aria-label="Announcement">
                ANNOUNCEMENT
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/contact" aria-label="Contact">
                CONTACT
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
