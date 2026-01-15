import React from "react";

export default function JobCard({ job }) {
  const matchPercentage = Math.round((job.score || 0) * 100);

  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-xl font-bold">{job.title}</h2>
          <p className="text-gray-700">{job.company}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
          {matchPercentage}% Match
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-4">{job.location}</p>

      {job.missing_skills && job.missing_skills.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Skills to Learn:</p>
          <div className="flex flex-wrap gap-2">
            {job.missing_skills.slice(0, 5).map((skill, idx) => (
              <span
                key={idx}
                className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
            {job.missing_skills.length > 5 && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                +{job.missing_skills.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        View Job →
      </a>
    </div>
  );
}
