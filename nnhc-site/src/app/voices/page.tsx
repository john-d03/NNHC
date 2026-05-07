import { PageHeader } from "@/components/site/PageHeader";
import { ClosingCta } from "@/components/site/ClosingCta";
import { VoicesGrid } from "@/components/interactive/VoicesGrid";

export const metadata = { title: "Voices" };

export default function VoicesPage() {
  return (
    <main id="main">
      <PageHeader
        kicker="Stakeholder voices"
        title="The people who showed up -"
        italicTail="and what they said."
        lede="Active participation came from healthcare, policy, industry, community organisations, technology, and lived experience."
      />
      <section className="mx-auto max-w-[88rem] px-5 md:px-10 py-20 md:py-28">
        <VoicesGrid />
      </section>

      <ClosingCta
        title="Find where your capability fits."
        body="Six engagement pathways, mapped to the five Star Model groups. Pick the one that matches what you can bring."
        href="/engage"
        label="Engagement pathways"
      />
    </main>
  );
}
