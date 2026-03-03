import { Zap } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-foreground">C.O. Elektrotechnik</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ihr verlässlicher Partner für professionelle Elektrotechnik – von der Planung bis zur Umsetzung.
            </p>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Leistungen</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Neubauinstallationen</li>
              <li>Altbau & Sanierung</li>
              <li>Industriemontage</li>
              <li>Smart Home</li>
              <li>Wallbox-Installation</li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Kontakt</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Musterstraße 12</li>
              <li>12345 Musterstadt</li>
              <li className="pt-1">
                <a href="tel:+491234567890" className="hover:text-primary transition-colors">+49 123 456 7890</a>
              </li>
              <li>
                <a href="mailto:info@c-o-elektrotechnik.de" className="hover:text-primary transition-colors">info@c-o-elektrotechnik.de</a>
              </li>
            </ul>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Öffnungszeiten</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Mo – Fr: 07:00 – 17:00</li>
              <li>Sa: nach Vereinbarung</li>
              <li>So: geschlossen</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} C.O. Elektrotechnik. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#impressum" className="hover:text-primary transition-colors">Impressum</a>
            <a href="#datenschutz" className="hover:text-primary transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
