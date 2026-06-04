import { ALL_SECTIONS, type CV } from "./cv-types";
import type { Locale } from "./i18n";

export type ProfessionId =
  | "cleaner"
  | "warehouse"
  | "retail"
  | "housekeeper"
  | "kitchen-assistant"
  | "logistics"
  | "plumber"
  | "construction"
  | "admin"
  | "production";

export interface ProfessionMeta {
  id: ProfessionId;
  nameKey: string;
  taglineKey: string;
}

export const PROFESSIONS: ProfessionMeta[] = [
  { id: "cleaner", nameKey: "prof.cleaner.name", taglineKey: "prof.cleaner.tagline" },
  { id: "warehouse", nameKey: "prof.warehouse.name", taglineKey: "prof.warehouse.tagline" },
  { id: "retail", nameKey: "prof.retail.name", taglineKey: "prof.retail.tagline" },
  { id: "housekeeper", nameKey: "prof.housekeeper.name", taglineKey: "prof.housekeeper.tagline" },
  { id: "kitchen-assistant", nameKey: "prof.kitchen.name", taglineKey: "prof.kitchen.tagline" },
  { id: "logistics", nameKey: "prof.logistics.name", taglineKey: "prof.logistics.tagline" },
  { id: "plumber", nameKey: "prof.plumber.name", taglineKey: "prof.plumber.tagline" },
  { id: "construction", nameKey: "prof.construction.name", taglineKey: "prof.construction.tagline" },
  { id: "admin", nameKey: "prof.admin.name", taglineKey: "prof.admin.tagline" },
  { id: "production", nameKey: "prof.production.name", taglineKey: "prof.production.tagline" },
];

type LangText = { nl: string; en: string };
const pick = (lang: Locale, x: LangText) => x[lang];

function baseEmpty(): CV {
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
  };
}

interface BuilderInput {
  title: LangText;
  summary: LangText;
  experience: Array<{
    company: string;
    role: LangText;
    location: string;
    startDate: string;
    endDate: string;
    current?: boolean;
    bullets: LangText[];
  }>;
  education: Array<{
    school: string;
    degree: LangText;
    field: LangText;
    startDate: string;
    endDate: string;
    description?: LangText;
  }>;
  skills: string[];
  strengths: string[];
  languages: Array<{ name: LangText; level: LangText }>;
  certifications?: Array<{
    name: LangText;
    issuer: LangText;
    date: string;
  }>;
  template: CV["template"];
  accentColor: string;
}

function build(lang: Locale, input: BuilderInput): CV {
  const cv = baseEmpty();
  cv.personal.title = pick(lang, input.title);
  cv.summary = pick(lang, input.summary);
  cv.experience = input.experience.map((e, i) => ({
    id: `exp-${i}`,
    company: e.company,
    role: pick(lang, e.role),
    location: e.location,
    startDate: e.startDate,
    endDate: e.endDate,
    current: e.current ?? false,
    bullets: e.bullets.map((b) => pick(lang, b)),
  }));
  cv.education = input.education.map((e, i) => ({
    id: `edu-${i}`,
    school: e.school,
    degree: pick(lang, e.degree),
    field: pick(lang, e.field),
    startDate: e.startDate,
    endDate: e.endDate,
    description: e.description ? pick(lang, e.description) : "",
  }));
  cv.skills = input.skills;
  cv.strengths = input.strengths;
  cv.languages = input.languages.map((l, i) => ({
    id: `ln-${i}`,
    name: pick(lang, l.name),
    level: pick(lang, l.level),
  }));
  cv.certifications = (input.certifications ?? []).map((c, i) => ({
    id: `ct-${i}`,
    name: pick(lang, c.name),
    issuer: pick(lang, c.issuer),
    date: c.date,
    link: "",
  }));
  cv.template = input.template;
  cv.accentColor = input.accentColor;
  return cv;
}

const dutchNative: { name: LangText; level: LangText } = {
  name: { nl: "Nederlands", en: "Dutch" },
  level: { nl: "Moedertaal", en: "Native" },
};
const englishGood: { name: LangText; level: LangText } = {
  name: { nl: "Engels", en: "English" },
  level: { nl: "Goed", en: "Good" },
};
const englishBasic: { name: LangText; level: LangText } = {
  name: { nl: "Engels", en: "English" },
  level: { nl: "Basis", en: "Basic" },
};

// ----------------- Profession content -----------------
// The voice is intentionally varied per profession. Numbers are realistic, not
// inflated. Sentences are sometimes short or run-on the way people actually
// write their own CVs.

function cleaner(lang: Locale): CV {
  return build(lang, {
    title: { nl: "Schoonmaker", en: "Cleaner" },
    summary: {
      nl: "Vijf jaar ervaring met dagelijkse schoonmaak van kantoren en zorglocaties. Sta vroeg op en werk graag in een vast team. Hou van een rustige werkplek en een nette oplevering.",
      en: "Five years of daily cleaning experience in offices and care locations. Early starter, prefer working in a fixed team. Tidy workplace, tidy handover.",
    },
    experience: [
      {
        company: "Hago Nederland",
        role: { nl: "Schoonmaker kantoorpanden", en: "Office cleaner" },
        location: "Amsterdam",
        startDate: "Mrt 2022",
        endDate: "",
        current: true,
        bullets: [
          {
            nl: "Vier kantoorpanden, samen ongeveer 6.000 m². Vaste ronde, vaste sleutelbeheer.",
            en: "Four office buildings, around 6,000 m² in total. Fixed rounds, key holder.",
          },
          {
            nl: "Werk volgens hygiëneprotocol, met extra desinfectie van deurklinken, lichtknoppen en sanitair.",
            en: "Work to the hygiene protocol, extra disinfection on door handles, light switches and sanitary areas.",
          },
          {
            nl: "Contact met de opdrachtgever loopt via mij. Bestellijst voor materiaal beheer ik zelf.",
            en: "Client contact runs through me. I keep the supply order list myself.",
          },
        ],
      },
      {
        company: "CSU",
        role: { nl: "Schoonmaakmedewerker", en: "Cleaning operative" },
        location: "Haarlem",
        startDate: "Jan 2020",
        endDate: "Feb 2022",
        bullets: [
          {
            nl: "Schoonmaak van scholen en een verpleeghuis in wisselende diensten.",
            en: "Cleaning schools and a nursing home across rotating shifts.",
          },
          {
            nl: "Microvezel-methode en af en toe een stoomreiniger voor zware vlekken.",
            en: "Microfibre method, occasional steam cleaner for tougher stains.",
          },
        ],
      },
    ],
    education: [
      {
        school: "ROC Amsterdam",
        degree: { nl: "MBO niveau 2", en: "MBO level 2" },
        field: { nl: "Schoonmaak en hygiëne", en: "Cleaning and hygiene" },
        startDate: "2018",
        endDate: "2020",
      },
    ],
    skills: [
      "attention-to-detail",
      "time-management",
      "inventory-management",
      "scheduling",
      "customer-service",
    ],
    strengths: ["reliable", "punctual", "hardworking", "responsible", "independent"],
    languages: [dutchNative, englishBasic],
    certifications: [
      {
        name: { nl: "VCA Basis", en: "VCA Basic Safety" },
        issuer: { nl: "SSVV", en: "SSVV" },
        date: "2021",
      },
    ],
    template: "housekeeping",
    accentColor: "#7FA689",
  });
}

function warehouse(lang: Locale): CV {
  return build(lang, {
    title: { nl: "Magazijnmedewerker", en: "Warehouse worker" },
    summary: {
      nl: "Vier jaar in het magazijn, vooral orderpicken en inpakken. Werk met scanner en WMS, ben gewend aan ploegendienst. Vriendelijk, geen klagen, op tijd op de werkplek.",
      en: "Four years in the warehouse, mostly picking and packing. Used to scanner, WMS and shift work. Friendly, no fuss, on the floor on time.",
    },
    experience: [
      {
        company: "Bol.com Fulfilment",
        role: { nl: "Orderpicker", en: "Order picker" },
        location: "Waalwijk",
        startDate: "Aug 2022",
        endDate: "",
        current: true,
        bullets: [
          {
            nl: "Gemiddeld 110 orderregels per uur met scanner. Foutpercentage onder de 0,3%.",
            en: "Average 110 order lines per hour with scanner. Error rate under 0.3%.",
          },
          {
            nl: "Rijd EPT en reachtruck, certificaat opnieuw afgegeven in 2024.",
            en: "Drive EPT and reach truck, certification renewed in 2024.",
          },
          {
            nl: "Help de teamleider met inwerken van nieuwe collega's in de eerste twee weken.",
            en: "Help the team lead train new colleagues during their first two weeks.",
          },
        ],
      },
      {
        company: "Manpower (uitzendwerk)",
        role: { nl: "Magazijnmedewerker", en: "Warehouse operative" },
        location: "Tilburg",
        startDate: "Mei 2020",
        endDate: "Jul 2022",
        bullets: [
          {
            nl: "Wisselende opdrachten in retail en e-commerce. Vooral inpakwerk en retouren.",
            en: "Mixed assignments in retail and e-commerce. Mostly packing and returns.",
          },
        ],
      },
    ],
    education: [
      {
        school: "ROC Tilburg",
        degree: { nl: "MBO niveau 2", en: "MBO level 2" },
        field: { nl: "Logistiek medewerker", en: "Logistics operative" },
        startDate: "2018",
        endDate: "2020",
      },
    ],
    skills: [
      "time-management",
      "inventory-management",
      "attention-to-detail",
      "teamwork",
      "troubleshooting",
    ],
    strengths: ["hardworking", "reliable", "stress-resistant", "punctual", "cooperative"],
    languages: [dutchNative, englishGood],
    certifications: [
      {
        name: { nl: "Reachtruck", en: "Reach truck" },
        issuer: { nl: "BMWT", en: "BMWT" },
        date: "2024",
      },
      {
        name: { nl: "Heftruck", en: "Forklift" },
        issuer: { nl: "BMWT", en: "BMWT" },
        date: "2022",
      },
      {
        name: { nl: "VCA Basis", en: "VCA Basic" },
        issuer: { nl: "SSVV", en: "SSVV" },
        date: "2022",
      },
    ],
    template: "delivery",
    accentColor: "#1F2933",
  });
}

function retail(lang: Locale): CV {
  return build(lang, {
    title: { nl: "Verkoopmedewerker", en: "Sales associate" },
    summary: {
      nl: "Werk graag met klanten, zowel op de winkelvloer als aan de kassa. Drie jaar ervaring in supermarkt en mode, bekend met versafdeling, schappen vullen en de drukte op zaterdag.",
      en: "Enjoy customer contact, both on the floor and at the till. Three years between supermarket and fashion: fresh-food section, restocking and busy Saturdays.",
    },
    experience: [
      {
        company: "Albert Heijn",
        role: { nl: "Medewerker versafdeling", en: "Fresh-food assistant" },
        location: "Utrecht",
        startDate: "Sep 2022",
        endDate: "",
        current: true,
        bullets: [
          {
            nl: "Klanten helpen op de versafdeling, schappen vullen en de versheid in de gaten houden.",
            en: "Help customers in the fresh section, restock shelves and check freshness.",
          },
          {
            nl: "Werk volgens HACCP. Stickeren en wegzetten van retouren aan het einde van de dag.",
            en: "Work to HACCP. End-of-day sticker rounds and returns to back-of-store.",
          },
          {
            nl: "Spring bij op de kassa tijdens piek en bij open- en sluitdiensten.",
            en: "Cover till during peak and on open/close shifts.",
          },
        ],
      },
      {
        company: "H&M",
        role: { nl: "Verkoopmedewerker", en: "Sales associate" },
        location: "Utrecht",
        startDate: "Mrt 2021",
        endDate: "Aug 2022",
        bullets: [
          {
            nl: "Klantenservice op de vloer, paskamerbegeleiding en kassa.",
            en: "Floor customer service, fitting-room support, till.",
          },
          {
            nl: "Verantwoordelijk voor een eigen rek: presentatie en aanvullen.",
            en: "Owned a rack: presentation and restock.",
          },
        ],
      },
    ],
    education: [
      {
        school: "Anna van Rijn College",
        degree: { nl: "Havo", en: "Havo (senior general secondary)" },
        field: { nl: "Economie en Maatschappij", en: "Economics and Society" },
        startDate: "2015",
        endDate: "2020",
      },
    ],
    skills: [
      "customer-service",
      "sales",
      "communication",
      "cash-handling",
      "teamwork",
    ],
    strengths: ["friendly", "reliable", "flexible", "positive", "stress-resistant"],
    languages: [dutchNative, englishGood],
    template: "retail",
    accentColor: "#A3CBA9",
  });
}

function housekeeper(lang: Locale): CV {
  return build(lang, {
    title: { nl: "Huishoudelijke hulp", en: "Housekeeper" },
    summary: {
      nl: "Werk al zes jaar in particuliere huishoudens en in de thuiszorg. Discreet, geen geklets, klanten komen thuis in een opgeruimd huis. Eigen vervoer, OV-bekend in en rond Eindhoven.",
      en: "Six years in private homes and home care. Discreet, no chatter, clients come home to a tidy house. Own transport, also familiar with public transport around Eindhoven.",
    },
    experience: [
      {
        company: "Tzorg",
        role: { nl: "Medewerker huishoudelijke ondersteuning", en: "Home care assistant" },
        location: "Eindhoven",
        startDate: "Feb 2021",
        endDate: "",
        current: true,
        bullets: [
          {
            nl: "Wekelijkse rondes bij zes vaste cliënten. Schoonmaken, was en strijk, soms boodschappen.",
            en: "Weekly rounds for six fixed clients. Cleaning, laundry and ironing, sometimes groceries.",
          },
          {
            nl: "Let op signalen bij cliënten en geef het door aan de wijkverpleging als er iets verandert.",
            en: "Watch for changes in clients and pass it on to district nursing when something is off.",
          },
        ],
      },
      {
        company: "Particuliere klanten",
        role: { nl: "Zelfstandig huishoudelijke hulp", en: "Independent housekeeper" },
        location: "Eindhoven",
        startDate: "Jan 2018",
        endDate: "Jan 2021",
        bullets: [
          {
            nl: "Vast werk bij vier gezinnen, samen ongeveer 16 uur per week.",
            en: "Steady work for four families, about 16 hours a week combined.",
          },
        ],
      },
    ],
    education: [
      {
        school: "ROC Eindhoven",
        degree: { nl: "MBO niveau 1", en: "MBO level 1" },
        field: { nl: "Dienstverlening", en: "Service provision" },
        startDate: "2016",
        endDate: "2018",
      },
    ],
    skills: [
      "attention-to-detail",
      "time-management",
      "scheduling",
      "customer-service",
      "inventory-management",
    ],
    strengths: ["reliable", "patient", "empathic", "honest", "responsible"],
    languages: [dutchNative, englishBasic],
    template: "housekeeping",
    accentColor: "#A3CBA9",
  });
}

