import type { Article } from "@/lib/articles";
import { absoluteUrl, DISCLAIMER, SITE_NAME, PUBLISHED } from "@/lib/site";

function json(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function articleJsonLd(article: Article): string {
  const url = absoluteUrl(`/vermoegen/${article.slug}`);
  const heroOk = article.hero && !article.hero.illustrative && !article.illustrativeOnly;
  const image = heroOk ? absoluteUrl(article.hero!.src) : undefined;
  const portrait =
    image && article.hero && (/portrait/i.test(article.hero.file) || /^hero-/i.test(article.hero.file));

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: article.title,
      description: article.description,
      inLanguage: "de-DE",
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      mainEntityOfPage: url,
      url,
      articleSection: article.category,
      keywords: article.keywords.join(", "),
      image: image ? [image] : undefined,
      author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
      publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
      about: { "@id": `${url}#person` },
    },
    {
      "@type": "Person",
      "@id": `${url}#person`,
      name: article.person,
      alternateName: article.alternateNames.length ? article.alternateNames : undefined,
      url,
      description: article.description,
      image: portrait ? image : undefined,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Artikel", item: absoluteUrl("/vermoegen") },
        {
          "@type": "ListItem",
          position: 3,
          name: article.category,
          item: absoluteUrl(`/kategorie/${article.categorySlug}`),
        },
        { "@type": "ListItem", position: 4, name: article.title, item: url },
      ],
    },
  ];

  if (article.faqPage) {
    const faq = { ...article.faqPage };
    delete faq["@context"];
    graph.push(faq);
  } else if (article.estimate) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `Wie reich ist ${article.person} 2026?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Schätzung zum Nettovermögen 2026: ${article.estimate}. ${DISCLAIMER}`,
          },
        },
      ],
    });
  }

  return json({ "@context": "https://schema.org", "@graph": graph });
}

export function websiteJsonLd(articles: { slug: string; title: string }[]): string {
  return json({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: absoluteUrl("/"),
        inLanguage: "de-DE",
        description:
          "Redaktionelles Magazin über geschätzte Vermögen von Creators, Musikerinnen, Sportlern und Unternehmerinnen.",
      },
      {
        "@type": "ItemList",
        name: "Vermögen 2026",
        itemListElement: articles.map((article, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: article.title,
          url: absoluteUrl(`/vermoegen/${article.slug}`),
        })),
      },
    ],
  });
}
