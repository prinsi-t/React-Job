import React from 'react'

import { useEffect, useState } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';     


const JobListings = ({ isHome = false}) => {
    //console.log(jobs);
    const [jobs, setJobs] = useState([]); 
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      
      const fetchJobs = async () => {
        const apiUrl = isHome ? 'http://localhost:5000/api/jobs?_limit=3' : 'http://localhost:5000/api/jobs';
        try {
        const res  = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        } finally {
          setLoading(false);
        } 
      }
      fetchJobs();
    }, []);
  return (
    <section className="px-4 py-10">
        <div className="max-w-7xl lg:container m-auto">
          <h2 className="font-bold text-indigo-500 mb-6 text-center">{isHome ? 'Recent Jobs' : 'Browse Jobs'}  </h2>
          
            { loading ? (
              <Spinner loading={loading} /> 
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {jobs.map((job) =>  (
           <JobListing key={job._id} job={job} />
            ))}
            </div>  
            )}
            
          </div>
      
      </section>
    )
}

export default JobListings
