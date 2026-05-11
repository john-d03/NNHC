"use client";

import { useContact } from "@/components/site/ContactProvider";

export function FooterContactButton() {
  const { open } = useContact();
  return (
    <button
      type="button"
      onClick={open}
      className="btn btn-ghost"
    >
      Contact us
    </button>
  );
}
