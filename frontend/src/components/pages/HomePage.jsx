import React from 'react'
import Hero from '../Hero'
import JobListings from '../JobListings'
import ViewAllJobs from '../ViewAllJobs'

const HomePage = () => {
  return (
    <>
    
      <Hero />
      <JobListings isHome={true} />
      <ViewAllJobs />

    </>
  )
}

export default HomePage