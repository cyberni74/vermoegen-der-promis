# Vermögen der Promis

Deutschsprachiges SEO-Magazin über geschätzte Promi-Vermögen. Next.js (App Router), TypeScript, Tailwind. Ziel: Vercel, ohne Auth und ohne Secrets.

## Routen

- `/` Startseite
- `/vermoegen` Artikelübersicht
- `/vermoegen/[slug]` Artikel, statisch erzeugt
- `/kategorie/[slug]` Influencer, Unternehmer, Musiker, Sport, Schauspieler, Politik
- `/ueber-uns`, `/impressum`, `/datenschutz`
- `/sitemap.xml`, `/robots.txt`

Redo / René Dost liegt unter `/vermoegen/rene-dost`. `/vermoegen/redo` und `/vermoegen/redo-rene-dost` leiten dorthin um.

## Inhalt hinzufügen

1. Markdown nach `content/articles/` legen. Der Slug entsteht aus dem Dateinamen: Endungen `-vermoegen-2026`, `-vermoegen` und `-2026` fallen weg. `redo-vermoegen-2026.md` wird zu `rene-dost`.
2. Optional Frontmatter: `slug`, `category`, `estimate`, `person`, `alternateNames`, `illustrativeOnly`, `related`.
3. Bilder nach `public/images/{slug}/`. WebP wird über `next/image` ausgeliefert. Dateien mit `illustrative` im Namen sind Symbolbilder und werden nie als Porträt beschriftet.
4. `import-manifest.json` führt die Artikel (Heldenbild, Kategorie, Schätzung, illustrative-Flags). Korrekturen für Symbolbild-Helden und Bildnachweise liegen unter `content/catalog/`. Ein JSON-Fence unter `FAQPage JSON-LD` wird als FAQPage-Structured-Data ausgegeben und nicht als Codeblock gezeigt.

Vermögenszahlen nur übernehmen, wenn sie im Artikel stehen. Die Schätzungs-Zeile bleibt sichtbar.

## Deploy

```bash
npm install
npm run build
```

Optional `NEXT_PUBLIC_SITE_URL` setzen (kanonische URL, ohne Slash am Ende). Auf Vercel greifen sonst `VERCEL_PROJECT_PRODUCTION_URL` bzw. `VERCEL_URL`. Keine Passwortsperre, keine Umgebungs-Secrets nötig.

Impressum und Datenschutz sind Stubs: Anbieterdaten vor dem öffentlichen Livegang eintragen.
