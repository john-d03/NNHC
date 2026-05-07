"use client";

import { useEffect, useState } from "react";
import { ExplainModal } from "./ExplainModal";

export function SimplifyButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Explain NNHC to me"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        data-mounted={mounted ? "true" : "false"}
        className="simplify-fab"
      >
        <span className="simplify-fab__icon" aria-hidden>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1.5 1.1-1.5 2.2v.5" />
            <circle cx="11.5" cy="17.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <span className="simplify-fab__label">Explain NNHC to me</span>
      </button>

      <ExplainModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
