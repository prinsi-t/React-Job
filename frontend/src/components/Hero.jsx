import React from 'react'
import { Link } from 'react-router-dom'

const Hero = ({
  title = "Become a React Dev",
  subtitle = "Find the React job that fits your skills and needs 💼"
}) => {
  return (
    <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-20 pb-16 relative overflow-hidden">

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-8 left-12 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-8 right-12 w-96 h-96 bg-indigo-700/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl animate-float animation-delay-600"></div>
      </div>

      
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-8 left-12 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-8 right-12 w-96 h-96 bg-indigo-700/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl animate-float animation-delay-600"></div>
      </div>
 
      {/* Hero Content - Split Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="text-left animate-fadeInUp">
            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 text-blue-400"
              style={{ fontFamily: "'Playfair Display', serif"}}
            >
              {title}
            </h1>
 
            {/* Subtitle */}
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              {subtitle}
            </p>
          </div>
 
          {/* Right Side - Girl Image */}
          <div className="flex justify-center lg:justify-end animate-fadeInUp animation-delay-200">
            <img 
              src="/girl.png" 
              alt="Professional Developer" 
              className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
            />
          </div>
 
        </div>
      </div>


      {/* Cards Section - Integrated */}
      <div className="max-w-7xl lg:container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* For Developers Card */}
          <div className="modern-card hover-lift animate-fadeInUp bg-blue-900/20 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-3">For Developers 🧑‍💻</h2>
            <p className="text-gray-300 mb-6">
              Browse our React jobs and start your career today
            </p>
            <Link 
              to="/jobs" 
              className="btn-modern inline-block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg px-6 py-3 hover-lift font-semibold transition-all duration-300"
            >
              Browse Jobs →
            </Link>
          </div>

          {/* For Employers Card */}
          <div className="modern-card hover-lift animate-fadeInUp animation-delay-200 bg-blue-900/20 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-3">For Employers 🏢</h2>
            <p className="text-gray-300 mb-6">
              List your job to find the perfect developer for the role
            </p>
            <Link 
              to="/add-job" 
              className="btn-modern inline-block bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white rounded-lg px-6 py-3 hover-lift font-semibold transition-all duration-300"
            >
              Add Job →
            </Link>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Hero