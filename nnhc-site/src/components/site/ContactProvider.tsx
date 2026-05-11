"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { ContactModal } from "@/components/site/ContactModal";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };

const ContactContext = createContext<Ctx | null>(null);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <ContactContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ContactModal open={isOpen} onClose={close} />
    </ContactContext.Provider>
  );
}

export function useContact(): Ctx {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    // Soft-fallback so calls outside provider don't crash; opens nothing.
    return { open: () => {}, close: () => {}, isOpen: false };
  }
  return ctx;
}
