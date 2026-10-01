import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  CATEGORY_COPY,
  FORCE_ILLUSTRATIVE_SLUGS,
  IMAGE_CREDITS,
  PEOPLE,
  RELATED,
  type ImageCredit,
  type PersonProfile,
} from "@/lib/editorial";
import { firstBoldLead, firstHeading, renderMarkdown, type LinkPhrase } from "@/lib/markdown";
import { categorySlug, truncateText } from "@/lib/site";

export type ArticleImage = {
  file: string;
  src: string;
  placement: "hero" | "mid" | "unknown";
  illustrative: boolean;
  alt: string;
  caption: string;
  credit?: string;
  license?: string;
  licenseUrl?: string;
  sourceUrl?: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  estimate: string | null;
  illustrativeOnly: boolean;
  hero: ArticleImage | null;
  images: ArticleImage[];
  gallery: ArticleImage[];
  person: string;
  alternateNames: string[];
  keywords: string[];
  markdown: string;
  html: string;
  related: Article[];
};

type ManifestImage = {
  file: string;
  placement?: "hero" | "mid" | "unknown";
  illustrative?: boolean;
};

type ManifestArticle = {
  slug: string;
  targetMd: string;
  title?: string;
  category: string;
  description?: string;
  heroImage?: string;
  images?: ManifestImage[];
  illustrativeOnly?: boolean;
  estimate?: string;
};

type Manifest = {
  conventions?: { categories?: string[] };
  articles: ManifestArticle[];
  slugAliases?: Record<string, string>;
};

type CatalogImage = ManifestImage & {
  alt?: string;
  caption?: string;
  credit?: string;
  license?: string;
  licenseUrl?: string;
  sourceUrl?: string;
};

type CatalogArticle = {
  slug: string;
  targetMd: string;
  title?: string;
  category: string;
  estimate?: string;
  illustrativeOnly?: boolean;
  heroFile?: string;
  person?: string;
  alternateNames?: string[];
  related?: string[];
  description?: string;
  images?: CatalogImage[];
};

type Frontmatter = {
  slug?: string;
  title?: string;
  category?: string;
  estimate?: string;
  person?: string;
  alternateNames?: string[];
  illustrativeOnly?: boolean;
  related?: string[];
  description?: string;
};

const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, "content", "articles");

let cache: Article[] | null = null;

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

function loadManifest(): Manifest {
  return readJson<Manifest>(path.join(ROOT, "import-manifest.json"));
}

function loadCatalogs(): CatalogArticle[] {
  const dir = path.join(ROOT, "content", "catalog");
  if (!fs.existsSync(dir)) return [];
  const articles: CatalogArticle[] = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".json")) continue;
    const data = readJson<{ articles?: CatalogArticle[] } | CatalogArticle[]>(
      path.join(dir, file),
    );
    if (Array.isArray(data)) articles.push(...data);
    else if (data.articles) articles.push(...data.articles);
  }
  return articles;
}

export function slugFromFilename(filename: string): string {
  const base = filename.replace(/\.md$/i, "");
  if (
    base === "redo" ||
    base === "redo-vermoegen-2026" ||
    base === "redo-rene-dost" ||
    base === "rene-dost-vermoegen-2026"
  ) {
    return "rene-dost";
  }
  return base
    .replace(/-vermoegen-2026$/, "")
    .replace(/-vermoegen$/, "")
    .replace(/-2026$/, "");
}

function canonicalize(slug: string, aliases: Record<string, string>): string {
  return aliases[slug] ?? slug;
}

function publicSrc(slug: string, file: string): string {
  return `/images/${slug}/${file}`;
}

function fileExists(slug: string, file: string): boolean {
  return fs.existsSync(path.join(ROOT, "public", "images", slug, file));
}

function isIllustrative(file: string, flagged: boolean | undefined, pack: boolean): boolean {
  return pack || Boolean(flagged) || /illustrative/i.test(file);
}

function defaultAlt(person: string, illustrative: boolean, file: string, title: string): string {
  if (illustrative) return `Symbolbild, keine Abbildung von ${person}`;
  if (/portrait/i.test(file) || /^hero-/i.test(file)) return person;
  return title;
}

function defaultCaption(illustrative: boolean, file: string): string {
  if (illustrative) return "Symbolbild – keine Abbildung der Person";
  if (/portrait/i.test(file) || /^hero-/i.test(file)) return "Redaktionelles Porträt";
  return "Redaktionelles Bild";
}

