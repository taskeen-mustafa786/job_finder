import React,{ useState } from "react";
import JobCard from "../components/JobCard";


export default function JobResults() {
const [jobs] = useState([]); // API will come later


return (
<div className="p-8">
<h1 className="text-2xl font-bold mb-4">Job Results</h1>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{/* {jobs.map((job, i) => <JobCard key={i} job={job} />)} */}
</div>
</div>
);
}