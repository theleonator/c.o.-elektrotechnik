import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      toast({ title: "Bitte stimmen Sie der Datenschutzerklärung zu.", variant: "destructive" });
      return;
    }
    toast({ title: "Nachricht gesendet!", description: "Wir melden uns schnellstmöglich bei Ihnen." });
    (e.target as HTMLFormElement).reset();
    setAgreed(false);
  };

  return (
    <section id="kontakt" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-heading font-semibold">
              Sprechen Sie uns an
            </span>
            <div className="w-8 h-0.5 bg-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Kontakt</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Haben Sie ein Projekt oder eine Frage? Wir freuen uns auf Ihre Nachricht.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-5">
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Name *</label>
                <Input placeholder="Max Mustermann" required className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">E-Mail *</label>
                <Input type="email" placeholder="max@beispiel.de" required className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Telefonnummer</label>
              <Input type="tel" placeholder="+49 123 456 7890" className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Projektbeschreibung *</label>
              <Textarea
                placeholder="Beschreiben Sie kurz Ihr Projekt oder Anliegen..."
                rows={5}
                required
                className="bg-card border-border text-foreground placeholder:text-muted-foreground resize-none" />
              
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="privacy"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                className="mt-0.5 border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
              
              <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                <a href="/datenschutz.pdf" className="text-primary hover:underline">Datenschutzerklärung</a> zu. *
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold px-8 py-6 glow-red">
              
              <Send className="w-4 h-4 mr-2" />
              Nachricht senden
            </Button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6">
            
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <h3 className="font-heading font-semibold text-lg text-foreground">Kontaktdaten</h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <a className="text-foreground font-medium hover:text-primary transition-colors" href="tel:+4915157571992">
                    +49 151 57571992  
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-Mail</p>
                  <a className="text-foreground font-medium hover:text-primary transition-colors" href="mailto:mail@c-o-elektrotechnik.de">
                    mail@c-o-elektrotechnik.de
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Adresse</p>
                  <p className="text-foreground font-medium">Obere Weinbergstraße 27<br />65326 Aarbergen</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            




            
          </motion.div>
        </div>
      </div>
    </section>);
};

export default ContactSection;
