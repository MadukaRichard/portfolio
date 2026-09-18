export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import Post from "@/models/Post";
import { seedData } from "@/lib/seedData";

// Visit /api/seed?secret=YOUR_SEED_SECRET once to populate starter content.
// Safe to call more than once - it only fills in data if collections are empty.
export async function GET(request) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const results = { profile: false, projects: 0, experience: 0, posts: 0 };

  const existingProfile = await Profile.findOne();
  if (!existingProfile) {
    await Profile.create(seedData.profile);
    results.profile = true;
  }

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    const created = await Project.insertMany(seedData.projects);
    results.projects = created.length;
  }

  const experienceCount = await Experience.countDocuments();
  if (experienceCount === 0) {
    const created = await Experience.insertMany(seedData.experience);
    results.experience = created.length;
  }

  const postCount = await Post.countDocuments();
  if (postCount === 0) {
    const created = await Post.insertMany(seedData.posts);
    results.posts = created.length;
  }

  return NextResponse.json({ ok: true, results });
}
