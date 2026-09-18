import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import Post from "@/models/Post";

function serialize(doc) {
  return JSON.parse(JSON.stringify(doc));
}

export async function getProfile() {
  await connectDB();
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({});
  return serialize(profile);
}

export async function getProjects({ featuredOnly = false, limit = null } = {}) {
  await connectDB();
  const query = featuredOnly ? { featured: true } : {};
  let cursor = Project.find(query).sort({ order: 1, createdAt: -1 });
  if (limit) cursor = cursor.limit(limit);
  const projects = await cursor;
  return serialize(projects);
}

export async function getProject(slug) {
  await connectDB();
  const project = await Project.findOne({ slug });
  return project ? serialize(project) : null;
}

export async function getExperience({ limit = null } = {}) {
  await connectDB();
  let cursor = Experience.find().sort({ order: 1, createdAt: -1 });
  if (limit) cursor = cursor.limit(limit);
  const experience = await cursor;
  return serialize(experience);
}

export async function getPosts({ limit = null } = {}) {
  await connectDB();
  let cursor = Post.find().sort({ order: 1, publishedDate: -1 });
  if (limit) cursor = cursor.limit(limit);
  const posts = await cursor;
  return serialize(posts);
}
