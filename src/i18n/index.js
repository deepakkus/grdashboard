import i18next from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";

i18next
  //.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false,
    },
    lng: "en",
    ns: {
      defaultNS: "common",
    },
    resources: {
      en: en,
    },
  });

export default i18next;
