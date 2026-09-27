import { useEffect, useState } from "react";
import api from "../services/api";

export default function Applications() {
  const [apps, setApps] = useState([]);
  useEffect(() => { api.get("/applications/my").then(r=>setApps(r.data.applications)); }, []);

  return <main className="container section">
    <div className="section-heading"><div><p className="eyebrow">CANDIDATE</p><h1>My Applications</h1></div></div>
    {apps.length ? <div className="table-wrap"><table><thead><tr><th>Job</th><th>Company</th><th>Location</th><th>Status</th><th>Applied</th></tr></thead>
      <tbody>{apps.map(a=><tr key={a._id}><td>{a.job?.title}</td><td>{a.job?.company}</td><td>{a.job?.location}</td><td><span className="status">{a.status}</span></td><td>{new Date(a.createdAt).toLocaleDateString()}</td></tr>)}</tbody>
    </table></div> : <div className="empty">You have not applied to any jobs yet.</div>}
  </main>;
}
