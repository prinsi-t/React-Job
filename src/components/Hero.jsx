import React from 'react'

const Hero = ({ title = "Become a React Dev", subtitle = "Find the React job that fits your skills and needs" }) => {
  return (
    <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-30 relative overflow-hidden">
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 animate-fadeInUp">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 animate-fadeInUp animation-delay-200">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero