"use client";

import { useEffect, useRef, useState } from "react";

type Step = {
  kicker: string;
  title: string;
  synopsis?: string;
  body: string;
};

export function StickyScroller({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (items.length === 0 || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry whose center is closest to the viewport center for stable selection
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const viewportCenter = window.innerHeight / 2;
        const best = intersecting.reduce((acc, e) => {
          const r = e.boundingClientRect;
          const center = r.top + r.height / 2;
          const dist = Math.abs(center - viewportCenter);
          return !acc || dist < acc.dist ? { e, dist } : acc;
        }, null as null | { e: IntersectionObserverEntry; dist: number });
        if (best) {
          const idx = Number((best.e.target as HTMLElement).dataset.idx);
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [steps.length]);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
      {/* Sticky visual rail */}
      <div className="hidden md:block md:col-span-5 sticky-rail">
        <div className="card p-10 md:p-12 aspect-[4/5] flex flex-col justify-between relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(ellipse 120% 80% at 30% 0%, rgba(20,184,166,0.10), transparent 60%)",
            }}
          />
          <div className="relative">
            <span className="label">{steps[active]?.kicker}</span>
            <p className="label-num text-ink-faint mt-2">
              {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </p>
          </div>

          <div className="relative">
            <p
              key={active}
              className="h-display text-3xl md:text-4xl text-balance leading-[1.15]"
              style={{ animation: "hero-rise 600ms cubic-bezier(0.16,1,0.3,1) both" }}
            >
              {steps[active]?.synopsis ?? steps[active]?.title}
            </p>
          </div>

          {/* progress dots */}
          <div className="relative flex gap-2 mt-8">
            {steps.map((_, i) => (
              <span
                key={i}
                aria-hidden
                className="h-1 rounded-full"
                style={{
                  width: i === active ? 28 : 8,
                  background: i === active ? "var(--color-electric)" : "var(--color-line-strong)",
                  transitionProperty: "width, background-color",
                  transitionDuration: "500ms",
                  transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scrolling content */}
      <ol className="md:col-span-7">
        {steps.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            data-idx={i}
            className="min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center py-16 border-b border-line last:border-b-0"
          >
            <span className="label">{s.kicker}</span>
            <h3 className="h-display text-3xl md:text-5xl mt-4 text-balance max-w-[18ch]">
              {s.title}
            </h3>
            <p className="mt-5 lede max-w-[48ch]">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
