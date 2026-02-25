import React from 'react'

const Hero = ({ title = "Become a React Dev", subtitle = "Find the React job that fits your skills and needs" }) => {
  return (
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-30">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="font-extrabold text-white sm:text-5xl md:text-6xl">{title}</h1>
            <p className="text-xl text-white">{subtitle}</p>
          </div>
        </div>
      </section>
  )
}

export default Hero
