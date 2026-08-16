const express = require("express");
const { createJob, getJobs, getJobById } = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();
router.get("/", getJobs);  //view all open jobs
router.get("/:id", getJobById); //get job by id

// create a job-recruiter/admin only
router.post("/", protect, authorizeRoles("recruiter","admin"),createJob);

module.exports = router;