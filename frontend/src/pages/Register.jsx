import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault(); setError("");
    try { await register(form.name, form.email, form.password); navigate("/"); }
    catch (err) { setError(err.response?.data?.message || "Registration failed"); }
  };

  return (
    <main className="auth-page">
      <form className="card auth-card" onSubmit={submit}>
        <p className="eyebrow">JOIN JOBHUB</p>
        <h1>Create account</h1><p className="muted">Start applying for jobs today.</p>
        {error && <div className="alert">{error}</div>}
        <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input required type="password" minLength="6" placeholder="Password (min 6 characters)" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        <button className="btn btn-primary full">Create Account</button>
        <p className="center muted">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </main>
  );
}
