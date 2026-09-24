import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { isAuthenticated } from "@/lib/requireAuth";

export async function PUT(request, context) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await request.json();
  
  // Safely await params to prevent 'undefined' ID issues in newer Next.js versions
  const params = await context.params;
  const id = params.id;

  try {
    // 1. Try to find and update by the exact database ID
    let project = await Project.findByIdAndUpdate(id, body, { new: true });
    
    // 2. Fallback: If the ID isn't found, find it by its unique slug instead!
    if (!project && body.slug) {
      project = await Project.findOneAndUpdate({ slug: body.slug }, body, { new: true });
    }
    
    if (!project) {
      return NextResponse.json({ error: "Project not found in database" }, { status: 404 });
    }
    
    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(request, context) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const params = await context.params;
  const id = params.id;

  try {
    // Also add a fallback here just in case
    let project = await Project.findByIdAndDelete(id);
    if (!project) {
       // We can't easily get the slug on DELETE, but standard ID usually works here
       return NextResponse.json({ error: "Could not find project to delete." }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}