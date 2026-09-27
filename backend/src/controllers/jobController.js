import Job from "../models/Job.js";

export const getJobs = async (req, res, next) => {
  try {
    const { search = "", location = "", type = "", experience = "" } = req.query;

    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } }
      ];
    }
    if (location) filter.location = { $regex: location, $options: "i" };
    if (type) filter.type = type;
    if (experience) filter.experience = { $regex: experience, $options: "i" };

    const jobs = await Job.find(filter).populate("createdBy", "name").sort({ createdAt: -1 });
    res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    next(error);
  }
};

export const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate("createdBy", "name email");
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const { title, company, location, type, experience, salary, description, skills, requirements } = req.body;

    if (!title || !company || !location || !experience || !description) {
      return res.status(400).json({ success: false, message: "Required job fields are missing" });
    }

    const job = await Job.create({
      title, company, location, type, experience, salary, description,
      skills: skills || [], requirements: requirements || [], createdBy: req.user._id
    });

    res.status(201).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, message: "Job deleted" });
  } catch (error) {
    next(error);
  }
};
