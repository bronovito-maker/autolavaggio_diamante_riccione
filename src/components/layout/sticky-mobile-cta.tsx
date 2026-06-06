"use client";

import { Phone, MapPin, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("StickyCTA");

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past half the viewport height
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-t border-white/10 p-3 md:hidden shadow-2xl"
        >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">

        <a 
          href="https://maps.app.goo.gl/ts185o8iYGpGS6oW9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-2 rounded-md hover:bg-white/5 transition-colors"
        >
          <MapPin className="w-5 h-5 text-accent-platinum mb-1" />
          <span className="text-[10px] uppercase tracking-wider font-medium text-secondary">{t("navigate")}</span>
        </a>
        
        <a 
          href="https://wa.me/393291610065"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-2 bg-green-600/10 text-green-500 rounded-md hover:bg-green-600/20 transition-colors"
        >
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-[10px] uppercase tracking-wider font-medium">WhatsApp</span>
        </a>

        <a 
          href="tel:+393291610065"
          className="flex-1 flex flex-col items-center justify-center py-2 bg-accent-gold/10 text-accent-gold rounded-md hover:bg-accent-gold/20 transition-colors"
        >
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-[10px] uppercase tracking-wider font-medium">{t("call")}</span>
        </a>
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
