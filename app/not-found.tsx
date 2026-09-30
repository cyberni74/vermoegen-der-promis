import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">404</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold">Diese Seite gibt es nicht.</h1>
      <p className="mt-4 text-lg text-muted">
        Der Artikel ist nicht im Bestand, oder der Slug hat sich geändert. Redo liegt unter René Dost.
      </p>
      <Link href="/vermoegen" className="mt-6 inline-block font-semibold text-pine underline underline-offset-4">
        Zur Artikelübersicht
      </Link>
    </div>
  );
}
