import React from 'react';
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import JobResults from "./pages/JobResults";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";


export default function App() {
return (
<>
<Navbar />
<Routes>
<Route path="/" element={<Dashboard />} />
<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login />} />
<Route path="/jobs" element={<JobResults />} />
<Route path="/profile" element={<Profile />} />
</Routes>
</>
);
}