function mergeCredit(
  slug: string,
  file: string,
  image: CatalogImage | ManifestImage,
): ImageCredit {
  const fromImage = image as CatalogImage;
  const fromMap = IMAGE_CREDITS[`${slug}/${file}`];
  return {
    credit: fromImage.credit ?? fromMap?.credit,
    license: fromImage.license ?? fromMap?.license,
    licenseUrl: fromImage.licenseUrl ?? fromMap?.licenseUrl,
    sourceUrl: fromImage.sourceUrl ?? fromMap?.sourceUrl,
  };
}

function toArticleImage(
  slug: string,
  person: string,
  title: string,
  packIllustrative: boolean,
  image: CatalogImage,
): ArticleImage | null {
  if (!fileExists(slug, image.file)) return null;
  const illustrative = isIllustrative(image.file, image.illustrative, packIllustrative);
  const credit = mergeCredit(slug, image.file, image);
  return {
    file: image.file,
    src: publicSrc(slug, image.file),
    placement: image.placement ?? "unknown",
    illustrative,
    alt: image.alt ?? defaultAlt(person, illustrative, image.file, title),
    caption: image.caption ?? defaultCaption(illustrative, image.file),
    credit: credit.credit,
    license: credit.license,
    licenseUrl: credit.licenseUrl,
    sourceUrl: credit.sourceUrl,
  };
}

