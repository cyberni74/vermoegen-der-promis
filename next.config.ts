import type { NextConfig } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

type ManifestAliases = {
  slugAliases?: Record<string, string>;
};

const manifest = JSON.parse(
  readFileSync(path.join(process.cwd(), "import-manifest.json"), "utf8"),
) as ManifestAliases;

const aliasRedirects = Object.entries(manifest.slugAliases ?? {}).map(
  ([alias, canonical]) => ({
    source: `/vermoegen/${alias}`,
    destination: `/vermoegen/${canonical}`,
    permanent: true,
  }),
);

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  async redirects() {
    return aliasRedirects;
  },
};

export default nextConfig;
