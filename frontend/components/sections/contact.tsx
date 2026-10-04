"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          inquiryType: "GENERAL",
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setSending(false);
  }

  return (
    <section
      id="contact"
      className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8 lg:py-32"
    >
      <div>
        <p className="eyebrow">Join the movement</p>
        <h2 className="section-title">
          Help a boy see what&apos;s{" "}
          <span className="text-accent">possible.</span>
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Whether you want to volunteer, partner, donate, or simply learn more,
          we&apos;d love to hear from you.
        </p>
        <div className="mt-10 flex flex-col gap-4 text-sm font-semibold">
          <a
            href="mailto:johnnieboysfoundation@gmail.com"
            className="hover:text-accent"
          >
            johnnieboysfoundation@gmail.com
          </a>
          <a href="tel:+2348131576436" className="hover:text-accent">
            +234 813 157 6436
          </a>
          <span className="text-muted-foreground">Kaduna, Nigeria</span>
        </div>
      </div>
      <form
        className="flex flex-col gap-5 rounded-3xl bg-secondary p-6 sm:p-8"
        onSubmit={handleSubmit}
      >
        {sent ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <CheckCircle2 className="size-12 text-accent" />
            <h3 className="mt-5 font-serif text-3xl font-bold">
              Thank you for reaching out.
            </h3>
            <p className="mt-2 text-muted-foreground">
              Our team will be in touch soon.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-bold">
                Name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-bold">
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm font-bold">
              Subject
              <input
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold">
              Message
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="resize-none rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent"
              />
            </label>
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground transition hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
            >
              {sending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>Send message <ArrowRight size={18} /></>
              )}
            </button>
          </>
        )}
      </form>
    </section>
  );
}
