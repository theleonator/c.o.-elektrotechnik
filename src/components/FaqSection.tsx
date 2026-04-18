import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Was kostet eine Elektroinstallation im Neubau?",
    answer:
      "Die Kosten hängen stark von der Größe und Ausstattung des Gebäudes ab. Als grobe Orientierung rechnet man mit 80–150 € pro m² Wohnfläche. Für ein genaues Angebot erstellen wir Ihnen gerne kostenlos einen individuellen Kostenvoranschlag – nehmen Sie einfach Kontakt über unser Kontaktformular oder telefonisch unter +49 151 57571992 auf.",
  },
  {
    question: "Wie lange dauert eine Elektrosanierung?",
    answer:
      "Das hängt vom Umfang der Arbeiten ab. Eine einfache Teilsanierung ist oft in 1–2 Tagen erledigt, eine vollständige Neuverdrahtung kann 1–2 Wochen dauern. Sprechen Sie uns gerne an – wir planen den Ablauf so, dass Sie so wenig wie möglich beeinträchtigt werden.",
  },
  {
    question: "Benötige ich eine Genehmigung für eine Wallbox?",
    answer:
      "Ja, die Installation muss dem Netzbetreiber gemeldet werden – ab 12 kW auch genehmigt werden. Wir übernehmen die komplette Anmeldung für Sie. Bei weiteren Fragen erreichen Sie uns jederzeit telefonisch oder über das Kontaktformular.",
  },
  {
    question: "Gibt es Fördermittel für Elektroinstallationen?",
    answer:
      "Ja! Für Wallboxen, Smart-Home und energieeffiziente Beleuchtung gibt es Förderprogramme über KfW oder BAFA. Kontaktieren Sie uns – wir beraten Sie persönlich, welche Förderungen für Ihr Projekt in Frage kommen.",
  },
  {
    question: "Arbeiten Sie auch für Gewerbe und Industrie?",
    answer:
      "Ja, Industriemontagen und gewerbliche Projekte gehören zu unseren Kernkompetenzen. Wir haben langjährige Erfahrung in der Elektromontage für Industrieanlagen. Schildern Sie uns Ihr Projekt über das Kontaktformular oder rufen Sie uns an.",
  },
  {
    question: "Wie schnell können Sie bei einem Defekt vor Ort sein?",
    answer:
      "Bei dringenden Störungen reagieren wir schnellstmöglich. Rufen Sie uns direkt unter 0151-57571992 an – wir besprechen gemeinsam die Dringlichkeit und finden einen zeitnahen Termin.",
  },
  {
    question: "Stellen Sie nach der Arbeit einen Prüfbericht aus?",
    answer:
      "Ja, nach jeder Installation führen wir eine normgerechte Prüfung durch und stellen Ihnen auf Wunsch ein Mess- und Prüfprotokoll gemäß VDE aus. Bei Fragen dazu sprechen Sie uns gerne über das Kontaktformular an.",
  },
  {
    question: "Bieten Sie auch Smart-Home-Lösungen zum Nachrüsten an?",
    answer:
      "Ja! Viele Systeme lassen sich auch in Bestandsgebäuden nachrüsten – z.B. smarte Lichtsteuerung oder Rollladenautomatisierung. Wir beraten Sie persönlich, welches System zu Ihrem Zuhause passt. Nehmen Sie einfach Kontakt auf!",
  },
];

const FaqSection = () => {
  const scrollToContact = () => {
    document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  const left = faqs.filter((_, i) => i % 2 === 0);
  const right = faqs.filter((_, i) => i % 2 !== 0);

  return (
    <section id="faq" className="pt-10 md:pt-16 pb-8 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-heading font-semibold">
              Häufige Fragen
            </span>
            <div className="w-8 h-0.5 bg-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">FAQ</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Antworten auf die häufigsten Fragen rund um Elektrotechnik, Kosten und Abläufe.{" "}
            <button onClick={scrollToContact} className="text-primary hover:underline font-medium">
              Nicht dabei? Schreiben Sie uns direkt.
            </button>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {left.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`left-${i}`}
                className="bg-card border border-border rounded-lg px-6 hover:border-primary/50 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:no-underline hover:text-primary transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion type="single" collapsible className="space-y-3">
            {right.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`right-${i}`}
                className="bg-card border border-border rounded-lg px-6 hover:border-primary/50 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:no-underline hover:text-primary transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
