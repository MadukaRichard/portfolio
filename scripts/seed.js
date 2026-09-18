require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set in .env.local");
    process.exit(1);
  }

  await mongoose.connect(uri);

  const { default: Profile } = await import("../models/Profile.js");
  const { default: Project } = await import("../models/Project.js");
  const { default: Experience } = await import("../models/Experience.js");
  const { default: Post } = await import("../models/Post.js");
  const { seedData } = await import("../lib/seedData.js");

  const existingProfile = await Profile.findOne();
  if (!existingProfile) {
    await Profile.create(seedData.profile);
    console.log("Seeded profile.");
  } else {
    console.log("Profile already exists, skipping.");
  }

  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany(seedData.projects);
    console.log(`Seeded ${seedData.projects.length} project(s).`);
  } else {
    console.log("Projects already exist, skipping.");
  }

  if ((await Experience.countDocuments()) === 0) {
    await Experience.insertMany(seedData.experience);
    console.log(`Seeded ${seedData.experience.length} experience entr(y/ies).`);
  } else {
    console.log("Experience already exists, skipping.");
  }

  if ((await Post.countDocuments()) === 0) {
    await Post.insertMany(seedData.posts);
    console.log(`Seeded ${seedData.posts.length} post(s).`);
  } else {
    console.log("Posts already exist, skipping.");
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
