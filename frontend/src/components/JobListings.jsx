import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import JobListing from "./JobListing";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const cacheRef = React.useRef({});

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultCountry = searchParams.get("country") || "recent";
  const [country, setCountry] = useState(defaultCountry);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchJobs = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
  
    try {
      // ✅ RECENT → ONLY MONGODB (already sorted by backend)
      if (country === "recent") {
        const cacheKey = `recent`;
        
        if (cacheRef.current[cacheKey]) {
          const cachedJobs = cacheRef.current[cacheKey];
          setJobs(isHome ? cachedJobs.slice(0, 3) : cachedJobs);
          setLoading(false);
          setHasMore(false);
          return;
        }

        const dbRes = await fetch(`${API_URL}/api/jobs`);
        const dbJobs = await dbRes.json();
  
        const formattedDbJobs = dbJobs.map((job) => ({
          ...job,
          source: "db",
        }));

        cacheRef.current[cacheKey] = formattedDbJobs;
        setJobs(isHome ? formattedDbJobs.slice(0, 3) : formattedDbJobs);
        setHasMore(false);
        setLoading(false);
        return;
      }
  
      // ✅ COUNTRIES → ONLY ADZUNA
      const cacheKey = `${country}-${page}`;
      
      if (cacheRef.current[cacheKey]) {
        setJobs((prev) =>
          page === 1
            ? cacheRef.current[cacheKey]
            : [...prev, ...cacheRef.current[cacheKey]]
        );
        setLoading(false);
        return;
      }

      const apiRes = await fetch(
          `${API_URL}/api/live-jobs?page=${page}&country=${country}`
      );
  
      const apiJobs = await apiRes.json();
  
      const formattedApiJobs = apiJobs.map((job) => ({
        id: job.id,
        title: job.title,
        type: job.contract_time || "Full-Time",
        contractType: job.contract_type || "Permanent",
        category: job.category?.label || "General",
        posted: job.created,
        location: job.location?.display_name || "Remote",
        description: job.__description__ || job.description,
        salary:
          job.salary_min && job.salary_max
            ? `${job.salary_min} - ${job.salary_max}`
            : "Not disclosed",
        applyLink: job.redirect_url,
        company: {
          name: job.company?.display_name || "Unknown",
        },
        source: "adzuna",
      }));

      cacheRef.current[cacheKey] = formattedApiJobs;
  
      setJobs((prev) =>
        page === 1 ? formattedApiJobs : [...prev, ...formattedApiJobs]
      );
  
      if (formattedApiJobs.length === 0) setHasMore(false);
    } catch (err) {
      console.error(err);
    }
  
    setLoading(false);
  };

  useEffect(() => {
    setJobs([]);
    setPage(1);
    setHasMore(true);
    fetchJobs();
  }, [country]);

  useEffect(() => {
    if (page > 1 && country !== "recent") {
      fetchJobs();
    }
  }, [page]);
  
  useEffect(() => {
    const urlCountry = searchParams.get("country") || "recent";
    if (urlCountry !== country) {
      setCountry(urlCountry);
    }
  }, [searchParams]);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950  flex flex-col relative overflow-hidden">
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-800/15 rounded-full blur-3xl animate-float animation-delay-400"></div>
      </div>

      {/* Back Button */}
      {!isHome && (
        <section className="relative z-10">
          <div className="container mx-auto py-6 px-6">
            <Link to='/' className="text-blue-400 hover:text-blue-300 flex items-center transition-colors duration-300">
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="relative z-10 px-4 py-10">
        <div className="container-xl lg:container mx-auto">
          
          {/* Country Filter */}
          {!isHome && (
            <div className="flex justify-center gap-4 mb-8">
              <select
                value={country}
                onChange={(e) => {
                  const value = e.target.value;
                  setCountry(value);
                  setSearchParams({ country: value });
                  setPage(1);
                  setJobs([]);
                  setHasMore(true);
                }}
                className="bg-white/10 border border-white/20 text-white rounded-lg px-6 py-3 focus:outline-none focus:border-blue-500 transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                <option value="recent" className="bg-slate-900">Recent Jobs</option>
                <option value="in" className="bg-slate-900">India</option>
                <option value="us" className="bg-slate-900">USA</option>
                <option value="gb" className="bg-slate-900">UK</option>
                <option value="ca" className="bg-slate-900">Canada</option>
                <option value="au" className="bg-slate-900">Australia</option>
              </select>
            </div>
          )}

          {/* Job Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <div 
                key={job._id || job.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <JobListing job={job} />
              </div>
            ))}
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center mt-8">
              <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && !loading && !isHome && country !== "recent" && (
            <div className="text-center mt-10">
              <button
                type="button"
                onClick={() => setPage((prev) => prev + 1)}
                className="btn-modern bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover-lift shadow-lg transition-all duration-300"
              >
                Load More Jobs
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobListings;