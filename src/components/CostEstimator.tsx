import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ChevronLeft, ChevronRight, RotateCcw, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProjectType = "sanierung" | "smarthome" | null;

const STEPS = [
  { label: "Hinweis" },
  { label: "Projekttyp" },
  { label: "Eckdaten" },
  { label: "Maßnahmen" },
  { label: "Ausstattung" },
  { label: "Ergebnis" },
];

const SANIERUNG_FEATURES = [
  { id: "zaehlerschrank", label: "Zählerschrank", desc: "Erneuerung inkl. Unterverteilung", cost: [900, 1800] as [number, number] },
  { id: "leitungen", label: "Leitungsnetz", desc: "Neue Unterputzleitungen", cost: [15, 30] as [number, number], perM2: true },
  { id: "steckdosen", label: "Steckdosen & Schalter", desc: "Komplette Neuinstallation", cost: [1200, 2400] as [number, number] },
  { id: "beleuchtung", label: "Beleuchtungsanlage", desc: "Deckenauslässe & Spots", cost: [800, 1800] as [number, number] },
  { id: "aussenanlage", label: "Außenanlage", desc: "Garten, Terrasse, Carport", cost: [600, 1400] as [number, number] },
  { id: "wallbox", label: "Wallbox vorbereiten", desc: "Leerrohr & Absicherung", cost: [400, 900] as [number, number] },
];

const SMARTHOME_FEATURES = [
  { id: "licht", label: "Lichtsteuerung", desc: "Dimmer, Szenen, Automatisierung", cost: [400, 900] as [number, number] },
  { id: "rollladen", label: "Rollladensteuerung", desc: "Zeitpläne & Sonnenautomatik", cost: [500, 1000] as [number, number] },
  { id: "heizung", label: "Heizungssteuerung", desc: "Smarte Thermostate je Raum", cost: [600, 1100] as [number, number] },
  { id: "alarm", label: "Alarmanlage", desc: "Bewegungsmelder & Sirene", cost: [700, 1400] as [number, number] },
  { id: "sprache", label: "Sprachsteuerung", desc: "Alexa / Google Home Integration", cost: [200, 500] as [number, number] },
  { id: "energie", label: "Energiemessung", desc: "Verbrauchsmonitoring & Analyse", cost: [300, 700] as [number, number] },
];

const AUSSTATTUNG_OPTIONS = [
  { id: "standard", label: "Standard", desc: "Markentechnik, solide Qualität" },
  { id: "komfort", label: "Komfort", desc: "Hochwertige Marken, mehr Design" },
  { id: "premium", label: "Premium", desc: "Beste Materialien, volle Flexibilität" },
];

const AUSSTATTUNG_MULTIPLIER: Record<string, number> = {
  standard: 1.0,
  komfort: 1.35,
  premium: 1.7,
};

const fmt = (n: number) =>
  n.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const SliderInput = ({
  value, onChange, min, max, label, hint,
}: { value: number; onChange: (v: number) => void; min: number; max: number; label: string; hint?: string }) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <span className="text-lg font-heading font-bold text-primary">{value}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-red-600 h-2 rounded-full cursor-pointer"
    />
    <div className="flex justify-between text-xs text-muted-foreground mt-1">
      <span>{min}</span>
      {hint && <span className="text-center text-primary/70 font-medium">{hint}</span>}
      <span>{max}</span>
    </div>
  </div>
);

