import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const linkClass = ({ isActive }) => isActive ? 'bg-black text-white rounded-md px-3 py-2 hover:bg-gray-900' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
        <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center md:items-stretch md:justify-start">
              <NavLink className="flex-shrink-0 items-center mr-4" to="/">
                <img className="h-8" src={logo} alt="React Jobs" />
                <span className="block text-white text-2xl font-bold ml-2">React Jobs</span>
              </NavLink>
              <div className="hidden md:block">
                <div className="flex space-x-2">
                  <NavLink to="/" className={linkClass}>Home</NavLink>
                  <NavLink to="/jobs" className={linkClass}>Jobs</NavLink>
                  <NavLink to="/add-job" className={linkClass}>Add Job</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
