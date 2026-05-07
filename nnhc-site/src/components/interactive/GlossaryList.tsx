"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { GLOSSARY } from "@/lib/content";

export function GlossaryList() {
  const [q, setQ] = useState("");
  const deferred = useDeferredValue(q);

  const filtered = useMemo(() => {
    const s = deferred.trim().toLowerCase();
    if (!s) return GLOSSARY;
    return GLOSSARY.filter(
      (g) =>
        g.term.toLowerCase().includes(s) || g.meaning.toLowerCase().includes(s)
    );
  }, [deferred]);

  return (
    <>
      <div className="max-w-md">
        <label className="label block mb-2" htmlFor="glossary-q">
          Search terms
        </label>
        <input
          id="glossary-q"
          type="search"
          inputMode="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={"Try \u201cSPV\u201d, \u201cEMR\u201d, \u201cArike\u201d\u2026"}
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-transparent border-b border-line-strong focus:border-ink focus-visible:border-electric py-2 text-lg outline-none focus-visible:outline-none"
          style={{ transitionProperty: "border-color", transitionDuration: "150ms" }}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "term" : "terms"} shown
      </p>

      <dl className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-1">
        {filtered.map((g) => (
          <div
            key={g.term}
            className="grid grid-cols-[10rem_1fr] gap-5 py-4 border-t border-line"
          >
            <dt className="h-display-italic text-xl text-electric leading-tight">
              {g.term}
            </dt>
            <dd className="text-sm text-ink-soft leading-relaxed">{g.meaning}</dd>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-ink-soft text-base py-6">No terms match that search.</p>
        )}
      </dl>
    </>
  );
}
