import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({ name:"", phone:"", bio:"", skills:"" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) setForm({ name:user.name||"", phone:user.phone||"", bio:user.bio||"", skills:(user.skills||[]).join(", ") });
  }, [user]);

  const submit = async (e) => {
    e.preventDefault();
    await api.put("/auth/profile", { ...form, skills: form.skills.split(",").map(s=>s.trim()).filter(Boolean) });
    await refreshUser(); setMessage("Profile updated successfully.");
  };

  return <main className="container narrow section"><div className="card form-card"><p className="eyebrow">PROFILE</p><h1>Your profile</h1>
    {message && <div className="alert success">{message}</div>}
    <form onSubmit={submit}>
      <label>Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
      <label>Email<input value={user?.email||""} disabled/></label>
      <label>Phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label>
      <label>Skills<input value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})} placeholder="React, Node.js, MongoDB"/></label>
      <label>Bio<textarea rows="5" value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})}/></label>
      <button className="btn btn-primary">Save Profile</button>
    </form>
  </div></main>;
}
