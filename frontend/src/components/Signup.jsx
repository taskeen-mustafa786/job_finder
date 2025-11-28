import React,{ useState } from "react";


export default function Signup() {
const [form, setForm] = useState({ name: "", email: "", password: "" });


const handleSubmit = (e) => {
e.preventDefault();
console.log("Signup Data: ", form);
};


return (
<div className="flex justify-center mt-12">
<form className="bg-white p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
<h2 className="text-2xl font-bold mb-4">Signup</h2>


<input className="input-box" placeholder="Full Name" onChange={(e)=>setForm({...form,name:e.target.value})} />
<input className="input-box" placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} />
<input className="input-box" placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})} />


<button className="w-full bg-black text-white py-2 mt-4 rounded">Signup</button>
</form>
</div>
);
}