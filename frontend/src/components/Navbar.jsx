import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png';
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass = ({ isActive }) => 
    isActive 
      ? 'bg-blue-700 hover:bg-blue-900 text-white rounded-md px-4 py-2 transition-all duration-300 w-full md:w-auto text-center' 
      : 'text-gray-300 hover:text-white hover:bg-white/10 rounded-md px-4 py-2 transition-all duration-300 w-full md:w-auto text-center';

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? 'block bg-blue-700 text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300'
      : 'block text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300';

  return (
    <nav className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 border-b border-white/10 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300 shrink-0"
          >
            <img 
              src="/logo.png" 
              alt="logo" 
              className="w-10 h-10 object-contain animate-glow" 
            />
            <span className="text-white text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              ReactJobs.com
            </span>
          </Link>

          {/* Hamburger Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none p-2 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="text-gray-300 hover:text-white hover:bg-white/10 rounded-md px-4 py-2 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-modern bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-900 text-white px-6 py-2 rounded-md hover-lift shadow-lg font-semibold transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink to="/jobs" className={linkClass}>
                  Jobs
                </NavLink>
                <NavLink to="/add-job" className={linkClass}>
                  Add Job
                </NavLink>
                <div className="h-8 w-px bg-white/10 mx-2"></div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-300 hover:scale-105 font-semibold shadow-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-2 mt-2">
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block bg-gradient-to-r from-blue-700 to-blue-600 text-white px-4 py-3 rounded-lg text-base font-semibold text-center shadow-lg transition-all duration-300 active:scale-95"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <NavLink 
                  to="/jobs" 
                  onClick={() => setIsOpen(false)}
                  className={mobileLinkClass}
                >
                  Jobs
                </NavLink>
                <NavLink 
                  to="/add-job" 
                  onClick={() => setIsOpen(false)}
                  className={mobileLinkClass}
                >
                  Add Job
                </NavLink>
 <div className="pt-4 mt-2 border-t border-white/10">
  <button
    onClick={handleLogout}
    className="block w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 active:scale-95 shadow-md text-center cursor-pointer"
  >
    Logout
  </button>
</div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;