import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, default: "" },
    url: { type: String, required: true }, // can be external (Medium etc) or internal
    readTime: { type: String, default: "5 min read" },
    publishedDate: { type: Date, default: Date.now },
    tags: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
