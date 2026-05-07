"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Section = { id: string; label: string };

export function ScrollSpyRail({
  sections,
  children,
}: {
  sections: Section[];
  children: ReactNode;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    if (els.length === 0 || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const viewportCenter = window.innerHeight / 2;
        const best = intersecting.reduce(
          (acc, e) => {
            const r = e.boundingClientRect;
            const center = r.top + r.height / 2;
            const dist = Math.abs(center - viewportCenter);
            return !acc || dist < acc.dist ? { e, dist } : acc;
          },
          null as null | { e: IntersectionObserverEntry; dist: number }
        );
        if (best) setActive(best.e.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label="On this page"
        className="hidden md:flex sticky top-16 z-30 border-y border-line bg-bg/90 backdrop-blur-md"
      >
        <ol className="mx-auto max-w-[88rem] w-full px-5 md:px-10 flex items-stretch overflow-x-auto">
          {sections.map((s, i) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="flex-1 min-w-[10rem]">
                <button
                  type="button"
                  onClick={() => goTo(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className="w-full text-left py-4 pr-6 group flex items-baseline gap-3 border-r border-line last:border-r-0 transition-colors"
                >
                  <span
                    className="text-sm font-medium leading-snug line-clamp-1 transition-colors"
                    style={{ color: isActive ? "var(--color-ink)" : "var(--color-ink-soft)" }}
                  >
                    {s.label}
                  </span>
                </button>
                <span
                  aria-hidden
                  className="block h-[2px] transition-all duration-500"
                  style={{
                    background: isActive ? "var(--color-electric)" : "transparent",
                    width: isActive ? "100%" : "0%",
                  }}
                />
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile pill scroller */}
      <nav
        aria-label="On this page"
        className="md:hidden sticky top-16 z-30 border-y border-line bg-bg/90 backdrop-blur-md"
      >
        <ol className="flex gap-2 overflow-x-auto px-5 py-3">
          {sections.map((s, i) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => goTo(s.id)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors"
                  style={{
                    background: isActive ? "var(--color-electric)" : "transparent",
                    color: isActive ? "#fff" : "var(--color-ink-soft)",
                    borderColor: isActive
                      ? "var(--color-electric)"
                      : "var(--color-line-strong)",
                  }}
                >
                  {s.label}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {children}
    </>
  );
}
