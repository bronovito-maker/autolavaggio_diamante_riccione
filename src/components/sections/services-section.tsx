"use client";

import { motion } from "framer-motion";
import { Droplet, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function ServicesSection() {
  const t = useTranslations("Services");

  const services = [
    {
      icon: Droplet,
      title: t("washing_title"),
      description: t("washing_desc"),
    },
    {
      icon: Sparkles,
      title: t("interior_title"),
      description: t("interior_desc"),
    },
  ];

  return (
    <section className="py-24 bg-surface" id="servizi">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-primary mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 bg-background border border-white/5 rounded-lg overflow-hidden hover:border-accent-gold/50 transition-colors"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-start">
                  <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <h3 className="text-2xl font-serif text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {service.description}
                  </p>
                  <a 
                    href="#contatti"
                    className="mt-8 text-accent-gold font-medium flex items-center gap-2 group-hover:gap-3 transition-all text-sm uppercase tracking-wider"
                  >
                    {t("cta_consult")} <span className="text-lg">→</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
