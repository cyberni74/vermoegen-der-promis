import Image from "next/image";
import type { ArticleImage } from "@/lib/articles";

export function ArticleFigure({
  image,
  priority = false,
  sizes,
}: {
  image: ArticleImage;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <figure>
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
        {image.illustrative ? (
          <span className="absolute left-3 top-3 bg-ink px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
            Symbolbild
          </span>
        ) : null}
      </div>
      <figcaption className="mt-2 space-y-1 text-sm leading-5 text-muted">
        <span className="block">{image.caption}</span>
        {image.credit || image.license || image.sourceUrl ? (
          <span className="block text-xs leading-5">
            {image.credit}
            {image.license ? ` · ${image.license}` : ""}
            {image.sourceUrl ? (
              <>
                {" · "}
                <a
                  href={image.sourceUrl}
                  className="underline decoration-line underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quelle
                </a>
              </>
            ) : null}
            {image.licenseUrl ? (
              <>
                {" · "}
                <a
                  href={image.licenseUrl}
                  className="underline decoration-line underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lizenz
                </a>
              </>
            ) : null}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
