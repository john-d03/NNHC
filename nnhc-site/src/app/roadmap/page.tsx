import { PageHeader, SectionTitle } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ClosingCta } from "@/components/site/ClosingCta";
import { MILESTONES, HUNDRED_DAY_PLAN, RESOURCING } from "@/lib/content";

export const metadata = { title: "Roadmap" };

const ACTS = [
  {
    roman: "I",
    label: "Convene",
    title: "Convene the network.",
    subtitle: "Stand up the governance structures and the people who will hold them.",
    from: 1,
    to: 3,
  },
  {
    roman: "II",
    label: "Build",
    title: "Map the gaps, build the response.",
    subtitle: "Inventory what's missing, then route resources and capacity to close it.",
    from: 4,
    to: 7,
  },
  {
    roman: "III",
    label: "Measure",
    title: "Prove it at the population level.",
    subtitle: "Operational reporting and societal indicators that the model can be held to.",
    from: 8,
    to: 9,
  },
] as const;

export default function RoadmapPage() {
  return (
    <main id="main">
      <PageHeader
        index="P3"
        kicker="9 milestones"
        title="From convening to"
        italicTail="measurable impact."
        lede="Nine sequential milestones structure the journey from launch to evidence of healthcare impact at the population level. Each milestone has a defined output and a defined owner."
      />

      <section className="mx-auto max-w-[88rem] px-5 md:px-10 py-24 md:py-32">
        {ACTS.map((act, ai) => {
          const items = MILESTONES.filter(
            (m) => Number(m.n) >= act.from && Number(m.n) <= act.to
          );
          return (
            <div
              key={act.label}
              className={`grid md:grid-cols-12 gap-10 md:gap-16 ${ai > 0 ? "mt-24 md:mt-32 pt-20 md:pt-24 border-t border-line" : ""}`}
            >
              {/* Phase header */}
              <Reveal as="div" className="md:col-span-4">
                <div className="md:sticky md:top-32">
                  <div className="flex items-center gap-3">
                    <span className="label-num text-electric tabular text-sm">
                      Act {act.roman}
                    </span>
                    <span aria-hidden className="h-px w-10 bg-electric" />
                  </div>
                  <h2
                    className="h-display mt-4 text-balance"
                    style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.02 }}
                  >
                    {act.title}
                  </h2>
                  <p className="mt-4 text-ink-soft text-[0.95rem] leading-relaxed max-w-sm">
                    {act.subtitle}
                  </p>
                  <p className="mt-6 label-num text-ink-faint tabular">
                    M{String(act.from).padStart(2, "0")} - M{String(act.to).padStart(2, "0")} · {items.length} of 9
                  </p>
                </div>
              </Reveal>

              {/* Milestone entries */}
              <ol className="md:col-span-8 divide-y divide-line border-y border-line">
                {items.map((m, i) => (
                  <Reveal as="li" key={m.n} delay={i * 80}>
                    <div className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 group">
                      <div className="md:col-span-2 flex items-start">
                        <span className="bignum text-5xl md:text-6xl tabular text-ink transition-colors duration-300 group-hover:text-electric">
                          {m.n}
                        </span>
                      </div>
                      <h3 className="md:col-span-4 h-display text-2xl md:text-3xl leading-tight text-balance">
                        {m.title}
                      </h3>
                      <p className="md:col-span-6 text-base text-ink-soft leading-relaxed text-pretty">
                        {m.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          );
        })}
      </section>

      <section className="border-t border-line bg-surface-elevated">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28">
          <SectionTitle
            kicker="100-day plan"
            title="Six immediate actions to begin operating."
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HUNDRED_DAY_PLAN.map((p, i) => (
              <Reveal key={p.n} delay={i * 60}>
                <article className="card p-6 h-full flex flex-col group">
                  <span className="label-num text-ink-faint transition-colors duration-300 group-hover:text-electric">
                    {p.n}
                  </span>
                  <h3 className="h-display text-xl mt-5 mb-3 leading-tight text-balance">
                    {p.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28">
          <SectionTitle
            kicker="Resourcing"
            title="Five categories that fund the operation."
          />
          <dl className="mt-12 divide-y divide-line border-y border-line">
            {RESOURCING.map((r) => (
              <div key={r.title} className="py-6 grid md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                <dt className="md:col-span-4 h-display-italic text-2xl text-electric">
                  {r.title}
                </dt>
                <dd className="md:col-span-8 text-base text-ink-soft leading-relaxed">
                  {r.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClosingCta
        title="Hear who shaped this roadmap."
        body="The voices, frictions, and convictions of the clinicians, policy-makers, and community leaders who showed up to the lab."
        href="/voices"
        label="Voices from the lab"
      />
    </main>
  );
}
