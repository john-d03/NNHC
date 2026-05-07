import Link from "next/link";
import { MissionTracks } from "@/components/interactive/MissionTracks";
import { TRACKS } from "@/lib/content";

export const metadata = { title: "Mission Specs" };

export default function MissionPage() {
  return (
    <main id="main">
      {/* ═══════════════ HERO ═══════════════ */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="aurora" aria-hidden />
        <div className="relative mx-auto max-w-[88rem] px-5 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20">
          <div className="flex items-center gap-3 mb-10 md:mb-14">
            <span className="notice-pill">
              <span className="label-num">P2</span>
              <span className="sep" aria-hidden />
              <span>Operating system · {TRACKS.length} tracks</span>
            </span>
          </div>

          <h1
            className="h-display max-w-5xl text-balance"
            style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)", lineHeight: 1.02 }}
          >
            Five tracks that move{" "}
            <span className="h-italic" style={{ color: "var(--color-electric)" }}>
              vision into operation.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl lede text-pretty">
            Each track has a clear owner, a clear output, and feeds into the next.
            Together they form a complete operating system for community-led healthcare.
          </p>

          {/* Stat strip */}
          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-lg overflow-hidden">
            {[
              { v: "5", l: "Tracks" },
              { v: "1", l: "Operating system" },
              { v: "100", l: "Days to first dashboard" },
              { v: "14", l: "Districts in scope" },
            ].map((s) => (
              <div key={s.l} className="bg-bg p-5 md:p-6">
                <p className="bignum text-3xl md:text-4xl">{s.v}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink-faint">
                  {s.l}
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
