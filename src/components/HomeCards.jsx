import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'

const HomeCards = () => {
  return (
    <section className="py-8">
      <div className="max-w-7xl lg:container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* For Developers Card */}
          <div className="modern-card hover-lift animate-fadeInUp bg-gradient-to-br from-slate-900/90 via-blue-950/90 to-slate-900/90 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-3">For Developers</h2>
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
          <div className="modern-card hover-lift animate-fadeInUp animation-delay-200 bg-gradient-to-br from-indigo-900/90 via-purple-950/90 to-indigo-900/90 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-3">For Employers</h2>
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

export default HomeCards