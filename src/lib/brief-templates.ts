import type { CoverLetter } from "./cv-types";
import type { Locale } from "./i18n";
import type { ProfessionId } from "./profession-templates";

type LangText = { nl: string; en: string };
const pick = (lang: Locale, x: LangText) => x[lang];

interface BriefInput {
  recipientCompany: string;
  recipientName: LangText;
  recipientAddress: string;
  recipientCity: string;
  jobTitle: LangText;
  vacancyRef: string;
  date: LangText;
  subject: LangText;
  opening: LangText;
  body: LangText;
  closing: LangText;
}

function build(lang: Locale, input: BriefInput): CoverLetter {
  return {
    recipientCompany: input.recipientCompany,
    recipientName: pick(lang, input.recipientName),
    recipientAddress: input.recipientAddress,
    recipientCity: input.recipientCity,
    jobTitle: pick(lang, input.jobTitle),
    vacancyRef: input.vacancyRef,
    date: pick(lang, input.date),
    subject: pick(lang, input.subject),
    opening: pick(lang, input.opening),
    body: pick(lang, input.body),
    closing: pick(lang, input.closing),
  };
}

function cleaner(lang: Locale): CoverLetter {
  return build(lang, {
    recipientCompany: "Hago Nederland",
    recipientName: { nl: "Mevrouw De Jong", en: "Ms De Jong" },
    recipientAddress: "Hagoweg 12",
    recipientCity: "1101 BV Amsterdam",
    jobTitle: {
      nl: "Schoonmaker kantoorpanden",
      en: "Office cleaner",
    },
    vacancyRef: "HG-2026-014",
    date: {
      nl: "Amsterdam, 11 juni 2026",
      en: "Amsterdam, 11 June 2026",
    },
    subject: {
      nl: "Sollicitatie naar de positie Schoonmaker kantoorpanden",
      en: "Application for the Office cleaner role",
    },
    opening: {
      nl: "Met interesse las ik uw vacature voor schoonmaker kantoorpanden in Amsterdam-West. Vroeg op de werkplek, een vast team en een nette oplevering — daar herken ik mij volledig in.",
      en: "I read your vacancy for an office cleaner in Amsterdam-West with interest. Early starts, a fixed team and a tidy handover — that fits exactly how I work.",
    },
    body: {
      nl: "De afgelopen vijf jaar heb ik in en rond Amsterdam vier kantoorpanden van rond de 6.000 m² zelfstandig schoongemaakt. Sleutelbeheer en contact met opdrachtgevers liep via mij; de bestellijst voor materiaal regelde ik zelf.\n\nIk werk consequent volgens het hygiëneprotocol en geef tijdig door als er iets opvalt op de werkvloer. Een vaste ronde vind ik prettig en ik ben gewend om vroeg te starten.",
      en: "Over the past five years I have independently cleaned four office buildings in and around Amsterdam, totalling roughly 6,000 m². Key holding and client contact ran through me; I managed the supply order list myself.\n\nI consistently work to the hygiene protocol and flag anything I notice on site in good time. I like a fixed round and am used to early starts.",
    },
    closing: {
      nl: "Graag licht ik mijn motivatie en werkwijze in een persoonlijk gesprek verder toe.",
      en: "I would be glad to explain my motivation and approach further in a conversation.",
    },
  });
}

function warehouse(lang: Locale): CoverLetter {
  return build(lang, {
    recipientCompany: "Bol.com Fulfilment",
    recipientName: { nl: "Team Recruitment", en: "Recruitment Team" },
    recipientAddress: "Daltonweg 1",
    recipientCity: "5145 NJ Waalwijk",
    jobTitle: { nl: "Orderpicker", en: "Order picker" },
    vacancyRef: "BOL-WV-2026-091",
    date: {
      nl: "Waalwijk, 11 juni 2026",
      en: "Waalwijk, 11 June 2026",
    },
    subject: {
      nl: "Sollicitatie naar de positie Orderpicker",
      en: "Application for the Order picker role",
    },
    opening: {
      nl: "Naar aanleiding van uw vacature voor orderpicker bij het DC in Waalwijk wil ik mij graag voorstellen.",
      en: "I am writing in response to your vacancy for an order picker at the Waalwijk DC.",
    },
    body: {
      nl: "Sinds 2022 werk ik in een fulfilment center: gemiddeld 110 orderregels per uur met scanner en een foutpercentage onder de 0,3%. Daarnaast rijd ik EPT en reachtruck, certificaten zijn in 2025 opnieuw afgegeven.\n\nIn drukke pieken help ik de teamleider met het inwerken van nieuwe collega's. Ploegendienst en op tijd op de vloer staan zie ik als basis.",
      en: "I have worked in a fulfilment centre since 2022: averaging 110 order lines per hour with the scanner and an error rate under 0.3%. I also drive EPT and reach truck, with certifications re-issued in 2025.\n\nDuring peak periods I help the team lead onboard new colleagues. Shift work and being on the floor on time are baseline for me.",
    },
    closing: {
      nl: "Ik werk graag mee aan een proefdienst zodat u mijn tempo kunt meten. Een gesprek kan ik op korte termijn inplannen.",
      en: "I would be happy to do a trial shift so you can see my pace first-hand. I can schedule a conversation on short notice.",
    },
  });
}

