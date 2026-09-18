"use client";

import { useEffect, useState } from "react";

const emptyProfile = {
  name: "",
  logoName: "",
  role: "",
  tagline: "",
  bio: "",
  bioSecondary: "",
  ctaLabel: "",
  ctaUrl: "",
  whatsappNumber: "",
  whatsappMessage: "",
  email: "",
  resumeUrl: "",
  location: "",
  utcOffset: "",
  socialLinks: [],
  seoTitle: "",
  seoDescription: "",
  ogImage: "",
};

function Field({ label, children, hint }) {
  return (
    <div>
      <label className="block text-xs text-neutral-500 mb-1">{label}</label>
      {children}
      {hint && <p className="text-xs text-neutral-600 mt-1">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-accent";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile({ ...emptyProfile, ...data, socialLinks: data.socialLinks || [] });
        setLoading(false);
      });
  }, []);

  function update(field, value) {
    setProfile((p) => ({ ...p, [field]: value }));
  }

  function updateSocial(index, field, value) {
    setProfile((p) => {
      const links = [...p.socialLinks];
      links[index] = { ...links[index], [field]: value };
      return { ...p, socialLinks: links };
    });
  }

  function addSocial() {
    setProfile((p) => ({
      ...p,
      socialLinks: [...p.socialLinks, { label: "", url: "" }],
    }));
  }

  function removeSocial(index) {
    setProfile((p) => ({
      ...p,
      socialLinks: p.socialLinks.filter((_, i) => i !== index),
    }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    setMessage(res.ok ? "Saved." : "Something went wrong saving your changes.");
  }

  if (loading) {
    return <p className="text-sm text-neutral-500">Loading…</p>;
  }

  return (
    <form onSubmit={handleSave} className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-xl font-semibold text-neutral-100">Profile</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Controls the hero section, contact details, and site metadata.
        </p>
      </div>

      {message && (
        <p
          className={`text-sm rounded-md px-3 py-2 border ${
            message === "Saved."
              ? "text-accent bg-accent/10 border-accent/30"
              : "text-red-400 bg-red-950/40 border-red-900"
          }`}
        >
          {message}
        </p>
      )}

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">
          Hero
        </h2>
        <Field label="Name">
          <input className={inputClass} value={profile.name} onChange={(e) => update("name", e.target.value)} />
        </Field>
        <Field label="Logo name" hint="Shown in the top header only.">
          <input className={inputClass} value={profile.logoName} onChange={(e) => update("logoName", e.target.value)} />
        </Field>
        <Field label="Role">
          <input className={inputClass} value={profile.role} onChange={(e) => update("role", e.target.value)} />
        </Field>
        <Field label="Tagline" hint="Short line shown under your name.">
          <input className={inputClass} value={profile.tagline} onChange={(e) => update("tagline", e.target.value)} />
        </Field>
        <Field label="Bio (first paragraph)">
          <textarea rows={4} className={inputClass} value={profile.bio} onChange={(e) => update("bio", e.target.value)} />
        </Field>
        <Field label="Bio (second paragraph, optional)">
          <textarea rows={4} className={inputClass} value={profile.bioSecondary} onChange={(e) => update("bioSecondary", e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Primary button label">
            <input className={inputClass} value={profile.ctaLabel} onChange={(e) => update("ctaLabel", e.target.value)} />
          </Field>
          <Field label="Primary button link">
            <input className={inputClass} value={profile.ctaUrl} onChange={(e) => update("ctaUrl", e.target.value)} />
          </Field>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">
          Contact
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Email">
            <input className={inputClass} value={profile.email} onChange={(e) => update("email", e.target.value)} />
          </Field>
          <Field label="WhatsApp number" hint="Include country code, digits only e.g. 2348012345678">
            <input className={inputClass} value={profile.whatsappNumber} onChange={(e) => update("whatsappNumber", e.target.value)} />
          </Field>
        </div>
        <Field label="WhatsApp pre-filled message">
          <input className={inputClass} value={profile.whatsappMessage} onChange={(e) => update("whatsappMessage", e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Resume/CV URL">
            <input className={inputClass} value={profile.resumeUrl} onChange={(e) => update("resumeUrl", e.target.value)} />
          </Field>
          <Field label="Location">
            <input className={inputClass} value={profile.location} onChange={(e) => update("location", e.target.value)} />
          </Field>
        </div>
        <Field label="UTC offset" hint="Shown in the footer, e.g. UTC+1">
          <input className={inputClass} value={profile.utcOffset} onChange={(e) => update("utcOffset", e.target.value)} />
        </Field>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">
            Social links
          </h2>
          <button
            type="button"
            onClick={addSocial}
            className="text-xs text-accent hover:text-accent"
          >
            + add link
          </button>
        </div>
        {profile.socialLinks.length === 0 && (
          <p className="text-sm text-neutral-600">No social links yet.</p>
        )}
        {profile.socialLinks.map((link, i) => (
          <div key={i} className="flex gap-3 items-start">
            <input
              placeholder="label e.g. github"
              className={inputClass}
              value={link.label}
              onChange={(e) => updateSocial(i, "label", e.target.value)}
            />
            <input
              placeholder="https://..."
              className={inputClass}
              value={link.url}
              onChange={(e) => updateSocial(i, "url", e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeSocial(i)}
              className="text-xs text-red-400 hover:text-red-300 px-2 py-2 shrink-0"
            >
              remove
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">
          SEO
        </h2>
        <Field label="SEO title">
          <input className={inputClass} value={profile.seoTitle} onChange={(e) => update("seoTitle", e.target.value)} />
        </Field>
        <Field label="SEO description">
          <textarea rows={3} className={inputClass} value={profile.seoDescription} onChange={(e) => update("seoDescription", e.target.value)} />
        </Field>
        <Field label="Social share image URL">
          <input className={inputClass} value={profile.ogImage} onChange={(e) => update("ogImage", e.target.value)} />
        </Field>
      </section>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center rounded-md bg-accent px-5 py-2 text-sm font-medium text-neutral-950 hover:bg-accent/90 transition-colors disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
