export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { isAuthenticated } from "@/lib/requireAuth";

export async function PUT(request, { params }) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  await connectDB();

  try {
    const experience = await Experience.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!experience) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(experience);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  await Experience.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
