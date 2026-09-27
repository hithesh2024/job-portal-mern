import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/Job.js";
import User from "../models/User.js";

dotenv.config();

const jobs = [
  {
    title: "Junior MERN Stack Developer",
    company: "JobHub Technologies",
    location: "Bangalore",
    type: "Full-time",
    experience: "0-1 years",
    salary: "₹25,000 - ₹35,000/month",
    description: "Work on modern web applications, build REST APIs, fix bugs and collaborate with frontend and backend developers.",
    skills: ["JavaScript", "React.js", "Node.js", "Express.js", "MongoDB"],
    requirements: ["Strong JavaScript fundamentals", "Basic REST API knowledge", "Git/GitHub knowledge"]
  },
  {
    title: "React Developer Intern",
    company: "TechNova Labs",
    location: "Bangalore",
    type: "Internship",
    experience: "0-1 years",
    salary: "₹15,000/month",
    description: "Build responsive React interfaces and integrate APIs with guidance from senior developers.",
    skills: ["React.js", "JavaScript", "HTML", "CSS", "Git"],
    requirements: ["React basics", "Good communication", "Willingness to learn"]
  }
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const admin = await User.findOne({ role: "admin" });
  if (!admin) throw new Error("Run npm run seed:admin first");
  await Job.deleteMany({});
  await Job.insertMany(jobs.map(j => ({...j, createdBy: admin._id})));
  console.log("Sample jobs inserted.");
  await mongoose.disconnect();
};
run().catch(e => { console.error(e.message); process.exit(1); });
