const express = require("express");
const { createJob } = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("recruiter","admin"),createJob);

module.exports = router;