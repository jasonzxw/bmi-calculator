"use client";

import zh from "./zh";
import en from "./en";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Locale = "zh" | "en";
export type Translations = typeof zh;

const translations: Record<Locale, Translations> = { zh, en };

function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language || "";
  return lang.toLowerCase().startsWith("zh") ? "zh" : "en";
}

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  t: en,
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  return (
    <I18nContext.Provider
      value={{ locale, t: translations[locale], setLocale }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
