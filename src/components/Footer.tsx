const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-heading font-bold text-foreground">
                C-O-ELEKTROTECHNIK
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ihr verlässlicher Partner für professionelle Elektrotechnik – von
              der Planung bis zur Umsetzung.
            </p>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Leistungen
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Neubauinstallationen</li>
              <li>Altbau &amp; Sanierung</li>
              <li>Industriemontage</li>
              <li>Smart Home</li>
              <li>Wallbox-Installation</li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Kontakt
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Obere Weinbergstraße 27</li>
              <li>65326 Aarbergen</li>
              <li className="pt-1">
                <a
                  className="hover:text-primary transition-colors"
                  href="tel:+491517571992"
                >
                  0151-57571992
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="mailto:mail@c-o-elektrotechnik.de"
                >
                  mail@c-o-elektrotechnik.de
                </a>
              </li>
            </ul>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Öffnungszeiten
            </h4>

            <ul className="text-sm text-muted-foreground space-y-3">
              <li className="flex flex-col sm:flex-row sm:gap-4">
                <span className="font-medium sm:w-24">Mo – Fr</span>
                <span className="tabular-nums">
                  08:00 – 18:00 Uhr
                </span>
              </li>

              <li className="flex flex-col sm:flex-row sm:gap-4">
                <span className="font-medium sm:w-24">Sa</span>
                <span className="tabular-nums">
                  08:00 – 14:00 Uhr
                </span>
              </li>

              <li className="flex flex-col sm:flex-row sm:gap-4">
                <span className="font-medium sm:w-24">So</span>
                <span className="italic">geschlossen</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} C.O. Elektrotechnik. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a
              href="/impressum.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Impressum
            </a>
            <a
              href="/datenschutz.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
