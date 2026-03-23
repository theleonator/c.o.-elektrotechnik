import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  trail: { x: number; y: number }[];
}

const SparkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animFrameRef = useRef<number>(0);
  const originRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Spark origin: right side, vertically centered-ish
      originRef.current = {
        x: canvas.width * 0.72,
        y: canvas.height * 0.42,
      };
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnBurst = () => {
      const { x, y } = originRef.current;
      const count = Math.floor(Math.random() * 4) + 3;
      for (let i = 0; i < count; i++) {
        const angle = (Math.random() * Math.PI * 2);
        const speed = Math.random() * 3.5 + 1.2;
        sparksRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 1.5,
          life: 1,
          maxLife: Math.random() * 40 + 30,
          size: Math.random() * 2 + 1,
          trail: [],
        });
      }
    };

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frame++;
      if (frame % 18 === 0) spawnBurst();

      sparksRef.current = sparksRef.current.filter((s) => s.life > 0);

      for (const s of sparksRef.current) {
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 8) s.trail.shift();

        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.12; // gravity
        s.vx *= 0.97;
        s.life -= 1 / s.maxLife;

        const alpha = Math.max(0, s.life);

        // Draw trail
        if (s.trail.length > 1) {
          for (let i = 1; i < s.trail.length; i++) {
            const t = i / s.trail.length;
            ctx.beginPath();
            ctx.moveTo(s.trail[i - 1].x, s.trail[i - 1].y);
            ctx.lineTo(s.trail[i].x, s.trail[i].y);
            ctx.strokeStyle = `rgba(220, 38, 38, ${alpha * t * 0.6})`;
            ctx.lineWidth = s.size * t * 0.8;
            ctx.lineCap = "round";
            ctx.stroke();
          }
        }

        // Draw spark head
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 2.5);
        grad.addColorStop(0, `rgba(255, 255, 200, ${alpha * 0.95})`);
        grad.addColorStop(0.3, `rgba(239, 68, 68, ${alpha * 0.8})`);
        grad.addColorStop(1, `rgba(185, 28, 28, 0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
};

const HeroSection = () => {
  const scrollToContact = () => {
    document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Elektriker bei der Arbeit" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/10" />
      </div>

      {/* Spark Effect */}
      <SparkCanvas />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 pt-20">
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

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              C-O-ELEKTROTECHNIK – zuverlässig, sicher, präzise.{" "}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}>
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
