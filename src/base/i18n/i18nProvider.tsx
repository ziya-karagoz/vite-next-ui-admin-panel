import { FC } from "react";
import { useLang } from "./Base18n";
import { IntlProvider } from "react-intl";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/locale-data/tr";
import "@formatjs/intl-relativetimeformat/locale-data/fr";
import trMessages from "./messages/tr.json";
import enMessages from "./messages/en.json";
import { WithChildren } from "@base/helpers/components/WithChildren";

const allMessages = {
  tr: trMessages,
  en: enMessages,
};

const I18nProvider: FC<WithChildren> = ({ children }) => {
  const locale = useLang();
  const messages = allMessages[locale];

  return (
    <IntlProvider
      onError={(error: unknown) => {
        console.log(error);
      }}
      locale={locale}
      messages={messages}
    >
      {children}
    </IntlProvider>
  );
};

export { I18nProvider };