function kitchenAssistant(lang: Locale): CV {
  return build(lang, {
    title: { nl: "Keukenhulp", en: "Kitchen assistant" },
    summary: {
      nl: "Twee jaar in de keuken bij een restaurant en daarvoor in catering. Snel, stil tijdens de service en sterk in mise en place. Hou niet van geklets aan de pas en wel van een schone werkbank.",
      en: "Two years in a restaurant kitchen and catering before that. Fast, quiet during service, strong at mise en place. Less talk at the pass, more clean bench.",
    },
    experience: [
      {
        company: "Restaurant De Kade",
        role: { nl: "Keukenhulp", en: "Kitchen assistant" },
        location: "Rotterdam",
        startDate: "Apr 2023",
        endDate: "",
        current: true,
        bullets: [
          {
            nl: "Mise en place voor diensten van rond de 80 couverts, onder leiding van de souschef.",
            en: "Mise en place for services of around 80 covers, under the sous-chef.",
          },
          {
            nl: "Afwas en koelingen netjes houden, voorraad bijhouden en op tijd doorgeven wat op raakt.",
            en: "Keep dishwashing and coolers tidy, track stock, flag what is running low.",
          },
        ],
      },
      {
        company: "Vermaat Catering",
        role: { nl: "Cateringmedewerker", en: "Catering associate" },
        location: "Rotterdam",
        startDate: "Sep 2021",
        endDate: "Mrt 2023",
        bullets: [
          {
            nl: "Opbouw, uitserveren en afwas in een bedrijfsrestaurant. Eindcontrole op de keuken voor sluitingstijd.",
            en: "Set-up, serving and dishwashing in a corporate canteen. Final kitchen check before closing.",
          },
        ],
      },
    ],
    education: [
      {
        school: "ROC Rotterdam",
        degree: { nl: "MBO niveau 2", en: "MBO level 2" },
        field: { nl: "Gastheer / Gastvrouw", en: "Hospitality service" },
        startDate: "2019",
        endDate: "2021",
      },
    ],
    skills: [
      "time-management",
      "attention-to-detail",
      "teamwork",
      "customer-service",
      "scheduling",
    ],
    strengths: ["hardworking", "fast-learner", "stress-resistant", "friendly", "punctual"],
    languages: [dutchNative, englishGood],
    certifications: [
      {
        name: { nl: "HACCP", en: "HACCP" },
        issuer: { nl: "SVH", en: "SVH" },
        date: "2022",
      },
    ],
    template: "hospitality",
    accentColor: "#7FA689",
  });
}

function logistics(lang: Locale): CV {
  return build(lang, {
    title: { nl: "Logistiek medewerker", en: "Logistics employee" },
    summary: {
      nl: "Logistiek medewerker in een pakkettendepot, vier jaar ervaring. Werk met scanner, WMS en reachtruck. Sterk in routine, accuraat in de administratie, rustig bij pieken.",
      en: "Logistics employee at a parcel depot, four years in. Comfortable with scanner, WMS and reach truck. Strong on routine, accurate on admin, calm under peak.",
    },
    experience: [
      {
        company: "PostNL",
        role: { nl: "Sorteerder pakkettendepot", en: "Parcel depot sorter" },
        location: "Amersfoort",
        startDate: "Okt 2022",
        endDate: "",
        current: true,
        bullets: [
          {
            nl: "Gemiddeld 1.500 pakketten per dienst sorteren en labelen voor regionale routes.",
            en: "Sort and label around 1,500 parcels per shift for regional routes.",
          },
          {
            nl: "Dag- en nachtdienst, in piekperiodes uitzendkrachten op weg helpen.",
            en: "Day and night shifts. During peak periods I get temp staff up to speed.",
          },
        ],
      },
      {
        company: "DHL Supply Chain",
        role: { nl: "Magazijnmedewerker", en: "Warehouse operative" },
        location: "Beringe",
        startDate: "Jul 2020",
        endDate: "Sep 2022",
        bullets: [
          {
            nl: "Inkomende goederen inboeken en op schade controleren. Overleg met de heftruckchauffeur over de losvolgorde.",
            en: "Book in inbound goods, check for damage. Coordinated with the forklift driver on unload order.",
          },
        ],
      },
    ],
    education: [
      {
        school: "ROC Midden Nederland",
        degree: { nl: "MBO niveau 3", en: "MBO level 3" },
        field: { nl: "Logistiek teamleider", en: "Logistics team leader" },
        startDate: "2017",
        endDate: "2020",
      },
    ],
    skills: [
      "time-management",
      "inventory-management",
      "scheduling",
      "teamwork",
      "data-analysis",
      "troubleshooting",
    ],
    strengths: ["reliable", "stress-resistant", "hardworking", "detail-oriented", "cooperative"],
    languages: [dutchNative, englishGood],
    certifications: [
      {
        name: { nl: "Heftruck", en: "Forklift" },
        issuer: { nl: "BMWT", en: "BMWT" },
        date: "2023",
      },
      {
        name: { nl: "VCA Basis", en: "VCA Basic" },
        issuer: { nl: "SSVV", en: "SSVV" },
        date: "2022",
      },
    ],
    template: "delivery",
    accentColor: "#1F2933",
  });
}