function retail(lang: Locale): CoverLetter {
  return build(lang, {
    recipientCompany: "Albert Heijn",
    recipientName: { nl: "Bedrijfsleider", en: "Store manager" },
    recipientAddress: "Croeselaan 28",
    recipientCity: "3521 CB Utrecht",
    jobTitle: {
      nl: "Medewerker versafdeling",
      en: "Fresh-food assistant",
    },
    vacancyRef: "AH-UTR-2026-218",
    date: {
      nl: "Utrecht, 11 juni 2026",
      en: "Utrecht, 11 June 2026",
    },
    subject: {
      nl: "Sollicitatie naar de positie Medewerker versafdeling",
      en: "Application for the Fresh-food assistant role",
    },
    opening: {
      nl: "Met enthousiasme las ik uw vacature voor medewerker versafdeling. Klantcontact op de vloer is wat ik leuk vind aan dit werk.",
      en: "I read your vacancy for a fresh-food assistant with enthusiasm. Customer contact on the floor is what I enjoy most about this work.",
    },
    body: {
      nl: "Sinds 2023 werk ik bij Albert Heijn aan de versafdeling: schappen vullen, versheid bewaken en klanten helpen. Ik werk volgens HACCP en spring bij op de kassa tijdens piek en bij open- en sluitdiensten.\n\nVoor mijn werk bij AH stond ik bij H&M op de vloer met klantenservice, paskamerbegeleiding en kassa. Daar heb ik geleerd om in drukke situaties rustig te blijven en de klant centraal te zetten.",
      en: "I have worked at Albert Heijn's fresh-food section since 2023: restocking shelves, monitoring freshness and helping customers. I work to HACCP and cover the till during peak and on open/close shifts.\n\nBefore AH, I worked on the floor at H&M handling customer service, fitting-room support and the till. That taught me to stay calm under pressure and to keep the customer central.",
    },
    closing: {
      nl: "Een proefdienst of een kort kennismakingsgesprek pak ik graag aan.",
      en: "I would gladly do a trial shift or a brief introductory conversation.",
    },
  });
}

function housekeeper(lang: Locale): CoverLetter {
  return build(lang, {
    recipientCompany: "Tzorg",
    recipientName: {
      nl: "Wijkmanager Eindhoven",
      en: "Eindhoven district manager",
    },
    recipientAddress: "Karel de Grotelaan 415",
    recipientCity: "5654 NN Eindhoven",
    jobTitle: {
      nl: "Medewerker huishoudelijke ondersteuning",
      en: "Home care assistant",
    },
    vacancyRef: "TZ-EIN-2026-027",
    date: {
      nl: "Eindhoven, 11 juni 2026",
      en: "Eindhoven, 11 June 2026",
    },
    subject: {
      nl: "Sollicitatie naar de positie Medewerker huishoudelijke ondersteuning",
      en: "Application for the Home care assistant role",
    },
    opening: {
      nl: "Graag stel ik mij voor naar aanleiding van uw vacature voor huishoudelijke ondersteuning in Eindhoven-Zuid.",
      en: "I would like to introduce myself in response to your vacancy for home care assistance in Eindhoven-Zuid.",
    },
    body: {
      nl: "Sinds 2020 werk ik bij Tzorg met zes vaste cliënten per week — schoonmaken, was en strijk, en af en toe boodschappen. Ik let goed op signalen en geef het door aan de wijkverpleging als er iets verandert.\n\nDaarvoor werkte ik drie jaar zelfstandig bij vier vaste gezinnen, samen zestien uur per week. Discreet werken en op afspraken zijn vind ik vanzelfsprekend.",
      en: "I have worked at Tzorg since 2020, with six fixed clients per week — cleaning, laundry and ironing, and occasional groceries. I watch for changes in clients and pass it on to district nursing when something is off.\n\nBefore that I worked independently for three years across four families, around sixteen hours a week. Working discreetly and being punctual is second nature to me.",
    },
    closing: {
      nl: "Ik kan op korte termijn starten en sta open voor een kennismakingsgesprek.",
      en: "I can start at short notice and am open to an introductory conversation.",
    },
  });
}

