import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import JobListing from "./JobListing";
import { FaArrowLeft, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";
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
      const currentYear = new Date().getFullYear();

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {jobs.map((job, index) => (
              <div 
                key={job._id || job.id}
                className="h-full"
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
      {/* Footer */}
      <footer className="relative mt-auto z-10 bg-gradient-to-br from-slate-950/95 via-blue-950/95 to-slate-950/95 backdrop-blur-sm border-t border-white/10">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-10 right-20 w-[400px] h-[400px] bg-blue-800/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Services */}
            <div className="space-y-3">
              <h6 className="text-lg font-semibold text-white mb-4">Services</h6>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Branding</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Design</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Marketing</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Advertisement</a>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <h6 className="text-lg font-semibold text-white mb-4">Company</h6>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">About us</a>
              <Link to="/jobs" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Jobs</Link>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Contact</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Press kit</a>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <h6 className="text-lg font-semibold text-white mb-4">Legal</h6>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Terms of use</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Privacy policy</a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">Cookie policy</a>
            </div>

            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="ReactJobs Logo" className="w-10 h-10 object-contain" />
                <span className="text-xl font-bold text-white">ReactJobs.com</span>
              </div>
              <p className="text-white/70 text-sm">Providing reliable tech jobs since {currentYear - 5}</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/70 text-sm">© {currentYear} ReactJobs Industries Ltd. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 text-white" aria-label="Twitter">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-110 text-white" aria-label="YouTube">
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 text-white" aria-label="Facebook">
                  <FaFacebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobListings;