import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Disclaimer } from "@/components/Disclaimer";
import { getArticlesByCategory, getCategories, getCategory } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const title = `${category.name} Vermögen 2026`;
  const description = `${category.description} Rubrik ${category.name} auf Vermögen der Promis. Alle Zahlen sind Schätzungen.`;
  return {
    title: { absolute: `${title} · Vermögen der Promis` },
    description,
    alternates: { canonical: `/kategorie/${category.slug}` },
    openGraph: { title, description, locale: "de_DE", url: `/kategorie/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const articles = getArticlesByCategory(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <nav className="text-sm text-muted">
        <Link href="/" className="hover:text-accent">Start</Link>
        <span aria-hidden="true"> · </span>
        <Link href="/vermoegen" className="hover:text-accent">Artikel</Link>
      </nav>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Kategorie</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
        {category.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{category.description}</p>
      <div className="mt-6 max-w-3xl">
        <Disclaimer />
      </div>
      {articles.length > 0 ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="mt-10 max-w-2xl border border-dashed border-line bg-card px-4 py-6 text-muted">
          In der Rubrik {category.name} steht noch kein Porträt. Neue Markdown-Dateien unter{" "}
          <code>content/articles</code> erscheinen hier automatisch, sobald die Kategorie gesetzt ist.
        </p>
      )}
    </div>
  );
}
