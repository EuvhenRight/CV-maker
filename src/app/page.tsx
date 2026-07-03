import type { Metadata } from "next";
import HomePage from "./HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  breadcrumbSchema,
  faqSchema,
  softwareApplicationSchema,
  HOME_FAQ_NL,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gratis CV maken in 5 minuten — ATS-vriendelijke templates",
  description:
    "Maak online een professioneel CV met 14 gratis templates. ATS-vriendelijk, met of zonder foto, downloadbaar als A4-PDF. Geen account, geen paywall. Ook Engelstalig.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `Gratis CV maken in 5 minuten — ${SITE_NAME}`,
    description:
      "14 recruiter-vriendelijke templates. ATS-proof. Nederlandstalig en Engelstalig. Geen account nodig. Download direct als PDF.",
    url: SITE_URL,
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          breadcrumbSchema([{ name: "Home", url: SITE_URL }]),
          faqSchema(HOME_FAQ_NL),
        ]}
      />
      <HomePage />
    </>
  );
}
