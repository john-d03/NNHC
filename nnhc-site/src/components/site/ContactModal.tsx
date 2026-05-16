"use client";

import { useEffect, useRef, useState } from "react";
import { META } from "@/lib/content";
import { useT } from "@/lib/i18n";

const ROLE_DEFS = [
  { key: "contact.role.hcp", en: "Healthcare professional" },
  { key: "contact.role.public", en: "Public-health system" },
  { key: "contact.role.neighbour", en: "Neighbour / community" },
  { key: "contact.role.charity", en: "Charity / NGO" },
  { key: "contact.role.foundation", en: "Foundation / funder" },
  { key: "contact.role.researcher", en: "Researcher" },
  { key: "contact.role.tech", en: "Technologist" },
  { key: "contact.role.other", en: "Other" },
];

export function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useT();
  const ROLES = ROLE_DEFS.map((r) => t(r.key, r.en));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [refNum, setRefNum] = useState<string>("");
  const sent = status === "sent";

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setErrorMsg(null);
    setRefNum("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (company) return; // honeypot tripped - silently drop

    const ref = generateRef();
    setRefNum(ref);
    const subject = `NNHC engagement [${ref}] - ${role}`;
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    // Fallback: if no Web3Forms key is configured, use mailto.
    if (!accessKey) {
      const lines = [
        `Reference: ${ref}`,
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
      setStatus("sent");
      return;
    }

    setStatus("sending");
    setErrorMsg(null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          from_name: "NNHC website",
          replyto: email,
          reference: ref,
          name,
          email,
          role,
          message,
          botcheck: company, // Web3Forms honeypot
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };
      if (res.ok && data.success) {
        setStatus("sent");
      } else {
        setStatus("error");
        setErrorMsg(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again or email us directly.");
    }
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
              {t("contact.title", "Get in touch")}
            </h2>
            <p className="text-sm text-ink-soft mt-2 max-w-[34ch]">
              {t(
                "contact.subtitle",
                "Tell us who you are and what you bring. We\u2019ll route it to the right part of the network.",
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("contact.closeAria", "Close")}
            className="text-ink-soft hover:text-ink transition-colors text-2xl leading-none -mt-1 -mr-1 p-2"
          >
            ×
          </button>
        </div>

        {sent ? (
          <div className="p-6 md:p-8">
            <p className="lede">
              {t(
                "contact.success",
                "Thanks - your message is on its way. We\u2019ll route it to the right part of the network and reply to you shortly.",
              )}{" "}
              <span className="text-ink">{email}</span>
            </p>
            {refNum && (
              <div className="mt-5 rounded-lg border border-line bg-bg-soft px-4 py-3">
                <span className="label block mb-1">{t("contact.refLabel", "Your reference")}</span>
                <code className="text-ink text-base font-mono tracking-tight select-all">
                  {refNum}
                </code>
                <p className="text-xs text-ink-mute mt-2">
                  {t("contact.refHint", "Quote this if you follow up by email.")}
                </p>
              </div>
            )}
            <p className="text-sm text-ink-soft mt-4">
              {t("contact.emailPrefer", "Prefer email? Write to")}{" "}
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
              {t("contact.successClose", "Close")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            {/* Honeypot - hidden from users, bots fill it */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={{
                position: "absolute",
                left: "-9999px",
                width: 1,
                height: 1,
                opacity: 0,
              }}
              aria-hidden="true"
            />
            <Field label={t("contact.field.name", "Name")} htmlFor="contact-name">
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
            <Field label={t("contact.field.email", "Email")} htmlFor="contact-email">
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
            <Field label={t("contact.field.role", "I am a")} htmlFor="contact-role">
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
            <Field label={t("contact.field.message", "Message")} htmlFor="contact-message">
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input resize-y min-h-[7rem]"
                placeholder={t(
                  "contact.message.placeholder",
                  "What you bring (funds, people, software, your block of homes\u2026) and what you'd like to discuss.",
                )}
              />
            </Field>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="text-xs text-ink-mute max-w-[28ch]">
                {t("contact.privacy", "We\u2019ll only use your details to reply.")}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-ghost"
                  disabled={status === "sending"}
                >
                  {t("contact.cancel", "Cancel")}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? t("contact.sending", "Sending\u2026") : t("contact.submit", "Send message")}
                  <span className="btn-icon" aria-hidden>
                    →
                  </span>
                </button>
              </div>
            </div>
            {status === "error" && errorMsg && (
              <p
                role="alert"
                className="text-sm text-red-600 dark:text-red-400 pt-1"
              >
                {errorMsg}{" "}
                <a
                  href={`mailto:${META.contactEmail}`}
                  className="underline hover:text-electric"
                >
                  {t("contact.error.fallback", "Email us instead")}
                </a>
                .
              </p>
            )}
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

// e.g. NNHC-2605-K7Q  (year+month + 3-char base36, unique per browser)
function generateRef(): string {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const monthKey = `${yy}${mm}`;
  const storageKey = `nnhc:refs:${monthKey}`;

  // Seed from seconds-in-month so refs still sort roughly chronologically.
  const monthStart = new Date(d.getFullYear(), d.getMonth(), 1).getTime();
  let n = Math.floor((d.getTime() - monthStart) / 1000);

  let used: Set<string> = new Set();
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) used = new Set(JSON.parse(raw) as string[]);
  } catch {
    /* localStorage unavailable - fall through with empty set */
  }

  // Base36, 3 chars. Bump until unused. Wraps within 36^3 = 46,656 slots/month.
  const MAX = 36 ** 3;
  let suffix = "";
  for (let i = 0; i < MAX; i++) {
    const candidate = ((n + i) % MAX)
      .toString(36)
      .toUpperCase()
      .padStart(3, "0")
      .slice(-3);
    if (!used.has(candidate)) {
      suffix = candidate;
      break;
    }
  }
  // Extremely unlikely fallback if all 46,656 slots taken this month.
  if (!suffix) {
    suffix = Math.random().toString(36).slice(2, 5).toUpperCase();
  }

  try {
    used.add(suffix);
    localStorage.setItem(storageKey, JSON.stringify([...used]));
  } catch {
    /* ignore quota / private-mode errors */
  }

  return `NNHC-${monthKey}-${suffix}`;
}
