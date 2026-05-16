"use client";

import Link from "next/link";
import { MissionTracks } from "@/components/interactive/MissionTracks";
import { TRACKS } from "@/lib/content";
import { useT } from "@/lib/i18n";

export default function MissionPage() {
  const t = useT();
  const stats = [
    { v: "5", k: "mission.hero.stat1.label", l: "Tracks" },
    { v: "1", k: "mission.hero.stat2.label", l: "Operating system" },
    { v: "100", k: "mission.hero.stat3.label", l: "Days to first dashboard" },
    { v: "14", k: "mission.hero.stat4.label", l: "Districts in scope" },
  ];
  return (
    <main id="main">
      {/* ═══════════════ HERO ═══════════════ */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="aurora" aria-hidden />
        <div className="relative mx-auto max-w-[88rem] px-5 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20">
          <div className="flex items-center gap-3 mb-10 md:mb-14">
            <span className="notice-pill">
              <span className="label-num">{t("mission.hero.pillIndex", "P2")}</span>
              <span className="sep" aria-hidden />
              <span>{t("mission.hero.pillLabel", `Operating system · ${TRACKS.length} tracks`)}</span>
            </span>
          </div>

          <h1
            className="h-display max-w-5xl text-balance"
            style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)", lineHeight: 1.02 }}
          >
            {t("mission.hero.titlePrefix", "Five tracks that move")}{" "}
            <span className="h-italic" style={{ color: "var(--color-electric)" }}>
              {t("mission.hero.titleItalic", "vision into operation.")}
            </span>
          </h1>

          <p className="mt-8 max-w-2xl lede text-pretty">
            {t(
              "mission.hero.lede",
              "Each track has a clear owner, a clear output, and feeds into the next. Together they form a complete operating system for community-led healthcare.",
            )}
          </p>

          {/* Stat strip */}
          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-lg overflow-hidden">
            {stats.map((s) => (
              <div key={s.k} className="bg-bg p-5 md:p-6">
                <p className="bignum text-3xl md:text-4xl">{s.v}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink-faint">
                  {t(s.k, s.l)}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ═══════════════ TRACKS ═══════════════ */}
      <MissionTracks />
    </main>
  );
}
