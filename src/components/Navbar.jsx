import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png';
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) => 
    isActive 
      ? 'bg-blue-700 hover:bg-blue-900 text-white rounded-md px-4 py-2 transition-all duration-300' 
      : 'text-gray-300 hover:text-white hover:bg-white/10 rounded-md px-4 py-2 transition-all duration-300';

  return (
    <nav className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 border-b border-white/10 backdrop-blur-sm sticky top-0 z-50 animate-fadeIn shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
          >
            <img 
              src="/logo.png" 
              alt="logo" 
              className="w-10 h-10 object-contain animate-glow" 
            />
            <span className="text-white text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              ReactJobs.com
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {!user ? (
              // Not Logged In
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
              // Logged In
              <div className="flex items-center space-x-2">
                <NavLink to="/jobs" className={linkClass}>
                  Jobs
                </NavLink>

                <NavLink to="/add-job" className={linkClass}>
                  Add Job
                </NavLink>

                {/* User Info & Logout */}
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/10">
                  

                  <button
                    onClick={handleLogout}
                    className="btn-modern cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-300 hover-lift font-semibold"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;