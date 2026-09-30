import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { getAllArticles, getCategories } from "@/lib/articles";
import { websiteJsonLd } from "@/lib/schema";

const FEATURED = [
  "rene-dost",
  "younes-zarou",
  "dagi-bee",
  "montana-black",
  "nic-kaufmann",
  "axel-schulz",
  "lena-mantler",
  "handofblood",
];

export default function HomePage() {
  const articles = getAllArticles();
  const categories = getCategories();
  const featured = FEATURED.map((slug) => articles.find((article) => article.slug === slug)).filter(
    (article): article is NonNullable<typeof article> => Boolean(article),
  );
  const [lead, ...side] = featured;
  const featuredSlugs = new Set(featured.map((article) => article.slug));
  const rest = articles.filter((article) => !featuredSlugs.has(article.slug));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <JsonLd data={websiteJsonLd(articles)} />
      <section className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Redaktionelle Schätzungen · 2026
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Wie reich sind Deutschlands Promis wirklich?
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          Vermögen der Promis ordnet Nettovermögen 2026 von Influencern, Musikerinnen, Sportlern
          und Unternehmern ein. Warm im Ton, klar in der Methode: jede Zahl bleibt eine Schätzung.
        </p>
      </section>
      <div className="mt-8 max-w-3xl">
        <Disclaimer />
      </div>

      {lead ? (
        <section className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-12" aria-label="Im Fokus">
          <div className="lg:col-span-7">
            <ArticleCard article={lead} large priority />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {side.slice(0, 2).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-14" aria-label="Kategorien">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold">Rubriken</h2>
          <Link href="/vermoegen" className="text-sm font-semibold text-pine underline underline-offset-4">
            Alle Artikel
          </Link>
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/kategorie/${category.slug}`}
                className="block h-full border border-line bg-card px-4 py-4 hover:border-accent"
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-2xl">{category.name}</span>
                  <span className="text-sm text-muted">{category.count}</span>
                </span>
                <span className="mt-2 block text-sm leading-6 text-muted">{category.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {side.length > 2 ? (
        <section className="mt-14" aria-label="Weitere Schwerpunkte">
          <h2 className="font-serif text-3xl font-semibold">Weitere Schwerpunkte</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {side.slice(2).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-14" aria-label="Alle Porträts">
        <h2 className="font-serif text-3xl font-semibold">Alle Porträts</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
