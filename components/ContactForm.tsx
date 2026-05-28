"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    // Build a mailto link — no backend needed
    const subject = encodeURIComponent(`Word Wala — message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:abhipic2025@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("success"), 600);
  }

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-extrabold text-[#1A1A2E] mb-2">
          Email opened!
        </h3>
        <p className="text-sm text-[#555770]">
          We&apos;ll get back to you within 1–2 days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs font-extrabold uppercase tracking-widest text-[#555770] mb-2">
          Your name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-[#F8F8FC] border-2 border-[#EEEFF3] focus:border-[#6C63FF] focus:outline-none transition font-medium text-[#1A1A2E]"
          placeholder="Riya Sharma"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-extrabold uppercase tracking-widest text-[#555770] mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-[#F8F8FC] border-2 border-[#EEEFF3] focus:border-[#6C63FF] focus:outline-none transition font-medium text-[#1A1A2E]"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-extrabold uppercase tracking-widest text-[#555770] mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-[#F8F8FC] border-2 border-[#EEEFF3] focus:border-[#6C63FF] focus:outline-none transition font-medium text-[#1A1A2E] resize-none"
          placeholder="What's on your mind?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full text-base disabled:opacity-60"
      >
        {status === "submitting" ? "Opening email..." : "Send Message"}
      </button>
    </form>
  );
}
