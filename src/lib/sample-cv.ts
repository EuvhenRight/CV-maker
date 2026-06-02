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
    accentColor: "#4f46e5",
  };
}

export function makeSampleCV(): CV {
  return {
    personal: {
      fullName: "Alex Morgan",
      title: "Senior Product Designer",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 123-4567",
      location: "Amsterdam, NL",
      website: "alexmorgan.design",
      linkedin: "linkedin.com/in/alexmorgan",
    },
    summary:
      "Product designer with 7+ years building consumer and B2B SaaS. Led design systems for two Series-B startups, shipped 30+ features end-to-end, and partner closely with engineering and PM to ship measurable outcomes.",
    experience: [
      {
        id: "exp1",
        company: "Northwind Labs",
        role: "Senior Product Designer",
        location: "Amsterdam, NL",
        startDate: "Jan 2023",
        endDate: "",
        current: true,
        bullets: [
          "Led redesign of core dashboard used by 40k+ weekly active users, lifting task-completion rate by 28%.",
          "Owned design system across 4 squads; reduced design–dev handoff time by ~35%.",
          "Mentored 3 mid-level designers via weekly crits and pairing sessions.",
        ],
      },
      {
        id: "exp2",
        company: "Lumen SaaS",
        role: "Product Designer",
        location: "Remote",
        startDate: "Jun 2020",
        endDate: "Dec 2022",
        current: false,
        bullets: [
          "Shipped onboarding flow that increased activation 18% and reduced support tickets 22%.",
          "Ran 30+ moderated user interviews to validate pricing redesign.",
        ],
      },
    ],
    education: [
      {
        id: "edu1",
        school: "Delft University of Technology",
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
        category: "Design",
        items: "Figma, Design systems, Prototyping, User research, Accessibility",
      },
      {
        id: "sk2",
        category: "Collaboration",
        items: "Cross-functional leadership, Mentoring, Workshop facilitation",
      },
    ],
    projects: [
      {
        id: "pr1",
        name: "Open Design Tokens",
        link: "github.com/alex/odt",
        description:
          "Open-source toolkit converting Figma variables to multi-platform design tokens. 1.2k stars.",
        bullets: [],
      },
    ],
    languages: [
      { id: "ln1", name: "English", level: "Native" },
      { id: "ln2", name: "Dutch", level: "Professional" },
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
    template: "minimal",
    accentColor: "#4f46e5",
  };
}
