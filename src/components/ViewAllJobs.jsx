import React from 'react'
import { Link } from 'react-router-dom'

const ViewAllJobs = () => {
  return (
    <section className="max-w-lg my-10 px-6 mx-auto text-center">
        <Link to="/jobs" className="inline-block bg-black text-white py-4 px-6 rounded-xl hover:bg-gray-700">View All Jobs</Link>
      </section>
  )
}

export default ViewAllJobs
