import { motion } from "framer-motion";
import { Shield, Clock, Award, Target } from "lucide-react";

const values = [
  { icon: Award,  title: "Qualität",        desc: "Höchste Standards in jedem Projekt – von der Materialauswahl bis zur Ausführung." },
  { icon: Shield, title: "Sicherheit",      desc: "Normgerechte Installation und regelmäßige Prüfungen für Ihren Schutz." },
  { icon: Target, title: "Zuverlässigkeit", desc: "Verbindliche Zusagen und transparente Kommunikation – darauf können Sie sich verlassen." },
  { icon: Clock,  title: "Termintreue",     desc: "Pünktliche Fertigstellung ist für uns selbstverständlich – ohne Kompromisse." },
];

const AboutSection = () => {
  return (
    <section id="ueber-uns" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text (unverändert) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* ... dein Text ... */}
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
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group bg-card border border-border rounded-lg p-6 
                           transition-all duration-300 
                           hover:border-primary/50 hover:glow-red"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-heading font-semibold text-foreground mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
