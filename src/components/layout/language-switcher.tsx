"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { ChangeEvent } from "react";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="relative flex items-center bg-background/50 border border-white/10 rounded-md px-2 py-1">
      <Globe className="w-4 h-4 text-accent-platinum mr-2" />
      <select
        defaultValue={locale}
        onChange={onSelectChange}
        className="appearance-none bg-transparent text-sm text-primary font-medium focus:outline-none cursor-pointer pr-4"
      >
        <option value="it" className="text-black">IT</option>
        <option value="en" className="text-black">EN</option>
        <option value="fr" className="text-black">FR</option>
        <option value="de" className="text-black">DE</option>
        <option value="es" className="text-black">ES</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
        <svg className="w-3 h-3 text-accent-platinum" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
}
