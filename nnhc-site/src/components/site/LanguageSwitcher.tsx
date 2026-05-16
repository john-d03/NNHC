"use client";

import { useLang, type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "EN", native: "English" },
  { code: "ml", label: "ML", native: "മലയാളം" },
];

export function LanguageSwitcher({
  className = "",
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`lang-switch ${size === "md" ? "lang-switch--md" : ""} ${className}`.trim()}
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            aria-label={l.native}
            className={`lang-switch__btn ${active ? "is-active" : ""}`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
