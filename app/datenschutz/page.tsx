import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Datenschutz · Vermögen der Promis" },
  description:
    "Datenschutzhinweise von Vermögen der Promis. Statische Artikel, kein Nutzerkonto, kein Passwortschutz.",
  alternates: { canonical: "/datenschutz" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">Datenschutz</h1>
      <p className="mt-4 text-sm uppercase tracking-[0.14em] text-gold">Platzhalter vor dem Livegang</p>
      <div className="mt-6 space-y-4 leading-7">
        <p>
          Vermögen der Promis ist ein öffentlich lesbares Magazin. Es gibt kein Nutzerkonto, keine
          Paywall und keinen Passwortschutz. Artikel werden als statische Seiten ausgeliefert.
        </p>
        <p>
          Beim Aufruf können technisch notwendige Verbindungsdaten (IP-Adresse, Zeitpunkt, aufgerufene
          URL, User-Agent) in Server-Logs des Hostings anfallen, bei einem Deployment auf Vercel bei
          Vercel Inc. Diese Logs dienen dem Betrieb und der Fehleranalyse. Es werden keine
          Tracking-Cookies und kein Werbenetzwerk eingebunden.
        </p>
        <p>
          Externe Links, etwa in den Quellenangaben, führen auf Seiten Dritter mit eigenen
          Datenschutzregeln. Bilder liegen lokal; Lizenzhinweise stehen in der Bildunterschrift.
        </p>
        <p>
          Eine konkrete Verantwortlichen-Adresse und ein Kontakt für Auskunftsersuchen werden im
          Impressum ergänzt, sobald der Anbieter feststeht. Bis dahin ist dies kein vollständiges
          Datenschutzerklärungsmuster für den Livebetrieb.
        </p>
      </div>
    </div>
  );
}
