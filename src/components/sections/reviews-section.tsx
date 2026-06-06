"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
}

interface ReviewsData {
  rating: number;
  user_ratings_total: number;
  reviews: Review[];
  error?: string;
}

export function ReviewsSection() {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-primary mb-4"
          >
            Dicono di Noi
          </motion.h2>
          
          {data && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 text-accent-gold"
            >
              <span className="text-3xl font-bold">{data.rating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(data.rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-secondary text-sm ml-2">su {data.user_ratings_total} recensioni Google</span>
            </motion.div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent-gold border-r-2"></div>
          </div>
        ) : data && data.reviews ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.reviews.slice(0, 3).map((review, idx) => (
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
                  <p className="text-primary italic mb-6">"{review.text}"</p>
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

        {data?.error && (
          <p className="text-center text-xs text-secondary mt-8">
            Note: Mostrando recensioni di fallback ({data.error})
          </p>
        )}
      </div>
    </section>
  );
}
