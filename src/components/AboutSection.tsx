import { motion } from "framer-motion";
import { Shield, Clock, Award, Target } from "lucide-react";

const values = [
  { icon: Award, title: "Qualität", desc: "Höchste Standards in jedem Projekt – von der Materialauswahl bis zur Ausführung." },
  { icon: Shield, title: "Sicherheit", desc: "Normgerechte Installation und regelmäßige Prüfungen für Ihren Schutz." },
  { icon: Target, title: "Zuverlässigkeit", desc: "Verbindliche Zusagen und transparente Kommunikation – darauf können Sie sich verlassen." },
  { icon: Clock, title: "Termintreue", desc: "Pünktliche Fertigstellung ist für uns selbstverständlich – ohne Kompromisse." },
];

const AboutSection = () => {
  return (
    <section id="ueber-uns" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-heading font-semibold">
                Wer wir sind
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Über uns
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                C.O. Elektrotechnik steht für professionelles Elektrohandwerk mit Leidenschaft und Präzision. Ob Neubau, Sanierung oder Industrieprojekt – wir liefern maßgeschneiderte Lösungen für jeden Bedarf.
              </p>
              <p>
                Unser Team besteht aus erfahrenen Fachkräften, die ihr Handwerk verstehen. Wir kombinieren traditionelle Handwerkskunst mit modernster Technik und setzen auf Qualität, die überzeugt.
              </p>
              <p>
                Von der ersten Beratung bis zur finalen Abnahme stehen wir an Ihrer Seite. Transparente Preise, saubere Arbeit und zuverlässige Termine – das ist unser Versprechen an Sie.
              </p>
            </div>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`bg-card border border-border rounded-lg p-6 ${i === 0 ? 'border-primary/40 glow-red' : ''}`}
              >
                <v.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading font-semibold text-foreground mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
