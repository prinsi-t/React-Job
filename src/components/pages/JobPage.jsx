import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom";


const JobPage = ({ deleteJob }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation();
  const backSearch = location.state?.search || "";
  const passedJob = location.state?.job;
  
  const [job, setJob] = useState(passedJob || null);
  const [loading, setLoading] = useState(!passedJob);

  useEffect(() => {
    // If job was passed via state, no need to fetch
    if (passedJob) {
      setJob(passedJob);
      setLoading(false);
      return;
    }

    // Otherwise fetch the job
    const fetchJob = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        
        // MongoDB job
        if (!id.startsWith("adzuna_")) {
          const res = await fetch(`${API_URL}/api/jobs/${id}`);
          if (!res.ok) throw new Error("Job not found");
          const data = await res.json();
          setJob(data);
        } else {
          // Adzuna job fallback
          setJob({
            _id: id,
            source: "adzuna",
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load job");
        navigate("/jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, passedJob, navigate]);


const onDeleteClick = (job) => {
  // ✅ Block Adzuna deletes only
  if (!job._id) {
    toast.info("Live jobs cannot be deleted");
    return;
  }

  const confirm = window.confirm("Are you sure you want to delete this job?");
  if (!confirm) return;

  deleteJob(job._id);
  toast.success("Job deleted successfully");
  navigate("/jobs");
};

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Job not found</p>
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link to={`/jobs${backSearch}`} className="text-indigo-500 hover:text-indigo-600 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <h1 className="text-3xl font-bold mb-4">
                  {job?.title}
                </h1>

                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-lg text-orange-700 mr-2" />
                  <p className="text-orange-700">{job?.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">{job?.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

                <p className="mb-4">{job?.salary} / Year</p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">
                  {job?.company?.name}
                </h2>

                <p className="my-2">
                  {job?.company?.description}
                </p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job?.company?.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job?.company?.contactPhone}
                </p>

                {job.source === "adzuna" && (
  <div className="mt-4 space-y-2">
                    <h3 className="text-xl">Category:</h3>

    <p>
    {job.category}
    </p>

    <h3 className="text-xl">Contract:</h3>

    <p>
     
    
        {job.contractType} • {job.type}
      
    </p>

    <h3 className="text-xl">Posted:</h3>

    <p>
     
        {job.posted
          ? new Date(job.posted).toDateString()
          : "N/A"}
      
    </p>

    
  </div>
)}



              </div>

              {!job?.isExternal && (
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>

                



{job.source === "adzuna" && job.applyLink && (
  <a
    href={job.applyLink}
    target="_blank"
    rel="noreferrer"
    className="bg-green-600 hover:bg-green-700 text-white text-center font-bold py-2 px-4 rounded-full w-full block mt-4"
  >
    Apply on Company Site
  </a>
)}



              </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default JobPage