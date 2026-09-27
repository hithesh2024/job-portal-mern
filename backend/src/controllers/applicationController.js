import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyToJob = async (req, res, next) => {
  try {
    const { jobId, resumeUrl, coverLetter } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    const exists = await Application.findOne({ job: jobId, applicant: req.user._id });
    if (exists) return res.status(409).json({ success: false, message: "You already applied for this job" });

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resumeUrl: resumeUrl || "",
      coverLetter: coverLetter || ""
    });

    const populated = await application.populate([
      { path: "job", select: "title company location" },
      { path: "applicant", select: "name email phone" }
    ]);

    res.status(201).json({ success: true, application: populated });
  } catch (error) {
    next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate("job", "title company location type salary")
      .sort({ createdAt: -1 });

    res.json({ success: true, applications });
  } catch (error) {
    next(error);
  }
};

export const getAllApplications = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .populate("job", "title company")
      .populate("applicant", "name email phone")
      .sort({ createdAt: -1 });

    res.json({ success: true, applications });
  } catch (error) {
    next(error);
  }
};

export const getApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("job")
      .populate("applicant", "name email phone bio skills");

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.json({ success: true, application });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const allowed = ["Applied", "Reviewing", "Shortlisted", "Rejected", "Hired"];
    const { status } = req.body;

    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("job", "title company").populate("applicant", "name email");

    if (!application) return res.status(404).json({ success: false, message: "Application not found" });

    res.json({ success: true, application });
  } catch (error) {
    next(error);
  }
};
