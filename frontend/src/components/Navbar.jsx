import React from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold tracking-wide">
          AI Job Finder
        </h1>

        <div className="space-x-6 text-sm font-medium">
          {["/", "/jobs", "/profile", "/login", "/signup"].map((path, i) => (
            <Link
              key={i}
              to={path}
              className="hover:text-blue-400 transition duration-200"
            >
              {path === "/" ? "Dashboard" : path.replace("/", "")}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
