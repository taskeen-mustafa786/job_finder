import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const skillsList = skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
      const keywords = degree ? [degree.toLowerCase().split(" ")[0]] : [];

      // Store in session/state and navigate to jobs
      sessionStorage.setItem(
        "searchParams",
        JSON.stringify({
          skills: skillsList,
          country,
          degree,
          experience,
          keywords,
        })
      );

      navigate("/jobs");
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-10 shadow-lg mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Find Jobs That Match Your Skills
        </h1>
        <p className="text-lg opacity-90 max-w-xl">
          AI-powered job matching with skill gap analysis. Upload resume or fill
          out your qualifications to discover remote jobs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Job Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Search for Jobs</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Highest Degree
              </label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., BS Computer Science"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 2"
                min="0"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Relevant Skills (comma-separated)
              </label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Python, React, Machine Learning"
                rows="4"
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Preferred Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Pakistan, USA, worldwide"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Searching..." : "Find Jobs"}
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-blue-600">
              🎯 How It Works
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="mr-3 text-blue-500 font-bold">1.</span>
                <span>Fill out your qualifications and skills</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-500 font-bold">2.</span>
                <span>Our AI analyzes job requirements and your profile</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-500 font-bold">3.</span>
                <span>Get matched with the best opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-500 font-bold">4.</span>
                <span>See skill gaps and learn what's needed</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <h3 className="text-xl font-bold mb-3 text-blue-600">
              ✨ Features
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ AI-powered job matching</li>
              <li>✓ Skill gap analysis</li>
              <li>✓ Remote and local opportunities</li>
              <li>✓ Semantic skill matching</li>
              <li>✓ No registration required</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
