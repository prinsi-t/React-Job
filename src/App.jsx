import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import MainLayout from './layouts/MainLayout'
import JobsPage from './components/pages/JobsPage'
import NotFoundPage from './components/pages/NotFoundPage'
import AddJobPage from './components/pages/AddJobPage'
import JobPage, { jobLoader } from './components/pages/JobPage'


const App = () => {

  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return;
  }
  
  const deleteJob = async (id) => {
    console.log('dlete', id);
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader} /> 
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    
    )
  );

  return <RouterProvider router={router} />
}

export default App
  