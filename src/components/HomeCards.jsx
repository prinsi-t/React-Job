import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
const HomeCards = () => {
  return (
       <section>
        <div className="max-w-7xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <Card>
              <h2 className="font-bold">For Developers</h2>
              <p>Browse our React jobs and start your career today</p>
              <Link to="/jobs" className="block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 mt-3">Browse Jobs</Link>
            </Card>
            <Card  bg ='bg-indigo-100'>
              <h2 className="font-bold">For Employers</h2>
              <p>List your job to find the perfect developer for the role</p>
            <Link to="/add-job" className="block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 mt-3">Add Job</Link>
            </Card>
          </div>
        </div>
      </section>






  )
}

export default HomeCards
