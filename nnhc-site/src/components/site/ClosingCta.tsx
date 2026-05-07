import Link from "next/link";

export function ClosingCta({
  kicker = "What comes next",
  title,
  body,
  href,
  label,
}: {
  kicker?: string;
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
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
          <span className="label text-electric">{kicker}</span>
          <h3
            className="h-display mt-3 text-balance"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1.1 }}
          >
            {title}
          </h3>
          <p className="mt-4 lede max-w-[48ch]">{body}</p>
        </div>
        <div className="md:col-span-5 relative md:text-right">
          <Link href={href} className="btn btn-primary">
            {label} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
