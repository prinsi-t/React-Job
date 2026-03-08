import React from 'react'

const Hero = ({
  title = "Become a React Dev",
  subtitle = "Find the React job that fits your skills and needs 💼"
}) => {
  return (
    <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-24 relative overflow-hidden">

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-8 left-12 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-8 right-12 w-96 h-96 bg-indigo-700/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl animate-float animation-delay-600"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10 text-center">

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 animate-fadeInUp text-blue-400"
          style={{ fontFamily: "'Playfair Display', serif"}}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed animate-fadeInUp">
          {subtitle}
        </p>

      </div>

    </section>
  )
}

export default Hero