import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Impressum · Vermögen der Promis" },
  description: "Impressum von Vermögen der Promis. Anbieterkennzeichnung wird vor dem Livegang ergänzt.",
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">Impressum</h1>
      <p className="mt-4 text-sm uppercase tracking-[0.14em] text-gold">Platzhalter vor dem Livegang</p>
      <div className="mt-6 space-y-4 leading-7 text-ink">
        <p>Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz). Diese Seite ist ein Stub.</p>
        <p>
          Name, Anschrift, vertreten durch, Kontakt (E-Mail, Telefon) und – falls vorhanden –
          Register, USt-IdNr. und verantwortlich nach § 18 Abs. 2 MStV werden hier eingetragen,
          bevor die Website öffentlich beworben wird. Es werden absichtlich keine erfundenen
          Firmendaten genannt.
        </p>
        <p>
          Inhaltlich verantwortlich für die Texte ist die Redaktion von Vermögen der Promis.
          Vermögenszahlen sind redaktionelle Schätzungen.
        </p>
      </div>
    </div>
  );
}
