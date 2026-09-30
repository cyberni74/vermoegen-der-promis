import type { Metadata } from "next";
import { Disclaimer } from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: { absolute: "Über uns · Vermögen der Promis" },
  description:
    "Vermögen der Promis ist ein deutschsprachiges Magazin über geschätzte Promi-Vermögen 2026. Methode, Ton und Grenzen der Schätzung.",
  alternates: { canonical: "/ueber-uns" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Über uns</h1>
      <div className="mt-6 space-y-4 text-lg leading-8">
        <p>
          Vermögen der Promis sammelt deutschsprachige Porträts über das geschätzte Vermögen von
          Creators, Musikerinnen, Sportlern, Schauspielerinnen und Unternehmern. Der Schwerpunkt
          liegt auf der deutschsprachigen TikTok- und Influencer-Szene, ergänzt um Profile, deren
          Geld woanders verdient wird: in der Gastronomie, im Sport, in der Musik.
        </p>
        <p>
          Wir schreiben magazinhaft und ohne Boulevard-Getöse. Eine hohe Reichweite ist kein
          Kontostand. Umsatz ist kein Gewinn, ein Gage-Zitat keine Bilanz, ein Auto im Feed kein
          Nachweis.
        </p>
        <p>
          Jeder Artikel nennt eine Spanne nur dort, wo der Text sie herleitet, und markiert sie als
          Schätzung. Wer eine Zahl sucht, soll die Spanne lesen – und die Lücke zwischen Lifestyle
          und Nettovermögen mitlesen.
        </p>
      </div>
      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
}
