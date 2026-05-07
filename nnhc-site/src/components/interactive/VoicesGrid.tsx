"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { VOICES } from "@/lib/content";

const GROUPS = ["All", "Policy", "Clinical", "Community", "Industry", "Tech"] as const;
type Group = (typeof GROUPS)[number];

export function VoicesGrid() {
  const [filter, setFilter] = useState<Group>("All");
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const userInteracted = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("group") as Group | null;
    if (v && (GROUPS as readonly string[]).includes(v)) setFilter(v);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (filter === "All") params.delete("group");
    else params.set("group", filter);
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${qs ? `?${qs}` : ""}`
    );

    if (!userInteracted.current) return;
    const el = sentinelRef.current;
    if (!el) return;
    // Sentinel sits above the sticky bar in the natural flow,
    // so its rect.top reflects the bar's true document anchor.
    const navOffset = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
    if (window.scrollY > top) {
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [filter]);

  const visible = useMemo(
    () => (filter === "All" ? VOICES : VOICES.filter((v) => v.group === filter)),
    [filter]
  );

  const onFilter = (g: Group) => {
    userInteracted.current = true;
    setFilter(g);
  };

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-0" />
      <div
        className="sticky top-16 z-30 -mx-5 md:-mx-10 px-5 md:px-10 py-3 bg-bg/85 backdrop-blur-md border-b border-line flex flex-wrap gap-2 items-center"
        role="radiogroup"
        aria-label="Filter voices by stakeholder group"
      >
        <span className="text-xs font-medium text-ink-soft mr-2" aria-hidden>Filter</span>
        {GROUPS.map((g) => (
          <button
            key={g}
            type="button"
            role="radio"
            onClick={() => onFilter(g)}
            aria-checked={filter === g}
            className="chip"
          >
            {g}
          </button>
        ))}
        <span className="text-xs font-medium tabular text-ink-mute ml-auto" aria-hidden>
          {String(visible.length).padStart(2, "0")} / {String(VOICES.length).padStart(2, "0")}
        </span>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "voice" : "voices"} shown
      </p>

      <ul className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((v) => (
          <li
            key={v.name}
            id={`voice-${v.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
            className="voice-card card p-6 md:p-7 flex flex-col gap-5 min-h-[15rem] scroll-mt-24 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="chip voice-chip">{v.group}</span>
              <span aria-hidden className="h-display-italic text-3xl leading-none -mt-1 voice-quote-mark">
                “
              </span>
            </div>
            <p className="text-[1.05rem] md:text-[1.1rem] leading-[1.55] text-pretty voice-quote">
              {v.quote}
            </p>
            <div className="mt-auto pt-4 border-t border-line voice-meta">
              <p className="text-sm font-medium">{v.name}</p>
              <p className="text-xs text-ink-soft voice-role">{v.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
