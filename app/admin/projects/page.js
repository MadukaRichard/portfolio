"use client";

import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  url: "",
  tags: "",
  featured: true,
  order: 0,
};

const inputClass =
  "w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-accent";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/projects");
    setProjects(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load on mount, not derived state
    load();
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function startEdit(project) {
    setEditingId(project._id);
    setForm({
      title: project.title,
      slug: project.slug,
      summary: project.summary,
      description: project.description,
      url: project.url,
      tags: (project.tags || []).join(", "),
      featured: project.featured,
      order: project.order,
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
    };

    const res = editingId
      ? await fetch(`/api/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/projects", {
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
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-xl font-semibold text-neutral-100">Projects</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Shown on the homepage and the /projects page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 border border-neutral-800 rounded-lg p-6">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">
          {editingId ? "Edit project" : "Add a project"}
        </h2>

        {message && <p className="text-sm text-red-400">{message}</p>}

        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Title" className={inputClass} value={form.title} onChange={(e) => update("title", e.target.value)} required />
          <input placeholder="Slug (auto if left blank)" className={inputClass} value={form.slug} onChange={(e) => update("slug", e.target.value)} />
        </div>
        <input placeholder="Short summary (shown in lists)" className={inputClass} value={form.summary} onChange={(e) => update("summary", e.target.value)} />
        <textarea placeholder="Full description (shown on detail page)" rows={4} className={inputClass} value={form.description} onChange={(e) => update("description", e.target.value)} />
        <input placeholder="External URL (optional)" className={inputClass} value={form.url} onChange={(e) => update("url", e.target.value)} />
        <input placeholder="Tags, comma separated" className={inputClass} value={form.tags} onChange={(e) => update("tags", e.target.value)} />

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-neutral-400">
            <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />
            Featured on homepage
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-400">
            Order
            <input type="number" className="w-20 rounded-md bg-neutral-900 border border-neutral-800 px-2 py-1 text-sm" value={form.order} onChange={(e) => update("order", e.target.value)} />
          </label>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-accent/90 transition-colors">
            {editingId ? "Save changes" : "Add project"}
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
          All projects
        </h2>
        {loading ? (
          <p className="text-sm text-neutral-500">Loading…</p>
        ) : projects.length === 0 ? (
          <p className="text-sm text-neutral-600">No projects yet.</p>
        ) : (
          <ul className="space-y-3">
            {projects.map((project) => (
              <li key={project._id} className="border border-neutral-800 rounded-lg p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-neutral-100 font-medium">{project.title}</p>
                  <p className="text-sm text-neutral-500">{project.summary}</p>
                  {!project.featured && (
                    <p className="text-xs text-neutral-600 mt-1">Not featured</p>
                  )}
                </div>
                <div className="flex gap-3 shrink-0">
                  <button onClick={() => startEdit(project)} className="text-xs text-accent hover:text-accent">
                    edit
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="text-xs text-red-400 hover:text-red-300">
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
