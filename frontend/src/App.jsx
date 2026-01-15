import React from 'react';
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import JobResults from "./pages/JobResults";

import { Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<JobResults />} />
        </Routes>
      </div>
    </div>
  );
}
