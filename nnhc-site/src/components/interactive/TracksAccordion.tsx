"use client";

import { useState } from "react";
import { TRACKS } from "@/lib/content";

export function TracksAccordion() {
  const [open, setOpen] = useState<number>(0);

  return (
    <ul className="border-y border-line">
      {TRACKS.map((t, i) => {
        const isOpen = open === i;
        return (
          <li key={t.n} className="border-b border-line last:border-b-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`track-${t.n}`}
              className="w-full text-left py-7 md:py-9 grid grid-cols-[3rem_1fr_auto] md:grid-cols-[6rem_1fr_auto] gap-4 md:gap-8 items-baseline group"
            >
              <span className="bignum text-4xl md:text-5xl">{t.n}</span>
              <h3 className="h-display text-2xl md:text-4xl leading-tight text-balance">
                {t.title}
              </h3>
              <span
                aria-hidden
                className={`shrink-0 mt-1 w-9 h-9 grid place-items-center rounded-full border border-line-strong ${
                  isOpen
                    ? "rotate-45 bg-ink text-bg border-ink"
                    : "group-hover:border-ink"
                }`}
                style={{ transitionProperty: "transform,background-color,color,border-color", transitionDuration: "200ms" }}
              >
                <span className="text-xl leading-none">+</span>
              </span>
            </button>
            <div
              id={`track-${t.n}`}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid md:grid-cols-[6rem_1fr] gap-4 md:gap-8 pb-10 md:pb-14">
                  <div className="hidden md:block" />
                  <div className="grid md:grid-cols-12 gap-8">
                    <p className="md:col-span-7 text-lg leading-relaxed text-pretty">
                      {t.summary}
                    </p>
                    <div className="md:col-span-5 card p-5 border-l-2 border-electric">
                      <span className="label">Key output</span>
                      <p className="text-sm mt-2 leading-relaxed">{t.output}</p>
                    </div>
                    <ul className="md:col-span-12 mt-2 grid md:grid-cols-2 gap-x-8 gap-y-3">
                      {t.points.map((p) => (
                        <li
                          key={p}
                          className="flex gap-3 text-[0.95rem] text-ink-soft leading-relaxed"
                        >
                          <span aria-hidden className="text-electric mt-1">▸</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
