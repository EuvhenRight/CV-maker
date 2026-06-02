import type { Metadata } from "next";
import { Poppins, Noto_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cybersoek CV — Maak je CV in 5 minuten",
  description:
    "Kies een recruiter-goedgekeurd template, vul je gegevens in en download een professionele PDF. Inclusief foto. Geen account nodig.",
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
      <body className="min-h-full bg-[#F0EFEA] text-[#1A1919]">{children}</body>
    </html>
  );
}
