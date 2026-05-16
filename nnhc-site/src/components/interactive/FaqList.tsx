"use client";

import { useState } from "react";
import { FAQS } from "@/lib/content";
import { useT } from "@/lib/i18n";

export function FaqList() {
  const t = useT();
  const [open, setOpen] = useState<number>(-1);

  return (
    <ul className="border-y border-line">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className="border-b border-line last:border-b-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              className="w-full text-left py-6 grid grid-cols-[1fr_auto] gap-6 items-baseline"
            >
              <h3 className="h-display text-xl md:text-2xl leading-tight text-balance">
                {t(`faqs.${i + 1}.q`, f.q)}
              </h3>
              <span
                aria-hidden
                className={`shrink-0 mt-1 w-8 h-8 grid place-items-center rounded-full border border-line-strong ${
                  isOpen ? "rotate-45 bg-ink text-bg border-ink" : ""
                }`}
                style={{
                  transitionProperty: "transform,background-color,color,border-color",
                  transitionDuration: "200ms",
                }}
              >
                <span className="text-lg leading-none">+</span>
              </span>
            </button>
            <div
              id={`faq-${i}`}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-7 max-w-3xl text-base text-ink-soft leading-relaxed text-pretty">
                  {t(`faqs.${i + 1}.a`, f.a)}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
