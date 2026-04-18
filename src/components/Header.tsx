import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/Logo_C-O-E.png";

const navLinks = [
{ label: "Startseite", href: "#hero" },
{ label: "Leistungen", href: "#leistungen" },
{ label: "Über uns", href: "#ueber-uns" },
{ label: "Kontakt", href: "#kontakt" }];


const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <button onClick={() => scrollTo("#hero")} className="flex items-center gap-3 group">
          <img src={logo} alt="C.O. Elektrotechnik Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="font-heading font-bold text-sm text-foreground tracking-tight text-left md:text-xl">C-O-ELEKTROTECHNIK</span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase text-left md:text-sm">me. ​Christopher Ott</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group">
            
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </button>
          )}
          <Button onClick={() => scrollTo("#kontakt")} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold">
            Angebot anfragen
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü öffnen">
          
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background border-b border-border overflow-hidden">
          
            <nav className="flex flex-col p-4 gap-3">
              {navLinks.map((link) =>
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2 border-b border-border transition-colors">
              
                  {link.label}
                </button>
            )}
              <Button onClick={() => scrollTo("#kontakt")} className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold">
                Angebot anfragen
              </Button>
            </nav>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

};

export default Header;
