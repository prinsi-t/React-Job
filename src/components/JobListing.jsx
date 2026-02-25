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
       <div key={job._id} className="rounded-xl shadow-md relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-9500 p-6">
                      <div>
                        <div className="text-sm text-white my-2">{job?.type}</div>
                        <h3 className="font-bold text-white">{job?.title}</h3>
                      </div> 
                      <div className="mt-3">
                        <p className="text-white">{description}</p>
                      </div>

                      <button onClick={() => setShowFullDescription((prevState) => !prevState)} className=" mb-5 hover:bg-gray-800 text-white">
                        {showFullDescription ? 'Less...' : 'More...'}
                      </button>

                      <h3 className="text-white mb-2 mt-4">{job?.salary}</h3>
                      <div className="border-t border-gray-500 mb-5 mt-2"></div>
                      <div className="flex lg:flex-row justify-between mb-4 items-center">
                        <div className="text-white mb-3 flex items-center">
                          <FaMapMarker className="text-lg text-red-500  mb-1 mr-2" />
                          {job?.location}
                        </div>
                        <Link to={`/jobs/${job._id || `adzuna_${job.id}`}`} 
                        state={{job, search: window.location.search }}
                            onClick={() => window.scrollTo(0, 0)} 
                            className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-center text-sm">
                        View Details
                      </Link>
                      </div>
                    

                      
                      


                    </div>
  )
}

export default JobListing