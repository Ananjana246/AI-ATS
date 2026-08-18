const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "applied",
        "shortlisted",
        "interview",
        "selected",
        "rejected",
      ],
      default: "applied",
    },

    resume: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index(
  { job: 1, candidate: 1 },
  { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);