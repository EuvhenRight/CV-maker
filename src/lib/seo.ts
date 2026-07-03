import type { Metadata } from "next";

/**
 * SEO invariants for MaakMijnCV.
 * Change SITE_URL when a custom domain (e.g. maakmijncv.nl) is wired up.
 * NEXT_PUBLIC_SITE_URL overrides at build time.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cv-maker-red-sigma.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "MaakMijnCV";
export const SITE_TAGLINE_NL = "Gratis CV maken in 5 minuten";
export const SITE_TAGLINE_EN = "Free CV builder in 5 minutes";

export const DEFAULT_LOCALE = "nl_NL";
export const ALT_LOCALES = ["en_US"];

export const AUTHOR_NAME = "Yevhen Uhnivenko";
export const AUTHOR_URL = "https://github.com/EuvhenRight";
export const PARTNER_NAME = "Cybersoek";
export const PARTNER_URL = "https://cybersoek.nl";

/**
 * Nederlandse core keyword set, informed by NL-market intent for CV builders.
 * Kept as a static list because Metadata.keywords is descriptive, not a ranking signal —
 * used mainly for internal linking targets and internal audit surfacing.
 */
export const CORE_KEYWORDS_NL = [
  "CV maken",
  "gratis CV maker",
  "CV maken online",
  "CV voorbeeld",
  "CV template",
  "CV bouwen",
  "ATS CV",
  "sollicitatiebrief maken",
  "CV downloaden PDF",
  "CV maker Nederland",
  "curriculum vitae voorbeeld",
];

export const CORE_KEYWORDS_EN = [
  "free CV builder",
  "resume builder Netherlands",
  "ATS friendly CV",
  "CV template Netherlands",
  "cover letter builder",
  "CV in Dutch",
];

/**
 * Base metadata shared across every page. Individual pages spread this
 * and override title/description/canonical.
 */
export const BASE_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
  category: "Career Tools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [...CORE_KEYWORDS_NL, ...CORE_KEYWORDS_EN],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: DEFAULT_LOCALE,
    alternateLocale: ALT_LOCALES,
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE_NL}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE_NL}`,
    description:
      "Kies een recruiter-goedgekeurd template, vul je gegevens in en download een professionele PDF. Gratis, geen account.",
    images: ["/twitter-image"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

/**
 * JSON-LD generators.
 * Each returns a plain object suitable for <script type="application/ld+json">.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    sameAs: [AUTHOR_URL, PARTNER_URL],
    founder: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
    },
    description:
      "MaakMijnCV is een gratis ATS-vriendelijke CV- en sollicitatiebrief-generator voor werkzoekenden in Nederland.",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["nl-NL", "en"],
    publisher: { "@id": `${SITE_URL}#organization` },
    description:
      "Gratis CV maker met 14 recruiter-vriendelijke templates. Nederlandstalig, geen account, geen paywall.",
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${SITE_URL}#app`,
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "ResumeBuilder",
    operatingSystem: "Any (browser)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    inLanguage: ["nl-NL", "en"],
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "14 CV templates (10 industry, 4 classic ATS)",
      "Live preview",
      "Dutch and English UI",
      "Client-side PDF export (A4)",
      "Cover letter builder",
      "No account required",
      "Data stays in the browser",
    ],
    creator: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
    },
    publisher: { "@id": `${SITE_URL}#organization` },
    audience: {
      "@type": "Audience",
      audienceType: "Jobseekers in the Netherlands",
      geographicArea: {
        "@type": "Country",
        name: "Netherlands",
      },
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Home page FAQ — targets Dutch AI Overview + People Also Ask queries.
 * These questions were selected against real NL SERP feature intent for
 * "CV maken", "gratis CV", "ATS CV", "sollicitatiebrief".
 */
export const HOME_FAQ_NL = [
  {
    question: "Is MaakMijnCV echt gratis?",
    answer:
      "Ja. MaakMijnCV is volledig gratis, zonder account, zonder paywall en zonder advertenties. Je downloadt je CV als PDF zonder ergens voor te betalen.",
  },
  {
    question: "Zijn de templates ATS-vriendelijk?",
    answer:
      "Ja. Alle 14 templates gebruiken een semantische HTML-structuur die door Applicant Tracking Systems (ATS) correct wordt gelezen. Vier klassieke templates zijn zonder foto — extra veilig voor tech-recruiters en gemeentes.",
  },
  {
    question: "Waar wordt mijn CV opgeslagen?",
    answer:
      "Uitsluitend in je eigen browser (localStorage). Je gegevens worden nooit naar een server verstuurd. Na 60 minuten inactiviteit worden ze automatisch gewist — veilig op gedeelde computers.",
  },
  {
    question: "Kan ik mijn CV downloaden als PDF?",
    answer:
      "Ja. Elke template exporteert direct naar een A4-PDF via je browser, exact zoals in het voorbeeld. Je kunt ook 'Printen' kiezen en 'Opslaan als PDF' in het print-dialoogvenster.",
  },
  {
    question: "Moet ik een foto op mijn CV zetten?",
    answer:
      "Niet verplicht. In 2026 laten veel Nederlandse werkgevers — vooral in tech, bij gemeentes en internationale bedrijven — de foto weg om discriminatie te voorkomen. MaakMijnCV heeft daarom 4 klassieke templates zonder foto en 10 branche-templates met foto.",
  },
  {
    question: "Kan ik ook een sollicitatiebrief maken?",
    answer:
      "Ja. MaakMijnCV bevat een ingebouwde sollicitatiebrief-editor met sjablonen per beroep. Je downloadt CV en brief als losse PDF's of samen.",
  },
];
