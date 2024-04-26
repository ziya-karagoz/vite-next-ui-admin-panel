import { WithChildren } from "@base/helpers/components/WithChildren";
import { FC, createContext, useContext } from "react";

const I18N_CONFIG_KEY =
  import.meta.env.VITE_I18N_CONFIG_KEY || "i18nConfig";

type Props = {
  selectedLang: "tr" | "en";
};
const initialState: Props = {
  selectedLang: "tr",
};

function getInitialLanguage(): "tr" | "en" {
  const language = navigator.language.split("-")[0]; // Get the first part before "-" (e.g., "en" from "en-US")
  switch (language) {
    case "tr":
      return "tr";
    default:
      return "en"; // Return 'en' by default if the browser language is neither 'tr' nor 'fr'
  }
}

function getConfig(): Props {
  const ls = localStorage.getItem(I18N_CONFIG_KEY);
  if (ls) {
    try {
      return JSON.parse(ls) as Props;
    } catch (er) {
      console.error(er);
    }
  }
  return { selectedLang: getInitialLanguage() };
}

// Side effect
export function setLanguage(lang: string) {
  localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({ selectedLang: lang }));
  window.location.reload();
}

const I18nContext = createContext<Props>(initialState);

const useLang = () => {
  return useContext(I18nContext).selectedLang;
};

const Base18nProvider: FC<WithChildren> = ({ children }) => {
  const lang = getConfig();
  return <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>;
};

export { Base18nProvider, useLang };
