"use client";

import { useContact } from "@/components/site/ContactProvider";

export function ContactCta() {
  const { open } = useContact();
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      <button type="button" onClick={open} className="btn btn-on-dark">
        <span className="btn-icon" aria-hidden>+</span>
        Contact IMA Cochin
      </button>
    </div>
  );
}
