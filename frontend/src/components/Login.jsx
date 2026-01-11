import React,{ useState } from "react";


export default function Login() {
const [form, setForm] = useState({ email: "", password: "" });


const handleSubmit = (e) => {
e.preventDefault();
console.log("Login Data: ", form);
localStorage.setItem("user_id", res.user_id);
window.location.href = "/";

};


return (
<div className="flex justify-center mt-12">
<form className="bg-white p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
<h2 className="text-2xl font-bold mb-4">Login</h2>


<input className="input-box" placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} />
<input className="input-box" placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})} />


<button className="w-full bg-black text-white py-2 mt-4 rounded">Login</button>
</form>
</div>
);
}