import React, { useEffect, useState } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [country, setCountry] = useState("local");

  const [city, setCity] = useState("");
const [stateLoc, setStateLoc] = useState("");

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
  
      try {
        let merged = [];
  
        // 👉 MY JOBS (MongoDB)
        if (country === "local") {
          const localRes = await fetch("http://localhost:5000/api/jobs");
          const localJobs = await localRes.json();
  
          merged = localJobs;
          setHasMore(false); // no load more for local
        } 
        // 👉 API JOBS (Adzuna)
        else {
          const apiRes = await fetch(
           `http://localhost:5000/api/live-jobs?page=${page}&country=${country}&city=${city}&state=${stateLoc}`
          );
          const apiJobs = await apiRes.json();
  
          const formattedApiJobs = apiJobs.map((job) => ({
            _id: job.id,
            title: job.title,
            type: job.contract_type || "N/A",
            location: job.location?.display_name || "N/A",
            description: job.description,
            salary: job.salary_min || "N/A",
            company: {
              name: job.company?.display_name || "External Job",
              description: "External Job (Adzuna API)",
              contactEmail: "N/A",
              contactPhone: "N/A",
            },
          }));
  
          if (page === 1) {
            merged = formattedApiJobs;
          } else {
            merged = [...jobs, ...formattedApiJobs];
          }
  
          setHasMore(apiJobs.length > 0);
        }
  
        setJobs(isHome ? merged.slice(0, 3) : merged);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchJobs();
  }, [page, country, isHome]);
  

  return (

    <>
    <div className="flex justify-center gap-3 mb-6">
  <input
    value={city}
    onChange={(e) => setCity(e.target.value)}
    placeholder="City"
    className="border px-3 py-2 rounded-lg"
  />

  <input
    value={stateLoc}
    onChange={(e) => setStateLoc(e.target.value)}
    placeholder="State"
    className="border px-3 py-2 rounded-lg"
  />

  <button
    onClick={() => {
      setPage(1);
      setJobs([]);
      setHasMore(true);
    }}
    className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
  >
    Search
  </button>
</div>

    
    <section className="px-4 py-10">
      <div className="max-w-7xl lg:container m-auto">
        <h2 className="font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {!isHome && (
          <div className="text-center mb-6">
            <select
  value={country}
  onChange={(e) => {
    setCountry(e.target.value);
    setPage(1);
    setJobs([]);
    setHasMore(true);
    setCity("");
setStateLoc("");

  }}
  className="border px-3 py-2 rounded-lg"
>
  <option value="local">Recent Jobs</option>
  <option value="in">India</option>
  <option value="us">United States</option>
  <option value="gb">United Kingdom</option>
  <option value="ca">Canada</option>
  <option value="au">Australia</option>
</select>
          </div>
        )}

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListing key={job._id} job={job} />
              ))}
            </div>

            {!isHome && hasMore && !loading && country !== "local" && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg"
                >
                  Load More Jobs
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
    </>
  );
};

export default JobListings;
