import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";
import React from 'react'

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold">AI Job Finder</h1>

        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/jobs" className="hover:text-blue-400">Jobs</Link>

          {loggedIn && (
            <Link to="/profile" className="hover:text-blue-400">
              Profile
            </Link>
          )}

          {!loggedIn ? (
            <>
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
              <Link to="/signup" className="hover:text-blue-400">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-500 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