function kitchenAssistant(lang: Locale): CoverLetter {
  return build(lang, {
    recipientCompany: "Restaurant De Kade",
    recipientName: { nl: "Souschef", en: "Sous-chef" },
    recipientAddress: "Wijnhaven 17",
    recipientCity: "3011 WJ Rotterdam",
    jobTitle: { nl: "Keukenhulp", en: "Kitchen assistant" },
    vacancyRef: "",
    date: {
      nl: "Rotterdam, 11 juni 2026",
      en: "Rotterdam, 11 June 2026",
    },
    subject: {
      nl: "Sollicitatie naar de positie Keukenhulp",
      en: "Application for the Kitchen assistant role",
    },
    opening: {
      nl: "Met interesse las ik dat jullie keuken versterking zoekt. Een rustige werkbank en goede mise en place — daar werk ik graag aan mee.",
      en: "I read with interest that your kitchen is looking for support. A clean bench and solid mise en place — that is the work I enjoy most.",
    },
    body: {
      nl: "De afgelopen twee jaar werk ik in een restaurantkeuken met diensten van rond de tachtig couverts. Mise en place onder leiding van de souschef, koelingen netjes houden, voorraad bijhouden en op tijd doorgeven wat opraakt.\n\nDaarvoor werkte ik bij Vermaat Catering met opbouw, uitserveren en de eindcontrole op de keuken voor sluitingstijd. HACCP zit er goed in.",
      en: "For the past two years I have worked in a restaurant kitchen with services of around eighty covers. Mise en place under the sous-chef, keeping the coolers tidy, tracking stock and flagging what is running low in good time.\n\nBefore that I worked at Vermaat Catering on set-up, serving and the closing-time kitchen check. HACCP is well embedded.",
    },
    closing: {
      nl: "Een proefdienst is voor mij de beste manier om te laten zien hoe ik in de keuken werk.",
      en: "A trial shift is the best way for me to show how I work in the kitchen.",
    },
  });
}

function logistics(lang: Locale): CoverLetter {
  return build(lang, {
    recipientCompany: "PostNL",
    recipientName: {
      nl: "Depothoofd Amersfoort",
      en: "Amersfoort depot manager",
    },
    recipientAddress: "Computerweg 8",
    recipientCity: "3821 AB Amersfoort",
    jobTitle: {
      nl: "Sorteerder pakkettendepot",
      en: "Parcel depot sorter",
    },
    vacancyRef: "PNL-AMF-2026-045",
    date: {
      nl: "Amersfoort, 11 juni 2026",
      en: "Amersfoort, 11 June 2026",
    },
    subject: {
      nl: "Sollicitatie naar de positie Sorteerder pakkettendepot",
      en: "Application for the Parcel depot sorter role",
    },
    opening: {
      nl: "Naar aanleiding van uw vacature voor sorteerder bij het pakkettendepot in Amersfoort wil ik mij graag voorstellen.",
      en: "I am writing in response to your vacancy for a sorter at the Amersfoort parcel depot.",
    },
    body: {
      nl: "Sinds eind 2022 sorteer ik gemiddeld 1.500 pakketten per dienst voor regionale routes. Dag- en nachtdienst zijn beide bekend, en in piekperiodes help ik uitzendkrachten op weg.\n\nDaarvoor werkte ik bij DHL Supply Chain met inkomende goederen: inboeken, schade controleren en de losvolgorde afstemmen met de heftruckchauffeur. Heftruck (BMWT, 2023) en VCA basis zijn actueel.",
      en: "Since late 2022 I have sorted on average 1,500 parcels per shift for regional routes. Day and night shifts are both familiar, and during peak periods I help temp staff get up to speed.\n\nBefore that I worked at DHL Supply Chain on inbound goods: booking in, damage checks and coordinating the unload order with the forklift driver. Forklift (BMWT, 2023) and VCA basic are current.",
    },
    closing: {
      nl: "Ik draai graag een dienst mee zodat u mijn tempo en aanpak kunt zien.",
      en: "I would gladly do a trial shift so you can see my pace and approach.",
    },
  });
}

