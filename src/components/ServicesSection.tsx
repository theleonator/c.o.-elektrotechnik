import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Hammer, Factory, Wrench, Smartphone, LayoutGrid, Lightbulb, Car, X, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Building2,
    title: "Neubauinstallationen",
    description: "Eine Elektroinstallation im Neubau ist weit mehr als das Verlegen von Kabeln. Sie legt die Grundlage für alles, was im Gebäude später funktionieren soll – von der Beleuchtung über Steckdosen bis hin zu Netzwerk, Smarthome und Ladeinfrastruktur.",
    whatWeDo: "C-O-ELEKTROTECHNIK begleitet Ihr Neubauprojekt von der ersten Planung bis zur finalen Abnahme. Wir stimmen uns eng mit Architekten, Bauleitung und anderen Gewerken ab, verlegen normgerechte Leitungen und installieren Verteilungen, die für die Zukunft gerüstet sind.",
    image: "/newconstructioninstallations.jpg",
    benefits: [
      "Normgerechte Ausführung nach aktuellen VDE-Vorschriften",
      "Zukunftssichere Planung für Smart Home & E-Mobilität",
      "Enge Abstimmung mit allen Baubeteiligten",
      "Saubere Dokumentation & Prüfprotokoll zur Abnahme",
    ],
  },
  {
    icon: Hammer,
    title: "Altbau & Sanierung",
    description: "Veraltete Elektrik ist nicht nur unbequem – sie kann gefährlich sein. Überlastete Leitungen, fehlende Schutzleiter oder ein nicht mehr zeitgemäßer Zählerschrank sind häufige Probleme in Bestandsgebäuden, die dringend modernisiert werden sollten.",
    whatWeDo: "Wir analysieren den Ist-Zustand Ihrer Elektroanlage, erkennen Schwachstellen und entwickeln ein Sanierungskonzept – ob Teilsanierung einzelner Bereiche oder vollständige Neuverdrahtung. Dabei arbeiten wir so, dass der Alltag im Gebäude so wenig wie möglich beeinträchtigt wird.",
    image: "/renovation.jpg",
    benefits: [
      "Ehrliche Bestandsaufnahme ohne unnötige Empfehlungen",
      "Flexible Umsetzung in Phasen oder als Gesamtpaket",
      "Minimale Beeinträchtigung des Wohnalltags",
      "Erhöhung von Sicherheit & Wohnkomfort",
    ],
  },
  {
    icon: Factory,
    title: "Industriemontage",
    description: "Im industriellen Umfeld zählt Präzision, Termintreue und die Fähigkeit, unter anspruchsvollen Bedingungen zuverlässig zu arbeiten. Produktionsausfälle durch Elektrofehler kosten Zeit und Geld – das wissen wir und arbeiten entsprechend.",
    whatWeDo: "Christopher Ott bringt jahrelange Erfahrung aus dem Industriebereich mit. Wir übernehmen Elektromontagen für Maschinen, Anlagen und Produktionsstätten – von der Verdrahtung einzelner Schaltschränke bis zum elektrischen Aufbau kompletter Fertigungslinien.",
    image: "/industrial.jpg",
    benefits: [
      "Erfahrung aus zahlreichen Industrieprojekten",
      "Zuverlässige Einhaltung enger Zeitpläne",
      "Arbeit nach höchsten Sicherheitsstandards",
      "Koordination mit Maschinenbauern & Anlagenplanern",
    ],
  },
  {
    icon: Wrench,
    title: "Instandhaltung & Fehlersuche",
    description: "Ein Defekt in der Elektrik kann den gesamten Betrieb lahmlegen – ob zuhause oder im Gewerbebetrieb. Schnelle, kompetente Fehlersuche ist dann das Wichtigste. Herumdoktern ohne Diagnose kostet nur Zeit und Geld.",
    whatWeDo: "Wir setzen auf systematische Fehlerdiagnose statt Raten. Mit modernen Messmitteln lokalisieren wir Defekte schnell und präzise, beheben die Ursache nachhaltig und sorgen dafür, dass Ihre Anlage wieder zuverlässig läuft. Auf Wunsch auch als regelmäßige Wartung.",
    image: "/maintenance.jpg",
    benefits: [
      "Schnelle Reaktionszeit bei dringenden Störungen",
      "Präzise Diagnose statt Blindreparatur",
      "Nachhaltige Behebung der eigentlichen Ursache",
      "Optionale regelmäßige Wartungsverträge",
    ],
  },
  {
    icon: Smartphone,
    title: "Smart Home & Automation",
    description: "Smart Home bedeutet mehr Komfort, mehr Sicherheit und oft auch deutlich weniger Energieverbrauch. Licht, das sich automatisch anpasst, Heizungen, die vorausdenken, und Sicherheitssysteme, die Sie immer im Blick behalten – das ist modernes Wohnen.",
    whatWeDo: "Wir planen und installieren Smart-Home-Systeme, die wirklich zu Ihrem Alltag passen. Dabei sind wir herstellerunabhängig und finden die Lösung, die Ihre Anforderungen am besten erfüllt – vom einfachen Nachrüstsystem bis zur vollintegrierten KNX-Anlage.",
    image: "/smarthome.jpg",
    benefits: [
      "Herstellerunabhängige, individuelle Beratung",
      "Nachrüstbar auch in Bestandsgebäuden",
      "Intuitive Bedienung per App oder Sprache",
      "Energieeffizienz durch intelligente Automatisierung",
    ],
  },
  {
    icon: LayoutGrid,
    title: "Zählerschrank & Verteilerbau",
    description: "Der Zählerschrank ist das Herzstück jeder Elektroanlage. Ein veralteter oder überlasteter Verteiler ist ein häufiger Grund für Ausfälle, Sicherungsdefekte oder sogar Brandgefahr. Eine moderne Unterverteilung schützt Personen und Technik gleichermaßen.",
    whatWeDo: "Wir planen, liefern und installieren Zählerschränke und Unterverteilungen nach aktuellen Normen. Dabei berücksichtigen wir bereits heute den zukünftigen Bedarf – etwa für Wallboxen, Wärmepumpen oder Photovoltaikanlagen – und bauen Reserven ein, die spätere Erweiterungen erleichtern.",
    image: "/distributionboard.jpg",
    benefits: [
      "Normgerechter Aufbau nach aktueller VDE 0100",
      "Planung mit Blick auf zukünftige Erweiterungen",
      "Übersichtliche Beschriftung & Dokumentation",
      "Schutz vor Überlastung & Brandgefahr",
    ],
  },
  {
    icon: Lightbulb,
    title: "Beleuchtungstechnik",
    description: "Licht beeinflusst, wie wir uns in Räumen fühlen – und wie viel Energie wir verbrauchen. Ein durchdachtes Beleuchtungskonzept macht Räume wohnlicher, Arbeitsplätze produktiver und Außenbereiche sicherer, ohne unnötig Strom zu verschwenden.",
    whatWeDo: "Von der einfachen LED-Umrüstung bis zum individuellen Lichtkonzept für Wohn-, Gewerbe- oder Außenbereiche: Wir beraten Sie zu Leuchtmitteln, Lichtfarben und Steuerungsmöglichkeiten und setzen Ihr Wunschergebnis fachgerecht um – inkl. aller Verkabelungsarbeiten.",
    image: "/lighting.jpg",
    benefits: [
      "Individuelle Lichtkonzepte für jeden Bereich",
      "Deutliche Energieeinsparung durch moderne LEDs",
      "Steuerbarkeit per Dimmer, Zeitschalter oder App",
      "Aufwertung von Innen- und Außenbereichen",
    ],
  },
  {
    icon: Car,
    title: "Wallbox & Ladeinfrastruktur",
    description: "Elektromobilität wächst – und mit ihr der Bedarf an zuverlässiger Ladeinfrastruktur zuhause und im Gewerbe. Eine professionell installierte Wallbox lädt nicht nur schneller als eine Haushaltssteckdose, sie ist auch deutlich sicherer und langlebiger.",
    whatWeDo: "Wir übernehmen die komplette Wallbox-Installation: von der Prüfung des Hausanschlusses über die Auswahl der passenden Wallbox bis hin zur Anmeldung beim Netzbetreiber. Auf Wunsch auch mit Lastmanagement für mehrere Ladepunkte und Anbindung an eine PV-Anlage.",
    image: "/wallbox.jpg",
    benefits: [
      "Komplettservice inkl. Anmeldung beim Netzbetreiber",
      "Herstellerunabhängige Wallbox-Beratung",
      "Lastmanagement für mehrere Ladepunkte möglich",
      "Anbindung an Photovoltaik & Energiemanagementsysteme",
    ],
  },
];

