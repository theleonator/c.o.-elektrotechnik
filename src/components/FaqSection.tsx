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
      "Die Kosten für eine Elektroinstallation im Neubau hängen stark von der Größe und Ausstattung des Gebäudes ab. Als grobe Orientierung rechnet man mit 80–150 € pro m² Wohnfläche. Für ein genaues Angebot erstellen wir Ihnen gerne kostenlos einen individuellen Kostenvoranschlag.",
  },
  {
    question: "Wie lange dauert eine Elektrosanierung?",
    answer:
      "Das hängt vom Umfang der Arbeiten ab. Eine einfache Teilsanierung (z.B. Erneuerung des Zählerschranks) ist oft in 1–2 Tagen erledigt. Eine vollständige Neuverdrahtung eines Einfamilienhauses kann 1–2 Wochen in Anspruch nehmen. Wir planen den Ablauf so, dass Sie so wenig wie möglich beeinträchtigt werden.",
  },
  {
    question: "Benötige ich eine Genehmigung für eine Wallbox?",
    answer:
      "Ja, die Installation einer Wallbox muss dem Netzbetreiber gemeldet werden – ab 12 kW auch genehmigt werden. Wir übernehmen die komplette Anmeldung und Kommunikation mit dem Netzbetreiber für Sie, sodass Sie sich um nichts kümmern müssen.",
  },
  {
    question: "Gibt es Fördermittel für Elektroinstallationen?",
    answer:
      "Ja! Für Wallboxen gibt es je nach Bundesland und Gemeinde Förderprogramme. Smart-Home-Lösungen und energieeffiziente Beleuchtung können über die KfW oder BAFA gefördert werden. Wir beraten Sie gerne, welche Förderungen für Ihr Projekt in Frage kommen.",
  },
  {
    question: "Arbeiten Sie auch für Gewerbe und Industrie?",
    answer:
      "Ja, Industriemontagen und gewerbliche Projekte gehören zu unseren Kernkompetenzen. Wir haben langjährige Erfahrung in der Elektromontage für Industrieanlagen und arbeiten auch eng mit Hausverwaltungen zusammen.",
  },
  {
    question: "Wie schnell können Sie bei einem Defekt vor Ort sein?",
    answer:
      "Bei dringenden Störungen versuchen wir schnellstmöglich zu reagieren. Kontaktieren Sie uns telefonisch unter +49 151 57571992 – wir besprechen gemeinsam die Dringlichkeit und finden einen zeitnahen Termin.",
  },
  {
    question: "Stellen Sie nach der Arbeit einen Prüfbericht aus?",
    answer:
      "Ja, nach jeder Installation oder Sanierung führen wir eine normgerechte Prüfung durch und stellen Ihnen auf Wunsch einen Prüfbericht (Mess- und Prüfprotokoll gemäß VDE) aus. Dieser ist z.B. für Versicherungen oder beim Hausverkauf wichtig.",
  },
  {
    question: "Bieten Sie auch Smart-Home-Lösungen zum Nachrüsten an?",
    answer:
      "Ja! Smart-Home muss nicht immer mit einem Neubau starten. Viele Systeme lassen sich auch in Bestandsgebäuden nachrüsten – z.B. smarte Lichtsteuerung, Rollladenautomatisierung oder intelligente Heizungssteuerung. Wir beraten Sie welches System zu Ihrem Zuhause passt.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="section-padding bg-secondary/30">
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
              Häufige Fragen
            </span>
            <div className="w-8 h-0.5 bg-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            FAQ
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Antworten auf die häufigsten Fragen rund um Elektrotechnik, Kosten und Abläufe.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
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
