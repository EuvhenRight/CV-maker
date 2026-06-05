import type { Metadata } from "next";
import { AnalyticsClient } from "./AnalyticsClient";

export const metadata: Metadata = {
  title: "Analytics — MaakMijnCV",
  robots: { index: false, follow: false },
};

export default function AnalyticsPage() {
  return <AnalyticsClient />;
}
