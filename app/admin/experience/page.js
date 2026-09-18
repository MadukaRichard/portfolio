"use client";

import { useEffect, useState } from "react";

const emptyForm = {
  company: "",
  role: "",
  subRole: "",
  context: "",
  startDate: "",
  endDate: "Present",
  bullets: "",
  order: 0,
};

const inputClass =
  "w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-accent";

export default function AdminExperiencePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/experience");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load on mount, not derived state
    load();
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function startEdit(item) {
    setEditingId(item._id);
    setForm({
      company: item.company,
      role: item.role,
      subRole: item.subRole || "",
      context: item.context || "",
      startDate: item.startDate,
      endDate: item.endDate,
      bullets: (item.bullets || []).join("\n"),
      order: item.order,
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
      bullets: form.bullets
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean),
      order: Number(form.order) || 0,
    };

    const res = editingId
      ? await fetch(`/api/experience/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/experience", {
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
    if (!confirm("Delete this entry?")) return;
    await fetch(`/api/experience/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-xl font-semibold text-neutral-100">Experience</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Shown on the homepage and the /experience page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 border border-neutral-800 rounded-lg p-6">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">
          {editingId ? "Edit entry" : "Add an entry"}
        </h2>

        {message && <p className="text-sm text-red-400">{message}</p>}

        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Company" className={inputClass} value={form.company} onChange={(e) => update("company", e.target.value)} required />
          <input placeholder="Role / title" className={inputClass} value={form.role} onChange={(e) => update("role", e.target.value)} required />
        </div>
        <input placeholder="Sub-role, e.g. 'Promoted to Lead' (optional)" className={inputClass} value={form.subRole} onChange={(e) => update("subRole", e.target.value)} />
        <input placeholder="Context, e.g. contract or location (optional)" className={inputClass} value={form.context} onChange={(e) => update("context", e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Start date, e.g. March 2023" className={inputClass} value={form.startDate} onChange={(e) => update("startDate", e.target.value)} required />
          <input placeholder="End date, e.g. Present" className={inputClass} value={form.endDate} onChange={(e) => update("endDate", e.target.value)} />
        </div>
        <textarea placeholder={"Bullet points — one per line"} rows={4} className={inputClass} value={form.bullets} onChange={(e) => update("bullets", e.target.value)} />
        <label className="flex items-center gap-2 text-sm text-neutral-400 w-fit">
          Order
          <input type="number" className="w-20 rounded-md bg-neutral-900 border border-neutral-800 px-2 py-1 text-sm" value={form.order} onChange={(e) => update("order", e.target.value)} />
        </label>

        <div className="flex gap-3">
          <button type="submit" className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-accent/90 transition-colors">
            {editingId ? "Save changes" : "Add entry"}
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
          All entries
        </h2>
        {loading ? (
          <p className="text-sm text-neutral-500">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-neutral-600">No entries yet.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item._id} className="border border-neutral-800 rounded-lg p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-neutral-100 font-medium">{item.company}</p>
                  <p className="text-sm text-neutral-500">
                    {item.role} · {item.startDate} — {item.endDate}
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button onClick={() => startEdit(item)} className="text-xs text-accent hover:text-accent">
                    edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="text-xs text-red-400 hover:text-red-300">
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
