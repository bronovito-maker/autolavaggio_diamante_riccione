"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  { src: "/images/portfolio/ferrari.jpg", alt: "Ferrari Detailing", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/images/portfolio/lambo.jpg", alt: "Lamborghini Detailing", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/images/portfolio/aston.jpg", alt: "Aston Martin Detailing", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/images/portfolio/gwagon.jpg", alt: "Mercedes G-Wagon", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/images/portfolio/alfa_storica.jpg", alt: "Alfa Romeo Storica", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { src: "/images/portfolio/merc.jpg", alt: "Mercedes Benz", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/images/portfolio/fiat_storica.jpg", alt: "Fiat Storica", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/images/portfolio/audi.jpg", alt: "Audi Detailing", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/images/portfolio/bmw_interni.jpg", alt: "BMW Interni", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { src: "/images/portfolio/harley.jpg", alt: "Harley Davidson", colSpan: "col-span-1", rowSpan: "row-span-1" },
];

export function PortfolioGallery() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-primary mb-4"
          >
            Le Nostre Opere
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary max-w-2xl"
          >
            Ammira il livello di perfezione che raggiungiamo. Dalle supercars ai veicoli d'epoca, fino alle moto: 
            ogni scatto racconta una storia di passione e attenzione maniacale ai dettagli.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className={`relative group overflow-hidden rounded-md bg-surface ${img.colSpan} ${img.rowSpan}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <span className="text-primary font-medium p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
