export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import { isAuthenticated } from "@/lib/requireAuth";

export async function GET() {
  await connectDB();
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({});
  }
  return NextResponse.json(profile);
}

export async function PUT(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  await connectDB();

  let profile = await Profile.findOne();
  if (!profile) {
    profile = new Profile();
  }

  Object.assign(profile, body);
  await profile.save();

  return NextResponse.json(profile);
}
