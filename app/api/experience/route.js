export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { isAuthenticated } from "@/lib/requireAuth";

export async function GET() {
  await connectDB();
  const experience = await Experience.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(experience);
}

export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  await connectDB();

  try {
    const experience = await Experience.create(body);
    return NextResponse.json(experience, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
