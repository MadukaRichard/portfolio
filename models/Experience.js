import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    subRole: { type: String, default: "" }, // e.g. "Promoted to Engineering Lead"
    context: { type: String, default: "" }, // e.g. "MTN Nigeria contract · Lagos, Nigeria"
    startDate: { type: String, required: true }, // free text e.g. "March 2023"
    endDate: { type: String, default: "Present" },
    bullets: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Experience ||
  mongoose.model("Experience", ExperienceSchema);
