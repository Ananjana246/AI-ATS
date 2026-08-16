const express = require("express");
const { createJob, getJobs } = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();
router.get("/", getJobs);  //view all open jobs
// create a job-recruiter/admin only
router.post("/", protect, authorizeRoles("recruiter","admin"),createJob);

module.exports = router;