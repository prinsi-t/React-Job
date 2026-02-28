import React from 'react'
import { Link } from 'react-router-dom'

const ViewAllJobs = () => {
  return (
    <section className="max-w-lg my-8 px-6 mx-auto text-center">
      <Link 
        to="/jobs" 
        className="btn-modern inline-block bg-gradient-to-r from-slate-900 to-slate-800 hover:from-blue-700 hover:to-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover-lift shadow-2xl transition-all duration-300 animate-fadeInUp border border-white/10"
      >
        View All Jobs →
      </Link>
    </section>
  )
}

export default ViewAllJobs