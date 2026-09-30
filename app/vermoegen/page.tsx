import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Disclaimer } from "@/components/Disclaimer";
import { getAllArticles, getCategories } from "@/lib/articles";

export const metadata: Metadata = {
  title: { absolute: "Alle Vermögens-Artikel 2026 · Vermögen der Promis" },
  description:
    "Artikelübersicht Vermögen 2026: Influencer, Unternehmer, Musiker, Sport, Schauspieler und Politik. Alle Zahlen sind Schätzungen.",
  alternates: { canonical: "/vermoegen" },
  openGraph: {
    title: "Alle Vermögens-Artikel 2026",
    description: "Die Artikelübersicht von Vermögen der Promis. Jede Zahl ist eine Schätzung.",
    locale: "de_DE",
  },
};

export default function ArticleIndexPage() {
  const articles = getAllArticles();
  const categories = getCategories().filter((category) => category.count > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Artikelübersicht</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
        Vermögen 2026 im Überblick
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        {articles.length} Porträts zu Nettovermögen, Einkommensquellen und dem Abstand zwischen
        Lifestyle und Bilanz.
      </p>
      <div className="mt-6 max-w-3xl">
        <Disclaimer />
      </div>
      {categories.map((category) => (
        <section key={category.slug} className="mt-12" aria-labelledby={`kat-${category.slug}`}>
          <h2 id={`kat-${category.slug}`} className="font-serif text-3xl font-semibold">
            {category.name}
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles
              .filter((article) => article.category === category.name)
              .map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
