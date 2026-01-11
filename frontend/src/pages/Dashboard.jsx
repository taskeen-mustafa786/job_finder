import React from "react";

export default function Dashboard() {
  return (
    <div className="p-10">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-10 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">
          Find Jobs That Match Your Skills
        </h1>
        <p className="text-lg opacity-90 max-w-xl">
          AI-powered job matching, skill gap analysis, and remote/local job discovery.
        </p>

        <div className="mt-6 flex gap-4">
          <a
            href="/jobs"
            className="bg-white text-blue-700 px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
          >
            Explore Jobs
          </a>
          <a
            href="/profile"
            className="border border-white px-6 py-2 rounded hover:bg-white hover:text-blue-700 transition"
          >
            Complete Profile
          </a>
        </div>
      </div>
    </div>
  );
}
