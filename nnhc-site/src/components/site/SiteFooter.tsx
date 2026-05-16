"use client";

import Link from "next/link";
import { META, formatLabDate } from "@/lib/content";
import { FooterContactButton } from "@/components/site/FooterContactButton";
import { useT } from "@/lib/i18n";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const labDate = formatLabDate();
  const t = useT();
  return (
    <footer className="mt-auto border-t border-line bg-bg">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10 pt-20 md:pt-28 pb-12">
        <div className="grid md:grid-cols-12 gap-12 md:gap-10">
          <div className="md:col-span-7">
            <Link
              href="/"
              aria-label="NNHC home"
              className="site-brand site-brand--lg group"
            >
              <span
                aria-hidden
                className="site-brand__mark"
                style={{
                  WebkitMaskImage: "url(/logo.svg)",
                  maskImage: "url(/logo.svg)",
                }}
              />
            </Link>
            <span className="label block mt-8">{t("footer.colophon", "Colophon")}</span>
            <h2
              className="h-display text-balance mt-5"
              style={{ fontSize: "clamp(2rem, 4.6vw, 3.6rem)", lineHeight: 1 }}
            >
              {t(
                "footer.tagline",
                "A foundational step toward a community-driven healthcare system.",
              )}
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/engage" className="btn btn-primary">
                {t("nav.engageCta", "Engage with NNHC")}
                <span className="btn-icon" aria-hidden>→</span>
              </Link>
              <FooterContactButton />
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-x-8 gap-y-8 md:pl-10 md:border-l md:border-line">
            <FooterCol title={t("footer.sectionsHeading", "Sections")} links={[
              { href: "/model", label: t("nav.model", "Vision & Model") },
              { href: "/mission", label: t("nav.mission", "Mission") },
              { href: "/roadmap", label: t("nav.roadmap", "Roadmap") },
            ]} />
            <FooterCol title={t("footer.moreHeading", "More")} links={[
              { href: "/voices", label: t("nav.voices", "Voices") },
              { href: "/engage", label: t("nav.engage", "Engage") },
              { href: "/about", label: t("footer.aboutFaq", "About + FAQ") },
            ]} />
            <dl className="col-span-2 mt-2 grid grid-cols-2 gap-y-5 border-t border-line pt-6">
              <Meta label={t("footer.metaConvened", "Convened")} value={t("meta.convenedBy", META.convenedBy)} />
              <Meta label={t("footer.metaWorkshop", "Workshop")} value={labDate} />
              <Meta label={t("footer.metaVenue", "Venue")} value={t("meta.venue", META.venue)} />
              <Meta label={t("footer.metaDocument", "Document")} value={`v${META.version}`} />
            </dl>
          </div>
        </div>

        <hr className="hr mt-16" />

        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mt-6 text-xs text-ink-mute">
          <p>
            {t(
              "footer.copyright",
              `© ${year} NNHC · One Health initiative · Maintained by IMA Cochin.`,
            )
              .replace("{year}", String(year))
              .replace("{വർഷം}", String(year))}
          </p>
          <p className="font-medium tabular">
            {t("footer.workshopLine", `VISIONING WORKSHOP · ${labDate}`).replace("{date}", labDate)}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="label mb-4">{title}</p>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[0.95rem] font-medium tracking-tight hover:text-electric transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label mb-1">{label}</dt>
      <dd className="text-sm">{value}</dd>
    </div>
  );
}
