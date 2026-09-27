import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [form, setForm] = useState({ resumeUrl:"", coverLetter:"" });
  const [message, setMessage] = useState("");

  useEffect(() => { api.get(`/jobs/${id}`).then(r => setJob(r.data.job)).catch(()=>setJob(false)); }, [id]);

  if (job === false) return <div className="container section"><div className="empty">Job not found.</div></div>;
  if (!job) return <div className="loader">Loading...</div>;

  const apply = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login", { state: { from: `/jobs/${id}` } });
    try {
      await api.post("/applications", { jobId: id, ...form });
      setMessage("Application submitted successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not apply");
    }
  };

  return (
    <main className="container section">
      <Link to="/" className="back">← Back to jobs</Link>
      <div className="details-layout">
        <section className="card details">
          <div className="job-top"><div className="company-logo">{job.company[0]}</div><div><h1>{job.title}</h1><p className="muted">{job.company} · {job.location}</p></div></div>
          <div className="tags"><span>{job.type}</span><span>{job.experience}</span><span>{job.salary}</span></div>
          <h2>About the role</h2><p className="pre">{job.description}</p>
          <h2>Skills</h2><div className="skill-list">{job.skills.map(s=><span key={s}>{s}</span>)}</div>
          <h2>Requirements</h2><ul>{job.requirements.map(r=><li key={r}>{r}</li>)}</ul>
        </section>
        <aside className="card apply-card">
          <h2>Apply for this job</h2>
          {!user ? <><p className="muted">Login or register to submit your application.</p><Link className="btn btn-primary full" to="/login" state={{from:`/jobs/${id}`}}>Login to Apply</Link></> :
          user.role === "admin" ? <p className="muted">Admins manage applications from the Admin dashboard.</p> :
          <form onSubmit={apply}>
            {message && <div className="alert success">{message}</div>}
            <input placeholder="Resume URL (Google Drive / portfolio link)" value={form.resumeUrl} onChange={e=>setForm({...form,resumeUrl:e.target.value})}/>
            <textarea required rows="7" placeholder="Write a short cover letter..." value={form.coverLetter} onChange={e=>setForm({...form,coverLetter:e.target.value})}/>
            <button className="btn btn-primary full">Submit Application</button>
          </form>}
        </aside>
      </div>
    </main>
  );
}