function plumber(lang: Locale): CV {
  return build(lang, {
    title: { nl: "Loodgieter", en: "Plumber" },
    summary: {
      nl: "Acht jaar loodgieter, vooral in renovatie en kleine nieuwbouw. Sanitair, cv en lekkages zijn dagelijks werk. Werk netjes en ruim mijn werkplek altijd op voor ik vertrek.",
      en: "Eight years as a plumber, mostly renovations and small new-build. Sanitary, central heating and leaks are day-to-day work. Tidy job, tidy site, always cleaned up before I leave.",
    },
    experience: [
      {
        company: "Installatiebedrijf Van Dijk",
        role: { nl: "Allround loodgieter", en: "All-round plumber" },
        location: "Den Haag",
        startDate: "Mei 2019",
        endDate: "",
        current: true,
        bullets: [
          {
            nl: "Sanitair, cv-ketels en gasleidingen plaatsen en aansluiten bij particulieren.",
            en: "Install sanitary fittings, boilers and gas piping at private homes.",
          },
          {
            nl: "Begeleid een leerling-loodgieter en doe het opleveringsgesprek met de klant.",
            en: "Mentor an apprentice and handle the handover conversation with the client.",
          },
          {
            nl: "Bij lekkages doe ik de diagnose voordat we slopen. Scheelt vaak een hele kamer.",
            en: "On leaks I diagnose before demolition. Often saves the rest of the room.",
          },
        ],
      },
      {
        company: "ZZP",
        role: { nl: "Zelfstandig loodgieter", en: "Self-employed plumber" },
        location: "Den Haag",
        startDate: "Mrt 2016",
        endDate: "Apr 2019",
        bullets: [
          {
            nl: "Lekkages, badkamerrenovaties en kleine aansluitingen voor particulieren en het MKB.",
            en: "Leaks, bathroom renovations and small connections for individuals and SMEs.",
          },
        ],
      },
    ],
    education: [
      {
        school: "ROC Mondriaan",
        degree: { nl: "MBO niveau 3", en: "MBO level 3" },
        field: { nl: "Eerste monteur installatietechniek", en: "Senior installation technician" },
        startDate: "2012",
        endDate: "2016",
      },
    ],
    skills: [
      "problem-solving",
      "attention-to-detail",
      "customer-service",
      "troubleshooting",
      "time-management",
    ],
    strengths: ["reliable", "honest", "independent", "detail-oriented", "solution-oriented"],
    languages: [dutchNative, englishBasic],
    certifications: [
      {
        name: { nl: "VCA VOL", en: "VCA Full Safety" },
        issuer: { nl: "SSVV", en: "SSVV" },
        date: "2023",
      },
      {
        name: { nl: "BEI-BLS LS", en: "BEI-BLS Low Voltage" },
        issuer: { nl: "Stipel", en: "Stipel" },
        date: "2022",
      },
    ],
    template: "construction",
    accentColor: "#1F2933",
  });
}

