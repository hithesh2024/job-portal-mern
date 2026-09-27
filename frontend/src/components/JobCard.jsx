import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <article className="card job-card">
      <div className="job-top">
        <div className="company-logo">{job.company?.charAt(0)?.toUpperCase()}</div>
        <div>
          <h3>{job.title}</h3>
          <p className="muted">{job.company}</p>
        </div>
      </div>
      <div className="tags">
        <span>{job.location}</span>
        <span>{job.type}</span>
        <span>{job.experience}</span>
      </div>
      <p className="salary">{job.salary}</p>
      <p className="muted clamp">{job.description}</p>
      <Link className="btn btn-primary full" to={`/jobs/${job._id}`}>View Details</Link>
    </article>
  );
}