const CostEstimator = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [projectType, setProjectType] = useState<ProjectType>(null);
  const [wohnflaeche, setWohnflaeche] = useState(100);
  const [currentLevel, setCurrentLevel] = useState(3);
  const [targetLevel, setTargetLevel] = useState(7);
  const [features, setFeatures] = useState<string[]>([]);
  const [ausstattung, setAusstattung] = useState<string>("");

  const scrollToContactWithData = () => {
    const range = calcRange();
    const featureLabels = features
      .map((id) => activeFeatures.find((f) => f.id === id)?.label)
      .filter(Boolean)
      .join(", ");

    const prefill = `Anfrage basierend auf Kostenschätzung:

Projekttyp: ${projectType === "sanierung" ? "Sanierung / Altbau" : "Smart Home"}
Wohnfläche: ${wohnflaeche} m²
Modernisierungssprung: Level ${currentLevel} → ${targetLevel}
Ausstattungsniveau: ${ausstattung.charAt(0).toUpperCase() + ausstattung.slice(1)}
Geplante Maßnahmen: ${featureLabels}
Geschätzter Kostenrahmen: ${fmt(range.min)} – ${fmt(range.max)}

Ich würde gerne ein verbindliches Angebot erhalten.`;

    window.dispatchEvent(new CustomEvent("prefill-contact", { detail: { message: prefill } }));
    setTimeout(() => {
      document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const reset = () => {
    setStep(0);
    setProjectType(null);
    setWohnflaeche(100);
    setCurrentLevel(3);
    setTargetLevel(7);
    setFeatures([]);
    setAusstattung("");
  };

  const goTo = (s: number) => {
    if (s < step) {
      setDirection(-1);
      setStep(s);
    }
  };

  const next = () => { setDirection(1); setStep((s) => s + 1); };
  const prev = () => { setDirection(-1); setStep((s) => s - 1); };

  const toggleFeature = (id: string) => {
    setFeatures((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const canNext = () => {
    if (step === 0) return true;
    if (step === 1) return !!projectType;
    if (step === 2) return wohnflaeche > 0 && targetLevel > currentLevel;
    if (step === 3) return features.length > 0;
    if (step === 4) return !!ausstattung;
    return false;
  };

  const calcRange = (): { min: number; max: number } => {
    const mult = AUSSTATTUNG_MULTIPLIER[ausstattung] || 1;
    const delta = Math.max(1, targetLevel - currentLevel);
    const intensity = delta / 9;

    if (projectType === "sanierung") {
      const baseMin = wohnflaeche * (30 + intensity * 60);
      const baseMax = wohnflaeche * (60 + intensity * 90);
      let extraMin = 0, extraMax = 0;
      features.forEach((id) => {
        const f = SANIERUNG_FEATURES.find((x) => x.id === id);
        if (f) {
          if (f.perM2) { extraMin += f.cost[0] * wohnflaeche; extraMax += f.cost[1] * wohnflaeche; }
          else { extraMin += f.cost[0]; extraMax += f.cost[1]; }
        }
      });
      return { min: Math.round((baseMin + extraMin) * mult), max: Math.round((baseMax + extraMax) * mult) };
    } else {
      const baseMin = wohnflaeche * (10 + intensity * 20);
      const baseMax = wohnflaeche * (20 + intensity * 35);
      let extraMin = 0, extraMax = 0;
      features.forEach((id) => {
        const f = SMARTHOME_FEATURES.find((x) => x.id === id);
        if (f) { extraMin += f.cost[0]; extraMax += f.cost[1]; }
      });
      return { min: Math.round((baseMin + extraMin) * mult), max: Math.round((baseMax + extraMax) * mult) };
    }
  };

  const activeFeatures = projectType === "sanierung" ? SANIERUNG_FEATURES : SMARTHOME_FEATURES;

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
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Was kostet mein Projekt?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Erhalten Sie in wenigen Klicks eine erste grobe Kostenschätzung für Ihr Vorhaben.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 md:p-10">

            {/* Progress Steps */}
            <div className="flex items-center mb-8">
              {STEPS.map((s, i) => {
                const done = i < step;
                const active = i === step;
                const clickable = i < step;
                return (
                  <div key={i} className="flex items-center flex-1 last:flex-none">
                    <button
                      onClick={() => clickable ? goTo(i) : undefined}
                      disabled={!clickable && !active}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 shrink-0
                        ${active ? "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-card" : ""}
                        ${done ? "bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer" : ""}
                        ${!active && !done ? "bg-muted text-muted-foreground cursor-default" : ""}
                      `}
                      title={clickable ? `Zurück zu: ${s.label}` : s.label}
                    >
                      {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </button>
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-1 transition-colors ${done ? "bg-primary/40" : "bg-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.25 }}
              >

                {/* SCHRITT 1: Hinweis / Disclaimer */}
                {step === 0 && (
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2">Bevor Sie starten</h3>
                    <p className="text-sm text-muted-foreground mb-6">Bitte lesen Sie diesen Hinweis vor der Kostenschätzung.</p>

                    <div className="border-2 border-primary/40 bg-primary/5 rounded-xl p-6 mb-6">
                      <div className="flex gap-3 items-start mb-4">
                        <span className="text-2xl">💡</span>
                        <p className="font-heading font-bold text-lg text-foreground leading-snug">
                          Diese Schätzung ist eine erste Orientierungshilfe – kein verbindliches Angebot.
                        </p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Der tatsächliche Preis hängt von baulichen Gegebenheiten, dem Zustand vorhandener Installationen,
                        regionalen Faktoren und weiteren individuellen Aspekten Ihres Projekts ab.
                        Die hier ermittelten Werte können daher erheblich vom tatsächlichen Aufwand abweichen.
                      </p>
                      <div className="border-t border-primary/20 pt-4">
                        <p className="text-sm font-medium text-foreground">
                          ✅ Für ein <span className="text-primary">verbindliches und kostenloses Angebot</span> erstellen wir Ihnen gerne
                          einen individuellen Kostenvoranschlag – einfach Kontakt aufnehmen!
                        </p>
                      </div>
                    </div>

                    <Button onClick={next} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold py-6">
                      Verstanden – Schätzung starten <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* SCHRITT 2: Projekttyp */}
                {step === 1 && (
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2">Was planen Sie?</h3>
                    <p className="text-sm text-muted-foreground mb-6">Wählen Sie den Typ Ihres Projekts aus.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {[
                        { id: "sanierung", label: "Sanierung / Altbau", desc: "Modernisierung der Elektrik im Bestandsgebäude – von Teilsanierung bis Kompletterneuerung." },
                        { id: "smarthome", label: "Smart Home", desc: "Intelligente Gebäudetechnik nachrüsten – Licht, Heizung, Sicherheit auf Knopfdruck." },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setProjectType(t.id as ProjectType)}
                          className={`text-left p-5 rounded-lg border-2 transition-all duration-200 ${
                            projectType === t.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                          }`}
                        >
                          <p className="font-heading font-semibold text-foreground mb-1">{t.label}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                        </button>
                      ))}
                    </div>
                    <Button onClick={next} disabled={!canNext()} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold py-6">
                      Weiter <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* SCHRITT 3: Eckdaten */}
                {step === 2 && (
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2">Eckdaten Ihres Projekts</h3>
                    <p className="text-sm text-muted-foreground mb-6">Geben Sie Größe und aktuellen Zustand an.</p>
                    <div className="space-y-8 mb-8">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-foreground">Wohnfläche</label>
                          <span className="text-lg font-heading font-bold text-primary">{wohnflaeche} m²</span>
                        </div>
                        <input
                          type="range" min={30} max={500} step={5}
                          value={wohnflaeche}
                          onChange={(e) => setWohnflaeche(Number(e.target.value))}
                          className="w-full accent-red-600 h-2 rounded-full cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>30 m²</span><span>500 m²</span>
                        </div>
                      </div>

                      <SliderInput
                        label="Aktueller Modernisierungsstand"
                        value={currentLevel}
                        onChange={setCurrentLevel}
                        min={1} max={10}
                        hint={currentLevel <= 3 ? "Veraltet" : currentLevel <= 6 ? "Durchschnittlich" : "Modern"}
                      />

                      <SliderInput
                        label="Gewünschtes Zielniveau"
                        value={targetLevel}
                        onChange={(v) => setTargetLevel(Math.max(currentLevel + 1, v))}
                        min={1} max={10}
                        hint={targetLevel <= 3 ? "Grundversorgung" : targetLevel <= 6 ? "Komfortabel" : "Hochwertig"}
                      />

                      {targetLevel <= currentLevel && (
                        <p className="text-xs text-destructive">Das Zielniveau muss höher als der aktuelle Stand sein.</p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={prev} className="border-border font-heading font-semibold gap-1">
                        <ChevronLeft className="w-4 h-4" /> Vorheriger Schritt
                      </Button>
                      <Button onClick={next} disabled={!canNext()} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold py-6">
                        Weiter <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* SCHRITT 4: Maßnahmen */}
                {step === 3 && (
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                      {projectType === "sanierung" ? "Welche Maßnahmen sind geplant?" : "Welche Funktionen möchten Sie?"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">Mehrfachauswahl möglich.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                      {activeFeatures.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => toggleFeature(f.id)}
                          className={`text-left p-4 rounded-lg border-2 transition-all duration-200 relative ${
                            features.includes(f.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                          }`}
                        >
                          {features.includes(f.id) && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </span>
                          )}
                          <p className="font-heading font-semibold text-sm text-foreground mb-0.5 pr-5">{f.label}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={prev} className="border-border font-heading font-semibold gap-1">
                        <ChevronLeft className="w-4 h-4" /> Vorheriger Schritt
                      </Button>
                      <Button onClick={next} disabled={!canNext()} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold py-6">
                        Weiter <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* SCHRITT 5: Ausstattungsniveau */}
                {step === 4 && (
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2">Welches Ausstattungsniveau?</h3>
                    <p className="text-sm text-muted-foreground mb-6">Das beeinflusst Materialqualität und Ausführung.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                      {AUSSTATTUNG_OPTIONS.map((o) => (
                        <button
                          key={o.id}
                          onClick={() => setAusstattung(o.id)}
                          className={`text-left p-5 rounded-lg border-2 transition-all duration-200 flex flex-col gap-3 h-full ${
                            ausstattung === o.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-colors ${
                            ausstattung === o.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}>
                            {o.id === "standard" ? "S" : o.id === "komfort" ? "K" : "P"}
                          </div>
                          <div>
                            <p className="font-heading font-semibold text-foreground">{o.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{o.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={prev} className="border-border font-heading font-semibold gap-1">
                        <ChevronLeft className="w-4 h-4" /> Vorheriger Schritt
                      </Button>
                      <Button onClick={next} disabled={!canNext()} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold py-6">
                        Schätzung berechnen <Calculator className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* SCHRITT 6: Ergebnis */}
                {step === 5 && (
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-1">Ihre grobe Kostenschätzung</h3>
                    <p className="text-sm text-muted-foreground mb-6">Erste Orientierung – kein verbindliches Angebot.</p>

                    <div className="bg-primary/5 border-2 border-primary/30 rounded-xl p-8 text-center mb-6">
                      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest font-heading font-semibold">Geschätzter Kostenrahmen</p>
                      <p className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary">
                        {fmt(calcRange().min)} – {fmt(calcRange().max)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-3">inkl. Material & Arbeitszeit</p>
                    </div>

                    {/* Zusammenfassung + Disclaimer nebeneinander */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-muted/30 border border-border rounded-lg p-4 text-sm space-y-1.5">
                      <p className="font-heading font-semibold text-foreground mb-2 text-xs uppercase tracking-wider">Ihre Angaben</p>
                      <div className="flex justify-between"><span className="text-muted-foreground">Projekttyp</span><span className="font-medium text-foreground">{projectType === "sanierung" ? "Sanierung / Altbau" : "Smart Home"}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Wohnfläche</span><span className="font-medium text-foreground">{wohnflaeche} m²</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Modernisierungssprung</span><span className="font-medium text-foreground">Level {currentLevel} → {targetLevel}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Ausstattung</span><span className="font-medium text-foreground capitalize">{ausstattung}</span></div>
                      <div className="flex justify-between items-start gap-4"><span className="text-muted-foreground shrink-0">Maßnahmen</span><span className="font-medium text-foreground text-right">{features.map((id) => activeFeatures.find((f) => f.id === id)?.label).join(", ")}</span></div>
                    </div>

                    <div className="border-2 border-primary/30 bg-primary/5 rounded-xl p-5 self-start">
                      <div className="flex gap-3 items-start">
                        <span className="text-xl shrink-0">💡</span>
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">Wichtiger Hinweis</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Der tatsächliche Preis hängt von baulichen Gegebenheiten und weiteren individuellen Faktoren ab.
                            Für ein <span className="text-primary font-semibold">verbindliches und kostenloses Angebot</span> erstellen wir Ihnen gerne einen Kostenvoranschlag.
                          </p>
                        </div>
                      </div>
                    </div>
                    </div>{/* end grid wrapper */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <Button onClick={scrollToContactWithData} className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold py-6">
                        Angebot anfragen
                      </Button>
                      <Button variant="outline" className="border-border font-heading font-semibold py-6" asChild>
                        <a href="tel:+4915157571992"><Phone className="w-4 h-4 mr-2" />0151-57571992</a>
                      </Button>
                    </div>
                    <button onClick={reset} className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                      <RotateCcw className="w-3.5 h-3.5" /> Neue Schätzung starten
                    </button>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;