function constructionWorker(lang: Locale): CV {
  return build(lang, {
    title: { nl: "Bouwvakker", en: "Construction worker" },
    summary: {
      nl: "Bouwvakker met metselachtergrond, zes jaar op grote nieuwbouwprojecten. Werk volgens VCA, kom op tijd en lever vakwerk af. Geen praatjes, gewoon doorzetten tot het klaar is.",
      en: "Construction worker, bricklaying background, six years on large new-build sites. Work to VCA, show up on time, finish what I start. Not much talk, just keep going.",
    },
    experience: [
      {
        company: "BAM Bouw",
        role: { nl: "Bouwvakker / metselaar", en: "Construction worker / bricklayer" },
        location: "Utrecht",
        startDate: "Apr 2021",
        endDate: "",
        current: true,
        bullets: [
          {
            nl: "Metsel- en stukadoorwerk op projecten van 15 tot 80 woningen.",
            en: "Bricklaying and plastering on projects of 15 to 80 dwellings.",
          },
          {
            nl: "Werk volgens tekening en bouwfasering. Geef knelpunten direct door aan de uitvoerder.",
            en: "Work from drawings and the build phasing. Flag bottlenecks straight to the foreman.",
          },
          {
            nl: "Bedien hijsmaterieel en heftruck. Certificaten zijn op orde.",
            en: "Operate lifting equipment and forklift. Certifications current.",
          },
        ],
      },
      {
        company: "Heijmans",
        role: { nl: "Bouwhulp", en: "Construction labourer" },
        location: "Utrecht",
        startDate: "Aug 2018",
        endDate: "Mrt 2021",
        bullets: [
          {
            nl: "Eerst leerling, daarna assistent bij timmer- en metselploeg. Veel afgekeken van de oudere collega's.",
            en: "Started as apprentice, then assistant to the carpentry and bricklaying crew. Learned a lot from the older hands.",
          },
        ],
      },
    ],
    education: [
      {
        school: "Bouwopleiding Midden-Nederland",
        degree: { nl: "MBO niveau 2", en: "MBO level 2" },
        field: { nl: "Metselaar", en: "Bricklayer" },
        startDate: "2016",
        endDate: "2018",
      },
    ],
    skills: [
      "time-management",
      "teamwork",
      "attention-to-detail",
      "problem-solving",
      "troubleshooting",
    ],
    strengths: ["hardworking", "reliable", "stress-resistant", "punctual", "cooperative"],
    languages: [dutchNative, englishBasic],
    certifications: [
      {
        name: { nl: "VCA Basis", en: "VCA Basic" },
        issuer: { nl: "SSVV", en: "SSVV" },
        date: "2024",
      },
      {
        name: { nl: "Heftruck", en: "Forklift" },
        issuer: { nl: "BMWT", en: "BMWT" },
        date: "2023",
      },
    ],
    template: "construction",
    accentColor: "#1F2933",
  });
}

function adminAssistant(lang: Locale): CV {
  return build(lang, {
    title: { nl: "Administratief medewerker", en: "Administrative assistant" },
    summary: {
      nl: "Administratief medewerker met vijf jaar ervaring bij twee MKB-bedrijven. Sterk in Excel en in Exact Online. Hou niet van losse eindjes en lever liever schoon werk dan snel werk.",
      en: "Administrative assistant with five years across two SMEs. Strong in Excel and Exact Online. I do not like loose ends and prefer clean over quick.",
    },
    experience: [
      {
        company: "VDH Trading B.V.",
        role: { nl: "Administratief medewerker", en: "Administrative assistant" },
        location: "Zwolle",
        startDate: "Jun 2021",
        endDate: "",
        current: true,
        bullets: [
          {
            nl: "Verwerk dagelijks 80 tot 100 inkoopfacturen in Exact Online. Boekingen en betalingen lopen via mij.",
            en: "Process 80 to 100 supplier invoices a day in Exact Online. Bookings and payments run through me.",
          },
          {
            nl: "Eerste contactpersoon voor klantvragen per mail en telefoon. Eenvoudige zaken handel ik zelf af.",
            en: "First point of contact for customer queries by email and phone. Simple cases I close myself.",
          },
          {
            nl: "Maandrapportages in Excel voor het MT, plus standaard overzichten voor de salesmanager.",
            en: "Monthly Excel reports for the management team, plus standard overviews for the sales manager.",
          },
        ],
      },
      {
        company: "Randstad (uitzendwerk)",
        role: { nl: "Administratief medewerker", en: "Administrative assistant (temp)" },
        location: "Zwolle",
        startDate: "Sep 2019",
        endDate: "Mei 2021",
        bullets: [
          {
            nl: "Tijdelijke opdrachten bij verschillende MKB-bedrijven. Orderverwerking, archivering, eenvoudige boekhouding.",
            en: "Temporary assignments at various SMEs. Order processing, archiving, simple bookkeeping.",
          },
        ],
      },
    ],
    education: [
      {
        school: "Deltion College",
        degree: { nl: "MBO niveau 4", en: "MBO level 4" },
        field: { nl: "Bedrijfsadministrateur", en: "Business administrator" },
        startDate: "2015",
        endDate: "2019",
      },
    ],
    skills: [
      "ms-office",
      "excel",
      "outlook",
      "attention-to-detail",
      "time-management",
      "organization",
      "customer-service",
    ],
    strengths: ["organized", "detail-oriented", "reliable", "responsible", "self-motivated"],
    languages: [dutchNative, englishGood],
    template: "admin",
    accentColor: "#7FA689",
  });
}

