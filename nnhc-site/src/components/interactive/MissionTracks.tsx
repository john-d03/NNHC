"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TRACKS } from "@/lib/content";
import { Reveal } from "@/components/site/Reveal";
import { useT } from "@/lib/i18n";

export function MissionTracks() {
  const t = useT();
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const trackTitle = (i: number) => t(`tracks.${i + 1}.title`, TRACKS[i].title);

  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[];
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
        if (best) {
          const idx = Number((best.e.target as HTMLElement).dataset.idx);
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Sticky track rail (desktop) */}
      <nav
        aria-label="Tracks"
        className="hidden md:flex sticky top-16 z-30 border-y border-line bg-bg/90 backdrop-blur-md"
      >
        <ol className="mx-auto max-w-[88rem] w-full px-5 md:px-10 flex items-stretch overflow-x-auto">
          {TRACKS.map((t, i) => {
            const isActive = i === active;
            return (
              <li key={t.n} className="flex-1 min-w-[10rem]">
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={isActive ? "step" : undefined}
                  className="w-full text-left py-4 pr-6 group flex items-baseline gap-3 border-r border-line last:border-r-0 transition-colors"
                >
                  <span
                    className="text-sm font-medium leading-snug line-clamp-1 transition-colors"
                    style={{ color: isActive ? "var(--color-ink)" : "var(--color-ink-soft)" }}
                  >
                    {trackShort(trackTitle(i))}
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
        aria-label="Tracks"
        className="md:hidden sticky top-16 z-30 border-y border-line bg-bg/90 backdrop-blur-md"
      >
        <ol className="flex gap-2 overflow-x-auto px-5 py-3">
          {TRACKS.map((t, i) => {
            const isActive = i === active;
            return (
              <li key={t.n}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors"
                  style={{
                    background: isActive ? "var(--color-electric)" : "transparent",
                    color: isActive ? "#fff" : "var(--color-ink-soft)",
                    borderColor: isActive ? "var(--color-electric)" : "var(--color-line-strong)",
                  }}
                >
                  {trackShort(trackTitle(i))}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Track sections */}
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        {TRACKS.map((track, i) => (
          <section
            key={track.n}
            id={`track-${track.n}`}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            data-idx={i}
            className="track-section py-20 md:py-28 border-b border-line last:border-b-0 group/track"
            aria-labelledby={`track-${track.n}-title`}
          >
            <div className="grid md:grid-cols-12 gap-8 md:gap-12">
              {/* Left: meta */}
              <Reveal as="div" className="md:col-span-4">
                <div className="md:sticky md:top-44">
                  <span className="label block text-electric">{t("mission.tracks.railLabel", "Track")}</span>
                  <p className="mt-2 text-xs text-ink-faint tabular transition-colors duration-300 group-hover/track:text-electric">
                    <span className="text-ink transition-colors duration-300 group-hover/track:text-electric">
                      {String(i + 1).padStart(2, "0")}
                    </span>{" "}/ {String(TRACKS.length).padStart(2, "0")}
                  </p>
                </div>
              </Reveal>

              {/* Right: content */}
              <div className="md:col-span-8">
                <Reveal delay={80}>
                  <h2
                    id={`track-${track.n}-title`}
                    className="h-display text-balance"
                    style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)", lineHeight: 1.05 }}
                  >
                    {t(`tracks.${i + 1}.title`, track.title)}
                  </h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-6 lede max-w-[52ch]">{t(`tracks.${i + 1}.summary`, track.summary)}</p>
                </Reveal>

                <div className="mt-10 grid md:grid-cols-12 gap-6 md:gap-8">
                  {/* Output callout */}
                  <Reveal as="div" delay={240} className="md:col-span-5">
                    <aside className="card p-6 relative overflow-hidden">
                      <span
                        aria-hidden
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(ellipse 100% 70% at 0% 0%, rgba(20,184,166,0.08), transparent 60%)",
                        }}
                      />
                      <span className="label text-electric relative">{t("mission.tracks.keyOutput", "Key output")}</span>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink relative">
                        {t(`tracks.${i + 1}.output`, track.output)}
                      </p>
                    </aside>
                  </Reveal>

                  {/* Points */}
                  <ul className="md:col-span-7 grid gap-3">
                    {track.points.map((p, j) => (
                      <Reveal
                        as="li"
                        key={p}
                        delay={300 + j * 80}
                        className="track-point flex gap-3 items-baseline py-3 border-t border-line first:border-t-0"
                      >
                        <span aria-hidden className="text-electric mt-1.5 shrink-0">▸</span>
                        <span className="text-[0.95rem] leading-relaxed text-ink-soft">
                          {t(`tracks.${i + 1}.point${j + 1}`, p)}
                        </span>
                      </Reveal>
                    ))}
                  </ul>
                </div>

                {/* Inter-track connector */}
                {i < TRACKS.length - 1 && (
                  <Reveal delay={400}>
                    <div className="mt-14 flex items-center gap-4 text-ink-faint">
                      <span aria-hidden className="h-px flex-1 bg-line" />
                      <button
                        type="button"
                        onClick={() => goTo(i + 1)}
                        className="text-xs uppercase tracking-[0.18em] hover:text-electric transition-colors"
                      >
                        {t("mission.tracks.continueTo", "Continue to {next} ↓").replace("{next}", trackShort(trackTitle(i + 1)))}
                      </button>
                      <span aria-hidden className="h-px w-12 bg-line" />
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Closing CTA */}
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28">
        <div className="card p-8 md:p-12 grid md:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 100% 0%, rgba(20,184,166,0.10), transparent 60%)",
            }}
          />
          <div className="md:col-span-7 relative">
            <span className="label text-electric">{t("mission.cta.kicker", "What comes next")}</span>
            <h3
              className="h-display mt-3 text-balance"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1.1 }}
            >
              {t("mission.cta.title", "The five tracks compile into a roadmap.")}
            </h3>
            <p className="mt-4 lede max-w-[48ch]">
              {t(
                "mission.cta.body",
                "Each track produces an output. Each output unlocks the next milestone. Read the sequence and the measures we'll be held to.",
              )}
            </p>
          </div>
          <div className="md:col-span-5 relative md:text-right">
            <Link href="/roadmap" className="btn btn-primary">
              {t("mission.cta.button", "Roadmap and milestones")} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function trackShort(title: string) {
  // Strip leading "Star Model · " prefix and trim long titles for the rail
  const cleaned = title.replace(/^.*·\s*/, "");
  if (cleaned.length <= 36) return cleaned;
  return cleaned.slice(0, 34).replace(/\s+\S*$/, "") + "…";
}
