"use client";

import { useState } from "react";
import { ContactModal } from "@/components/site/ContactModal";

export function ContactCta() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="btn btn-on-dark"
        >
          <span className="btn-icon" aria-hidden>+</span>
          Contact IMA Cochin
        </button>
      </div>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
