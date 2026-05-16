"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { GLOSSARY } from "@/lib/content";
import { useT } from "@/lib/i18n";

const KEY_BY_TERM: Record<string, string> = {
  "IMA": "IMA",
  "Arike": "Arike",
  "SPV": "SPV",
  "HCP": "HCP",
  "LSG": "LSG",
  "SSO": "SSO",
  "EMR / CMR": "EMRCMR",
  "OHC Network": "OHC",
  "IRDAI": "IRDAI",
  "Ente Gramam": "EnteGramam",
  "Family Clinic": "FamilyClinic",
  "Bio Cluster": "BioCluster",
};

export function GlossaryList() {
  const t = useT();
  const [q, setQ] = useState("");
  const deferred = useDeferredValue(q);

  const translated = useMemo(
    () =>
      GLOSSARY.map((g) => {
        const k = KEY_BY_TERM[g.term] ?? g.term;
        return {
          term: t(`glossary.${k}.term`, g.term),
          meaning: t(`glossary.${k}.meaning`, g.meaning),
        };
      }),
    [t],
  );

  const filtered = useMemo(() => {
    const s = deferred.trim().toLowerCase();
    if (!s) return translated;
    return translated.filter(
      (g) =>
        g.term.toLowerCase().includes(s) || g.meaning.toLowerCase().includes(s),
    );
  }, [deferred, translated]);

  return (
    <>
      <div className="max-w-md">
        <label className="label block mb-2" htmlFor="glossary-q">
          {t("about.glossary.searchLabel", "Search terms")}
        </label>
        <input
          id="glossary-q"
          type="search"
          inputMode="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("about.glossary.searchPlaceholder", "Try “SPV”, “EMR”, “Arike”…")}
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-transparent border-b border-line-strong focus:border-ink focus-visible:border-electric py-2 text-lg outline-none focus-visible:outline-none"
          style={{ transitionProperty: "border-color", transitionDuration: "150ms" }}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length === 1
          ? t("about.glossary.shownSingular", "{count} term shown").replace("{count}", String(filtered.length))
          : t("about.glossary.shownPlural", "{count} terms shown").replace("{count}", String(filtered.length))}
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
          <p className="text-ink-soft text-base py-6">{t("about.glossary.empty", "No terms match that search.")}</p>
        )}
      </dl>
    </>
  );
}
