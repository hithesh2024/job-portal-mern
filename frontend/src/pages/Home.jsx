import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ search: "", location: "", type: "", experience: "" });
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (custom = filters) => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(custom).filter(([, v]) => v));
      const { data } = await api.get("/jobs", { params });
      setJobs(data.jobs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const change = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <main>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">MERN STACK JOB PORTAL</p>
          <h1>Find a job you’ll <span>love.</span></h1>
          <p>Search opportunities, apply in minutes and track your applications.</p>
          <form className="search-box" onSubmit={(e) => { e.preventDefault(); fetchJobs(); }}>
            <input name="search" value={filters.search} onChange={change} placeholder="Job title, company or skill" />
            <input name="location" value={filters.location} onChange={change} placeholder="Location" />
            <button className="btn btn-primary">Search Jobs</button>
          </form>
        </div>
      </section>

      <section className="container section">
        <div className="filter-row">
          <select name="type" value={filters.type} onChange={change} onBlur={() => fetchJobs({ ...filters })}>
            <option value="">All job types</option>
            <option>Full-time</option><option>Part-time</option><option>Internship</option><option>Contract</option>
          </select>
          <input name="experience" value={filters.experience} onChange={change} placeholder="Experience e.g. 0-1" />
          <button className="btn btn-outline" onClick={() => { const reset={search:"",location:"",type:"",experience:""}; setFilters(reset); fetchJobs(reset); }}>Clear</button>
        </div>

        <div className="section-heading">
          <div><h2>Latest Jobs</h2><p className="muted">{jobs.length} opportunities available</p></div>
        </div>

        {loading ? <div className="loader">Loading jobs...</div> :
          jobs.length ? <div className="grid">{jobs.map(job => <JobCard key={job._id} job={job} />)}</div> :
          <div className="empty">No jobs found. Try different search filters.</div>}
      </section>
    </main>
  );
}
