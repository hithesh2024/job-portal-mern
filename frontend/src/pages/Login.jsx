import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "admin" ? "/admin" : (location.state?.from || "/"));
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return <AuthForm title="Welcome back" subtitle="Login to continue" form={form} setForm={setForm} submit={submit} error={error} login />;
}

function AuthForm({ title, subtitle, form, setForm, submit, error, login = false }) {
  return (
    <main className="auth-page">
      <form className="card auth-card" onSubmit={submit}>
        <p className="eyebrow">JOBHUB</p>
        <h1>{title}</h1><p className="muted">{subtitle}</p>
        {error && <div className="alert">{error}</div>}
        {!login && <input required placeholder="Full name" value={form.name || ""} onChange={e=>setForm({...form,name:e.target.value})} />}
        <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input required type="password" minLength="6" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button className="btn btn-primary full">{login ? "Login" : "Create Account"}</button>
        <p className="center muted">{login ? <>New here? <Link to="/register">Create an account</Link></> : <>Already registered? <Link to="/login">Login</Link></>}</p>
      </form>
    </main>);
}
