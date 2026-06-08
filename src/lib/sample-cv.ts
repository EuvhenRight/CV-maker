import { ALL_SECTIONS, type CoverLetter, type CV } from "./cv-types";

export function makeEmptyCoverLetter(): CoverLetter {
  return {
    recipientCompany: "",
    recipientName: "",
    recipientAddress: "",
    recipientCity: "",
    jobTitle: "",
    vacancyRef: "",
    date: "",
    subject: "",
    opening: "",
    body: "",
    closing: "",
  };
}

export function makeEmptyCV(): CV {
  return {
    personal: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      photo: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    strengths: [],
    projects: [],
    languages: [],
    certifications: [],
    sectionOrder: [...ALL_SECTIONS],
    template: "minimal",
    accentColor: "#A3CBA9",
    coverLetter: makeEmptyCoverLetter(),
  };
}

export function makeSampleCV(): CV {
  return {
    personal: {
      fullName: "Sanne de Vries",
      title: "Senior Productontwerper",
      email: "sanne.devries@example.nl",
      phone: "+31 6 12 34 56 78",
      location: "Amsterdam, NL",
      website: "sannedevries.nl",
      linkedin: "linkedin.com/in/sannedevries",
      photo: "",
    },
    summary:
      "Productontwerper met 8+ jaar ervaring in consumenten- en B2B SaaS. Bouwde design systems bij twee Series-B startups, leverde 30+ features op en werk nauw samen met engineering en product om meetbare resultaten te behalen.",
    experience: [
      {
        id: "exp1",
        company: "Northwind Labs",
        role: "Senior Productontwerper",
        location: "Amsterdam, NL",
        startDate: "Jan 2024",
        endDate: "",
        current: true,
        bullets: [
          "Leidde de redesign van het kerndashboard met 40.000+ wekelijkse gebruikers — taakvoltooiing steeg met 28%.",
          "Verantwoordelijk voor het design system over 4 teams; verkortte design–dev overdracht met ~35%.",
          "Begeleidde 3 mid-level ontwerpers via wekelijkse crits en pairing-sessies.",
        ],
      },
      {
        id: "exp2",
        company: "Lumen SaaS",
        role: "Productontwerper",
        location: "Remote",
        startDate: "Jun 2020",
        endDate: "Dec 2023",
        current: false,
        bullets: [
          "Lanceerde onboarding-flow die activatie met 18% verhoogde en supporttickets met 22% verlaagde.",
          "Voerde 30+ moderated user interviews uit voor de prijsstelling-redesign.",
        ],
      },
    ],
    education: [
      {
        id: "edu1",
        school: "TU Delft",
        degree: "MSc",
        field: "Design for Interaction",
        startDate: "2016",
        endDate: "2018",
        description: "",
      },
    ],
    skills: [
      "leadership",
      "mentoring",
      "communication",
      "problem-solving",
      "project-management",
      "data-analysis",
    ],
    strengths: [
      "responsible",
      "creative",
      "analytical",
      "detail-oriented",
      "goal-oriented",
    ],
    projects: [
      {
        id: "pr1",
        name: "Open Design Tokens",
        link: "github.com/sanne/odt",
        description:
          "Open-source toolkit die Figma-variabelen omzet naar multi-platform design tokens. 1.2k sterren.",
        bullets: [],
      },
    ],
    languages: [
      { id: "ln1", name: "Nederlands", level: "Moedertaal", cefr: "native" },
      { id: "ln2", name: "Engels", level: "C1 — Vergevorderd", cefr: "C1" },
    ],
    certifications: [
      {
        id: "ct1",
        name: "Nielsen Norman UX Master",
        issuer: "NN/g",
        date: "2023",
        link: "",
      },
    ],
    sectionOrder: [...ALL_SECTIONS],
    template: "tech",
    accentColor: "#A3CBA9",
    coverLetter: {
      recipientCompany: "Vector Studio",
      recipientName: "Hiring Team",
      recipientAddress: "Keizersgracht 123",
      recipientCity: "1015 CJ Amsterdam",
      jobTitle: "Senior Productontwerper",
      vacancyRef: "VS-2026-042",
      date: "Amsterdam, 12 juni 2026",
      subject: "Sollicitatie naar de positie Senior Productontwerper",
      opening:
        "Met veel interesse heb ik kennisgenomen van jullie vacature voor Senior Productontwerper. De combinatie van een design-systems-cultuur en focus op meetbare productuitkomsten sluit aan bij wat ik bij Northwind Labs heb opgebouwd.",
      body:
        "In de afgelopen drie jaar leidde ik bij Northwind de redesign van het kerndashboard voor 40.000+ wekelijkse gebruikers, waarmee de taakvoltooiing met 28% steeg. Daarnaast beheerde ik het design system over 4 teams en verkortte de overdracht tussen design en development met circa 35%. Wat me bij Vector Studio aanspreekt, is de directe samenwerking tussen onderzoek en engineering — een werkwijze die ik in mijn huidige rol nu ook actief stimuleer.\n\nMijn ervaring met onboarding-flows bij Lumen SaaS, waar ik de activatie met 18% verhoogde, denk ik aan te kunnen sluiten op de productuitdagingen die jullie beschrijven.",
      closing:
        "Graag licht ik mijn motivatie en aanpak verder toe in een persoonlijk gesprek. Ik ben bereikbaar via sanne.devries@example.nl of +31 6 12 34 56 78.",
    },
  };
}
