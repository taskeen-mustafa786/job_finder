import { Link } from "react-router-dom";


export default function Navbar() {
return (
<nav className="w-full bg-blue-600 text-white p-4 flex justify-between px-8 shadow-md">
<h1 className="text-xl font-bold">AI Job Finder</h1>
<div className="space-x-4">
<Link to="/">Dashboard</Link>
<Link to="/jobs">Jobs</Link>
<Link to="/profile">Profile</Link>
<Link to="/login">Login</Link>
<Link to="/signup">Signup</Link>
</div>
</nav>
);
}