"use client";

import { PageHeader, SectionTitle } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { CHALLENGES } from "@/lib/content";
import { FaqList } from "@/components/interactive/FaqList";
import { GlossaryList } from "@/components/interactive/GlossaryList";
import { useT } from "@/lib/i18n";

export default function AboutPage() {
  const t = useT();
  return (
    <main id="main">
      <PageHeader
        kicker={t("about.hero.kicker", "Challenges · FAQ · Glossary")}
        title={t("about.hero.titlePrefix", "The questions that")}
        italicTail={t("about.hero.titleItalic", "come up first.")}
        lede={t(
          "about.hero.lede",
          "Three strategic challenges, the operational questions that surface in executive committees, and a short reference for terms used throughout.",
        )}
      />

      {/* Challenges */}
      <section id="challenges" className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28">
        <SectionTitle
          kicker={t("about.challenges.kicker", "Strategic challenges")}
          title={t("about.challenges.title", "Three challenges, framed by Rajeev Sadanandan IAS.")}
        />

        <figure className="mt-12 max-w-3xl">
          <blockquote className="h-display-italic text-2xl md:text-4xl leading-tight text-balance">
            “{t(
              "about.challenges.quote",
              "The ideas presented by IMA resonate with the needs of the broader community. Sector-wise discussions should now be undertaken and consolidated into the final project proposal.",
            )}”
          </blockquote>
          <figcaption className="mt-6 label">
            {t("about.challenges.attribution", "Rajeev Sadanandan IAS · Former Health Secretary, Kerala")}
          </figcaption>
        </figure>

        <ol className="mt-16 grid md:grid-cols-3 gap-6">
          {CHALLENGES.map((c, i) => (
            <Reveal as="li" key={c.n} delay={i * 80}>
              <article className="card p-7 h-full flex flex-col group">
                <span className="bignum text-4xl mb-5 transition-colors duration-300 group-hover:text-electric">
                  {c.n}
                </span>
                <h3 className="h-display text-xl md:text-2xl mb-5 leading-tight text-balance">
                  {t(`challenges.${i + 1}.title`, c.title)}
                </h3>
                <ul className="space-y-2.5">
                  {c.points.map((p, j) => (
                    <li key={p} className="flex gap-3 text-sm text-ink-soft leading-relaxed">
                      <span aria-hidden className="text-electric mt-1.5">▸</span>
                      <span>{t(`challenges.${i + 1}.point${j + 1}`, p)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-line bg-surface-elevated">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28">
          <SectionTitle
            kicker={t("about.faq.kicker", "Frequently asked")}
            title={t("about.faq.title", "Operational questions that come up first.")}
          />
          <div className="mt-12">
            <FaqList />
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section id="glossary" className="border-t border-line">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28">
          <SectionTitle
            kicker={t("about.glossary.kicker", "Glossary")}
            title={t("about.glossary.title", "A short reference for the terms used throughout.")}
          />
          <div className="mt-12">
            <GlossaryList />
          </div>
        </div>
      </section>
    </main>
  );
}
