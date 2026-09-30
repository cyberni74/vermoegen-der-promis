export type ImageCredit = {
  credit: string;
  license?: string;
  licenseUrl?: string;
  sourceUrl?: string;
};

export type PersonProfile = {
  name: string;
  alternateNames?: string[];
};

/** Public names used for Person schema, keywords, and internal links. */
export const PEOPLE: Record<string, PersonProfile> = {
  "axel-schulz": { name: "Axel Schulz" },
  "bibis-beautypalace": {
    name: "Bianca Heinicke",
    alternateNames: ["Bibi", "BibisBeautyPalace"],
  },
  "elevator-boys": { name: "Elevator Boys" },
  "frau-gretel": { name: "Emily Gretel", alternateNames: ["Frau Gretel"] },
  frenzy: { name: "Frenzy", alternateNames: ["Franziska Strnad"] },
  gronkh: { name: "Erik Range", alternateNames: ["Gronkh"] },
  "hati-suarez": { name: "Hati Suárez", alternateNames: ["Hati Suarez"] },
  "herr-anwalt": { name: "Tim Hendrik Walter", alternateNames: ["Herr Anwalt"] },
  "julia-beautx": { name: "Julia Willecke", alternateNames: ["Julia Beautx"] },
  "katja-krasavice": { name: "Katja Krasavice", alternateNames: ["Katrin Vogelová"] },
  knossi: { name: "Jens Knossalla", alternateNames: ["Knossi"] },
  laserluca: { name: "Luca Tilo Scharpenberg", alternateNames: ["Laserluca"] },
  "mike-singer": { name: "Mike Singer" },
  "montana-black": {
    name: "Marcel Eris",
    alternateNames: ["MontanaBlack", "Montana Black"],
  },
  noelgoescrazy: { name: "Noel Robinson", alternateNames: ["Noelgoescrazy"] },
  "pamela-reif": { name: "Pamela Reif" },
  papaplatte: { name: "Kevin Teller", alternateNames: ["Papaplatte"] },
  "rene-dost": { name: "René Dost", alternateNames: ["Redo", "Rene Dost"] },
  rezo: { name: "Rezo" },
  trymacs: { name: "Maximilian Stemmler", alternateNames: ["Trymacs"] },
  "younes-zarou": { name: "Younes Zarou" },
  "cond-sty": {
    name: "Christoph Brückner",
    alternateNames: ["Cond Sty", "Condsty", "Condor"],
  },
  kingchris: { name: "KingChris", alternateNames: ["itskingchris"] },
  "nic-kaufmann": { name: "Nic Kaufmann" },
  "dagi-bee": { name: "Dagmar Kazakov", alternateNames: ["Dagi Bee"] },
  "nader-el-jindaoui": {
    name: "Nader El-Jindaoui",
    alternateNames: ["Nader Jindaoui"],
  },
  "lena-mantler": { name: "Lena Mantler", alternateNames: ["Lisa und Lena", "Lisa & Lena"] },
  "melina-sophie": { name: "Melina Sophie Baumann", alternateNames: ["Melina Sophie"] },
  "sophia-thiel": { name: "Sophia Thiel" },
  inscope21: {
    name: "Nico Lazaridis",
    alternateNames: ["Inscope21", "Nicolas Lazaridis"],
  },
  unsympathischtv: {
    name: "Jan-Sascha Hellinger",
    alternateNames: ["UnsympathischTV", "Sascha Hellinger"],
  },
  iblali: { name: "Viktor Roth", alternateNames: ["IBlali"] },
  handofblood: { name: "Max Knabe", alternateNames: ["HandOfBlood"] },
  rewinside: { name: "Sebastian Meyer", alternateNames: ["Rewinside"] },
  domtendo: { name: "Dominik Neumayer", alternateNames: ["Domtendo"] },
  viktoriasarina: { name: "ViktoriaSarina" },
};

