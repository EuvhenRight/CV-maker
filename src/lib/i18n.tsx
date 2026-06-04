"use client";

import * as React from "react";

export type Locale = "nl" | "en";

export const LOCALES: Locale[] = ["nl", "en"];

export const LOCALE_LABELS: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
};

type Dict = Record<string, string>;

const NL: Dict = {
  // Brand / shell
  "brand.tagline": "Maak je CV in 5 minuten",

  // Header / landing
  "nav.features": "Functies",
  "nav.templates": "Templates",
  "nav.openEditor": "Open editor",
  "nav.openEditorArrow": "Open editor →",
  "nav.startFree": "Start gratis",
  "nav.viewTemplates": "Bekijk templates",

  "hero.badge": "Een CV waar recruiters bij stilstaan",
  "hero.title1": "Een werk-klaar CV in ",
  "hero.titleHighlight": "vijf minuten",
  "hero.title2": ".",
  "hero.subtitle":
    "Kies uit 14 templates — van strak voor IT tot warm voor zorg en horeca. Vul je gegevens in, voeg een foto toe en download een professionele PDF.",
  "hero.usp.free": "Gratis",
  "hero.usp.noAccount": "Geen account",
  "hero.usp.autosave": "Auto-opslag",
  "hero.usp.atsFriendly": "ATS-vriendelijk",
  "hero.usp.withPhoto": "Met foto",
  "hero.usp.pdfExport": "PDF-export",

  "features.title": "Minder moeite. Meer kans op een baan.",
  "features.subtitle":
    "Elk onderdeel is bedacht om de afstand tussen jou en je volgende baan te verkleinen.",
  "features.fast.title": "Klaar in 5 minuten",
  "features.fast.body":
    "Kies een template, vul je gegevens in, download. Geen account, geen gedoe.",
  "features.ats.title": "Recruiter & ATS-proof",
  "features.ats.body":
    "Templates volgen de structuur die ATS-systemen verwachten — geen rare layouts.",
  "features.photo.title": "Met of zonder foto",
  "features.photo.body":
    "10 branche-templates met portret. 4 klassieke ATS-pure templates zonder foto.",
  "features.pdf.title": "Nette PDF",
  "features.pdf.body":
    "Direct downloaden of via je browser printen. Wat je ziet is wat je verstuurt.",

  "templates.title": "Templates voor 10 branches.",
  "templates.subtitle":
    "Elk template volgt de standaard van die branche. Allemaal met ruimte voor je foto.",
  "templates.classicTitle": "Klassieke ATS-templates (zonder foto)",
  "templates.photoBadge": "Foto",

  "cta.title": "Klaar om je CV te versturen?",
  "cta.subtitle":
    "Geen account. Lokale opslag. Download naar PDF wanneer je tevreden bent.",
  "cta.button": "Open de editor",

  "footer.copy": "CV-tool voor",

  // Builder
  "builder.loading": "Je opgeslagen CV wordt geladen…",
  "builder.localStorage": "Lokaal opgeslagen · Geen account nodig",
  "builder.tab.edit": "Bewerken",
  "builder.tab.preview": "Voorbeeld",

  // Toolbar
  "toolbar.template": "Template",
  "toolbar.accent": "Accent",
  "toolbar.classicGroup": "Klassiek (zonder foto)",
  "toolbar.industryGroup": "Branche (met foto)",
  "toolbar.example": "Voorbeeld",
  "toolbar.examples": "Voorbeelden",
  "toolbar.clear": "Wissen",
  "toolbar.confirmClear":
    "Alle CV-gegevens wissen? Dit kan niet ongedaan worden gemaakt.",
  "toolbar.print": "Printen",
  "toolbar.download": "Download PDF",
  "toolbar.downloading": "Bezig…",
  "toolbar.downloadError":
    "PDF maken is mislukt. Gebruik anders de Printen-knop en kies “Opslaan als PDF”.",
  "toolbar.language": "Taal",

  // Section labels
  "section.personal": "Persoonlijke gegevens",
  "section.summary": "Samenvatting",
  "section.experience": "Werkervaring",
  "section.education": "Opleiding",
  "section.skills": "Vaardigheden",
  "section.strengths": "Sterke punten",
  "section.projects": "Projecten",
  "section.languages": "Talen",
  "section.certifications": "Certificaten",

  // Personal fields
  "personal.fullName": "Volledige naam",
  "personal.fullName.ph": "Sanne de Vries",
  "personal.title": "Functietitel",
  "personal.title.ph": "Senior Softwareontwikkelaar",
  "personal.email": "E-mail",
  "personal.email.ph": "sanne@voorbeeld.nl",
  "personal.phone": "Telefoon",
  "personal.phone.ph": "+31 6 12 34 56 78",
  "personal.location": "Woonplaats",
  "personal.location.ph": "Amsterdam, NL",
  "personal.website": "Website",
  "personal.website.ph": "sannedevries.nl",
  "personal.linkedin": "LinkedIn",
  "personal.linkedin.ph": "linkedin.com/in/sannedevries",
  "personal.photo.upload": "Foto uploaden",
  "personal.photo.replace": "Foto vervangen",
  "personal.photo.uploading": "Uploaden…",
  "personal.photo.remove": "Verwijderen",
  "personal.photo.help": "Aanbevolen: vierkant, hoofd en schouders, < 1 MB.",
  "personal.photo.alt": "Profielfoto",

  // Summary
  "summary.ph":
    "2–4 zinnen over wie je bent, wat je hebt opgeleverd en wat je wilt gaan doen.",
  "summary.counter": "tekens · mik op 300–600.",

  // Experience
  "exp.entry": "Functie",
  "exp.add": "Werkervaring toevoegen",
  "exp.removeAria": "Functie verwijderen",
  "exp.role": "Functie",
  "exp.role.ph": "Senior Ontwikkelaar",
  "exp.company": "Bedrijf",
  "exp.company.ph": "Acme B.V.",
  "exp.location": "Locatie",
  "exp.period": "Periode",
  "exp.start.ph": "Jan 2022",
  "exp.end.ph": "Mrt 2024",
  "exp.current": "Ik werk hier nu",
  "exp.currentShort": "Heden",
  "exp.bullets": "Punten",
  "exp.bullet.ph": "Wat je deed, de impact, de cijfers.",
  "exp.bullet.add": "Punt toevoegen",
  "exp.bullet.removeAria": "Punt verwijderen",

  // Education
  "edu.school": "School",
  "edu.school.ph": "TU Delft",
  "edu.degree": "Diploma",
  "edu.degree.ph": "MSc",
  "edu.field": "Studierichting",
  "edu.field.ph": "Informatica",
  "edu.period": "Periode",
  "edu.notes": "Opmerkingen (optioneel)",
  "edu.notes.ph": "Scriptie, cijfers, relevante vakken.",
  "edu.add": "Opleiding toevoegen",
  "edu.removeAria": "Opleiding verwijderen",

  // Skills
  "skills.helper":
    "Zoek of selecteer uit veelgevraagde vaardigheden. Niet gevonden? Type je eigen en druk op Enter.",
  "skills.empty":
    "Nog geen vaardigheden geselecteerd. Begin met typen om suggesties te zien.",
  "skills.search.ph": "Zoek of typ een vaardigheid…",

  // Strengths
  "strengths.helper":
    "Kies persoonlijke eigenschappen die jou kenmerken. Custom toevoegen kan ook.",
  "strengths.empty":
    "Nog geen sterke punten geselecteerd. Zoek hieronder of typ je eigen.",
  "strengths.search.ph": "Zoek of typ een sterk punt…",

  // Generic picker
  "picker.search.ph": "Zoeken…",
  "picker.remove": "Verwijder",
  "picker.addCustom": "Voeg toe: \"{q}\"",

  // Profession picker dialog
  "prof.dialog.title": "Kies een beroep",
  "prof.dialog.subtitle":
    "Een ingevuld CV als startpunt. Pas alles aan zodat het bij jou past — naam, ervaring, vaardigheden, alles.",
  "prof.dialog.close": "Sluiten",
  "prof.dialog.confirmReplace":
    "Hiermee vervang je het CV in de editor. Doorgaan?",
  "prof.dialog.useTemplate": "Gebruik dit voorbeeld",

  "prof.cleaner.name": "Schoonmaker",
  "prof.cleaner.tagline": "Kantoren, scholen en zorglocaties",
  "prof.warehouse.name": "Magazijnmedewerker",
  "prof.warehouse.tagline": "Orderpicken, reachtruck, scanner en WMS",
  "prof.retail.name": "Verkoopmedewerker",
  "prof.retail.tagline": "Winkel, kassa en klantcontact",
  "prof.housekeeper.name": "Huishoudelijke hulp",
  "prof.housekeeper.tagline": "Particulieren en thuiszorg",
  "prof.kitchen.name": "Keukenhulp",
  "prof.kitchen.tagline": "Mise en place, afwas en HACCP",
  "prof.logistics.name": "Logistiek medewerker",
  "prof.logistics.tagline": "Pakkettendepot en distributiecentrum",
  "prof.plumber.name": "Loodgieter",
  "prof.plumber.tagline": "Sanitair, cv en lekkages",
  "prof.construction.name": "Bouwvakker",
  "prof.construction.tagline": "Nieuwbouw, metsel- en stukadoorwerk",
  "prof.admin.name": "Administratief medewerker",
  "prof.admin.tagline": "Facturatie, ERP en klantcontact",
  "prof.production.name": "Productiemedewerker",
  "prof.production.tagline": "Inpaklijn, ploegendienst en assemblage",

  // Projects
  "projects.entry": "Project",
  "projects.name": "Naam",
  "projects.name.ph": "Open Design Tokens",
  "projects.link": "Link",
  "projects.link.ph": "github.com/jij/project",
  "projects.description": "Beschrijving",
  "projects.description.ph":
    "Eén zin met impact. Voeg cijfers toe als je ze hebt.",
  "projects.add": "Project toevoegen",
  "projects.removeAria": "Project verwijderen",

  // Languages
  "lang.name": "Taal",
  "lang.name.ph": "Nederlands",
  "lang.level": "Niveau",
  "lang.level.ph": "Kies",
  "lang.add": "Taal toevoegen",
  "lang.removeAria": "Taal verwijderen",
  "lang.level.native": "Moedertaal",
  "lang.level.fluent": "Vloeiend",
  "lang.level.professional": "Professioneel",
  "lang.level.intermediate": "Gemiddeld",
  "lang.level.basic": "Basis",

  // Certifications
  "cert.name": "Naam",
  "cert.name.ph": "AWS Solutions Architect",
  "cert.issuer": "Uitgever",
  "cert.issuer.ph": "Amazon Web Services",
  "cert.date": "Datum",
  "cert.date.ph": "2024",
  "cert.link": "Link (optioneel)",
  "cert.link.ph": "credly.com/...",
  "cert.add": "Certificaat toevoegen",
  "cert.remove": "Verwijderen",
  "cert.removeAria": "Certificaat verwijderen",

  // Misc / section shell
  "section.dragAria": "Sleep om secties te verplaatsen",
  "section.toggleAria": "Sectie in- of uitklappen",

  // Preview helpers
  "preview.placeholder.name": "Jouw naam",
  "preview.present": "Heden",
  "preview.contact.email": "E-mail",
  "preview.contact.phone": "Telefoon",
  "preview.contact.location": "Locatie",
  "preview.contact.website": "Website",
  "preview.contact.linkedin": "LinkedIn",
  "preview.footer.madeWith": "Gemaakt met MaakMijnCV",

  // Template-displayed section headings (rendered on the CV itself)
  "tpl.section.summary": "Samenvatting",
  "tpl.section.experience": "Werkervaring",
  "tpl.section.education": "Opleiding",
  "tpl.section.skills": "Vaardigheden",
  "tpl.section.strengths": "Sterke punten",
  "tpl.section.projects": "Projecten",
  "tpl.section.languages": "Talen",
  "tpl.section.certifications": "Certificaten",
  "tpl.section.profile": "Profiel",
  "tpl.section.aboutMe": "Over mij",
  "tpl.section.coreCompetencies": "Kerncompetenties",
  "tpl.section.selectedProjects": "Geselecteerde projecten",
  "tpl.section.profileSummary": "Profielsamenvatting",
  "tpl.section.clinical": "Klinische werkervaring",
  "tpl.section.competencies": "Competenties",
  "tpl.section.diplomas": "Diploma's en licenties",
  "tpl.retail.tagline": "Klantcontact",
  "tpl.tech.whoami": "$ whoami",
  "tpl.tech.contact": "// contact",
  "tpl.tech.summary": "// samenvatting",
  "tpl.tech.experience": "// werkervaring",
  "tpl.tech.education": "// opleiding",
  "tpl.tech.projects": "// projecten",
};

