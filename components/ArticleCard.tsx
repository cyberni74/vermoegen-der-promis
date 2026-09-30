import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";

export function ArticleCard({
  article,
  priority = false,
  large = false,
}: {
  article: Article;
  priority?: boolean;
  large?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/vermoegen/${article.slug}`} className="flex h-full flex-col">
        <div className={`relative overflow-hidden bg-paper-deep ${large ? "aspect-[16/10]" : "aspect-[3/2]"}`}>
          {article.hero ? (
            <Image
              src={article.hero.src}
              alt={article.hero.alt}
              fill
              priority={priority}
              sizes={large ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(145deg,#1e4638,#8d3b30)]" />
          )}
          {article.hero?.illustrative ? (
            <span className="absolute left-3 top-3 bg-ink px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              Symbolbild
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {article.category}
            <span className="text-muted"> · {article.person}</span>
          </p>
          <h2
            className={`mt-2 font-serif font-semibold tracking-tight text-ink group-hover:text-pine ${
              large ? "text-3xl leading-tight sm:text-4xl" : "text-xl leading-snug"
            }`}
          >
            {article.title}
          </h2>
          {article.estimate ? (
            <p className="mt-3 text-sm text-muted">
              <span className="font-semibold text-gold">Schätzung:</span> {article.estimate}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
