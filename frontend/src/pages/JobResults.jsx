import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import { useNavigate } from "react-router-dom";

export default function JobResults() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = sessionStorage.getItem("searchParams");
    if (params) {
      const parsedParams = JSON.parse(params);
      setSearchParams(parsedParams);
      fetchJobs(parsedParams);
    }
  }, []);

  const fetchJobs = async (params) => {
    setLoading(true);
    setError("");
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: params.skills,
          country: params.country,
          keywords: params.keywords || [],
          degree: params.degree || "",
          experience: params.experience || 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch jobs");
      }

      const data = await response.json();
      setJobs(data.jobs || []);

      if (data.jobs.length === 0) {
        setError("No jobs found matching your criteria. Try adjusting your filters.");
      }
    } catch (err) {
      setError(err.message || "Error fetching jobs. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    sessionStorage.removeItem("searchParams");
    navigate("/");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Job Results</h1>
        {searchParams && (
          <div className="text-gray-600">
            <p>
              Showing matches for:{" "}
              <span className="font-semibold">
                {searchParams.skills.join(", ") || "No specific skills"}
              </span>
            </p>
            {searchParams.country && (
              <p>
                Location:{" "}
                <span className="font-semibold">{searchParams.country}</span>
              </p>
            )}
          </div>
        )}
        <button
          onClick={handleNewSearch}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          New Search
        </button>
      </div>

      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Analyzing jobs and matching with your skills...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">{error}</p>
        </div>
      )}

      {jobs.length === 0 && !loading && !error && (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No jobs yet</p>
          <p className="text-sm mt-2">
            {searchParams ? "Submit different qualifications to get more matches" : "Start by searching for jobs on the home page"}
          </p>
        </div>
      )}

      {jobs.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 font-semibold">
            Found {jobs.length} matching jobs
          </p>
        </div>
      )}

      {jobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <JobCard key={i} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
