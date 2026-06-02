import { ALL_SECTIONS, type CV } from "./cv-types";

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
    projects: [],
    languages: [],
    certifications: [],
    sectionOrder: [...ALL_SECTIONS],
    template: "minimal",
    accentColor: "#A3CBA9",
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
      "Productontwerper met 7+ jaar ervaring in consumenten- en B2B SaaS. Bouwde design systems bij twee Series-B startups, leverde 30+ features op en werk nauw samen met engineering en product om meetbare resultaten te behalen.",
    experience: [
      {
        id: "exp1",
        company: "Northwind Labs",
        role: "Senior Productontwerper",
        location: "Amsterdam, NL",
        startDate: "Jan 2023",
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
        endDate: "Dec 2022",
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
      {
        id: "sk1",
        category: "Ontwerp",
        items:
          "Figma, Design systems, Prototyping, Gebruikersonderzoek, Toegankelijkheid",
      },
      {
        id: "sk2",
        category: "Samenwerking",
        items:
          "Cross-functioneel leiderschap, Mentoring, Workshop-facilitatie",
      },
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
      { id: "ln1", name: "Nederlands", level: "Moedertaal" },
      { id: "ln2", name: "Engels", level: "Vloeiend" },
    ],
    certifications: [
      {
        id: "ct1",
        name: "Nielsen Norman UX Master",
        issuer: "NN/g",
        date: "2022",
        link: "",
      },
    ],
    sectionOrder: [...ALL_SECTIONS],
    template: "tech",
    accentColor: "#A3CBA9",
  };
}
