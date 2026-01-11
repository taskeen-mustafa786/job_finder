import React from "react";

export default function Profile() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">Your Profile</h1>
        <p className="text-gray-600 mb-4">
          Complete your profile to improve AI job matches.
        </p>

        <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
          Connect LinkedIn
        </button>
      </div>
    </div>
  );
}
