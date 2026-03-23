import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ReferenceSlider from "@/components/ReferenceSlider";
import FaqSection from "@/components/FaqSection";
import CostEstimator from "@/components/CostEstimator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />

        {/* 🖼️ Referenzen-Slider */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Unsere Referenzen
            </h2>
            <ReferenceSlider />
          </div>
        </section>

        <ContactSection />
        <CostEstimator />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
