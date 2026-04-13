import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Rejected"],
      default: "Applied",
    },
    notes: { type: String, default: "" }, // ✅ New notes field
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;
