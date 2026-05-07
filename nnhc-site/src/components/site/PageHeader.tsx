export function PageHeader({
  index,
  kicker,
  title,
  italicTail,
  lede,
  aurora = true,
}: {
  index?: string;
  kicker: string;
  title: string;
  italicTail?: string;
  lede?: string;
  aurora?: boolean;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      {aurora && <div className="aurora" aria-hidden />}
      <div className="relative mx-auto max-w-[88rem] px-5 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="flex items-center gap-3 mb-10 md:mb-14">
          <span className="notice-pill">
            {index && (
              <>
                <span className="label-num">{index}</span>
                <span className="sep" aria-hidden />
              </>
            )}
            <span>{kicker}</span>
          </span>
        </div>

        <h1
          className="h-display max-w-5xl text-balance"
          style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)", lineHeight: 1.02 }}
        >
          {title}
          {italicTail && (
            <>
              {" "}
              <span className="h-italic" style={{ color: "var(--color-electric)" }}>
                {italicTail}
              </span>
            </>
          )}
        </h1>

        {lede && (
          <p className="mt-8 max-w-2xl lede text-pretty">
            {lede}
          </p>
        )}
      </div>
    </header>
  );
}

export function SectionTitle({
  kicker,
  title,
  className = "",
}: {
  kicker: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-5 md:gap-7 ${className}`}>
      <div className="flex items-center gap-4">
        <span className="h-px w-10 bg-electric shrink-0" aria-hidden />
        <span className="label text-electric">{kicker}</span>
      </div>
      <h2
        className="h-display max-w-3xl text-balance"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.05 }}
      >
        {title}
      </h2>
    </div>
  );
}
