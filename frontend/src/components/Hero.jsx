import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const floatingElements = document.querySelectorAll('.floating-element');
      
      floatingElements.forEach((element) => {
        const speed = element.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section ref={heroRef} className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-32 pb-40 relative overflow-hidden">

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-8 left-12 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-8 right-12 w-96 h-96 bg-indigo-700/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl animate-float animation-delay-600"></div>
      </div>

      {/* Floating Tech Keywords - WHITE & LIGHT PURPLE, SMALLER */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Row 1 - Top */}
        <div className="floating-element absolute top-20 left-10 text-white/40 font-semibold text-sm transition-transform duration-300 ease-out" data-speed="2">
          React.js
        </div>
        <div className="floating-element absolute top-32 left-1/4 text-purple-200/35 font-semibold text-xs transition-transform duration-300 ease-out" data-speed="3">
          TypeScript
        </div>
        <div className="floating-element absolute top-16 left-1/2 text-white/45 font-semibold text-base transition-transform duration-300 ease-out" data-speed="1.5">
          Next.js
        </div>
        <div className="floating-element absolute top-28 right-1/4 text-purple-100/40 font-semibold text-sm transition-transform duration-300 ease-out" data-speed="2.5">
          Node.js
        </div>
        <div className="floating-element absolute top-20 right-20 text-white/35 font-semibold text-xs transition-transform duration-300 ease-out" data-speed="3">
          Tailwind CSS
        </div>

        {/* Row 2 - Upper Middle */}
        <div className="floating-element absolute top-48 left-16 text-purple-200/40 font-semibold text-sm transition-transform duration-300 ease-out" data-speed="2">
          JavaScript ES6
        </div>
        <div className="floating-element absolute top-56 left-1/3 text-white/40 font-semibold text-xs transition-transform duration-300 ease-out" data-speed="1.5">
          Redux
        </div>
        <div className="floating-element absolute top-52 right-1/3 text-purple-100/45 font-semibold text-sm transition-transform duration-300 ease-out" data-speed="2.5">
          GraphQL
        </div>
        <div className="floating-element absolute top-60 right-16 text-white/35 font-semibold text-xs transition-transform duration-300 ease-out" data-speed="3">
          MongoDB
        </div>

        {/* Row 3 - Center */}
        <div className="floating-element absolute top-1/2 left-24 text-purple-200/40 font-semibold text-sm transition-transform duration-300 ease-out" data-speed="2">
          Webpack
        </div>
        <div className="floating-element absolute top-1/2 left-2/3 text-white/45 font-semibold text-sm transition-transform duration-300 ease-out" data-speed="1.5">
          REST API
        </div>
        <div className="floating-element absolute top-1/2 right-24 text-purple-100/35 font-semibold text-xs transition-transform duration-300 ease-out" data-speed="2.5">
          Express.js
        </div>

        {/* Row 4 - Lower Middle */}
        <div className="floating-element absolute bottom-1/3 left-32 text-white/40 font-semibold text-sm transition-transform duration-300 ease-out" data-speed="3">
          Vite
        </div>
        <div className="floating-element absolute bottom-1/3 left-1/2 text-purple-200/45 font-semibold text-xs transition-transform duration-300 ease-out" data-speed="2">
          Firebase
        </div>
        <div className="floating-element absolute bottom-1/3 right-32 text-white/35 font-semibold text-sm transition-transform duration-300 ease-out" data-speed="1.5">
          AWS
        </div>

        {/* Row 5 - Bottom */}
        <div className="floating-element absolute bottom-20 left-20 text-purple-100/40 font-semibold text-sm transition-transform duration-300 ease-out" data-speed="2.5">
          Material UI
        </div>
        <div className="floating-element absolute bottom-24 left-1/3 text-white/45 font-semibold text-xs transition-transform duration-300 ease-out" data-speed="2">
          Docker
        </div>
        <div className="floating-element absolute bottom-28 right-1/3 text-purple-200/35 font-semibold text-sm transition-transform duration-300 ease-out" data-speed="3">
          Git
        </div>
        <div className="floating-element absolute bottom-20 right-20 text-white/40 font-semibold text-xs transition-transform duration-300 ease-out" data-speed="1.5">
          PostgreSQL
        </div>
      </div>

      {/* Floating Code Symbols - WHITE & LIGHT PURPLE, SMALLER */}
      <div className="absolute inset-0 pointer-events-none z-0 font-mono">
        <div className="floating-element absolute top-24 left-1/3 text-2xl text-white/25 transition-transform duration-300 ease-out" data-speed="2">{`</>`}</div>
        <div className="floating-element absolute top-1/4 right-1/4 text-xl text-purple-200/25 transition-transform duration-300 ease-out" data-speed="1.5">{`{}`}</div>
        <div className="floating-element absolute bottom-1/4 left-1/4 text-2xl text-purple-100/25 transition-transform duration-300 ease-out" data-speed="3">{`<div>`}</div>
        <div className="floating-element absolute bottom-1/3 right-1/4 text-xl text-white/25 transition-transform duration-300 ease-out" data-speed="2.5">{`=>`}</div>
        <div className="floating-element absolute top-1/2 left-1/6 text-lg text-white/20 transition-transform duration-300 ease-out" data-speed="2">{`[ ]`}</div>
        <div className="floating-element absolute top-2/3 right-1/6 text-lg text-purple-200/20 transition-transform duration-300 ease-out" data-speed="1.5">{`( )`}</div>
        <div className="floating-element absolute top-1/3 right-1/5 text-xl text-purple-100/25 transition-transform duration-300 ease-out" data-speed="3">{`</>`}</div>
        <div className="floating-element absolute bottom-1/2 left-1/5 text-lg text-white/20 transition-transform duration-300 ease-out" data-speed="2">{`const`}</div>
      </div>

      {/* Content - LEFT ALIGNED */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mb-40">
        
        {/* Title - LEFT aligned, multi-line */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 animate-fadeInUp text-white leading-tight text-left max-w-4xl">
          Flexible solutions<br />
          for every stage of<br />
          your hiring journey
        </h1>

        {/* Main Description - FULL WIDTH to the right */}
        <p className="text-gray-200 text-lg sm:text-xl lg:text-2xl mb-6 leading-relaxed animate-fadeInUp animation-delay-200 text-left">
          From free job posting and inbound applicants to advanced, all-in-one solutions that take care of everything for you — we provide every level of support your team may need, no matter the scale.
        </p>

        {/* Secondary text - FULL WIDTH */}
        <p className="text-gray-300 text-base sm:text-lg lg:text-xl mb-4 animate-fadeInUp animation-delay-300 text-left">
          Looking for something a bit more specific? We're happy to create a custom solution fit for your team.
        </p>

        {/* Call to action text - LEFT aligned */}
        <p className="text-gray-400 text-base sm:text-lg animate-fadeInUp animation-delay-400 text-left">
          Find the React job that fits your skills and needs →
        </p>

      </div>

      {/* Cards Section - INTEGRATED */}
      <div className="max-w-7xl lg:container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* For Developers Card */}
          <div className="bg-blue-900/20 backdrop-blur-md border border-white/10 rounded-2xl p-12 shadow-2xl transition-all duration-300 hover:scale-105 animate-fadeInUp min-h-[400px] flex flex-col">
            <h2 className="text-3xl font-bold text-white mb-6">For Developers 🧑‍💻</h2>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed flex-grow">
              Browse our React jobs and start your career today. Connect with top companies hiring React developers and take the next step in your professional journey.
            </p>
            <Link 
              to="/jobs" 
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg w-fit"
            >
              Browse Jobs →
            </Link>
          </div>

          {/* For Employers Card */}
          <div className="bg-blue-900/20 backdrop-blur-md border border-white/10 rounded-2xl p-12 shadow-2xl transition-all duration-300 hover:scale-105 animate-fadeInUp animation-delay-200 min-h-[400px] flex flex-col">
            <h2 className="text-3xl font-bold text-white mb-6">For Employers 🏢</h2>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed flex-grow">
              List your job to find the perfect developer for the role. Reach thousands of qualified React developers actively looking for new opportunities.
            </p>
            <Link 
              to="/add-job" 
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white rounded-lg px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg w-fit"
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