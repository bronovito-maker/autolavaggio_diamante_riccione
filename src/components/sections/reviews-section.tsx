"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

export function ReviewsSection() {
  const t = useTranslations("Reviews");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackReviews: Review[] = [
    {
      author_name: "Marco",
      rating: 5,
      text: "Un livello di cura maniacale. Hanno rimosso graffi che pensavo impossibili da togliere sulla mia auto.",
      relative_time_description: "1 mese fa"
    },
    {
      author_name: "Alessandro",
      rating: 5,
      text: "Non è un semplice autolavaggio, è una vera e propria SPA per l'auto. Interni tornati nuovi e profumo pazzesco.",
      relative_time_description: "3 settimane fa"
    },
    {
      author_name: "Giuseppe",
      rating: 5,
      text: "Servizio eccellente. Il detailing esterno ha fatto tornare la vernice brillante come appena uscita dal concessionario.",
      relative_time_description: "2 mesi fa"
    }
  ];

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) {
        setReviews(fallbackReviews);
        setLoading(false);
      }
    }, 1000);
    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-24 bg-surface/50 border-y border-white/5" id="recensioni">
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
            className="text-secondary max-w-2xl mx-auto mb-8"
          >
            {t("subtitle")}
          </motion.p>

          <div className="flex items-center justify-center gap-3 bg-background/50 inline-flex px-6 py-3 rounded-full border border-white/5">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent-gold text-accent-gold" />
              ))}
            </div>
            <span className="text-primary font-medium">4.9/5</span>
            <span className="text-secondary text-sm">({t("based_on")} 200+ {t("google_reviews")})</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent-gold border-r-2"></div>
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-background p-6 rounded-lg border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center mb-4 text-accent-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-700'}`} />
                    ))}
                  </div>
                  <p className="text-primary italic mb-6">&quot;{review.text}&quot;</p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-accent-platinum font-bold">
                    {review.author_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">{review.author_name}</p>
                    <p className="text-xs text-secondary">Google Review</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : null}

      </div>
    </section>
  );
}
