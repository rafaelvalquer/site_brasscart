import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedCatalog } from "@/components/sections/FeaturedCatalog";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LeasingBanner } from "@/components/sections/LeasingBanner";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { getCategories } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid categories={getCategories()} showAllLink />
      <HowItWorks />
      <FeaturedCatalog />
      <LeasingBanner />
      <PortfolioSection limit={6} />
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
