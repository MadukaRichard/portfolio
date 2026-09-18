import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, default: "" }, // short line shown on the list
    description: { type: String, default: "" }, // longer copy for detail page
    url: { type: String, default: "" }, // external link, if any
    image: { type: String, default: "" },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
