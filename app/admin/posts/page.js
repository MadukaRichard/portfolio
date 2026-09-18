"use client";

import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  excerpt: "",
  url: "",
  readTime: "5 min read",
  publishedDate: "",
  tags: "",
  order: 0,
};

const inputClass =
  "w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-accent";

function toDateInputValue(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().slice(0, 10);
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/posts");
    setPosts(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load on mount, not derived state
    load();
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function startEdit(post) {
    setEditingId(post._id);
    setForm({
      title: post.title,
      excerpt: post.excerpt || "",
      url: post.url,
      readTime: post.readTime,
      publishedDate: toDateInputValue(post.publishedDate),
      tags: (post.tags || []).join(", "),
      order: post.order,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      order: Number(form.order) || 0,
      publishedDate: form.publishedDate ? new Date(form.publishedDate) : new Date(),
    };

    const res = editingId
      ? await fetch(`/api/posts/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    if (res.ok) {
      resetForm();
      load();
    } else {
      const data = await res.json();
      setMessage(data.error || "Something went wrong.");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-xl font-semibold text-neutral-100">Posts</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Shown on the homepage and the /articles page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 border border-neutral-800 rounded-lg p-6">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">
          {editingId ? "Edit post" : "Add a post"}
        </h2>

        {message && <p className="text-sm text-red-400">{message}</p>}

        <input placeholder="Title" className={inputClass} value={form.title} onChange={(e) => update("title", e.target.value)} required />
        <textarea placeholder="Short excerpt" rows={2} className={inputClass} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} />
        <input placeholder="URL (where this post lives)" className={inputClass} value={form.url} onChange={(e) => update("url", e.target.value)} required />
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Read time, e.g. 5 min read" className={inputClass} value={form.readTime} onChange={(e) => update("readTime", e.target.value)} />
          <input type="date" className={inputClass} value={form.publishedDate} onChange={(e) => update("publishedDate", e.target.value)} />
        </div>
        <input placeholder="Tags, comma separated" className={inputClass} value={form.tags} onChange={(e) => update("tags", e.target.value)} />
        <label className="flex items-center gap-2 text-sm text-neutral-400 w-fit">
          Order
          <input type="number" className="w-20 rounded-md bg-neutral-900 border border-neutral-800 px-2 py-1 text-sm" value={form.order} onChange={(e) => update("order", e.target.value)} />
        </label>

        <div className="flex gap-3">
          <button type="submit" className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-accent/90 transition-colors">
            {editingId ? "Save changes" : "Add post"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-sm text-neutral-500 hover:text-neutral-300">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wide mb-4">
          All posts
        </h2>
        {loading ? (
          <p className="text-sm text-neutral-500">Loading…</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-neutral-600">No posts yet.</p>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post._id} className="border border-neutral-800 rounded-lg p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-neutral-100 font-medium">{post.title}</p>
                  <p className="text-sm text-neutral-500">{post.excerpt}</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button onClick={() => startEdit(post)} className="text-xs text-accent hover:text-accent">
                    edit
                  </button>
                  <button onClick={() => handleDelete(post._id)} className="text-xs text-red-400 hover:text-red-300">
                    delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
