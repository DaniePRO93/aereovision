import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

/** Un texto que existe en los dos idiomas. */
export type Bilingual<T> = { es: T; en: T };

const STORAGE_KEY = "aerovision.lang";

const readInitialLang = (): Lang => {
  if (typeof window === "undefined") return "es";

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {
    // localStorage bloqueado (modo privado): seguimos con el idioma del navegador.
  }

  return window.navigator.language?.toLowerCase().startsWith("en") ? "en" : "es";
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  /** Elige la variante del idioma activo: t(copy.hero.title) */
  t: <T>(dict: Bilingual<T>) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "es";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sin persistencia: el idioma dura lo que dure la sesión.
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: <T,>(dict: Bilingual<T>) => dict[lang],
    }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return ctx;
};