const EN: Dict = {
  "brand.tagline": "Make your CV in 5 minutes",

  "nav.features": "Features",
  "nav.templates": "Templates",
  "nav.openEditor": "Open editor",
  "nav.openEditorArrow": "Open editor →",
  "nav.startFree": "Start free",
  "nav.viewTemplates": "View templates",

  "hero.badge": "A CV recruiters actually pause on",
  "hero.title1": "A ready-to-send CV in ",
  "hero.titleHighlight": "five minutes",
  "hero.title2": ".",
  "hero.subtitle":
    "Choose from 14 templates — sharp for IT, warm for healthcare and hospitality. Fill in your details, add a photo, and download a polished PDF.",
  "hero.usp.free": "Free",
  "hero.usp.noAccount": "No account",
  "hero.usp.autosave": "Auto-save",
  "hero.usp.atsFriendly": "ATS-friendly",
  "hero.usp.withPhoto": "With photo",
  "hero.usp.pdfExport": "PDF export",

  "features.title": "Less effort. More callbacks.",
  "features.subtitle":
    "Every detail is here to shrink the distance between you and your next job.",
  "features.fast.title": "Done in 5 minutes",
  "features.fast.body":
    "Pick a template, fill in your details, download. No account, no friction.",
  "features.ats.title": "Recruiter & ATS-proof",
  "features.ats.body":
    "Templates follow the structure ATS systems expect — no weird layouts.",
  "features.photo.title": "With or without photo",
  "features.photo.body":
    "10 industry templates with a portrait. 4 classic ATS-pure templates without one.",
  "features.pdf.title": "Clean PDF",
  "features.pdf.body":
    "Download directly or print through your browser. What you see is what you send.",

  "templates.title": "Templates for 10 industries.",
  "templates.subtitle":
    "Each template matches its industry's conventions. All with room for your photo.",
  "templates.classicTitle": "Classic ATS templates (without photo)",
  "templates.photoBadge": "Photo",

  "cta.title": "Ready to send your CV?",
  "cta.subtitle":
    "No account. Saved locally. Download to PDF whenever you're happy with it.",
  "cta.button": "Open the editor",

  "footer.copy": "CV tool for",

  "builder.loading": "Loading your saved CV…",
  "builder.localStorage": "Saved locally · No account needed",
  "builder.tab.edit": "Edit",
  "builder.tab.preview": "Preview",

  "toolbar.template": "Template",
  "toolbar.accent": "Accent",
  "toolbar.classicGroup": "Classic (no photo)",
  "toolbar.industryGroup": "Industry (with photo)",
  "toolbar.example": "Example",
  "toolbar.examples": "Examples",
  "toolbar.clear": "Clear",
  "toolbar.confirmClear":
    "Clear all CV data? This cannot be undone.",
  "toolbar.print": "Print",
  "toolbar.download": "Download PDF",
  "toolbar.downloading": "Working…",
  "toolbar.downloadError":
    "Generating the PDF failed. Try the Print button and choose “Save as PDF”.",
  "toolbar.language": "Language",

  "section.personal": "Personal info",
  "section.summary": "Summary",
  "section.experience": "Work experience",
  "section.education": "Education",
  "section.skills": "Skills",
  "section.strengths": "Personal strengths",
  "section.projects": "Projects",
  "section.languages": "Languages",
  "section.certifications": "Certifications",

  "personal.fullName": "Full name",
  "personal.fullName.ph": "Sanne de Vries",
  "personal.title": "Job title",
  "personal.title.ph": "Senior Software Engineer",
  "personal.email": "Email",
  "personal.email.ph": "sanne@example.com",
  "personal.phone": "Phone",
  "personal.phone.ph": "+31 6 12 34 56 78",
  "personal.location": "Location",
  "personal.location.ph": "Amsterdam, NL",
  "personal.website": "Website",
  "personal.website.ph": "sannedevries.nl",
  "personal.linkedin": "LinkedIn",
  "personal.linkedin.ph": "linkedin.com/in/sannedevries",
  "personal.photo.upload": "Upload photo",
  "personal.photo.replace": "Replace photo",
  "personal.photo.uploading": "Uploading…",
  "personal.photo.remove": "Remove",
  "personal.photo.help": "Recommended: square, head and shoulders, < 1 MB.",
  "personal.photo.alt": "Profile photo",

  "summary.ph":
    "2–4 sentences about who you are, what you've delivered and where you're heading.",
  "summary.counter": "characters · aim for 300–600.",

  "exp.entry": "Role",
  "exp.add": "Add work experience",
  "exp.removeAria": "Remove role",
  "exp.role": "Role",
  "exp.role.ph": "Senior Developer",
  "exp.company": "Company",
  "exp.company.ph": "Acme Inc.",
  "exp.location": "Location",
  "exp.period": "Period",
  "exp.start.ph": "Jan 2022",
  "exp.end.ph": "Mar 2024",
  "exp.current": "I work here now",
  "exp.currentShort": "Present",
  "exp.bullets": "Bullet points",
  "exp.bullet.ph": "What you did, the impact, the numbers.",
  "exp.bullet.add": "Add bullet",
  "exp.bullet.removeAria": "Remove bullet",

  "edu.school": "School",
  "edu.school.ph": "TU Delft",
  "edu.degree": "Degree",
  "edu.degree.ph": "MSc",
  "edu.field": "Field of study",
  "edu.field.ph": "Computer Science",
  "edu.period": "Period",
  "edu.notes": "Notes (optional)",
  "edu.notes.ph": "Thesis, grades, relevant courses.",
  "edu.add": "Add education",
  "edu.removeAria": "Remove education",

  "skills.helper":
    "Search or pick from common professional skills. Don't see yours? Type it and press Enter.",
  "skills.empty":
    "No skills selected yet. Start typing to see suggestions.",
  "skills.search.ph": "Search or type a skill…",

  "strengths.helper":
    "Pick personal qualities that describe you. You can also add custom ones.",
  "strengths.empty":
    "No strengths selected yet. Search below or type your own.",
  "strengths.search.ph": "Search or type a strength…",

  "picker.search.ph": "Search…",
  "picker.remove": "Remove",
  "picker.addCustom": "Add: \"{q}\"",

  "prof.dialog.title": "Pick a profession",
  "prof.dialog.subtitle":
    "A filled-in CV to start from. Edit anything — your name, your experience, your skills, the lot.",
  "prof.dialog.close": "Close",
  "prof.dialog.confirmReplace":
    "This will replace the CV in the editor. Continue?",
  "prof.dialog.useTemplate": "Use this example",

  "prof.cleaner.name": "Cleaner",
  "prof.cleaner.tagline": "Offices, schools and care locations",
  "prof.warehouse.name": "Warehouse worker",
  "prof.warehouse.tagline": "Picking, reach truck, scanner and WMS",
  "prof.retail.name": "Sales associate",
  "prof.retail.tagline": "Shop floor, till and customer contact",
  "prof.housekeeper.name": "Housekeeper",
  "prof.housekeeper.tagline": "Private homes and home care",
  "prof.kitchen.name": "Kitchen assistant",
  "prof.kitchen.tagline": "Mise en place, dishwashing and HACCP",
  "prof.logistics.name": "Logistics employee",
  "prof.logistics.tagline": "Parcel depot and distribution centre",
  "prof.plumber.name": "Plumber",
  "prof.plumber.tagline": "Sanitary, central heating and leaks",
  "prof.construction.name": "Construction worker",
  "prof.construction.tagline": "New-build, bricklaying and plastering",
  "prof.admin.name": "Administrative assistant",
  "prof.admin.tagline": "Invoicing, ERP and customer contact",
  "prof.production.name": "Production worker",
  "prof.production.tagline": "Packing line, shift work and assembly",

  "projects.entry": "Project",
  "projects.name": "Name",
  "projects.name.ph": "Open Design Tokens",
  "projects.link": "Link",
  "projects.link.ph": "github.com/you/project",
  "projects.description": "Description",
  "projects.description.ph":
    "One sentence with impact. Add numbers if you have them.",
  "projects.add": "Add project",
  "projects.removeAria": "Remove project",

  "lang.name": "Language",
  "lang.name.ph": "Dutch",
  "lang.level": "Level",
  "lang.level.ph": "Choose",
  "lang.add": "Add language",
  "lang.removeAria": "Remove language",
  "lang.level.native": "Native",
  "lang.level.fluent": "Fluent",
  "lang.level.professional": "Professional",
  "lang.level.intermediate": "Intermediate",
  "lang.level.basic": "Basic",

  "cert.name": "Name",
  "cert.name.ph": "AWS Solutions Architect",
  "cert.issuer": "Issuer",
  "cert.issuer.ph": "Amazon Web Services",
  "cert.date": "Date",
  "cert.date.ph": "2024",
  "cert.link": "Link (optional)",
  "cert.link.ph": "credly.com/...",
  "cert.add": "Add certification",
  "cert.remove": "Remove",
  "cert.removeAria": "Remove certification",

  "section.dragAria": "Drag to reorder section",
  "section.toggleAria": "Expand or collapse section",

  "preview.placeholder.name": "Your name",
  "preview.present": "Present",
  "preview.contact.email": "Email",
  "preview.contact.phone": "Phone",
  "preview.contact.location": "Location",
  "preview.contact.website": "Website",
  "preview.contact.linkedin": "LinkedIn",
  "preview.footer.madeWith": "Made with MaakMijnCV",

  "tpl.section.summary": "Summary",
  "tpl.section.experience": "Work experience",
  "tpl.section.education": "Education",
  "tpl.section.skills": "Skills",
  "tpl.section.strengths": "Personal strengths",
  "tpl.section.projects": "Projects",
  "tpl.section.languages": "Languages",
  "tpl.section.certifications": "Certifications",
  "tpl.section.profile": "Profile",
  "tpl.section.aboutMe": "About me",
  "tpl.section.coreCompetencies": "Core competencies",
  "tpl.section.selectedProjects": "Selected projects",
  "tpl.section.profileSummary": "Profile summary",
  "tpl.section.clinical": "Clinical experience",
  "tpl.section.competencies": "Competencies",
  "tpl.section.diplomas": "Diplomas & licences",
  "tpl.retail.tagline": "Customer service",
  "tpl.tech.whoami": "$ whoami",
  "tpl.tech.contact": "// contact",
  "tpl.tech.summary": "// summary",
  "tpl.tech.experience": "// experience",
  "tpl.tech.education": "// education",
  "tpl.tech.projects": "// projects",
};

