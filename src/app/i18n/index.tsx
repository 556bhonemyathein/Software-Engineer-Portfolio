import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MM } from "./mm";

export type Lang = "en" | "mm";

const STORAGE_KEY = "portfolio-lang";

function storedLang(): Lang | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "en" || v === "mm" ? v : null;
  } catch {
    return null;
  }
}

function apply(lang: Lang) {
  const root = document.documentElement;
  root.setAttribute("data-lang", lang);
  // BCP-47 tag so screen readers and font fallback pick the Myanmar script.
  root.lang = lang === "mm" ? "my" : "en";
}

/**
 * Looks a source (English) string up in the Burmese dictionary. Untranslated
 * strings fall through unchanged, so the English copy is always the key and
 * the single source of truth. `{name}` placeholders are filled from `vars`.
 */
export type Translate = (s: string, vars?: Record<string, string>) => string;

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Translate;
} | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => storedLang() ?? "en");

  useEffect(() => apply(lang), [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage unavailable — the choice just won't persist */
    }
  }, []);

  const toggle = useCallback(
    () => setLang(lang === "en" ? "mm" : "en"),
    [lang, setLang],
  );

  const t = useCallback<Translate>(
    (s, vars) => {
      let out = lang === "mm" ? (MM[s] ?? s) : s;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          out = out.replace(`{${k}}`, v);
        }
      }
      return out;
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, toggle, t }),
    [lang, setLang, toggle, t],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
