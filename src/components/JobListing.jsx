import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaMapMarker } from 'react-icons/fa';
import { useEffect } from 'react'  

const JobListing = ({job}) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    
     let description = job?.description || ''

    if (!showFullDescription) {
      description = description.substring(0, 90) + '...';
    }
  
  
    return (
       <div key={job._id} className="modern-card hover-lift animate-fadeInUp bg-gradient-to-br from-slate-900/90 via-blue-950/90 to-slate-900/90 backdrop-blur-sm">
          {/* Job Type Badge */}
          <div className="mb-3">
            <span className="inline-block bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30">
              {job?.type}
            </span>
          </div>

          {/* Job Title */}
          <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors duration-300">
            {job?.title}
          </h3>

          {/* Description */}
          <div className="mt-3">
            <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
          </div>

          {/* More/Less Button */}
          <button 
            onClick={() => setShowFullDescription((prevState) => !prevState)} 
            className="mt-2 mb-4 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors duration-300"
          >
            {showFullDescription ? 'Show Less ↑' : 'Show More ↓'}
          </button>

          {/* Salary */}
          <div className="bg-white/5 rounded-lg px-3 py-2 mb-4">
            <h3 className="text-green-400 font-semibold">{job?.salary}</h3>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-4"></div>

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
            {/* Location */}
            <div className="text-gray-300 flex items-center">
              <FaMapMarker className="text-red-400 mr-2 flex-shrink-0" />
              <span className="text-sm">{job?.location}</span>
            </div>

            {/* View Details Button */}
            <Link 
              to={`/jobs/${job._id || `adzuna_${job.id}`}`} 
              state={{job, search: window.location.search }}
              onClick={() => window.scrollTo(0, 0)} 
              className="btn-modern bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover-lift shadow-lg w-full lg:w-auto text-center"
            >
              View Details →
            </Link>
          </div>
       </div>
  )
}

export default JobListing