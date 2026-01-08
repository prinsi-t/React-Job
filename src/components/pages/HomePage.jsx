import React from 'react'
import Hero from '../Hero'
import HomeCards from '../HomeCards'
import JobListings from '../JobListings'
import ViewAllJobs from '../ViewAllJobs'

const HomePage = () => {
  return (
    <>
    
      <Hero />
      <HomeCards />
      <JobListings isHome={true}/>
      <ViewAllJobs />
    </>
  )
}

export default HomePage