function plumber(lang: Locale): CoverLetter {
  return build(lang, {
    recipientCompany: "Installatiebedrijf Van Dijk",
    recipientName: {
      nl: "Werkvoorbereider",
      en: "Work planner",
    },
    recipientAddress: "Loosduinseweg 92",
    recipientCity: "2571 AB Den Haag",
    jobTitle: { nl: "Allround loodgieter", en: "All-round plumber" },
    vacancyRef: "",
    date: {
      nl: "Den Haag, 11 juni 2026",
      en: "The Hague, 11 June 2026",
    },
    subject: {
      nl: "Sollicitatie naar de positie Allround loodgieter",
      en: "Application for the All-round plumber role",
    },
    opening: {
      nl: "Met interesse las ik uw vacature voor allround loodgieter in de regio Den Haag.",
      en: "I read with interest your vacancy for an all-round plumber in the Hague region.",
    },
    body: {
      nl: "Acht jaar loodgieter, vooral in renovatie en kleine nieuwbouw — sanitair, cv-ketels en gasleidingen plaatsen en aansluiten bij particulieren. Bij lekkages doe ik eerst de diagnose voordat we slopen; dat scheelt vaak een hele kamer.\n\nIk begeleid op dit moment een leerling-loodgieter en doe het opleveringsgesprek met de klant zelf. VCA VOL (2023) en BEI-BLS LS (2022) zijn op orde.",
      en: "Eight years as a plumber, mostly renovations and small new-build — sanitary, boilers and gas piping at private homes. On leaks I diagnose before demolition; it often saves the rest of the room.\n\nI currently mentor an apprentice plumber and handle the client handover conversation myself. VCA full (2023) and BEI-BLS Low Voltage (2022) are current.",
    },
    closing: {
      nl: "Een gesprek of meeloopdag plan ik op korte termijn graag in.",
      en: "I would be glad to schedule a conversation or a shadowing day at short notice.",
    },
  });
}

function constructionWorker(lang: Locale): CoverLetter {
  return build(lang, {
    recipientCompany: "BAM Bouw",
    recipientName: { nl: "Uitvoerder", en: "Foreman" },
    recipientAddress: "Rumpsterweg 17",
    recipientCity: "3984 NW Odijk",
    jobTitle: {
      nl: "Bouwvakker / metselaar",
      en: "Construction worker / bricklayer",
    },
    vacancyRef: "BAM-UTR-2026-061",
    date: {
      nl: "Utrecht, 11 juni 2026",
      en: "Utrecht, 11 June 2026",
    },
    subject: {
      nl: "Sollicitatie naar de positie Bouwvakker / metselaar",
      en: "Application for the Construction worker / bricklayer role",
    },
    opening: {
      nl: "Naar aanleiding van uw vacature voor bouwvakker met metselachtergrond wil ik mij graag voorstellen.",
      en: "I am writing in response to your vacancy for a construction worker with bricklaying background.",
    },
    body: {
      nl: "De afgelopen zes jaar werk ik op nieuwbouwprojecten van vijftien tot tachtig woningen — metsel- en stukadoorwerk volgens tekening en bouwfasering. Knelpunten geef ik direct door aan de uitvoerder.\n\nIk bedien hijsmaterieel en heftruck; certificaten (VCA basis 2024, heftruck BMWT 2023) zijn actueel. Eerst was ik leerling en assistent bij Heijmans bij timmer- en metselploeg; veel afgekeken van de oudere collega's.",
      en: "For the past six years I have worked on new-build projects of fifteen to eighty dwellings — bricklaying and plastering to drawings and build phasing. I flag bottlenecks straight to the foreman.\n\nI operate lifting equipment and forklift; certifications (VCA basic 2024, forklift BMWT 2023) are current. I started as an apprentice at Heijmans on the carpentry and bricklaying crew; learned a lot from the older hands.",
    },
    closing: {
      nl: "Ik kom graag een dag meelopen op een project om te laten zien hoe ik werk.",
      en: "I would gladly spend a day on site to show how I work.",
    },
  });
}

