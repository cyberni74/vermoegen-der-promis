import Link from "next/link";
import { DISCLAIMER } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2">
        <div>
          <p className="font-serif text-2xl">Vermögen der Promis</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            {DISCLAIMER} Ein redaktionelles Magazin, keine Bankauskunft und keine Anlageberatung.
          </p>
        </div>
        <nav className="flex flex-wrap content-start gap-x-5 gap-y-2 text-sm font-semibold sm:justify-end" aria-label="Fußnavigation">
          <Link href="/vermoegen" className="hover:text-accent">Artikel</Link>
          <Link href="/ueber-uns" className="hover:text-accent">Über uns</Link>
          <Link href="/impressum" className="hover:text-accent">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-accent">Datenschutz</Link>
        </nav>
      </div>
    </footer>
  );
}