function listImageFiles(slug: string): string[] {
  const dir = path.join(ROOT, "public", "images", slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort();
}

function autoImages(slug: string, illustrativeOnly: boolean): CatalogImage[] {
  const files = listImageFiles(slug);
  const decorated = files.map((file) => ({
    file,
    illustrative: illustrativeOnly || /illustrative/i.test(file),
  }));
  const pool = illustrativeOnly ? decorated : decorated.filter((image) => !image.illustrative);
  const hero =
    pool.find((image) => /^hero/i.test(image.file))?.file ??
    pool.find((image) => /portrait/i.test(image.file))?.file ??
    pool[0]?.file ??
    decorated[0]?.file;
  return decorated.map((image) => ({
    file: image.file,
    illustrative: image.illustrative,
    placement: image.file === hero ? "hero" : "mid",
  }));
}

function personFromTitle(title: string): string {
  return title.split(/\s+Vermögen/i)[0]?.trim() || title;
}

function profileFor(slug: string, title: string, catalog?: CatalogArticle, fm?: Frontmatter): PersonProfile {
  if (fm?.person) {
    return { name: fm.person, alternateNames: fm.alternateNames };
  }
  if (catalog?.person) {
    return { name: catalog.person, alternateNames: catalog.alternateNames };
  }
  return PEOPLE[slug] ?? { name: personFromTitle(title) };
}

function keywordsFor(person: string, alternates: string[], category: string): string[] {
  const names = [person, ...alternates].filter(Boolean);
  const keywords = ["Vermögen 2026", "Nettovermögen 2026", category];
  for (const name of names) {
    keywords.push(`${name} Vermögen 2026`, `${name} Nettovermögen 2026`, `wie reich ist ${name} 2026`);
  }
  return [...new Set(keywords)];
}

function linkPhrases(articles: { slug: string; person: string; alternateNames: string[] }[]): LinkPhrase[] {
  const phrases: LinkPhrase[] = [];
  for (const article of articles) {
    phrases.push({ slug: article.slug, text: article.person });
    for (const name of article.alternateNames) phrases.push({ slug: article.slug, text: name });
  }
  return phrases;
}

function loadArticles(): Article[] {
  const manifest = loadManifest();
  const aliases = manifest.slugAliases ?? {};
  const categories = manifest.conventions?.categories ?? [
    "Influencer",
    "Unternehmer",
    "Musiker",
    "Sport",
    "Schauspieler",
    "Politik",
  ];
  const manifestByFile = new Map(manifest.articles.map((article) => [article.targetMd, article]));
  const catalogByFile = new Map(loadCatalogs().map((article) => [article.targetMd, article]));
  const files = fs.readdirSync(ARTICLES_DIR).filter((file) => file.endsWith(".md")).sort();

  const drafts: Omit<Article, "html" | "related">[] = [];

  for (const file of files) {
    const targetMd = `content/articles/${file}`;
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
    const parsed = matter(raw);
    const fm = parsed.data as Frontmatter;
    const markdown = parsed.content.trim();
    const manifestEntry = manifestByFile.get(targetMd);
    const catalogEntry = catalogByFile.get(targetMd);
    const entry = manifestEntry ?? catalogEntry;
    const slug = canonicalize(
      entry?.slug ?? fm.slug ?? slugFromFilename(file),
      aliases,
    );
    const title =
      firstHeading(markdown) ||
      manifestEntry?.title ||
      catalogEntry?.title ||
      fm.title ||
      slug;
    const illustrativeOnly =
      FORCE_ILLUSTRATIVE_SLUGS.has(slug) ||
      Boolean(manifestEntry?.illustrativeOnly) ||
      Boolean(catalogEntry?.illustrativeOnly) ||
      Boolean(fm.illustrativeOnly);
    const person = profileFor(slug, title, catalogEntry, fm);
    const category = fm.category || entry?.category || "Influencer";
    const description =
      usableDescription(manifestEntry?.description) ||
      usableDescription(fm.description) ||
      usableDescription(catalogEntry?.description) ||
      truncateText(firstBoldLead(markdown));
    const estimate = manifestEntry?.estimate || catalogEntry?.estimate || fm.estimate || null;
    const sourceImages = mergeImageSources(
      manifestEntry?.images,
      catalogEntry?.images,
      slug,
      illustrativeOnly,
    );
    const images = sourceImages
      .map((image) => toArticleImage(slug, person.name, title, illustrativeOnly, image))
      .filter((image): image is ArticleImage => image !== null);
    const manifestHero = manifestEntry?.heroImage
      ? path.posix.basename(manifestEntry.heroImage)
      : undefined;
    // Catalog heroes correct heuristic picks (and keep wave-2a portrait choices).
    const heroFile = catalogEntry?.heroFile ?? manifestHero;
    const hero =
      (heroFile ? images.find((image) => image.file === heroFile) : undefined) ??
      images.find((image) => image.placement === "hero") ??
      images[0] ??
      null;

    drafts.push({
      slug,
      title,
      description,
      category,
      categorySlug: categorySlug(category),
      estimate,
      illustrativeOnly,
      hero,
      images,
      gallery: images.filter((image) => image.file !== hero?.file),
      person: person.name,
      alternateNames: person.alternateNames ?? [],
      keywords: keywordsFor(person.name, person.alternateNames ?? [], category),
      markdown,
    });
  }

  const phrases = linkPhrases(drafts);
  const bySlug = new Map(drafts.map((article) => [article.slug, article]));
  const articles: Article[] = drafts.map((draft) => {
    const preferred = [
      ...(catalogByFile.get(`content/articles/${draft.slug}-vermoegen-2026.md`)?.related ??
        RELATED[draft.slug] ??
        []),
    ];
    const relatedSlugs = [...new Set(preferred)].filter(
      (slug) => slug !== draft.slug && bySlug.has(slug),
    );
    if (relatedSlugs.length < 3) {
      for (const other of drafts) {
        if (other.slug === draft.slug || relatedSlugs.includes(other.slug)) continue;
        if (other.category === draft.category) relatedSlugs.push(other.slug);
        if (relatedSlugs.length >= 4) break;
      }
    }
    const html = renderMarkdown(
      draft.markdown,
      phrases.filter((phrase) => phrase.slug !== draft.slug),
    );
    return {
      ...draft,
      html,
      related: relatedSlugs.slice(0, 4).map((slug) => bySlug.get(slug)!).filter(Boolean) as Article[],
    };
  });

  // Related cards should not recurse forever in JSON views; the objects above
  // point at drafts-without-related via the map, so reattach full articles.
  const full = new Map(articles.map((article) => [article.slug, article]));
  for (const article of articles) {
    article.related = article.related.map((item) => full.get(item.slug) ?? item);
  }

  assertCatalog(articles, categories);
  return articles.sort((a, b) => a.person.localeCompare(b.person, "de"));
}

function usableDescription(value: string | undefined): string | undefined {
  const text = value?.replace(/\s+/g, " ").trim();
  if (!text || text.startsWith("---") || text.length < 40) return undefined;
  // The 36-article manifest clips blurbs at 160 characters with an ellipsis.
  if (/[…]\s*$/.test(text) && text.length <= 170) return undefined;
  return text;
}

function mergeImageSources(
  manifestImages: ManifestImage[] | undefined,
  catalogImages: CatalogImage[] | undefined,
  slug: string,
  illustrativeOnly: boolean,
): CatalogImage[] {
  if (!manifestImages?.length) {
    return catalogImages ?? autoImages(slug, illustrativeOnly);
  }
  const extras = new Map((catalogImages ?? []).map((image) => [image.file, image]));
  return manifestImages.map((image) => {
    const extra = extras.get(image.file);
    return {
      ...extra,
      ...image,
      alt: extra?.alt,
      caption: extra?.caption,
      credit: extra?.credit,
      license: extra?.license,
      licenseUrl: extra?.licenseUrl,
      sourceUrl: extra?.sourceUrl,
      illustrative: Boolean(image.illustrative) || Boolean(extra?.illustrative),
      placement: extra?.placement ?? image.placement,
    };
  });
}

function assertCatalog(articles: Article[], categories: string[]) {
  const slugs = new Set(articles.map((article) => article.slug));
  if (!slugs.has("rene-dost")) {
    throw new Error("Erwarteter Slug rene-dost fehlt.");
  }
  if (slugs.has("redo") || slugs.has("redo-rene-dost")) {
    throw new Error("Redo darf nicht als eigener Slug ausgeliefert werden.");
  }
  for (const slug of FORCE_ILLUSTRATIVE_SLUGS) {
    const article = articles.find((item) => item.slug === slug);
    if (!article?.illustrativeOnly) throw new Error(`${slug} muss illustrativeOnly sein.`);
    if (article.images.some((image) => !image.illustrative)) {
      throw new Error(`${slug} enthält ein Bild, das als Porträt gelten würde.`);
    }
    if (article.hero && !article.hero.illustrative) {
      throw new Error(`${slug} nutzt ein Heldenbild, das wie ein Porträt wirkt.`);
    }
  }
  const required = [
    "nic-kaufmann",
    "dagi-bee",
    "nader-el-jindaoui",
    "montana-black",
    "younes-zarou",
    "lena-mantler",
    "melina-sophie",
    "sophia-thiel",
    "inscope21",
    "unsympathischtv",
    "iblali",
    "handofblood",
    "rewinside",
    "domtendo",
    "viktoriasarina",
    "falco-punch",
    "avemoves",
    "dilaraas",
    "diana-zur-loewen",
    "unge",
  ];
  for (const slug of required) {
    if (!slugs.has(slug)) throw new Error(`Artikel fehlt: ${slug}`);
  }
  if (articles.length < 41) {
    throw new Error(`Mindestens 41 Artikel erwartet, gefunden: ${articles.length}`);
  }
  const expectedHeroes: Record<string, string> = {
    "falco-punch": "smartphone-creator-illustrative.jpg",
    avemoves: "dance-street-illustrative.jpg",
    dilaraas: "beauty-makeup-illustrative.jpg",
    "diana-zur-loewen": "diana-zur-loewen-euro20-portrait.png",
    unge: "simon-unge-wvp2015-portrait.jpg",
  };
  for (const [slug, file] of Object.entries(expectedHeroes)) {
    const article = articles.find((item) => item.slug === slug);
    if (article?.hero?.file !== file) {
      throw new Error(`${slug} Heldenbild ist ${article?.hero?.file ?? "leer"}, erwartet ${file}.`);
    }
  }
  for (const name of categories) {
    if (!categorySlug(name)) throw new Error(`Kategorie ohne Slug: ${name}`);
  }
}

export function getAllArticles(): Article[] {
  if (!cache) cache = loadArticles();
  return cache;
}

export function getArticle(slug: string): Article | undefined {
  const aliases = loadManifest().slugAliases ?? {};
  const canonical = canonicalize(slug, aliases);
  return getAllArticles().find((article) => article.slug === canonical);
}

export function getCategoryNames(): string[] {
  const manifest = loadManifest();
  const names = manifest.conventions?.categories ?? [];
  const extra = getAllArticles()
    .map((article) => article.category)
    .filter((name) => !names.includes(name));
  return [...names, ...extra];
}

export function getCategories(): {
  slug: string;
  name: string;
  description: string;
  count: number;
}[] {
  const articles = getAllArticles();
  return getCategoryNames().map((name) => ({
    slug: categorySlug(name),
    name,
    description: CATEGORY_COPY[name] ?? "Weitere Porträts dieser Rubrik.",
    count: articles.filter((article) => article.category === name).length,
  }));
}

export function getCategory(slug: string) {
  return getCategories().find((category) => category.slug === slug);
}

export function getArticlesByCategory(slug: string): Article[] {
  const category = getCategory(slug);
  if (!category) return [];
  return getAllArticles().filter((article) => article.category === category.name);
}
