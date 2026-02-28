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
        description: job.__description__ || job.description, // ✅ FIXED: Use full description
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
   
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
    {!isHome && (
      <section className="relative z-10">
        <div className="container mx-auto py-6 px-6">
          <Link to='/' className="text-white hover:text-blue-300 flex items-center transition-colors duration-300">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>
      </section>
    )}
    <section className=" px-4 py-10">
      <div className="container-xl lg:container m-auto ">
        {!isHome && (
          <div className="flex justify-center gap-4 mb-6 ">
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
              
              className="border px-4 py-2 rounded-lg text-white bg-gray-800 cursor-pointer"
            >
              
               <option value="recent">Recent Jobs</option>
              <option value="in">India</option>
              <option value="us">USA</option>
              <option value="gb">UK</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              

            </select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobListing key={job._id || job.id} job={job} />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
          </div>
        )}

{hasMore && !loading && !isHome && country !== "recent" && (
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-blue-700 hover:bg-blue-900 text-white px-6 py-2 rounded-lg"
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