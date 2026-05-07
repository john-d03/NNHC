import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ENGAGE } from "@/lib/content";

export const metadata = { title: "Engage" };

export default function EngagePage() {
  return (
    <main id="main">
      <PageHeader
        kicker="6 pathways"
        title="Where you fit,"
        italicTail="and what to do next."
        lede="The network is built to absorb contribution from many directions. Each pathway maps to one of the five Star Model groups."
      />

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28">
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ENGAGE.map((e, i) => (
            <Reveal as="li" key={e.for} delay={i * 60}>
              <article className="card p-7 h-full flex flex-col group">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="label">If you are</span>
                  <span className="label-num text-ink-mute transition-colors duration-300 group-hover:text-electric">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="h-display text-3xl md:text-[2.25rem] leading-[1.05] text-balance">
                  <span className="h-display-italic text-electric">{e.for}</span>
                </h2>
                <hr className="hr my-5" />
                <ul className="space-y-3 mb-2">
                  {e.actions.map((a) => (
                    <li
                      key={a}
                      className="flex gap-3 text-[0.92rem] text-ink-soft leading-relaxed"
                    >
                      <span aria-hidden className="text-electric mt-1.5">▸</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-electric text-white relative overflow-hidden">
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 90% 0%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(ellipse 60% 60% at 0% 100%, rgba(255,255,255,0.10), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28">
          <span className="label" style={{ color: "rgba(255,255,255,0.8)" }}>
            Get in touch
          </span>
          <h2 className="h-display text-4xl md:text-7xl mt-4 max-w-4xl text-balance">
            Bring your capability -{" "}
            <span className="h-display-italic" style={{ color: "var(--color-electric-tint)" }}>
              the network will route it.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-snug" style={{ color: "rgba(255,255,255,0.88)" }}>
            Reach IMA Cochin to begin a conversation. Specify which Star Model
            group you align with, and what you can contribute - funds, people,
            materials, software, or simply your block of homes.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="mailto:contact@nnhc.example?subject=NNHC%20Engagement"
              className="btn btn-on-dark"
            >
              <span className="btn-icon" aria-hidden>+</span>
              Contact IMA Cochin
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
