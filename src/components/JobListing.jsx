import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaMapMarker } from 'react-icons/fa';
import { useEffect } from 'react'  




const JobListing = ({job}) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    
    let description = job.description;

    if (!showFullDescription) {
      description = description.substring(0, 90) + '...';
    }
  
  
    return (
       <div key={job.id} className="rounded-xl shadow-md relative bg-white p-6">
                      <div>
                        <div className="text-sm text-gray-600 my-2">{job.type}</div>
                        <h3 className="font-bold">{job.title}</h3>
                      </div> 
                      <div className="mt-3">
                        {description}
                      </div>

                      <button onClick={() => setShowFullDescription((prevState) => !prevState)} className="text-indigo-500 mb-5 hover:text-indigo-600">
                        {showFullDescription ? 'Show Less' : 'Read More'}
                      </button>

                      <h3 className="text-indigo-500 mb-2 mt-4">{job.salary} / Year</h3>
                      <div className="border-t border-gray-100 mb-5 mt-2"></div>
                      <div className="flex lg:flex-row justify-between mb-4 items-center">
                        <div className="text-red-700 mb-3 flex items-center">
                          <FaMapMarker className="text-lg mb-1 mr-2" />
                          {job.location}
                        </div>
                        <Link to={`/jobs/${job.id}`} onClick={() => window.scrollTo(0, 0)} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm">Read More</Link>
                      </div>
                    </div>
  )
}

export default JobListing