function productionWorker(lang: Locale): CV {
  return build(lang, {
    title: { nl: "Productiemedewerker", en: "Production worker" },
    summary: {
      nl: "Vijf jaar productiewerk, eerst assemblage en nu in de voeding. Werk in drieploegendienst aan de inpaklijn. Haal de norm en geef storingen meteen door aan de techneuten.",
      en: "Five years of production work, first assembly and now in food. Three-shift rotation on the packing line. Hit target, escalate breakdowns straight to maintenance.",
    },
    experience: [
      {
        company: "Vion Food Group",
        role: { nl: "Productiemedewerker", en: "Production operative" },
        location: "Boxtel",
        startDate: "Feb 2022",
        endDate: "",
        current: true,
        bullets: [
          {
            nl: "Inpaklijn in drieploegendienst, 1.200 stuks per uur is de standaard.",
            en: "Packing line on three-shift rotation, 1,200 units per hour is the standard.",
          },
          {
            nl: "Kleine storingen los ik zelf op. Bij grotere bel ik onderhoud direct, niet aan de lijn blijven trekken.",
            en: "Small faults I fix myself. Larger ones I call maintenance straight away, no tinkering on the line.",
          },
        ],
      },
      {
        company: "Lely Industries",
        role: { nl: "Assemblagemedewerker", en: "Assembly operative" },
        location: "Maassluis",
        startDate: "Mrt 2019",
        endDate: "Jan 2022",
        bullets: [
          {
            nl: "Onderdelen voor melkrobots assembleren volgens werkinstructies. Eindcontrole op het station vlak voor de testbank.",
            en: "Assembled milking robot parts to written work instructions. Final check at the station just before the test bench.",
          },
        ],
      },
    ],
    education: [
      {
        school: "ROC Tilburg",
        degree: { nl: "MBO niveau 2", en: "MBO level 2" },
        field: { nl: "Operator productie", en: "Production operator" },
        startDate: "2017",
        endDate: "2019",
      },
    ],
    skills: [
      "time-management",
      "attention-to-detail",
      "teamwork",
      "troubleshooting",
      "inventory-management",
    ],
    strengths: ["hardworking", "reliable", "punctual", "stress-resistant", "cooperative"],
    languages: [dutchNative, englishBasic],
    certifications: [
      {
        name: { nl: "VCA Basis", en: "VCA Basic" },
        issuer: { nl: "SSVV", en: "SSVV" },
        date: "2023",
      },
    ],
    template: "construction",
    accentColor: "#7FA689",
  });
}

const BUILDERS: Record<ProfessionId, (lang: Locale) => CV> = {
  cleaner,
  warehouse,
  retail,
  housekeeper,
  "kitchen-assistant": kitchenAssistant,
  logistics,
  plumber,
  construction: constructionWorker,
  admin: adminAssistant,
  production: productionWorker,
};

export function buildProfessionCV(id: ProfessionId, lang: Locale): CV {
  return BUILDERS[id](lang);
}
