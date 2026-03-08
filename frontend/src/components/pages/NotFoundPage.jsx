import React from 'react'
import { Link } from 'react-router-dom'
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center relative overflow-hidden">
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-800/15 rounded-full blur-3xl animate-float animation-delay-400"></div>
      </div>

      {/* Content */}
      <section className="relative z-10 text-center px-6">
        <div className="modern-card max-w-2xl mx-auto hover-lift animate-fadeInUp">
          
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center animate-glow">
              <FaExclamationTriangle className="text-white text-5xl" />
            </div>
          </div>

          {/* 404 Text */}
          <h1 className="text-8xl md:text-9xl font-black mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            404
          </h1>

          {/* Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>

          <p className="text-xl text-gray-400 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn-modern bg-gradient-to-r from-blue-700 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover-lift inline-flex items-center justify-center space-x-2 shadow-2xl"
            >
              <FaHome />
              <span>Go Home</span>
            </Link>

            <Link
              to="/jobs"
              className="btn-modern glass text-white px-8 py-4 rounded-lg font-semibold hover-lift inline-flex items-center justify-center space-x-2"
            >
              <span>Browse Jobs</span>
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-gray-500 text-sm mt-8">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </section>
    </div>
  )
}

export default NotFoundPage