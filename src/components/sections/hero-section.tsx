"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/portfolio/lambo.jpg"
          alt="Luxury Car Detailing Background"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover opacity-60" 
        />
        {/* Overlay gradient per garantire la leggibilità del testo pur lasciando intravedere bene l'auto */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/60 to-background z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-4 md:px-6 pt-20 md:pt-12 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="flex items-center gap-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-accent-gold" />
          <span className="text-sm md:text-base font-medium tracking-[0.2em] text-accent-platinum uppercase">
            {t("tagline")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl mb-6 max-w-5xl mx-auto leading-tight text-primary"
        >
          {t("title1")} <br className="hidden md:block" />
          <span className="italic text-accent-platinum">{t("title2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-8 text-balance"
        >
          {t("subtitle")}
        </motion.p>

        {/* Rating Pill spostata sopra le CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md mb-8"
        >
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-accent-gold text-accent-gold" />
            ))}
          </div>
          <span className="text-sm font-medium text-primary">
            4.9/5 <span className="text-secondary font-normal hidden sm:inline-block ml-1">su 220+ Recensioni Google</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button className="group relative px-8 py-4 bg-accent-gold text-background font-medium rounded-sm overflow-hidden w-full sm:w-auto flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95">
            <span className="relative z-10">{t("cta_primary")}</span>
            <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-4 bg-transparent text-primary font-medium rounded-sm border border-accent-platinum/30 hover:border-accent-platinum hover:bg-surface transition-all w-full sm:w-auto">
            {t("cta_secondary")}
          </button>
        </motion.div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
