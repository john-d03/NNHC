"use client";

import { PageHeader } from "@/components/site/PageHeader";
import { ClosingCta } from "@/components/site/ClosingCta";
import { VoicesGrid } from "@/components/interactive/VoicesGrid";
import { useT } from "@/lib/i18n";

export default function VoicesPage() {
  const t = useT();
  return (
    <main id="main">
      <PageHeader
        kicker={t("voices.hero.kicker", "Stakeholder voices")}
        title={t("voices.hero.titlePrefix", "The people who showed up -")}
        italicTail={t("voices.hero.titleItalic", "and what they said.")}
        lede={t(
          "voices.hero.lede",
          "Active participation came from healthcare, policy, industry, community organisations, technology, and lived experience.",
        )}
      />
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28">
        <VoicesGrid />
      </section>

      <ClosingCta
        title={t("voices.cta.title", "Find where your capability fits.")}
        body={t(
          "voices.cta.body",
          "Six engagement pathways, mapped to the five Star Model groups. Pick the one that matches what you can bring.",
        )}
        href="/engage"
        label={t("voices.cta.button", "Engagement pathways")}
      />
    </main>
  );
}
