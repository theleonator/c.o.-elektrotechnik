import { motion } from "framer-motion";
import {
  Building2,
  Hammer,
  Factory,
  Wrench,
  Smartphone,
  LayoutGrid,
  Lightbulb,
  Car,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Neubauinstallationen",
    desc: "Komplette Elektroinstallation für Neubauten – von der Planung bis zur Inbetriebnahme. Wir sorgen für sichere und normgerechte Verkabelung.",
  },
  {
    icon: Hammer,
    title: "Altbau & Sanierung",
    desc: "Fachgerechte Modernisierung der Elektrik in Bestandsgebäuden. Wir bringen Ihre Anlage auf den neuesten Stand der Technik.",
  },
  {
    icon: Factory,
    title: "Industriemontage",
    desc: "Professionelle Elektromontagen für Industrieanlagen. Termingerecht, sicher und nach höchsten Qualitätsstandards.",
  },
  {
    icon: Wrench,
    title: "Instandhaltung & Fehlersuche",
    desc: "Schnelle Fehlerdiagnose und zuverlässige Reparaturen. Damit Ihre Anlagen jederzeit betriebsbereit bleiben.",
  },
  {
    icon: Smartphone,
    title: "Smart Home & Automation",
    desc: "Intelligente Gebäudetechnik für mehr Komfort und Effizienz. Licht, Heizung und Sicherheit auf Knopfdruck.",
  },
  {
    icon: LayoutGrid,
    title: "Zählerschrank & Verteilerbau",
    desc: "Planung und Installation von Zählerschränken und Unterverteilungen – normgerecht und zukunftssicher.",
  },
  {
    icon: Lightbulb,
    title: "Beleuchtungstechnik",
    desc: "Individuelle Lichtkonzepte für Wohn-, Gewerbe- und Außenbereiche. Energieeffizient und stimmungsvoll.",
  },
  {
    icon: Car,
    title: "Wallbox & Ladeinfrastruktur",
    desc: "Installation von Ladestationen für E-Fahrzeuge. Wir beraten, planen und installieren Ihre Wallbox fachgerecht.",
  },
];

const ServicesSection = () => {
  return (
    <section id="leistungen" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-heading font-semibold">
              Was wir bieten
            </span>
            <div className="w-8 h-0.5 bg-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Von der Planung bis zur Umsetzung – wir bieten Ihnen das komplette Spektrum moderner Elektrotechnik.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:glow-red"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
