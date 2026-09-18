export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { isAuthenticated } from "@/lib/requireAuth";

export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  await connectDB();

  if (!body.slug && body.title) {
    body.slug = body.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  try {
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
