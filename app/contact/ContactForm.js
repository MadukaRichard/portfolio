"use client";

import { useState } from "react";

export default function ContactForm({ email }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent(`Portfolio contact from ${name || "a visitor"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name || "Anonymous"} (${from || "no email given"})`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  if (!email) {
    return (
      <p className="text-sm text-neutral-500">
        Add an email address in the admin dashboard to enable this form.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs text-neutral-500 mb-1">Your name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
      <div>
        <label className="block text-xs text-neutral-500 mb-1">Your email</label>
        <input
          type="email"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
      <div>
        <label className="block text-xs text-neutral-500 mb-1">Message</label>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-accent/90 transition-colors"
      >
        Send message
      </button>
    </form>
  );
}
