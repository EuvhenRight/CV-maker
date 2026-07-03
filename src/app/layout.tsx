import type { Metadata, Viewport } from "next";
import { Poppins, Noto_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n";
import {
  BASE_METADATA,
  SITE_NAME,
  SITE_TAGLINE_NL,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE_NL}`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Gratis CV maker met 14 recruiter-goedgekeurde templates. Vul je gegevens in, voeg een foto toe en download een ATS-vriendelijke PDF. Geen account, geen paywall, gegevens blijven op je eigen apparaat.",
  verification: {
    // Fill in when you connect Google Search Console / Bing Webmaster Tools.
    // google: "your-google-site-verification-token",
    // other: { "msvalidate.01": "your-bing-token" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F0EFEA" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1919" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${poppins.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F0EFEA] text-[#1A1919]">
        <LocaleProvider>{children}</LocaleProvider>
        <Analytics />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
