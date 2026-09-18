export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { isAuthenticated } from "@/lib/requireAuth";

export async function GET() {
  await connectDB();
  const posts = await Post.find().sort({ order: 1, publishedDate: -1 });
  return NextResponse.json(posts);
}

export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  await connectDB();

  try {
    const post = await Post.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
