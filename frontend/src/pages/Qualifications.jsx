import React, { useState } from 'react';
import { fetchJobs } from '../api/jobs';

export default function Qualifications() {
const [degree, setDegree] = useState('');
const [experience, setExperience] = useState('');
const [skills, setSkills] = useState('');
const [country, setCountry] = useState('Pakistan');
const [jobs, setJobs] = useState([]);
const [matchMessage, setMatchMessage] = useState('');

const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const skillsList = skills.split(',').map(s => s.trim());
  const res = await fetchJobs({ skills: skillsList, country });

  setJobs(res.jobs || []);
  setLoading(false);

  setMatchMessage(
    degree && experience
      ? `Top matches based on ${degree} & ${experience} years experience`
      : "Add degree and experience for better results"
  );
};


return ( 
<div className="p-6 max-w-3xl mx-auto"> 
    <h1 className="text-3xl font-bold mb-4">Qualification Check</h1> 
    <form className="space-y-4" onSubmit={handleSubmit}> 
        <div> 
            <label className="block font-semibold">Highest Degree</label>
            <input type="text" value={degree} onChange={e => setDegree(e.target.value)} className="w-full p-2 border rounded" placeholder="e.g., BS Computer Science" /> 
        </div> 
        <div> 
            <label className="block font-semibold">Years of Experience</label>
            <input type="number" value={experience} onChange={e => setExperience(e.target.value)} className="w-full p-2 border rounded" placeholder="e.g., 2" /> 
        </div>
        <div> 
            <label className="block font-semibold">Relevant Skills</label>
            <textarea value={skills} onChange={e => setSkills(e.target.value)} className="w-full p-2 border rounded" placeholder="e.g., Python, React, AI"></textarea> </div>
        <div> 
            <label className="block font-semibold">Country</label>
            <input type="text" value={country} onChange={e=>setCountry(e.target.value)} className="w-full p-2 border rounded" /> </div>
        <button
  disabled={loading}
  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
>
  {loading ? "Analyzing..." : "Check Match"}
</button>
 
    </form>
{matchMessage && <p className="mt-4 text-green-700 font-medium">{matchMessage}</p>} <div className="mt-6">
{jobs.length > 0 && <h2 className="text-2xl font-bold mb-2">Job Matches</h2>}
{jobs.map((job, idx) => ( <div key={idx} className="p-4 bg-white rounded shadow mb-2"> <h3 className="font-bold">{job.title}</h3> 
    <div className="text-sm text-gray-600">{job.company} | {job.location}</div> 
    <div className="mt-1">Missing Skills: {job.missing_skills && job.missing_skills.length ? job.missing_skills.join(', ') : 'None'}</div>
    <div className="mt-1"><a href={job.url} target="_blank" className="text-blue-500 underline">Apply</a></div> 
</div>
))} </div> 
</div>
);
}