function adminAssistant(lang: Locale): CoverLetter {
  return build(lang, {
    recipientCompany: "VDH Trading B.V.",
    recipientName: {
      nl: "Hoofd administratie",
      en: "Head of administration",
    },
    recipientAddress: "Aalanden 28",
    recipientCity: "8024 AG Zwolle",
    jobTitle: {
      nl: "Administratief medewerker",
      en: "Administrative assistant",
    },
    vacancyRef: "VDH-2026-013",
    date: {
      nl: "Zwolle, 11 juni 2026",
      en: "Zwolle, 11 June 2026",
    },
    subject: {
      nl: "Sollicitatie naar de positie Administratief medewerker",
      en: "Application for the Administrative assistant role",
    },
    opening: {
      nl: "Met interesse las ik uw vacature voor administratief medewerker in Zwolle. De combinatie van Exact Online, het facturatieproces en klantcontact sluit goed aan op waar ik op dit moment werk.",
      en: "I read with interest your vacancy for an administrative assistant in Zwolle. The combination of Exact Online, invoicing and customer contact aligns closely with my current work.",
    },
    body: {
      nl: "Sinds 2021 verwerk ik dagelijks tachtig tot honderd inkoopfacturen in Exact Online, voer boekingen en betalingen door en ben eerste contactpersoon voor klantvragen via mail en telefoon. Eenvoudige vragen handel ik zelf af.\n\nMaandrapportages in Excel voor het MT en standaard overzichten voor de salesmanager maak ik zelfstandig. Eerder werkte ik bij Randstad als uitzendkracht bij verschillende MKB-bedrijven.",
      en: "Since 2021 I have processed eighty to a hundred supplier invoices per day in Exact Online, posted bookings and payments and acted as first point of contact for customer queries via email and phone. Simple queries I close myself.\n\nI produce monthly Excel reports for the management team and standard overviews for the sales manager independently. Earlier I worked at Randstad as a temp across various SMEs.",
    },
    closing: {
      nl: "Een persoonlijk gesprek bij u op kantoor maak ik graag op korte termijn vrij.",
      en: "I would be glad to make time for an in-person conversation at your office on short notice.",
    },
  });
}

function productionWorker(lang: Locale): CoverLetter {
  return build(lang, {
    recipientCompany: "Vion Food Group",
    recipientName: { nl: "Productieleider", en: "Production manager" },
    recipientAddress: "Boseind 15",
    recipientCity: "5281 RM Boxtel",
    jobTitle: {
      nl: "Productiemedewerker",
      en: "Production operative",
    },
    vacancyRef: "VION-BXL-2026-052",
    date: {
      nl: "Boxtel, 11 juni 2026",
      en: "Boxtel, 11 June 2026",
    },
    subject: {
      nl: "Sollicitatie naar de positie Productiemedewerker",
      en: "Application for the Production operative role",
    },
    opening: {
      nl: "Naar aanleiding van uw vacature voor productiemedewerker op de inpaklijn wil ik mij graag voorstellen.",
      en: "I am writing in response to your vacancy for a production operative on the packing line.",
    },
    body: {
      nl: "Sinds 2021 werk ik op de inpaklijn in drieploegendienst. De standaard van 1.200 stuks per uur haal ik consistent. Kleine storingen los ik zelf op; bij grotere bel ik onderhoud direct in plaats van aan de lijn te blijven trekken.\n\nDaarvoor werkte ik bij Lely Industries aan assemblage van onderdelen voor melkrobots volgens werkinstructies, met eindcontrole vlak voor de testbank. VCA basis (2023) is actueel.",
      en: "Since 2021 I have worked the packing line on a three-shift rotation. I consistently hit the 1,200 units per hour standard. I fix small faults myself; on larger ones I call maintenance straight away instead of tinkering on the line.\n\nBefore that I worked at Lely Industries assembling milking robot components to written work instructions, with final check just before the test bench. VCA basic (2023) is current.",
    },
    closing: {
      nl: "Een rondleiding en een kort gesprek plan ik graag in.",
      en: "I would be glad to schedule a tour and a brief conversation.",
    },
  });
}

const BUILDERS: Record<ProfessionId, (lang: Locale) => CoverLetter> = {
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

export function buildProfessionBrief(
  id: ProfessionId,
  lang: Locale,
): CoverLetter {
  return BUILDERS[id](lang);
}
