import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioGallery } from "@/components/sections/portfolio-gallery";
import { ReviewsSection } from "@/components/sections/reviews-section";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full">
      <HeroSection />
      <PortfolioGallery />
      <ReviewsSection />
      {/* Other sections like Services, Method, Testimonials, Contacts will go here */}
    </main>
  );
}
