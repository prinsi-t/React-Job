import React from 'react'
import Hero from '../Hero'
import JobListings from '../JobListings'

const HomePage = () => {
  return (
    <>
    
      <Hero />
      <JobListings isHome={true} />

    </>
  )
}

export default HomePage