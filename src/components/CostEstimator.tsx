import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ChevronRight, RotateCcw, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

type Step = "type" | "details" | "result";

const CostEstimator = () => {
  const [step, setStep] = useState<Step>("type");
  const [projectType, setProjectType] = useState<"sanierung" | "smarthome" | null>(null);

  // Sanierung state
  const [wohnflaeche, setWohnflaeche] = useState<number | "">("");
  const [sanierungsumfang, setSanierungsumfang] = useState<"teilsanierung" | "vollsanierung" | "">("");
  const [zaehlerschrank, setZaehlerschrank] = useState<boolean>(false);

  // Smart Home state
  const [raeume, setRaeume] = useState<number | "">("");
  const [smartFeatures, setSmartFeatures] = useState<string[]>([]);

  const scrollToContact = () => {
    document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  const reset = () => {
    setStep("type");
    setProjectType(null);
    setWohnflaeche("");
    setSanierungsumfang("");
    setZaehlerschrank(false);
    setRaeume("");
    setSmartFeatures([]);
  };

  const toggleFeature = (f: string) => {
    setSmartFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const calcRange = (): { min: number; max: number } | null => {
    if (projectType === "sanierung" && wohnflaeche && sanierungsumfang) {
      const base = sanierungsumfang === "vollsanierung" ? [80, 130] : [30, 60];
      let min = Number(wohnflaeche) * base[0];
      let max = Number(wohnflaeche) * base[1];
      if (zaehlerschrank) { min += 800; max += 1800; }
      return { min, max };
    }
    if (projectType === "smarthome" && raeume) {
      const featureBase: Record<string, [number, number]> = {
        "Lichtsteuerung": [300, 600],
        "Rollladensteuerung": [400, 800],
        "Heizungssteuerung": [500, 900],
        "Alarmanlage": [600, 1200],
        "Sprachsteuerung": [200, 400],
      };
      let min = Number(raeume) * 200;
      let max = Number(raeume) * 400;
      smartFeatures.forEach((f) => {
        if (featureBase[f]) { min += featureBase[f][0]; max += featureBase[f][1]; }
      });
      return { min, max };
    }
    return null;
  };

  const fmt = (n: number) =>
    n.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

  const range = calcRange();

  const canProceed = () => {
    if (step === "type") return !!projectType;
    if (step === "details") {
      if (projectType === "sanierung") return !!wohnflaeche && !!sanierungsumfang;
      if (projectType === "smarthome") return !!raeume && smartFeatures.length > 0;
    }
    return false;
  };

  return (
    <section id="kostenschaetzung" className="section-padding bg-background">
      <div className="container mx-auto">
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
              Kostenschätzung
            </span>
            <div className="w-8 h-0.5 bg-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Was kostet mein Projekt?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Erhalten Sie in wenigen Klicks eine erste grobe Kostenschätzung für Ihr Vorhaben.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8">

            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {["type", "details", "result"].map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step === s ? "bg-primary text-primary-foreground" :
                    (["type","details","result"].indexOf(step) > i) ? "bg-primary/30 text-primary" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>
                  {i < 2 && <div className={`flex-1 h-0.5 transition-colors ${(["type","details","result"].indexOf(step) > i) ? "bg-primary/40" : "bg-border"}`} />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">

              {/* Step 1: Projekttyp */}
              {step === "type" && (
                <motion.div key="type" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-6">Was planen Sie?</h3>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { id: "sanierung", label: "Sanierung / Altbau", desc: "Modernisierung der Elektrik im Bestandsgebäude" },
                      { id: "smarthome", label: "Smart Home", desc: "Intelligente Gebäudetechnik nachrüsten" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setProjectType(t.id as any)}
                        className={`text-left p-5 rounded-lg border-2 transition-all duration-200 ${
                          projectType === t.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-heading font-semibold text-foreground mb-1">{t.label}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                      </button>
                    ))}
                  </div>
                  <Button
                    onClick={() => setStep("details")}
                    disabled={!canProceed()}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold py-6"
                  >
                    Weiter <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Details */}
              {step === "details" && (
                <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>

                  {projectType === "sanierung" && (
                    <>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-6">Details zur Sanierung</h3>
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Wohnfläche (m²) *</label>
                          <input
                            type="number"
                            min={10}
                            max={1000}
                            value={wohnflaeche}
                            onChange={(e) => setWohnflaeche(e.target.value ? Number(e.target.value) : "")}
                            placeholder="z.B. 120"
                            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Sanierungsumfang *</label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { id: "teilsanierung", label: "Teilsanierung", desc: "Einzelne Bereiche / Stockwerke" },
                              { id: "vollsanierung", label: "Vollsanierung", desc: "Komplette Neuverdrahtung" },
                            ].map((s) => (
                              <button
                                key={s.id}
                                onClick={() => setSanierungsumfang(s.id as any)}
                                className={`text-left p-4 rounded-lg border-2 transition-all ${
                                  sanierungsumfang === s.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                }`}
                              >
                                <p className="font-semibold text-sm text-foreground">{s.label}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Zusatzoptionen</label>
                          <button
                            onClick={() => setZaehlerschrank(!zaehlerschrank)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              zaehlerschrank ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                            }`}
                          >
                            <p className="font-semibold text-sm text-foreground">Zählerschrank erneuern</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Inkl. Unterverteilung & Absicherung</p>
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {projectType === "smarthome" && (
                    <>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-6">Details zum Smart Home</h3>
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Anzahl Räume *</label>
                          <input
                            type="number"
                            min={1}
                            max={20}
                            value={raeume}
                            onChange={(e) => setRaeume(e.target.value ? Number(e.target.value) : "")}
                            placeholder="z.B. 5"
                            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Gewünschte Funktionen * (Mehrfachauswahl)</label>
                          <div className="grid grid-cols-2 gap-3">
                            {["Lichtsteuerung", "Rollladensteuerung", "Heizungssteuerung", "Alarmanlage", "Sprachsteuerung"].map((f) => (
                              <button
                                key={f}
                                onClick={() => toggleFeature(f)}
                                className={`text-left p-4 rounded-lg border-2 transition-all ${
                                  smartFeatures.includes(f) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                }`}
                              >
                                <p className="font-semibold text-sm text-foreground">{f}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-3 mt-8">
                    <Button variant="outline" onClick={() => setStep("type")} className="border-border font-heading font-semibold">
                      Zurück
                    </Button>
                    <Button
                      onClick={() => setStep("result")}
                      disabled={!canProceed()}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold py-6"
                    >
                      Schätzung berechnen <Calculator className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Ergebnis */}
              {step === "result" && range && (
                <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">Ihre grobe Kostenschätzung</h3>
                  <p className="text-sm text-muted-foreground mb-8">Diese Schätzung dient als erste Orientierung und ersetzt kein individuelles Angebot.</p>

                  <div className="bg-primary/5 border-2 border-primary/30 rounded-xl p-8 text-center mb-8">
                    <p className="text-sm text-muted-foreground mb-2 uppercase tracking-widest font-heading font-semibold">Geschätzter Kostenrahmen</p>
                    <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-1">
                      {fmt(range.min)} – {fmt(range.max)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">inkl. Material & Arbeitszeit, zzgl. MwSt.</p>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-5 mb-8 text-sm text-muted-foreground leading-relaxed">
                    💡 Der tatsächliche Preis hängt von baulichen Gegebenheiten, Materialwahl und weiteren Faktoren ab. Für ein verbindliches Angebot erstellen wir Ihnen gerne kostenlos einen Kostenvoranschlag.
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <Button
                      onClick={scrollToContact}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold py-6"
                    >
                      Angebot anfragen
                    </Button>
                    <Button
                      variant="outline"
                      className="border-border font-heading font-semibold py-6"
                      asChild
                    >
                      <a href="tel:+4915157571992">
                        <Phone className="w-4 h-4 mr-2" /> +49 151 57571992
                      </a>
                    </Button>
                  </div>

                  <button onClick={reset} className="mt-4 w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                    <RotateCcw className="w-3.5 h-3.5" /> Neue Schätzung starten
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;
