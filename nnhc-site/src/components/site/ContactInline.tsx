"use client";

import { useContact } from "@/components/site/ContactProvider";

export function ContactInline({
  prefix = "Or",
  label = "contact us directly",
}: {
  prefix?: string;
  label?: string;
}) {
  const { open } = useContact();
  return (
    <p className="mt-6 text-sm text-ink-soft">
      {prefix}{" "}
      <button
        type="button"
        onClick={open}
        className="underline underline-offset-4 hover:text-electric transition-colors font-medium"
      >
        {label}
      </button>
      .
    </p>
  );
}
