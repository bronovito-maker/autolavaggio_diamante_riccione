import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Define a type for the messages module to avoid 'any'
type MessagesModule = { default: Record<string, unknown> };

const messagesMap: Record<string, () => Promise<MessagesModule>> = {
  it: () => import("../messages/it.json"),
  en: () => import("../messages/en.json"),
  es: () => import("../messages/es.json"),
  fr: () => import("../messages/fr.json"),
  de: () => import("../messages/de.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  // Extract locale from the awaited requestLocale
  let locale = await requestLocale;

  // Validate that the incoming locale is supported
  if (!locale || !routing.locales.includes(locale as "it" | "en" | "fr" | "es" | "de")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await messagesMap[locale]()).default
  };
});
