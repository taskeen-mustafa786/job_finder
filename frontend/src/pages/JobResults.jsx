import React,{ useState } from "react";
import JobCard from "../components/JobCard";


export default function JobResults() {
  const [jobs] = useState([]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Job Results</h1>

      {jobs.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No jobs yet</p>
          <p className="text-sm mt-2">
            Submit qualifications to get AI matches
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <JobCard key={i} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
