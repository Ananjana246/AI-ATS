const Job = require("../models/job");

const createJob = async (req, res) => {
  try {
    const {
      title,
      department,
      description,
      requiredSkills,
      experience,
      salaryRange,
      location,
    } = req.body;

    // Check required fields
    if (
      !title ||
      !department ||
      !description ||
      !requiredSkills ||
      !experience ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required job details",
      });
    }

    // Create job
    const job = await Job.create({
      title,
      department,
      description,
      requiredSkills,
      experience,
      salaryRange,
      location,
      recruiter: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
  //get jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "open" })
      .populate("recruiter", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//get job by id

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("recruiter", "name email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// update job

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Only the recruiter who created the job or an admin can update it
    if (
      req.user.role !== "admin" &&
      job.recruiter.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this job",
      });
    }

    const {
      title,
      department,
      description,
      requiredSkills,
      experience,
      salaryRange,
      location,
      status,
    } = req.body;

    // Update only the fields that were provided
    if (title !== undefined) job.title = title;
    if (department !== undefined) job.department = department;
    if (description !== undefined) job.description = description;
    if (requiredSkills !== undefined) job.requiredSkills = requiredSkills;
    if (experience !== undefined) job.experience = experience;
    if (salaryRange !== undefined) job.salaryRange = salaryRange;
    if (location !== undefined) job.location = location;
    if (status !== undefined) job.status = status;

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
};