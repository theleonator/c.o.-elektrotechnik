export default function Privacy() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Datenschutz</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Verantwortlicher</h2>
        <p className="mb-4">
          Verantwortlich für die Datenverarbeitung ist:
        </p>
        <p>c.o.-Elektrotechnik GmbH<br />
           Straße und Hausnummer<br />
           PLZ Stadt<br />
           E-Mail: beispiel@c-o-elektrotechnik.de</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Datenerfassung</h2>
        <p className="mb-4">
          Weitere Informationen zu deiner Datenschutzrichtlinie...
        </p>
      </section>
    </div>
  );
}