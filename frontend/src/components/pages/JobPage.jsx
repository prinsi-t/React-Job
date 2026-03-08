import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaArrowLeft, FaMapMarker, FaExternalLinkAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const JobPage = ({ deleteJob }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation();
  const backSearch = location.state?.search || "";
  const passedJob = location.state?.job;
  const { user } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const stripHTML = (html) => {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (id.startsWith("adzuna_") && passedJob) {
          const cleanDescription = stripHTML(passedJob.description);
          
          setJob({
            ...passedJob,
            description: cleanDescription,
            source: "adzuna"
          });
          setLoading(false);
          return;
        }

        if (id.startsWith("adzuna_")) {
          toast.error("Job data not available");
          navigate("/jobs");
          return;
        }

        const API_URL = import.meta.env.VITE_API_URL;
        
        const res = await fetch(`${API_URL}/api/jobs/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const data = await res.json();
        
        setJob({
          ...data,
          source: "db"
        });
        
      } catch (error) {
        console.error(error);
        toast.error("Failed to load job");
        navigate("/jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate, passedJob]);

  const onDeleteClick = (job) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    deleteJob(job._id);
    toast.success("Job deleted successfully");
    navigate("/jobs");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <p className="text-xl text-white">Job not found</p>
      </div>
    );
  }

  const isOwner = job.source === "db" && 
                  job.userEmail && 
                  job.userEmail === user?.email;

  const getApplyLink = () => {
    if (job.source === "adzuna" && job.applyLink) {
      return job.applyLink;
    }
    if (job.source === "db") {
      if (job.applyLink) {
        return job.applyLink;
      }
      if (job.company?.contactEmail) {
        return `mailto:${job.company.contactEmail}`;
      }
    }
    return null;
  };

  const applyLink = getApplyLink();
  const description = job?.description || 'No description available';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-800/15 rounded-full blur-3xl animate-float animation-delay-400"></div>
      </div>

      {/* Back Button */}
      <section className="relative z-10">
        <div className="container mx-auto py-6 px-6">
          <Link to={`/jobs${backSearch}`} className="text-white hover:text-blue-300 flex items-center transition-colors duration-300">
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      {/* Job Details */}
      <section className="relative z-10 pb-16">
        <div className="container mx-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            
            {/* Main Content */}
            <main>
              <div className="modern-card animate-fadeInUp">
                <h1 className="text-4xl font-bold mb-4 text-blue-400">
                  {job?.title}
                </h1>

                <div className="text-gray-400 mb-4 flex items-center">
                  <FaMapMarker className="text-lg text-red-500 mr-2" />
                  <p className="text-white">{job?.location}</p>
                </div>
              </div>

              <div className="modern-card mt-6 animate-fadeInUp animation-delay-200">
                <h3 className="text-blue-400 text-xl font-bold mb-6">
                  Job Description
                </h3>

                <div className="mb-4 whitespace-pre-wrap leading-relaxed text-white">
                  {description}
                </div>

                {job.source === "adzuna" && applyLink && (
                  <div className="mt-4 p-4 bg-blue-900/30 border-l-4 border-blue-500 rounded">
                    <p className="text-sm text-blue-300 flex items-center gap-2">
                      <FaExternalLinkAlt className="text-blue-400" />
                      <span>
                        <strong>Full job details available on company website.</strong> Click "View Full Job & Apply" below.
                      </span>
                    </p>
                  </div>
                )}

                <h3 className="text-blue-400 text-xl font-bold mb-2 mt-6">Salary</h3>
                <p className="mb-4 text-white">{job?.salary || 'Not disclosed'} {job?.salary && job.salary !== 'Not disclosed' && '/ Year'}</p>
              </div>
            </main>

            {/* Sidebar */}
            <aside>
              <div className="modern-card animate-fadeInUp animation-delay-400">
                <h3 className="text-xl font-bold mb-6 text-blue-400">Company Info</h3>

                <h2 className="text-2xl text-white mb-2">
                  {job?.company?.name || 'Company name not available'}
                </h2>

                {job?.company?.description && (
                  <p className="my-2 whitespace-pre-wrap text-gray-300">
                    {job.company.description}
                  </p>
                )}

                <hr className="my-4 border-white/10" />

                <h3 className="text-lg text-blue-400">Contact Email:</h3>
                <p className="my-2 bg-white/5 p-2 font-bold text-gray-300 rounded">
                  {job?.company?.contactEmail || 'Not available'}
                </p>

                <h3 className="text-lg text-blue-400">Contact Phone:</h3>
                <p className="my-2 bg-white/5 p-2 font-bold text-gray-300 rounded">
                  {job?.company?.contactPhone || 'Not available'}
                </p>

                {(job.category || job.contractType || job.type || job.posted) && (
                  <div className="mt-4 space-y-2">
                    {job.category && (
                      <>
                        <h3 className="text-lg text-blue-400">Category:</h3>
                        <p className="bg-white/5 p-2 text-gray-300 rounded">{job.category}</p>
                      </>
                    )}

                    {(job.contractType || job.type) && (
                      <>
                        <h3 className="text-lg text-blue-400">Contract:</h3>
                        <p className="bg-white/5 p-2 text-gray-300 rounded">
                          {job.contractType || "Permanent"} • {job.type || "Full-Time"}
                        </p>
                      </>
                    )}

                    {job.posted && (
                      <>
                        <h3 className="text-lg text-blue-400">Posted:</h3>
                        <p className="bg-white/5 p-2 text-gray-300 rounded">
                          {new Date(job.posted).toDateString()}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {applyLink && !isOwner && (
                <div className="modern-card mt-6 animate-fadeInUp animation-delay-600">
                  <h3 className="text-xl font-bold mb-6 text-white">
                    {job.source === "adzuna" ? "View Full Job & Apply" : "Apply for this Job"}
                  </h3>
                  <a
                    href={applyLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-modern bg-gradient-to-r from-green-600 to-green-500 hover:from-green-600 hover:to-green-700 text-white text-center font-bold py-3 px-4 rounded-lg w-full block flex items-center justify-center gap-2 hover-lift"
                  >
                    {applyLink.startsWith('mailto:') ? (
                      'Apply via Email'
                    ) : (
                      <>
                        <FaExternalLinkAlt />
                        {job.source === "adzuna" ? "View Full Job & Apply" : "Apply on Company Website"}
                      </>
                    )}
                  </a>
                </div>
              )}

              {isOwner && (
                <div className="modern-card mt-6 animate-fadeInUp animation-delay-600">
                  <h3 className="text-xl font-bold mb-6 text-white">Manage Job</h3>

                  <Link
                    to={`/edit-job/${job?._id}`}
                    state={{ job }}
                    className="btn-modern bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white text-center font-bold py-3 px-4 rounded-lg w-full block mb-4 hover-lift"
                  >
                    Edit Job
                  </Link>

                  <button
                    onClick={() => onDeleteClick(job)}
                    className="btn-modern cursor-pointer bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-red-800 text-white text-center font-bold py-3 px-4 rounded-lg w-full focus:outline-none hover-lift"
                  >
                    Delete Job
                  </button>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default JobPage