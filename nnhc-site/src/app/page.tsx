"use client";

import Link from "next/link";
import { META, formatLabDate, PRINCIPLES, INSIGHTS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { StickyScroller } from "@/components/ui/StickyScroller";
import { useT } from "@/lib/i18n";

const SECTIONS = [
  { n: "01", href: "/model", key: "section1", title: "Vision & Model", note: "A continuous fabric of care, organised around five stakeholder groups." },
  { n: "02", href: "/mission", key: "section2", title: "Mission", note: "Five tracks that move vision into operation." },
  { n: "03", href: "/roadmap", key: "section3", title: "Roadmap", note: "From convening to measurable population impact." },
  { n: "04", href: "/voices", key: "section4", title: "Voices", note: "The people who showed up - and what they said." },
  { n: "05", href: "/engage", key: "section5", title: "Engage", note: "Where you fit, and what to do next." },
  { n: "06", href: "/about", key: "section6", title: "About", note: "Challenges, FAQ, and glossary." },
];

const FRICTIONS = [
  {
    kicker: "Capacity",
    title: "Hospitals are overwhelmed",
    synopsis: "Tertiary beds carry conditions that belong at home.",
    body: "Specialist hospitals are absorbing routine, manageable conditions because the layer beneath them has thinned out. Beds meant for surgery and intensive care fill with diabetes follow-ups and chronic wounds - spending the system’s scarcest capacity on work it was never designed for.",
  },
  {
    kicker: "Continuity",
    title: "The family doctor is missing",
    synopsis: "Episodic visits replaced the longitudinal relationship.",
    body: "The clinician who knew a household across years - births, bereavements, the slow drift of a blood pressure reading - has been replaced by a stream of one-off encounters. Each visit starts from zero. Context, memory, and judgement that used to compound now reset every time.",
  },
  {
    kicker: "Geography",
    title: "Care is geographically uneven",
    synopsis: "Postcode still decides the standard of care.",
    body: "Two families three kilometres apart can receive entirely different care for the same condition - different drugs, different waits, different outcomes. The unevenness isn’t just rural versus urban; it lives between neighbouring wards, between one panchayat and the next.",
  },
  {
    kicker: "Cost",
    title: "Costs spiral with no upper bound",
    synopsis: "Out-of-pocket spend pushes households into poverty.",
    body: "Indian households still pay for most of their healthcare directly, at the point of use. A single hospitalisation can wipe out a year of savings; a chronic condition can quietly drain a generation of them. Financial protection remains the exception, not the rule.",
  },
  {
    kicker: "Tooling",
    title: "Technology is fragmented",
    synopsis: "Records live in silos. Devices don’t talk.",
    body: "Hospital EMRs, lab systems, pharmacy records, and home-care apps each hold a slice of the truth and refuse to share. Patients carry paper between specialists who never meet, and clinicians make decisions on whichever fragment they can see.",
  },
];

const TESTIMONIALS = [
  { quote: "Reduce hospital dependency, control healthcare costs, and revive the family doctor system.", name: "Rajeev Sadanandan, IAS", role: "Former Health Secretary, Kerala" },
  { quote: "The neighbourhood is the smallest unit at which trust still exists at scale. Build there.", name: "Dr. K. M. Abul Hasan", role: "IMA Cochin" },
  { quote: "We don\u2019t need another vertical. We need a horizontal that connects what already exists.", name: "Visioning Workshop participant", role: "Clinical track" },
  { quote: "Continuity of care is not a feature. It\u2019s the product.", name: "Visioning Workshop participant", role: "Policy track" },
];

const STATS = [
  { value: 30, suffix: "+", tKey: "home.hero.statStakeholders", label: "Stakeholders convened" },
  { value: 5, suffix: "", tKey: "home.hero.statTracks", label: "Mission tracks" },
  { value: 7, suffix: "", tKey: "home.hero.statSections", label: "Vision sections" },
  { value: 1, suffix: "", tKey: "home.hero.statNeighbourhood", label: "Neighbourhood at a time" },
];

export default function HomePage() {
  const t = useT();
  const labDate = formatLabDate();
  const heroLine1 = t("home.hero.line1", "Care at home,").split(/\s+/);
  const heroLine2 = t("home.hero.line2", "supported by your").split(/\s+/);
  const heroItalic = t("home.hero.line2Italic", "neighbourhood.");

  return (
    <main id="main">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden" aria-labelledby="hero-title">
        <div className="aurora" aria-hidden />

        <div className="relative mx-auto max-w-[88rem] px-5 md:px-10 pt-16 md:pt-28 pb-24 md:pb-36">
          <div className="flex items-center gap-3 mb-10 md:mb-14">
            <span className="notice-pill">
              <span>{t("meta.workshopLabel", "Visioning Workshop")}</span>
              <span className="sep" aria-hidden />
              <span className="tabular">{labDate}</span>
            </span>
            <span className="hidden md:inline label">
              {t("footer.metaConvened", "Convened")} {t("meta.convenedBy", META.convenedBy)}
            </span>
          </div>

          <h1
            id="hero-title"
            className="h-display"
            style={{ fontSize: "clamp(3rem, 9.5vw, 9.5rem)" }}
          >
            <span className="block">
              {heroLine1.map((w, i) => (
                <span
                  key={`l1-${i}`}
                  className="hero-word"
                  style={{ ["--i" as string]: i }}
                >
                  {w}
                  {i < heroLine1.length - 1 && "\u00A0"}
                </span>
              ))}
            </span>
            <span className="block">
              {heroLine2.map((w, i) => (
                <span
                  key={`l2-${i}`}
                  className="hero-word"
                  style={{ ["--i" as string]: heroLine1.length + i }}
                >
                  {w}
                  {"\u00A0"}
                </span>
              ))}
              <span
                className="hero-word h-italic"
                style={{
                  ["--i" as string]: heroLine1.length + heroLine2.length,
                  color: "var(--color-electric)",
                }}
              >
                {heroItalic}
              </span>
            </span>
          </h1>

          <Reveal delay={700} className="mt-12 md:mt-16">
            <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
              <p className="col-span-12 md:col-span-7 lede max-w-[52ch]">
                {t(
                  "home.hero.lede",
                  "The Neighbourhood Network in Health Care is a community-led, home-based healthcare system. It empowers neighbourhoods, restores the family doctor, and brings continuous care to where people actually live.",
                )}
              </p>
              <div className="col-span-12 md:col-span-5 md:flex md:justify-end">
                <div className="flex flex-wrap gap-3">
                  <Link href="/model" className="btn btn-primary">
                    {t("home.hero.ctaPrimary", "Read the vision")}
                    <span className="btn-icon" aria-hidden>→</span>
                  </Link>
                  <Link href="/engage" className="btn btn-ghost">
                    {t("home.hero.ctaSecondary", "How to engage")}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats strip */}
        <Reveal delay={900}>
          <div className="border-t border-line">
            <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
              {STATS.map((s) => (
                <div key={s.tKey}>
                  <div className="bignum text-5xl md:text-6xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-3 text-sm text-ink-soft leading-snug max-w-[20ch]">
                    {t(s.tKey, s.label)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════ STICKY SCROLL - FRICTIONS ═══════════════ */}
      <section className="section-frame" aria-labelledby="frictions-title">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-24 md:py-40">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24 items-end">
              <div className="col-span-12 md:col-span-8">
                <span className="label">{t("home.frictions.kicker", "The Problem")}</span>
                <h2
                  id="frictions-title"
                  className="h-display mt-5"
                  style={{ fontSize: "clamp(2.4rem, 6vw, 5.2rem)" }}
                >
                  {t("home.frictions.titleLine1", "Your healthcare isn’t broken.")}
                  <br />
                  {t("home.frictions.titleLine2", "It’s broken apart.")}
                </h2>
              </div>
              <p className="col-span-12 md:col-span-4 lede max-w-[36ch]">
                {t(
                  "home.frictions.lede",
                  "Five frictions came up in every room, across every stakeholder group. We refuse to design around any of them.",
                )}
              </p>
            </div>
          </Reveal>

          <StickyScroller
            steps={FRICTIONS.map((f, i) => ({
              kicker: t(`home.frictions.${i + 1}.kicker`, f.kicker),
              title: t(`home.frictions.${i + 1}.title`, f.title),
              synopsis: t(`home.frictions.${i + 1}.synopsis`, f.synopsis),
              body: t(`home.frictions.${i + 1}.body`, f.body),
            }))}
          />
        </div>
      </section>

      {/* ═══════════════ TESTIMONIES - large quotes ═══════════════ */}
      <section className="section-frame" aria-labelledby="testimonies-title">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-24 md:py-40">
          <Reveal>
            <div className="mb-16 md:mb-24">
              <span className="label">{t("home.testimonies.kicker", "Testimony")}</span>
              <h2
                id="testimonies-title"
                className="h-display mt-5 max-w-[18ch]"
                style={{ fontSize: "clamp(2.4rem, 6vw, 5.2rem)" }}
              >
                {t("home.testimonies.titleLine1", "Vision echoed by")}
                <br />
                {t("home.testimonies.titleLine2", "society leaders.")}
              </h2>
            </div>
          </Reveal>

          <ul className="space-y-20 md:space-y-32">
            {TESTIMONIALS.map((tm, i) => (
              <li key={tm.name + i}>
                <Reveal delay={i * 60}>
                  <figure className="grid grid-cols-12 gap-6 md:gap-12 items-start">
                    <figcaption className="col-span-12 md:col-span-3 order-2 md:order-1">
                      <div className="flex md:flex-col gap-4 md:gap-1 items-baseline md:items-start">
                        <span className="label-num text-ink-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-sm font-medium tracking-tight">{tm.name}</p>
                          <p className="text-xs text-ink-mute mt-0.5">{tm.role}</p>
                        </div>
                      </div>
                    </figcaption>
                    <blockquote
                      className="col-span-12 md:col-span-9 order-1 md:order-2 h-display text-balance"
                      style={{ fontSize: "clamp(1.75rem, 4vw, 3.4rem)", lineHeight: 1.08 }}
                    >
                      <span style={{ color: "var(--color-electric)" }}>&ldquo;</span>
                      {t(`home.testimonies.${i + 1}.quote`, tm.quote)}
                      <span style={{ color: "var(--color-electric)" }}>&rdquo;</span>
                    </blockquote>
                  </figure>
                </Reveal>
              </li>
            ))}

            {/* Coda - sits in the same rhythm as a testimony row */}
            <li>
              <Reveal delay={TESTIMONIALS.length * 60}>
                <Link
                  href="/voices"
                  className="group block grid grid-cols-12 gap-6 md:gap-12 items-start"
                >
                  <div className="col-span-12 md:col-span-3">
                    <div className="flex md:flex-col gap-4 md:gap-1 items-baseline md:items-start">
                      <span aria-hidden className="hidden md:block h-px w-8 bg-line-strong mt-3" />
                      <div>
                        <p className="text-sm font-medium tracking-tight text-ink-soft transition-colors group-hover:text-electric inline-flex items-center gap-2">
                          {t("home.testimonies.seeAll", "See all voices")}
                          <span
                            aria-hidden
                            className="inline-block transition-transform group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </p>
                        <p className="text-xs text-ink-mute mt-0.5">
                          {t("home.testimonies.filteredBy", "Filtered by group")}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          </ul>
        </div>
      </section>

      {/* ═══════════════ PRINCIPLES - interactive cards ═══════════════ */}
      <section className="section-frame" aria-labelledby="principles-title">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-24 md:py-40">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24 items-end">
              <div className="col-span-12 md:col-span-8">
                <span className="label">{t("home.principles.kicker", "Principles")}</span>
                <h2
                  id="principles-title"
                  className="h-display mt-5"
                  style={{ fontSize: "clamp(2.4rem, 6vw, 5.2rem)" }}
                >
                  {t("home.principles.titleLine1", "Five things we refuse")}
                  <br />
                  {t("home.principles.titleLine2", "to lose.")}
                </h2>
              </div>
              <p className="col-span-12 md:col-span-4 lede max-w-[36ch]">
                {t(
                  "home.principles.lede",
                  "Every architectural decision the network makes is tested against these. They are the floor - not the ceiling.",
                )}
              </p>
            </div>
          </Reveal>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} as="li" delay={i * 90}>
                <article className="card p-7 md:p-8 h-full flex flex-col gap-6 group">
                  <div className="flex items-baseline justify-between">
                    <span className="label-num text-ink-mute transition-colors duration-300 group-hover:text-electric">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mark-x" aria-hidden>+</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-medium tracking-tight leading-[1.2] text-balance">
                    {t(`principles.${i + 1}.title`, p.title)}
                  </h3>
                  <p className="text-[0.95rem] text-ink-soft leading-relaxed mt-auto">
                    {t(`principles.${i + 1}.body`, p.body)}
                  </p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════ VOICES STRIP ═══════════════ */}
      {/* Removed - testimonies above already include a "See all voices →" link to the full register. */}

      {/* ═══════════════ TABLE OF CONTENTS ═══════════════ */}
      <section className="section-frame" aria-labelledby="contents-title">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-24 md:py-40">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-16 items-end">
              <div className="col-span-12 md:col-span-8">
                <span className="label">{t("home.toc.kicker", "Front Matter")}</span>
                <h2
                  id="contents-title"
                  className="h-display mt-5"
                  style={{ fontSize: "clamp(2.4rem, 6vw, 5.2rem)" }}
                >
                  {t("home.toc.titlePrefix", "Where would you like to begin?")}
                </h2>
              </div>
            </div>
          </Reveal>

          <ol>
            {SECTIONS.map((row, i) => (
              <Reveal as="li" key={row.href} delay={i * 50}>
                <Link
                  href={row.href}
                  className="grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(18rem,28rem)_auto] gap-4 md:gap-10 items-baseline py-7 md:py-9 border-b border-line group hover:bg-bg-tint/60 transition-colors px-2 -mx-2 rounded-lg"
                >
                  <span className="label-num text-ink-faint pt-1">{row.n}</span>
                  <span
                    className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.05] min-w-0 transition-colors group-hover:text-electric"
                    style={{ letterSpacing: "-0.035em" }}
                  >
                    {t(`home.toc.${row.key}.title`, row.title)}
                  </span>
                  <span className="hidden md:block text-sm text-ink-soft leading-snug max-w-[36ch]">
                    {t(`home.toc.${row.key}.note`, row.note)}
                  </span>
                  <span
                    aria-hidden
                    className="text-ink-soft text-2xl transition-transform group-hover:translate-x-2 group-hover:text-electric self-center"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════ INSIGHTS ═══════════════ */}
      <section className="section-frame" aria-labelledby="insights-title">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-24 md:py-40">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 items-end">
              <div className="col-span-12 md:col-span-8">
                <span className="label">{t("home.insights.kicker", "From the Workshop")}</span>
                <h2
                  id="insights-title"
                  className="h-display mt-5"
                  style={{ fontSize: "clamp(2.4rem, 6vw, 5.2rem)" }}
                >
                  {t("home.insights.titleLine1", "Ten themes,")}
                  <br />
                  {t("home.insights.titleLine2", "one room.")}
                </h2>
              </div>
              <p className="col-span-12 md:col-span-4 lede max-w-[34ch]">
                {t(
                  "home.insights.lede",
                  "Notes from the Visioning Workshop - patterns that recurred across clinicians, policy-makers, technologists, and community leaders.",
                )}
              </p>
            </div>
          </Reveal>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 border-t border-line">
            {INSIGHTS.map((insight, idx) => (
              <Reveal as="li" key={insight.title} delay={(idx % 2) * 80} className="grid grid-cols-[3rem_1fr] gap-5 py-7 md:py-9 border-b border-line group">
                <span className="label-num text-ink-faint pt-1 transition-colors duration-300 group-hover:text-electric">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="label">{t(`insights.${idx + 1}.tag`, insight.tag)}</span>
                  <h3 className="text-lg md:text-xl font-medium tracking-tight mt-2 mb-2 leading-tight text-balance">
                    {t(`insights.${idx + 1}.title`, insight.title)}
                  </h3>
                  <p className="text-[0.95rem] text-ink-soft leading-relaxed">
                    {t(`insights.${idx + 1}.body`, insight.body)}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════ ENGAGE / CTA ═══════════════ */}
      <section className="section-frame" aria-labelledby="engage-title">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="card-electric p-10 md:p-20 relative">
              <div className="grid grid-cols-12 gap-6 md:gap-10 items-end relative">
                <div className="col-span-12 md:col-span-8">
                  <span
                    className="notice-pill notice-pill--electric"
                    style={{ background: "rgba(255,255,255,0.18)", borderColor: "transparent" }}
                  >
                    {t("home.engageCta.pillLabel", "Engage")}
                    <span className="sep" aria-hidden />
                    <span>{t("home.engageCta.pillCount", "06 Pathways")}</span>
                  </span>
                  <h2
                    id="engage-title"
                    className="h-display mt-8"
                    style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)", lineHeight: 0.96 }}
                  >
                    {t("home.engageCta.titleLine1", "Many roles.")}
                    <br />
                    {t("home.engageCta.titleLine2", "Many pathways.")}
                    <br />
                    {t("home.engageCta.titleLine3", "One network.")}
                  </h2>
                  <p
                    className="mt-7 lede max-w-[48ch]"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {t(
                      "home.engageCta.lede",
                      "Clinician, policy-maker, technologist, community organiser, or researcher - there is a clear way in.",
                    )}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4 md:flex md:justify-end">
                  <Link href="/engage" className="btn btn-on-dark">
                    {t("home.engageCta.button", "Find your pathway")}
                    <span className="btn-icon" aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
