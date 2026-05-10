"use client";

import { useEffect, useRef, useState } from "react";
import { META } from "@/lib/content";

const ROLES = [
  "Healthcare professional",
  "Public-health system",
  "Neighbour / community",
  "Charity / NGO",
  "Foundation / funder",
  "Researcher",
  "Technologist",
  "Other",
];

export function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setSent(false);
    prevFocus.current = (document.activeElement as HTMLElement) ?? null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => firstFieldRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = prevOverflow;
      prevFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `NNHC engagement - ${role}`;
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Role: ${role}`,
      "",
      message,
    ];
    const body = lines.join("\n");
    const mailto = `mailto:${META.contactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
    >
      <button
        type="button"
        aria-label="Close contact form"
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full md:max-w-xl bg-bg border border-line rounded-t-2xl md:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ color: "var(--color-ink)" }}
      >
        <div className="flex items-start justify-between gap-4 p-6 md:p-8 border-b border-line">
          <div>
            <h2
              id="contact-modal-title"
              className="h-display"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)", lineHeight: 1.05 }}
            >
              Get in touch
            </h2>
            <p className="text-sm text-ink-soft mt-2 max-w-[34ch]">
              Tell us who you are and what you bring. We&rsquo;ll route it to the right
              part of the network.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-ink-soft hover:text-ink transition-colors text-2xl leading-none -mt-1 -mr-1 p-2"
          >
            ×
          </button>
        </div>

        {sent ? (
          <div className="p-6 md:p-8">
            <p className="lede">
              Your email client should have opened with a pre-filled message. If it
              didn&rsquo;t, write to{" "}
              <a
                href={`mailto:${META.contactEmail}`}
                className="underline hover:text-electric"
              >
                {META.contactEmail}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost mt-6"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            <Field label="Name" htmlFor="contact-name">
              <input
                ref={firstFieldRef}
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                autoComplete="name"
              />
            </Field>
            <Field label="Email" htmlFor="contact-email">
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                autoComplete="email"
              />
            </Field>
            <Field label="I am a" htmlFor="contact-role">
              <select
                id="contact-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Message" htmlFor="contact-message">
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input resize-y min-h-[7rem]"
                placeholder="What you bring (funds, people, software, your block of homes…) and what you'd like to discuss."
              />
            </Field>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="text-xs text-ink-mute max-w-[28ch]">
                Submitting opens your email app with the message pre-filled.
              </p>
              <div className="flex gap-3">
                <button type="button" onClick={onClose} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Send message
                  <span className="btn-icon" aria-hidden>→</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="label block mb-2">{label}</span>
      {children}
    </label>
  );
}
