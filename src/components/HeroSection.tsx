import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToContact = () => {
    document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Elektriker bei der Arbeit" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-0.5 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-heading font-semibold">
                Elektrohandwerk mit Qualität
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] mb-6">
              Ihr Partner für{" "}
              <span className="text-gradient">Neubau, Sanierung</span>{" "}
              & Industrieprojekte
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">C.O. Elektrotechnik – zuverlässig, sicher, präzise. 
Wir bringen Strom in Ihr Projekt.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4">
            
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold text-base px-8 py-6 glow-red">
              
              Jetzt Kontakt aufnehmen
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => document.querySelector("#leistungen")?.scrollIntoView({ behavior: "smooth" })}
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-secondary font-heading font-semibold text-base px-8 py-6">
              
              Unsere Leistungen
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}>
        
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>);

};

export default HeroSection;