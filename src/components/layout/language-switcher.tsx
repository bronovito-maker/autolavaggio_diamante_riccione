"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "it", label: "Italiano", short: "IT" },
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "es", label: "Español", short: "ES" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  function handleSelect(code: string) {
    setIsOpen(false);
    if (code !== locale) {
      router.replace(pathname, { locale: code });
    }
  }

  // Chiudi il menu se si clicca fuori
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full transition-all duration-300 group"
        aria-label="Cambia Lingua"
      >
        <Globe className="w-4 h-4 text-accent-gold group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-sm font-medium text-primary tracking-wide">
          {currentLang.short}
        </span>
        <ChevronDown 
          className={`w-3 h-3 text-secondary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-36 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 z-[100]"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                  locale === lang.code 
                    ? "bg-white/10 text-accent-gold font-medium" 
                    : "text-secondary hover:bg-white/5 hover:text-primary"
                }`}
              >
                {lang.label}
                {locale === lang.code && (
                  <motion.div 
                    layoutId="activeIndicator" 
                    className="w-1.5 h-1.5 rounded-full bg-accent-gold"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
