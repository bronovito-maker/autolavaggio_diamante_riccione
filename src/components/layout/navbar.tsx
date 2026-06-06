"use client";

import { LanguageSwitcher } from "./language-switcher";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-6">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-6 h-6 text-accent-gold" />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-serif text-primary tracking-wide leading-none">
              Autolavaggio <span className="text-accent-gold italic">Diamante</span>
            </span>
            <span className="text-[10px] md:text-xs text-secondary tracking-[0.2em] uppercase mt-1">
              Riccione
            </span>
          </div>
        </motion.div>

        {/* Desktop Language Switcher */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block"
        >
          <LanguageSwitcher />
        </motion.div>
      </div>
    </header>
  );
}
