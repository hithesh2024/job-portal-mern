import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link className="brand" to="/">Job<span>Hub</span></Link>
        <nav>
          <NavLink to="/">Jobs</NavLink>
          {user && <NavLink to="/applications">My Applications</NavLink>}
          {user && <NavLink to="/profile">Profile</NavLink>}
          {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
          {user ? (
            <button className="btn btn-outline" onClick={logout}>Logout</button>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link className="btn btn-primary" to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
