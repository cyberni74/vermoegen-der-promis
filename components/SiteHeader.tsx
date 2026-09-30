import Link from "next/link";
import { getCategories } from "@/lib/articles";

export function SiteHeader() {
  const categories = getCategories();
  return (
    <header className="relative border-b border-line bg-paper/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-serif text-xl leading-none tracking-tight sm:text-2xl">
          Vermögen <span className="italic text-accent">der Promis</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex" aria-label="Hauptnavigation">
          <Link href="/vermoegen" className="hover:text-accent">
            Artikel
          </Link>
          <details className="relative">
            <summary className="cursor-pointer list-none hover:text-accent">Kategorien</summary>
            <div className="absolute right-0 z-20 mt-3 w-64 border border-line bg-card p-3 shadow-sm">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/kategorie/${category.slug}`}
                  className="flex items-baseline justify-between gap-3 px-2 py-2 hover:bg-paper"
                >
                  <span>{category.name}</span>
                  <span className="text-xs text-muted">{category.count}</span>
                </Link>
              ))}
            </div>
          </details>
          <Link href="/ueber-uns" className="hover:text-accent">
            Über uns
          </Link>
        </nav>
        <details className="md:hidden">
          <summary className="cursor-pointer list-none text-sm font-semibold">Menü</summary>
          <div className="absolute left-0 right-0 z-20 mt-4 border-y border-line bg-card px-4 py-3">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm font-semibold">
              <Link href="/vermoegen">Artikel</Link>
              {categories.map((category) => (
                <Link key={category.slug} href={`/kategorie/${category.slug}`} className="text-muted">
                  {category.name}
                </Link>
              ))}
              <Link href="/ueber-uns">Über uns</Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