const ServiceModal = ({ service, onClose }: { service: typeof services[0]; onClose: () => void }) => {
  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector("#kontakt");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        const msg = `Ich interessiere mich für Ihre Leistung "${service.title}" und würde gerne ein Angebot erhalten.`;
        window.dispatchEvent(new CustomEvent("prefill-contact", { detail: { message: msg } }));
      }
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <service.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground">{service.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors shrink-0 ml-4"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Description + Image side by side */}
          <div className="flex gap-5 items-start">
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
            {/* Image placeholder – replace src with your image */}
            <div className="shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-lg border-2 border-dashed border-border bg-muted/40 flex flex-col items-center justify-center gap-2 overflow-hidden">
              {service.image ? (
                <img src={service.image} alt={service.title} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <>
                  <svg className="w-8 h-8 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[10px] text-muted-foreground/50 text-center leading-tight px-2">600 × 600 px</span>
                </>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-heading font-semibold mb-2">Was C-O-ELEKTROTECHNIK besonders macht</p>
            <p className="text-muted-foreground leading-relaxed">{service.whatWeDo}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-heading font-semibold mb-3">Ihr Nutzen</p>
            <ul className="space-y-2">
              {service.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <span className="text-sm text-foreground leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-6 pt-0">
          <Button
            onClick={scrollToContact}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold py-6 glow-red"
          >
            Jetzt „{service.title}" anfragen
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const [activeService, setActiveService] = useState<typeof services[0] | null>(null);

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
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Unsere Leistungen</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Von der Planung bis zur Umsetzung – wir bieten Ihnen das komplette Spektrum moderner Elektrotechnik.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, i) => (
            <motion.button
              key={service.title}
              onClick={() => setActiveService(service)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:glow-red text-left cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-primary/0 group-hover:text-primary/70 transition-all duration-300 mt-1 font-medium">
                Mehr erfahren →
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeService && (
          <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
