import type { Metadata } from "next";
import { AnalyticsClient } from "./AnalyticsClient";

export const metadata: Metadata = {
  title: "Analytics — MaakMijnCV",
  description: "Internal analytics dashboard.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": 0,
      "max-image-preview": "none",
    },
  },
};

export default function AnalyticsPage() {
  return <AnalyticsClient />;
}
