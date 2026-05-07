"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ───────────── Content ─────────────
   Edit pages here. Keep each page short - one idea per slide.
   Use `kicker` for the small label and `title` for the headline.
*/
export type ExplainPage = {
  kicker: string;
  title: string;
  body: string;
  accent?: "turquoise" | "ink";
};

export const EXPLAIN_PAGES: ExplainPage[] = [
  {
    kicker: "01 · The idea",
    title: "Care, closer to home.",
    body: "NNHC is a community-led, home-based healthcare system. The goal is simple: most care happens in or near your home, held by people you already know.",
  },
  {
    kicker: "02 · The problem",
    title: "Hospitals are doing work that homes used to do.",
    body: "The family doctor has thinned out. Specialist hospitals absorb routine conditions. Records live in silos. Costs spiral. Five frictions show up in every conversation.",
  },
  {
    kicker: "03 · The model",
    title: "Five groups, one neighbourhood.",
    body: "Healthcare professionals, public-health systems, neighbours, charities, and foundations meet around a single household. Not five verticals - one horizontal.",
  },
  {
    kicker: "04 · The unit",
    title: "Start at the smallest scale that still has trust.",
    body: "A neighbourhood of around a hundred families. Small enough to know each other; large enough to sustain a clinic, a circle of volunteers, and a working record.",
  },
  {
    kicker: "05 · What we're doing",
    title: "Convening, mapping, prototyping.",
    body: "A Visioning Lab brought together clinicians, policy-makers, technologists, and community leaders. The work continues with neighbourhood pilots, tooling, and policy.",
  },
  {
    kicker: "06 · How to engage",
    title: "Bring your capability.",
    body: "Read the model, find the group you align with, and tell us what you can contribute - funds, people, infrastructure, time, or trust.",
    accent: "ink",
  },
];

/* ───────────── Component ───────────── */
export function ExplainModal({
  open,
  onClose,
  pages = EXPLAIN_PAGES,
}: {
  open: boolean;
  onClose: () => void;
  pages?: ExplainPage[];
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  const total = pages.length;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      if (clamped === index) return;
      setDirection(clamped > index ? 1 : -1);
      setIndex(clamped);
    },
    [index, total]
  );

  // Reset to first page each time the modal opens; manage focus + body scroll
  useEffect(() => {
    if (!open) return;
    setIndex(0);
    setDirection(1);
    prevFocus.current = (document.activeElement as HTMLElement) ?? null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Defer focus to the dialog so the close button is reachable
    const id = window.setTimeout(() => dialogRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = prevOverflow;
      prevFocus.current?.focus?.();
    };
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        go(0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, go, onClose, total]);

  if (!open) return null;

  const page = pages[index];
  const accent = page.accent ?? "turquoise";

  return (
    <div
      className="explain-overlay"
      data-open="true"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="explain-title"
        tabIndex={-1}
        className="explain-dialog"
        data-accent={accent}
      >
        {/* Top bar */}
        <div className="explain-topbar">
          <span className="label">Explain NNHC to me</span>
          <button
            type="button"
            className="explain-close"
            aria-label="Close"
            onClick={onClose}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Stage */}
        <div className="explain-stage">
          <article
            key={index}
            className="explain-page"
            data-direction={direction === 1 ? "forward" : "back"}
          >
            <span className="explain-kicker label">{page.kicker}</span>
            <h2 id="explain-title" className="explain-title h-display">
              {page.title}
            </h2>
            <p className="explain-body lede">{page.body}</p>
          </article>
        </div>

        {/* Bottom controls */}
        <div className="explain-controls">
          <div className="explain-progress" role="tablist" aria-label="Page">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to page ${i + 1}`}
                className="explain-dot"
                data-active={i === index ? "true" : "false"}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <div className="explain-nav">
            <button
              type="button"
              className="explain-btn"
              onClick={() => go(index - 1)}
              disabled={isFirst}
            >
              ← Back
            </button>
            <span className="explain-count tabular">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {isLast ? (
              <button
                type="button"
                className="explain-btn explain-btn--primary"
                onClick={onClose}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="explain-btn explain-btn--primary"
                onClick={() => go(index + 1)}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
