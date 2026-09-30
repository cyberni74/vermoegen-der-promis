import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export type LinkPhrase = {
  slug: string;
  text: string;
};

type CompiledPhrase = LinkPhrase & { re: RegExp };

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function compilePhrases(phrases: LinkPhrase[]): CompiledPhrase[] {
  const unique = new Map<string, LinkPhrase>();
  for (const phrase of phrases) {
    const text = phrase.text.trim();
    if (text.length < 4) continue;
    unique.set(`${phrase.slug}::${text.toLowerCase()}`, { ...phrase, text });
  }
  return [...unique.values()]
    .sort((a, b) => b.text.length - a.text.length)
    .map((phrase) => ({
      ...phrase,
      re: new RegExp(
        `(^|[^\\p{L}\\p{N}])(${escapeRegExp(phrase.text)})(?=$|[^\\p{L}\\p{N}])`,
        "u",
      ),
    }));
}

function linkPlain(
  text: string,
  phrases: CompiledPhrase[],
  used: Set<string>,
): string {
  let rest = text;
  let out = "";
  while (rest.length > 0) {
    let best: { start: number; end: number; slug: string } | null = null;
    for (const phrase of phrases) {
      if (used.has(phrase.slug)) continue;
      const match = phrase.re.exec(rest);
      if (!match?.[2]) continue;
      const start = match.index + match[1].length;
      const end = start + match[2].length;
      if (
        !best ||
        start < best.start ||
        (start === best.start && end - start > best.end - best.start)
      ) {
        best = { start, end, slug: phrase.slug };
      }
    }
    if (!best) {
      out += rest;
      break;
    }
    out += rest.slice(0, best.start);
    out += `<a href="/vermoegen/${best.slug}">${rest.slice(best.start, best.end)}</a>`;
    used.add(best.slug);
    rest = rest.slice(best.end);
  }
  return out;
}

function autolinkHtml(html: string, phrases: CompiledPhrase[]): string {
  const used = new Set<string>();
  const parts = html.split(/(<[^>]+>)/g);
  let skip = 0;
  return parts
    .map((part) => {
      if (part.startsWith("<")) {
        if (/^<(h[1-6]|a|code|pre)\b/i.test(part)) skip += 1;
        if (/^<\/(h[1-6]|a|code|pre)>/i.test(part)) skip = Math.max(0, skip - 1);
        return part;
      }
      if (skip > 0 || part.length === 0) return part;
      return linkPlain(part, phrases, used);
    })
    .join("");
}

function externalizeLinks(html: string): string {
  return html.replace(
    /<a href="(https?:\/\/[^"]+)"/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer"',
  );
}

function wrapTables(html: string): string {
  return html
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, "</table></div>");
}

export function renderMarkdown(markdown: string, phrases: LinkPhrase[]): string {
  const body = markdown.replace(/^#\s+[^\n]+\n+/, "");
  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .processSync(body);
  return wrapTables(externalizeLinks(autolinkHtml(String(file), compilePhrases(phrases))));
}

export function firstBoldLead(markdown: string): string {
  const match = markdown.match(/\*\*([\s\S]+?)\*\*/);
  if (!match) return "";
  return match[1].replace(/\s+/g, " ").trim();
}

export function firstHeading(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? "";
}