const DICTS: Record<Locale, Dict> = { nl: NL, en: EN };

const STORAGE_KEY = "maakmijncv:locale";

import { ensureSessionFresh, touchSession } from "./session";

function readLocale(): Locale {
  if (typeof window === "undefined") return "nl";
  ensureSessionFresh();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "nl" || raw === "en") return raw;
  } catch {}
  return "nl";
}

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", cb);
  }
  return () => {
    listeners.delete(cb);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", cb);
    }
  };
}

function getSnapshot(): Locale {
  return readLocale();
}

function getServerSnapshot(): Locale {
  return "nl";
}

function writeLocale(l: Locale) {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
    touchSession();
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  }
  emit();
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    touchSession();
    const interval = window.setInterval(() => {
      if (typeof document === "undefined") return;
      if (document.visibilityState === "visible") touchSession();
    }, 60_000);

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") touchSession();
      else touchSession();
    }
    function onPageHide() {
      touchSession();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  return <>{children}</>;
}

export function useLocale() {
  const locale = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const setLocale = React.useCallback((l: Locale) => writeLocale(l), []);
  const t = React.useCallback(
    (key: string) => {
      const dict = DICTS[locale];
      return dict[key] ?? DICTS.nl[key] ?? key;
    },
    [locale],
  );
  return { locale, setLocale, t };
}

export function useT() {
  return useLocale().t;
}

export function translate(locale: Locale, key: string): string {
  return DICTS[locale][key] ?? DICTS.nl[key] ?? key;
}
