import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleFigure } from "@/components/ArticleFigure";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { getAllArticles, getArticle } from "@/lib/articles";
import { articleJsonLd } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const canonical = `/vermoegen/${article.slug}`;
  const image =
    article.hero && !article.hero.illustrative
      ? [{ url: absoluteUrl(article.hero.src), alt: article.hero.alt }]
      : undefined;
  return {
    title: { absolute: article.title },
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "de_DE",
      url: canonical,
      title: article.title,
      description: article.description,
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: image?.map((item) => item.url),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <JsonLd data={articleJsonLd(article)} />
      <nav className="text-sm text-muted" aria-label="Brotkrumen">
        <Link href="/" className="hover:text-accent">Start</Link>
        <span aria-hidden="true"> · </span>
        <Link href="/vermoegen" className="hover:text-accent">Artikel</Link>
        <span aria-hidden="true"> · </span>
        <Link href={`/kategorie/${article.categorySlug}`} className="hover:text-accent">
          {article.category}
        </Link>
      </nav>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {article.category} · {article.person}
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
        {article.title}
      </h1>
      <p className="mt-5 font-serif text-xl italic leading-8 text-muted">{article.description}</p>
      {article.estimate ? (
        <aside className="mt-6 border border-line bg-card px-4 py-4" aria-label="Schätzung">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Schätzung Nettovermögen 2026
          </p>
          <p className="mt-1 font-serif text-3xl text-ink">{article.estimate}</p>
          {article.estimateNote ? (
            <p className="mt-2 text-sm leading-6 text-muted">{article.estimateNote}</p>
          ) : null}
        </aside>
      ) : null}
      <div className="mt-4">
        <Disclaimer />
      </div>
      {article.hero ? (
        <div className="mt-8">
          <ArticleFigure
            image={article.hero}
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
          {article.illustrativeOnly ? (
            <p className="mt-3 text-sm leading-6 text-muted">
              Für dieses Porträt liegt kein freigegebenes Personenbild vor. Das Titelbild ist ein
              Symbolbild und zeigt nicht {article.person}.
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="article-body mt-8" dangerouslySetInnerHTML={{ __html: article.html }} />
      {article.gallery.length > 0 ? (
        <section className="mt-12" aria-label="Bildstrecke">
          <h2 className="font-serif text-2xl font-semibold">Bildstrecke</h2>
          <div className="mt-4 grid gap-6">
            {article.gallery.map((image) => (
              <ArticleFigure
                key={image.file}
                image={image}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            ))}
          </div>
        </section>
      ) : null}
      {article.related.length > 0 ? (
        <section className="mt-14 border-t border-line pt-8" aria-label="Weiterlesen">
          <h2 className="font-serif text-3xl font-semibold">Weiterlesen</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            {article.related.map((related) => (
              <ArticleCard key={related.slug} article={related} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
