import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioGallery } from "@/components/sections/portfolio-gallery";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { ServicesSection } from "@/components/sections/services-section";
import { MethodSection } from "@/components/sections/method-section";
import { ContactsSection } from "@/components/sections/contacts-section";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full">
      <HeroSection />
      <ServicesSection />
      <MethodSection />
      <PortfolioGallery />
      <ReviewsSection />
      <ContactsSection />
    </main>
  );
}