export const RELATED: Record<string, string[]> = {
  "younes-zarou": ["noelgoescrazy", "montana-black", "cond-sty", "kingchris"],
  noelgoescrazy: ["younes-zarou", "montana-black", "cond-sty", "kingchris"],
  papaplatte: ["trymacs", "knossi", "montana-black", "gronkh"],
  trymacs: ["papaplatte", "knossi", "montana-black", "gronkh"],
  knossi: ["papaplatte", "trymacs", "montana-black", "gronkh"],
  "pamela-reif": ["bibis-beautypalace", "julia-beautx", "dagi-bee", "katja-krasavice"],
  "herr-anwalt": ["younes-zarou", "frau-gretel", "rezo", "nader-el-jindaoui"],
  "julia-beautx": ["bibis-beautypalace", "pamela-reif", "dagi-bee", "elevator-boys"],
  "bibis-beautypalace": ["julia-beautx", "pamela-reif", "dagi-bee", "elevator-boys"],
  "katja-krasavice": ["mike-singer", "dagi-bee", "pamela-reif", "frenzy"],
  laserluca: ["elevator-boys", "rezo", "frau-gretel", "gronkh"],
  "elevator-boys": ["laserluca", "julia-beautx", "bibis-beautypalace", "nic-kaufmann"],
  gronkh: ["montana-black", "papaplatte", "trymacs", "knossi"],
  rezo: ["laserluca", "frau-gretel", "herr-anwalt", "gronkh"],
  "frau-gretel": ["herr-anwalt", "rezo", "laserluca", "younes-zarou"],
  "mike-singer": ["katja-krasavice", "axel-schulz", "frenzy"],
  "rene-dost": ["axel-schulz", "hati-suarez", "knossi"],
  frenzy: ["hati-suarez", "katja-krasavice", "mike-singer"],
  "axel-schulz": ["rene-dost", "hati-suarez", "nader-el-jindaoui"],
  "hati-suarez": ["frenzy", "axel-schulz", "rene-dost"],
  "montana-black": ["papaplatte", "trymacs", "knossi", "younes-zarou"],
  "cond-sty": ["younes-zarou", "noelgoescrazy", "kingchris", "nic-kaufmann"],
  kingchris: ["younes-zarou", "noelgoescrazy", "cond-sty", "nic-kaufmann"],
  "nic-kaufmann": ["younes-zarou", "kingchris", "elevator-boys", "cond-sty"],
  "dagi-bee": ["bibis-beautypalace", "julia-beautx", "pamela-reif"],
  "nader-el-jindaoui": ["montana-black", "herr-anwalt", "younes-zarou"],
  "lena-mantler": ["noelgoescrazy", "younes-zarou", "elevator-boys", "kingchris"],
  "melina-sophie": ["dagi-bee", "julia-beautx", "bibis-beautypalace", "viktoriasarina"],
  "sophia-thiel": ["pamela-reif", "inscope21", "dagi-bee"],
  inscope21: ["pamela-reif", "sophia-thiel", "montana-black", "handofblood"],
  unsympathischtv: ["rezo", "laserluca", "iblali", "gronkh"],
  iblali: ["unsympathischtv", "rezo", "laserluca", "handofblood"],
  handofblood: ["montana-black", "papaplatte", "gronkh", "rewinside"],
  rewinside: ["gronkh", "handofblood", "rezo", "montana-black"],
  domtendo: ["gronkh", "papaplatte", "handofblood", "rewinside"],
  viktoriasarina: ["julia-beautx", "dagi-bee", "melina-sophie", "bibis-beautypalace"],
};

const CC_BY = "https://creativecommons.org/licenses/by/4.0/";
const CC_BY_2 = "https://creativecommons.org/licenses/by/2.0/";
const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const CC_BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const CC_BY_3 = "https://creativecommons.org/licenses/by/3.0/";
const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";

