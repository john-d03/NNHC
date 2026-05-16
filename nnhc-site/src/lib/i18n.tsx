"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import dictionaryMl from "./translations.ml.json";

export type Lang = "en" | "ml";

const STORAGE_KEY = "nnhc.lang";

const DICTS: Record<Lang, Record<string, string>> = {
  en: {},
  ml: dictionaryMl as Record<string, string>,
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "ml") setLangState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const value = useMemo<Ctx>(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (ctx) return ctx;
  // Graceful fallback if used outside provider
  return { lang: "en", setLang: () => {} };
}

export function useT(): (key: string, fallback: string) => string {
  const ctx = useContext(LanguageContext);
  if (!ctx) return (_k, fb) => fb;
  return (key, fallback) => {
    if (ctx.lang === "en") return fallback;
    return DICTS[ctx.lang][key] ?? fallback;
  };
}
