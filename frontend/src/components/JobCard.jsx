import React from "react";

export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-xl font-bold mb-1">{job.title}</h2>
      <p className="text-gray-700">{job.company}</p>
      <p className="text-gray-500 text-sm mb-3">{job.location}</p>

      <a
        href={job.url}
        target="_blank"
        className="inline-block mt-2 text-blue-600 font-medium hover:underline"
      >
        Apply →
      </a>
    </div>
  );
}