/** Attribution for files we actually publish. Key: `${slug}/${filename}`. */
export const IMAGE_CREDITS: Record<string, ImageCredit> = {
  "montana-black/montanablack-portrait-2014.jpg": {
    credit: "Schattke GmbH & Co KG",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:MontanaBlack.jpg",
  },
  "montana-black/streaming-setup-gaming-desk.jpg": {
    credit: "Unsplash License. Generisches Streaming-Setup, nicht der Raum von Marcel Eris.",
  },
  "montana-black/energy-drink-illustrative-happy-life.jpg": {
    credit: "Shahin Mren, Pexels License. Symbolbild, kein Gönrgy-Produkt.",
    sourceUrl: "https://www.pexels.com/photo/dynamic-energy-drink-can-on-golden-background-28764302/",
  },
  "montana-black/luxury-villa-pool.jpg": {
    credit: "Unsplash License. Redaktionelles Bild, kein bestätigtes Objekt.",
  },
  "montana-black/luxury-sports-car.jpg": {
    credit: "Unsplash License. Redaktionelles Bild, kein bestätigtes Fahrzeug.",
  },
  "mike-singer/hero-mike-singer.jpg": {
    credit: "Warner Music Group Germany",
    license: "CC BY-SA 3.0",
    licenseUrl: CC_BY_SA_3,
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:200623_MIKE_SINGER_DIGI_SHOTS_BY_ROBERT_WUNSCH_0027.jpg",
  },
  "mike-singer/mid-01-1live-krone.jpg": {
    credit: "Raimond Spekking",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:1LIVE_Krone_2016_-_1700_-_Roter_Teppich_-_Mike_Singer-5631.jpg",
  },
  "mike-singer/mid-02-sing.jpg": {
    credit: "9EkieraM1",
    license: "CC BY-SA 3.0",
    licenseUrl: CC_BY_SA_3,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sing_Mike_Singer.jpg",
  },
  "rene-dost/hero-rene-dost.jpg": {
    credit: "Vocoom",
    license: "CC0",
    licenseUrl: CC0,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ren%C3%A9_Dost,_M%C3%A4rz_2026.jpg",
  },
  "rene-dost/mid-01-dost-xxl-ketzin.jpg": {
    credit: "Vocoom",
    license: "CC0",
    licenseUrl: CC0,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Dost_XXL_Ketzin,_2008.jpg",
  },
  "rene-dost/mid-02-first-snack-van.jpg": {
    credit: "Vocoom",
    license: "CC BY 4.0",
    licenseUrl: CC_BY,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Erster_Imbisswagen.jpg",
  },
  "frenzy/hero-illustrative-female-singer.jpg": {
    credit: "JustSwanzy. Symbolbild, nicht Frenzy.",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Female_singer_1.jpg",
  },
  "frenzy/mid-01-illustrative-singer-stage.jpg": {
    credit: "Yanqi Ding. Symbolbild, nicht Frenzy.",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Singer_On_Stage_(51831625062).jpg",
  },
  "frenzy/mid-02-illustrative-cabaret-singer.jpg": {
    credit: "JIP. Symbolbild, nicht Frenzy.",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Female_singer_at_Paris_Cabaret_2016.jpg",
  },
  "axel-schulz/hero-axel-schulz.jpg": {
    credit: "CMC Munich GmbH",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Axel_Schulz_am_Spendentelefon_der_27._Jos%C3%A9_Carreras_Gala_in_Leipzig.jpg",
  },
  "axel-schulz/mid-01-boxing-1989.jpg": {
    credit: "Klaus Oberst / Bundesarchiv",
    license: "CC BY-SA 3.0 DE",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-1989-0805-008,_Igor_Schischkin,_Axel_Schulz.jpg",
  },
  "axel-schulz/mid-02-axel-schulz-kuttner.jpg": {
    credit: "Kuechenmeister33",
    license: "CC0",
    licenseUrl: CC0,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Daniel_K%C3%BCttner,_Axel_Schulz.jpg",
  },
  "hati-suarez/hero-hati-suarez.jpg": {
    credit: "Sven Mandel",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hati_Suarez_-_2025284_141412_2025-10-11_Fame_Fighting_3_-_Sven_-_1D_X_MK_II_-_0205_-_AK8I2443.jpg",
  },
  "hati-suarez/mid-01-hati-suarez-red-dress.jpg": {
    credit: "Sven Mandel",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hati_Suarez_-_2024314164745_2024-11-09_Fame_Fighting_2_-_Sven_-_1D_X_MK_II_-_00603_-_B70I2260.jpg",
  },
  "hati-suarez/mid-02-hati-suarez-flex.jpg": {
    credit: "Sven Mandel",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hati_Suarez_-_2024313183103_2024-11-08_Fame_Fighting_2_-_Sven_-_1D_X_MK_II_-_0671_-_AK8I3724.jpg",
  },
  "papaplatte/papaplatte-portrait.jpg": {
    credit: "Lattensep / Papaplatte",
    license: "CC BY 3.0",
    licenseUrl: CC_BY_3,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Papaplatte_reaction.jpg",
  },
  "trymacs/trymacs-portrait.png": {
    credit: "HandOfBlood / Rewinside",
    license: "CC BY 3.0",
    licenseUrl: CC_BY_3,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Trymacs.png",
  },
  "knossi/knossi-portrait-2012.jpg": {
    credit: "MontesinoVienna. Historisches Foto von 2012.",
    license: "CC BY 3.0",
    licenseUrl: CC_BY_3,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jens_Knossalla_2012.jpg",
  },
  "lena-mantler/lisa-lena-sing-portrait.jpg": {
    credit: "9EkieraM1",
    license: "CC BY-SA 3.0",
    licenseUrl: CC_BY_SA_3,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sing_Lisa_%26_Lena_(cropped).jpg",
  },
  "melina-sophie/melina-sophie-sing-portrait.jpg": {
    credit: "9EkieraM1",
    license: "CC BY-SA 3.0",
    licenseUrl: CC_BY_SA_3,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sing_Melina_Sophie_Baumann_(1).jpg",
  },
  "sophia-thiel/sophia-thiel-portrait.jpg": {
    credit: "Anja Zeidler",
    license: "CC BY 3.0",
    licenseUrl: CC_BY_3,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sophia_Thiel.jpg",
  },
  "inscope21/inscope21-2016-portrait.jpg": {
    credit: "9EkieraM1",
    license: "CC BY-SA 3.0",
    licenseUrl: CC_BY_SA_3,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Inscope21_2016.jpg",
  },
  "inscope21/inscope21-sing-portrait.jpg": {
    credit: "9EkieraM1",
    license: "CC BY-SA 3.0",
    licenseUrl: CC_BY_SA_3,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sing_Nicolas_Lazaridis_(Inscope21).jpg",
  },
  "unsympathischtv/sascha-hellinger-2019.png": {
    credit: "Giulian Ruhnau",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jan-Sascha_Hellinger_2019.png",
  },
  "iblali/iblali-portrait.jpg": {
    credit: "Mediakraft Networks",
    license: "CC BY 3.0",
    licenseUrl: CC_BY_3,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:IBlali.JPG",
  },
  "handofblood/handofblood-portrait.jpg": {
    credit: "Tomasz Niemiec",
    license: "CC BY 2.0",
    licenseUrl: CC_BY_2,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:HandOfBlood_(36738811692).jpg",
  },
};

export const CATEGORY_COPY: Record<string, string> = {
  Influencer:
    "TikTok, Twitch und YouTube: wie deutschsprachige Creator Reichweite in Unternehmen übersetzen.",
  Unternehmer:
    "Gastronomie, Marken, Beteiligungen – Substanz, die vor der Kamera sichtbar wird und dahinter bilanzieren müsste.",
  Musiker:
    "Charts, Tourneen, Rechte und Nebenmarken. Streaming-Einnahmen sind selten das ganze Vermögen.",
  Sport:
    "Gagen, Fernsehen und das, was nach der aktiven Karriere als Marke weiterläuft.",
  Schauspieler:
    "Film, Streaming und Synchron. Porträts erscheinen, sobald die Texte recherchiert sind.",
  Politik:
    "Öffentliche Ämter und privates Vermögen. Weitere Porträts sind in Arbeit.",
};

/** Packs that must never be presented as a portrait of the person. */
export const FORCE_ILLUSTRATIVE_SLUGS = new Set([
  "frenzy",
  "cond-sty",
  "kingchris",
  "rewinside",
  "domtendo",
  "viktoriasarina",
]);
