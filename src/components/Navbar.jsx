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

  const linkClass = ({ isActive }) => isActive ? 'bg-black text-white rounded-md px-3 py-2 hover:bg-gray-900' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          React Jobs
        </Link>

        <div className="space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-indigo-600 px-3 py-1 rounded"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/jobs" className="text-white hover:underline">
                Jobs
              </Link>

              <Link to="/add-job" className="text-white hover:underline">
                Add Job
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar
