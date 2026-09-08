import { useLang } from "@/i18n/LanguageProvider";

/** Píldora ES · EN. El idioma se guarda en localStorage. */
const LanguageToggle = () => {
  const { lang, setLang } = useLang();

  return (
    <div className="sv-lang" role="group" aria-label="Idioma / Language">
      <button
        type="button"
        data-active={lang === "es"}
        aria-pressed={lang === "es"}
        onClick={() => setLang("es")}
      >
        ES
      </button>
      <button
        type="button"
        data-active={lang === "en"}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
