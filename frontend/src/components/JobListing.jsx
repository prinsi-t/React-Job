import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarker } from 'react-icons/fa';

const JobListing = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatType = (type) => {
    if (!type) return 'Full-Time';
    return type
      .replace(/_/g, '-')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  let description = job?.description || '';
  if (!showFullDescription) {
    description = description.substring(0, 90) + '...';
  }

  return (
    <div className="modern-card hover-lift animate-fadeInUp bg-blue-900/20 backdrop-blur-md h-full flex flex-col">
      
      {/* Content wrapper with z-index to sit above shine effect */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Job Type Badge */}
        <div className="mb-3">
          <span className="inline-block bg-green-500/20 text-green-300 text-xs font-semibold px-3 py-1 rounded-full border border-green-400/30">
            {formatType(job?.type)}
          </span>
        </div>

        {/* Job Title */}
        <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors duration-300">
          {job?.title}
        </h3>

        {/* Description */}
        <div className="mt-3 flex-grow">
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>

        {/* More/Less Button */}
        <button
          onClick={() => setShowFullDescription((prev) => !prev)}
          className="mt-2 mb-4 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors duration-300 text-left"
        >
          {showFullDescription ? 'Show Less ↑' : 'Show More ↓'}
        </button>

        {/* Salary + Bottom pinned to bottom */}
        <div className="mt-auto">
          <div className="bg-white/5 rounded-lg px-3 py-2 mb-4">
            <h3 className="text-green-400 font-semibold">{job?.salary}</h3>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-4"></div>

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
            <div className="text-gray-300 flex items-center">
              <FaMapMarker className="text-red-400 mr-2 flex-shrink-0" />
              <span className="text-sm">{job?.location}</span>
            </div>

            <Link
              to={`/jobs/${job._id || `adzuna_${job.id}`}`}
              state={{ job, search: window.location.search }}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl w-full lg:w-auto text-center"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default JobListing