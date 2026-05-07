import Link from "next/link";
import { SectionTitle } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { StarModelInteractive } from "@/components/interactive/StarModelInteractive";
import { ScrollSpyRail } from "@/components/ui/ScrollSpyRail";
import { PRINCIPLES, THREE_STEPS } from "@/lib/content";

export const metadata = {
  title: "Vision and Model",
  description:
    "The NNHC vision and the Star Model that operationalises it - one continuous fabric of care, five stakeholder groups around one shared centre.",
};

const SECTIONS = [
  { id: "vision", label: "The vision" },
  { id: "principles", label: "Principles" },
  { id: "star", label: "Star Model" },
  { id: "method", label: "Method" },
];

export default function ModelPage() {
  return (
    <main id="main">
      {/* ═══════════════ HERO ═══════════════ */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="aurora" aria-hidden />
        <div className="relative mx-auto max-w-[88rem] px-5 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20">
          <div className="flex items-center gap-3 mb-10 md:mb-14">
            <span className="notice-pill">
              <span className="label-num">P1</span>
              <span className="sep" aria-hidden />
              <span>Vision and operating structure</span>
            </span>
          </div>

          <h1
            className="h-display max-w-5xl text-balance"
            style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)", lineHeight: 1.02 }}
          >
            A single continuous{" "}
            <span className="h-italic" style={{ color: "var(--color-electric)" }}>
              fabric of care.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl lede text-pretty">
            Homes, neighbourhoods, family clinics, hospitals, and community research and
            training centres operate as one connected system - not five separate domains.
            Below: the principles that anchor the work, the model that organises it, and
            the method that puts it into motion.
          </p>
        </div>
      </header>

      <ScrollSpyRail sections={SECTIONS}>
        {/* ═══════════════ 01 · THE VISION ═══════════════ */}
        <section
          id="vision"
          aria-labelledby="vision-heading"
          className="scroll-mt-32 mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28 border-b border-line"
        >
          <SectionTitle kicker="The vision" title="One fabric, not five domains." />
          <div className="mt-12 grid md:grid-cols-12 gap-10 md:gap-16">
            <Reveal className="md:col-span-7">
              <h3 id="vision-heading" className="sr-only">
                The vision
              </h3>
              <p className="text-xl md:text-2xl leading-snug text-pretty text-balance">
                The NNHC initiative envisions a healthcare ecosystem where homes,
                neighbourhoods, family clinics, hospitals, and community research and
                training centres operate as a single continuous fabric of care.
              </p>
              <p className="mt-8 text-base md:text-lg text-ink-soft leading-relaxed">
                The model integrates these layers into one connected system rather than
                treating each as a separate domain. It works upstream - building health,
                preventing disease, and revising the structure of primary care so that
                hospitals are the exception rather than the default.
              </p>
            </Reveal>

            <Reveal className="md:col-span-5" delay={120}>
              <aside className="card p-7 md:p-8 relative overflow-hidden">
                <span
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 100% 70% at 0% 0%, rgba(20,184,166,0.08), transparent 60%)",
                  }}
                />
                <span className="label relative">Note</span>
                <h4 className="h-display text-2xl mt-3 mb-4 leading-tight relative">
                  What this is, and what it{" "}
                  <span className="h-display-italic text-electric">is not.</span>
                </h4>
                <p className="text-sm text-ink-soft leading-relaxed relative">
                  Kerala&apos;s palliative care movement, including IMA Arike, has
                  demonstrated that communities can hold responsibility for end-of-life
                  care. NNHC builds on that proof but answers a different question - where
                  palliative care meets a person at the end of life, NNHC works upstream.
                </p>
              </aside>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ 02 · PRINCIPLES ═══════════════ */}
        <section
          id="principles"
          aria-labelledby="principles-heading"
          className="scroll-mt-32 bg-surface-elevated border-b border-line"
        >
          <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28">
            <SectionTitle
              kicker="Principles"
              title="Five guiding principles."
            />
            <h3 id="principles-heading" className="sr-only">
              Principles
            </h3>
            <ol className="mt-12 divide-y divide-line border-y border-line">
              {PRINCIPLES.map((p, i) => (
                <Reveal as="li" key={p.n} delay={i * 80}>
                  <div className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 group">
                    <div className="md:col-span-2 flex items-start gap-4">
                      <span className="bignum text-5xl md:text-6xl tabular text-ink transition-colors duration-300 group-hover:text-electric">
                        {p.n}
                      </span>
                    </div>
                    <h4 className="md:col-span-4 h-display text-2xl md:text-3xl leading-tight text-balance">
                      {p.title}
                    </h4>
                    <p className="md:col-span-6 text-base text-ink-soft leading-relaxed text-pretty">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ═══════════════ 03 · STAR MODEL ═══════════════ */}
        <section
          id="star"
          aria-labelledby="star-heading"
          className="scroll-mt-32 mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28 border-b border-line"
        >
          <SectionTitle
            kicker="Star Model"
            title="Five stakeholder groups, one shared centre."
          />
          <h3 id="star-heading" className="sr-only">
            The Star Model
          </h3>
          <p className="mt-6 lede max-w-[52ch]">
            Care@Home sits at the centre, with five distinct stakeholder groups converging
            around it. Each brings a different form of capability; together they form the
            operational structure of the network.
          </p>
          <div className="mt-12">
            <StarModelInteractive />
          </div>
        </section>

        {/* ═══════════════ 04 · METHOD ═══════════════ */}
        <section
          id="method"
          aria-labelledby="method-heading"
          className="scroll-mt-32 bg-surface-elevated"
        >
          <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28">
            <SectionTitle
              kicker="Method"
              title="From vision to action - needs, services, gaps."
            />
            <h3 id="method-heading" className="sr-only">
              Method
            </h3>
            <ol className="mt-12 grid md:grid-cols-3 gap-6">
              {THREE_STEPS.map((s, i) => (
                <Reveal as="li" key={s.n} delay={i * 100}>
                  <article className="card p-7 h-full flex flex-col group">
                    <span className="label-num text-ink-faint mb-6 transition-colors duration-300 group-hover:text-electric">
                      {s.n}
                    </span>
                    <h4 className="h-display text-2xl mb-3 leading-tight text-balance">
                      {s.title}
                    </h4>
                    <p className="text-sm text-ink-soft leading-relaxed">{s.body}</p>
                  </article>
                </Reveal>
              ))}
            </ol>

            {/* Closing CTA */}
            <div className="mt-16 card p-8 md:p-12 grid md:grid-cols-12 gap-8 items-center relative overflow-hidden">
              <span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 60% at 100% 0%, rgba(20,184,166,0.10), transparent 60%)",
                }}
              />
              <div className="md:col-span-7 relative">
                <span className="label text-electric">What comes next</span>
                <h3
                  className="h-display mt-3 text-balance"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1.1 }}
                >
                  The model compiles into five operating tracks.
                </h3>
                <p className="mt-4 lede max-w-[48ch]">
                  Each track has an owner, an output, and a hand-off into the next. Read
                  how the work moves from convening to deployment.
                </p>
              </div>
              <div className="md:col-span-5 relative md:text-right">
                <Link href="/mission" className="btn btn-primary">
                  Mission specs <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollSpyRail>
    </main>
  );
}
