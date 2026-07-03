import type { Metadata } from "next";
import { Builder } from "@/components/builder/Builder";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  breadcrumbSchema,
  softwareApplicationSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "CV editor — bewerk je CV met live voorbeeld",
  description:
    "Vul je CV in met live voorbeeld en directe PDF-export. Werkt in je browser, geen account. Kies uit 14 templates, met of zonder foto.",
  alternates: {
    canonical: "/builder",
  },
  openGraph: {
    title: "CV editor — MaakMijnCV",
    description:
      "Vul je CV in met live voorbeeld en download direct als PDF. Geen account nodig.",
    url: `${SITE_URL}/builder`,
    type: "website",
  },
  // Editor is a working area — no need for Google to spend crawl budget on it,
  // but keep it indexable since users may bookmark it.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function BuilderPage() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Editor", url: `${SITE_URL}/builder` },
          ]),
        ]}
      />
      <Builder />
    </>
  );
}
