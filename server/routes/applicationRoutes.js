const express = require("express");
const { applyForJob } = require("../controllers/applicationController");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Candidate applies for a job
router.post(
  "/",
  protect,
  authorizeRoles("candidate"),
  applyForJob
);

module.exports = router;