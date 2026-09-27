import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

export default function App() {
  return <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/applications" element={<Applications />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route element={<ProtectedRoute admin />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<div className="container section"><div className="empty">Page not found.</div></div>} />
    </Routes>
    <footer>JobHub · MERN Job Portal · Built for learning & interviews</footer>
  </BrowserRouter>;
}
