const express = require("express");
const applicationRoutes = require("./routes/applicationRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const jobRoutes = require("./routes/jobRoutes");

const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "API routes are working!"
    });
});

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/api/protected", protect, (req, res) => {
    res.json({
        success: true,
        message: "You accessed a protected route!",
        user: req.user
    });
});

// Health route
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "AI-ATS backend is running!"
    });
});

const PORT = process.env.PORT || 5001;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });