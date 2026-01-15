import { Link } from "react-router-dom";
import React from 'react'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold">AI Job Finder</h1>

        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/jobs" className="hover:text-blue-400">Find Jobs</Link>
        </div>
      </div>
    </nav>
  );
}
