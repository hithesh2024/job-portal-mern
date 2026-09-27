import { useEffect, useState } from "react";
import api from "../services/api";

const blank = { title:"", company:"", location:"Bangalore", type:"Full-time", experience:"0-1 years", salary:"₹25,000/month", description:"", skills:"React, Node.js, Express.js, MongoDB", requirements:"Strong JavaScript knowledge, REST API knowledge, Git/GitHub" };

export default function Admin() {
  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");

  const load = async () => {
    const [j, a] = await Promise.all([api.get("/jobs"), api.get("/applications")]);
    setJobs(j.data.jobs); setApps(a.data.applications);
  };
  useEffect(()=>{load();},[]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      skills: form.skills.split(",").map(x=>x.trim()).filter(Boolean),
      requirements: form.requirements.split(",").map(x=>x.trim()).filter(Boolean)
    };
    if (editing) await api.put(`/jobs/${editing}`, payload);
    else await api.post("/jobs", payload);
    setMessage(editing ? "Job updated." : "Job created.");
    setForm(blank); setEditing(null); load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this job?")) return;
    await api.delete(`/jobs/${id}`); load();
  };

  const edit = (job) => setForm({
    title:job.title, company:job.company, location:job.location, type:job.type, experience:job.experience,
    salary:job.salary, description:job.description, skills:job.skills.join(", "), requirements:job.requirements.join(", ")
  }) || setEditing(job._id);

  const setStatus = async (id, status) => { await api.put(`/applications/${id}/status`, {status}); load(); };

  return <main className="container section">
    <div className="section-heading"><div><p className="eyebrow">ADMIN</p><h1>Dashboard</h1></div></div>
    <div className="stats"><div className="stat"><b>{jobs.length}</b><span>Jobs</span></div><div className="stat"><b>{apps.length}</b><span>Applications</span></div></div>
    <div className="admin-grid">
      <section className="card form-card"><h2>{editing ? "Edit Job" : "Add New Job"}</h2>{message&&<div className="alert success">{message}</div>}
        <form onSubmit={submit}>
          {["title","company","location","experience","salary"].map(k=><input key={k} required={["title","company","location","experience"].includes(k)} placeholder={k[0].toUpperCase()+k.slice(1)} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/>)}
          <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Full-time</option><option>Part-time</option><option>Internship</option><option>Contract</option></select>
          <textarea required rows="5" placeholder="Job description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          <input placeholder="Skills, comma separated" value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})}/>
          <input placeholder="Requirements, comma separated" value={form.requirements} onChange={e=>setForm({...form,requirements:e.target.value})}/>
          <div className="button-row"><button className="btn btn-primary">{editing?"Update Job":"Create Job"}</button>{editing&&<button type="button" className="btn btn-outline" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}</div>
        </form>
      </section>
      <section className="card form-card"><h2>Manage Jobs</h2>
        {jobs.map(j=><div className="admin-item" key={j._id}><div><b>{j.title}</b><small>{j.company} · {j.location}</small></div><div className="button-row"><button className="btn btn-outline" onClick={()=>{setEditing(j._id);setForm({title:j.title,company:j.company,location:j.location,type:j.type,experience:j.experience,salary:j.salary,description:j.description,skills:j.skills.join(", "),requirements:j.requirements.join(", ")})}}>Edit</button><button className="btn btn-danger" onClick={()=>remove(j._id)}>Delete</button></div></div>)}
      </section>
    </div>
    <section className="card form-card"><h2>Applications</h2>
      <div className="table-wrap"><table><thead><tr><th>Applicant</th><th>Job</th><th>Email</th><th>Status</th></tr></thead><tbody>
      {apps.map(a=><tr key={a._id}><td>{a.applicant?.name}</td><td>{a.job?.title}</td><td>{a.applicant?.email}</td><td><select value={a.status} onChange={e=>setStatus(a._id,e.target.value)}>{["Applied","Reviewing","Shortlisted","Rejected","Hired"].map(s=><option key={s}>{s}</option>)}</select></td></tr>)}
      </tbody></table></div>
    </section>
  </main>;
}
