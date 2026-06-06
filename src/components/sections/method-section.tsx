"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function MethodSection() {
  const t = useTranslations("Method");

  return (
    <section className="py-24 bg-background overflow-hidden relative" id="metodo">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-4xl font-serif text-primary mb-4">{t("title")}</h2>
            <p className="text-accent-gold italic text-xl mb-6">{t("quote")}</p>
            <div className="space-y-4 text-secondary leading-relaxed">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="border-l-2 border-accent-gold pl-4">
                <p className="text-3xl font-bold text-primary mb-1">100%</p>
                <p className="text-sm text-secondary uppercase tracking-wider">Azione Anti-Graffio</p>
              </div>
              <div className="border-l-2 border-accent-gold pl-4">
                <p className="text-3xl font-bold text-primary mb-1">Zero</p>
                <p className="text-sm text-secondary uppercase tracking-wider">Prodotti Abrasivi</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative h-[500px] rounded-lg overflow-hidden border border-white/10"
          >
            <Image
              src="/images/portfolio/gwagon.jpg"
              alt={t("img_alt")}
              fill
              quality={90}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
