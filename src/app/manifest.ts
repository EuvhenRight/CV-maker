import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Gratis CV maken`,
    short_name: SITE_NAME,
    description:
      "Gratis, ATS-vriendelijke CV-maker voor werkzoekenden in Nederland.",
    start_url: "/",
    display: "standalone",
    background_color: "#F0EFEA",
    theme_color: "#A3CBA9",
    lang: "nl-NL",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    categories: ["productivity", "business", "utilities"],
  };
}
