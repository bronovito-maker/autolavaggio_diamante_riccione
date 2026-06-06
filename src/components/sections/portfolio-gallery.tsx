"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

export function PortfolioGallery() {
  const t = useTranslations("Portfolio");

  const portfolioItems = [
    { src: "/images/portfolio/ferrari.jpg", alt: "Ferrari Roma Detailing", title: t("ferrari_title"), caption: t("ferrari_cap"), colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
    { src: "/images/portfolio/lambo.jpg", alt: "Lamborghini Huracán Detailing", title: t("lambo_title"), caption: t("lambo_cap"), colSpan: "col-span-1", rowSpan: "row-span-1" },
    { src: "/images/portfolio/aston.jpg", alt: "Aston Martin DB11 Detailing", title: t("aston_title"), caption: t("aston_cap"), colSpan: "col-span-1", rowSpan: "row-span-1" },
    { src: "/images/portfolio/gwagon.jpg", alt: "Mercedes-Benz Classe G", title: t("gwagon_title"), caption: t("gwagon_cap"), colSpan: "col-span-1", rowSpan: "row-span-2" },
    { src: "/images/portfolio/alfa_storica.jpg", alt: "Alfa Romeo GT Junior", title: t("alfa_title"), caption: t("alfa_cap"), colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
    { src: "/images/portfolio/harley.jpg", alt: "Harley-Davidson Street Glide", title: t("harley_title"), caption: t("harley_cap"), colSpan: "col-span-1", rowSpan: "row-span-1" },
  ];

  const [selectedImage, setSelectedImage] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <>
      <section className="py-24 bg-background" id="portfolio">
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                onClick={() => setSelectedImage(item)}
                className={`relative group overflow-hidden rounded-md bg-surface cursor-pointer ${item.colSpan} ${item.rowSpan}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-accent-gold font-medium uppercase tracking-wider text-sm mb-1">{item.title}</span>
                  <span className="text-primary italic">{item.caption}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 md:top-8 md:right-8 p-3 rounded-full bg-white/5 border border-white/10 text-primary hover:text-accent-gold hover:bg-white/10 transition-all z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full flex-1 min-h-0 mb-8 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain drop-shadow-2xl"
                  quality={100}
                  sizes="100vw"
                />
              </div>
              <div className="text-center shrink-0 max-w-2xl px-4">
                <h3 className="text-accent-gold font-serif text-3xl md:text-4xl mb-3">{selectedImage.title}</h3>
                <p className="text-primary italic text-lg md:text-xl opacity-90 leading-relaxed">
                  &quot;{selectedImage.caption}&quot;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
