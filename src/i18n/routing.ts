import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["it", "en", "es", "fr", "de"],
  defaultLocale: "it",
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
