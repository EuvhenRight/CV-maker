"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { trackAnalyticsEvent } from "./analytics-client";
import type { CV } from "./cv-types";
import { translate, type Locale } from "./i18n";
import {
  dateRange,
  linkLabel,
  normalizeUrl,
  resolveStrengths,
  splitSkills,
} from "@/components/templates/shared";

interface DownloadOptions {
  fileName?: string;
  scale?: number;
}

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

function sanitizeFileName(name: string): string {
  const cleaned = name
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s_.-]/gu, "")
    .replace(/\s+/g, "_")
    .trim();
  return cleaned || "cv";
}

export async function downloadCVAsPdf(
  element: HTMLElement,
  options: DownloadOptions = {},
): Promise<void> {
  const { fileName = "cv", scale = 2 } = options;

  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    windowWidth: A4_WIDTH_PX,
    windowHeight: Math.max(element.scrollHeight, A4_HEIGHT_PX),
  });

  const pageWidthPx = A4_WIDTH_PX * scale;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  // Split the tall capture into A4 pages, reserving a top+bottom margin at every
  // internal page break so multi-page PDFs don't jam content against the page
  // edges. Both the image slices and the link annotations below share this same
  // page layout, so clickable regions stay aligned across pages.
  const bands = computePageBands(canvas.height / scale);
  const MM_PER_PX_Y = A4_HEIGHT_MM / A4_HEIGHT_PX;

  for (let i = 0; i < bands.length; i++) {
    if (i > 0) pdf.addPage();
    const band = bands[i];
    const srcTopPx = Math.round(band.srcTop * scale);
    const srcEndPx = Math.min(
      canvas.height,
      Math.round((band.srcTop + band.srcH) * scale),
    );
    const srcHeightPx = srcEndPx - srcTopPx;
    if (srcHeightPx <= 0) continue;

    const sliceCanvas = document.createElement("canvas");
    sliceCanvas.width = pageWidthPx;
    sliceCanvas.height = srcHeightPx;
    const ctx = sliceCanvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
    ctx.drawImage(
      canvas,
      0,
      srcTopPx,
      pageWidthPx,
      srcHeightPx,
      0,
      0,
      pageWidthPx,
      srcHeightPx,
    );

    const imgData = sliceCanvas.toDataURL("image/jpeg", 0.95);
    const destHeightMm = (srcHeightPx / scale) * MM_PER_PX_Y;
    pdf.addImage(
      imgData,
      "JPEG",
      0,
      band.destTopMm,
      A4_WIDTH_MM,
      destHeightMm,
      undefined,
      "FAST",
    );
  }

  // The pages are flattened bitmaps, so hyperlinks are baked-in pixels. Overlay
  // invisible, clickable link annotations on top of them by mapping each marked
  // element's on-screen box into PDF millimetres. Never let this break the save.
  try {
    addLinkAnnotations(pdf, element, bands);
  } catch (err) {
    console.error("PDF link annotations failed", err);
  }

  pdf.save(`${sanitizeFileName(fileName)}.pdf`);
  void trackAnalyticsEvent("download");
}

// One rendered A4 page: a horizontal band of the capture (measured in unscaled
// CSS px) drawn at `destTopMm` from the page top. PAGE_BREAK_MARGIN_PX of
// whitespace is reserved on each side of every internal break — matching the
// templates' own 40px (p-10) outer padding — while the document's very top and
// very bottom keep the padding the template already bakes in.
const PAGE_BREAK_MARGIN_PX = 40;

interface PageBand {
  srcTop: number;
  srcH: number;
  destTopMm: number;
}

function computePageBands(contentHeightCss: number): PageBand[] {
  const MM_PER_PX_Y = A4_HEIGHT_MM / A4_HEIGHT_PX;
  const bands: PageBand[] = [];
  let srcTop = 0;
  let pageIndex = 0;
  while (srcTop < contentHeightCss - 0.5 || bands.length === 0) {
    const topMargin = pageIndex === 0 ? 0 : PAGE_BREAK_MARGIN_PX;
    const remaining = contentHeightCss - srcTop;
    const maxWithoutBottom = A4_HEIGHT_PX - topMargin;
    const maxWithBottom = A4_HEIGHT_PX - topMargin - PAGE_BREAK_MARGIN_PX;
    let srcH: number;
    let isLast: boolean;
    if (remaining <= maxWithoutBottom) {
      srcH = remaining;
      isLast = true;
    } else {
      srcH = Math.max(maxWithBottom, 1);
      isLast = false;
    }
    bands.push({ srcTop, srcH, destTopMm: topMargin * MM_PER_PX_Y });
    srcTop += srcH;
    pageIndex++;
    if (isLast || pageIndex > 200) break;
  }
  return bands;
}

// Reads elements carrying a `data-pdf-link` marker (added by the PdfLink
// component in the templates) and draws a jsPDF link annotation over each one,
// mapping the element's on-screen box into the paginated PDF via `bands`.
function addLinkAnnotations(
  pdf: jsPDF,
  element: HTMLElement,
  bands: PageBand[],
): void {
  const MM_PER_PX_X = A4_WIDTH_MM / A4_WIDTH_PX;
  const MM_PER_PX_Y = A4_HEIGHT_MM / A4_HEIGHT_PX;
  const container = element.getBoundingClientRect();
  const nodes = element.querySelectorAll<HTMLElement>("[data-pdf-link]");

  nodes.forEach((node) => {
    const url = node.getAttribute("data-pdf-link");
    if (!url) return;
    // getClientRects() yields one box per line, so a wrapped link stays
    // clickable across every line it spans instead of one loose bounding box.
    const rects = node.getClientRects();
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      if (r.width <= 0 || r.height <= 0) continue;
      const relLeft = r.left - container.left;
      const relTop = r.top - container.top;
      const bandIndex = bands.findIndex(
        (b) => relTop >= b.srcTop && relTop < b.srcTop + b.srcH,
      );
      if (bandIndex < 0) continue;
      const band = bands[bandIndex];

      const x = relLeft * MM_PER_PX_X;
      const y = band.destTopMm + (relTop - band.srcTop) * MM_PER_PX_Y;
      const w = r.width * MM_PER_PX_X;
      let h = r.height * MM_PER_PX_Y;
      const bandBottomMm = band.destTopMm + band.srcH * MM_PER_PX_Y;
      if (y + h > bandBottomMm) h = bandBottomMm - y;

      pdf.setPage(bandIndex + 1);
      pdf.link(x, y, w, h, { url });
    }
  });
}

// ---------------------------------------------------------------------------
// Shared text-PDF helpers (used by the cover letter export below).
// ---------------------------------------------------------------------------

const MARGIN_MM = 18;
const CONTENT_WIDTH_MM = A4_WIDTH_MM - MARGIN_MM * 2;
const PAGE_BOTTOM_MM = A4_HEIGHT_MM - MARGIN_MM;

interface TextCtx {
  doc: jsPDF;
  y: number;
}

function ensureSpace(ctx: TextCtx, needed: number): void {
  if (ctx.y + needed > PAGE_BOTTOM_MM) {
    ctx.doc.addPage();
    ctx.y = MARGIN_MM;
  }
}

// ---------------------------------------------------------------------------
// Cover letter (sollicitatiebrief) — text-based PDF, single A4, standard
// Dutch business-letter layout.
// ---------------------------------------------------------------------------

export async function downloadCoverLetterAsPdf(
  cv: CV,
  lang: Locale,
  options: { fileName?: string } = {},
): Promise<void> {
  const { fileName = "Brief" } = options;
  const letter = cv.coverLetter;
  if (!letter) return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });
  const ctx: TextCtx = { doc, y: MARGIN_MM };

  doc.setFont("times", "normal");
  doc.setTextColor(20, 20, 20);

  // Sender block — top right
  const sender = [
    cv.personal.fullName,
    cv.personal.location,
    cv.personal.phone,
    cv.personal.email,
  ].filter(Boolean);
  if (sender.length > 0) {
    doc.setFontSize(10);
    for (const line of sender) {
      const w = doc.getTextWidth(line);
      doc.text(line, A4_WIDTH_MM - MARGIN_MM - w, ctx.y);
      ctx.y += 4.5;
    }
    ctx.y += 6;
  }

  // Recipient block
  doc.setFontSize(11);
  const recipientLines = [
    letter.recipientCompany,
    letter.recipientName ? `T.a.v. ${letter.recipientName}` : "",
    letter.recipientAddress,
    letter.recipientCity,
  ].filter(Boolean);
  for (const line of recipientLines) {
    ensureSpace(ctx, 5);
    doc.text(line, MARGIN_MM, ctx.y);
    ctx.y += 5;
  }
  if (recipientLines.length > 0) ctx.y += 4;

  // Date / place
  if (letter.date) {
    ensureSpace(ctx, 5);
    doc.text(letter.date, MARGIN_MM, ctx.y);
    ctx.y += 7;
  }

  // Subject
  if (letter.subject) {
    ensureSpace(ctx, 5);
    doc.setFont("times", "bold");
    const subjLabel = "Betreft:";
    doc.text(subjLabel, MARGIN_MM, ctx.y);
    const labelW = doc.getTextWidth(subjLabel) + 1.5;
    doc.setFont("times", "normal");
    const subjText = letter.vacancyRef
      ? `${letter.subject} (${letter.vacancyRef})`
      : letter.subject;
    const subjLines = doc.splitTextToSize(
      subjText,
      CONTENT_WIDTH_MM - labelW,
    ) as string[];
    doc.text(subjLines[0] ?? "", MARGIN_MM + labelW, ctx.y);
    ctx.y += 5;
    for (let i = 1; i < subjLines.length; i++) {
      ensureSpace(ctx, 5);
      doc.text(subjLines[i], MARGIN_MM + labelW, ctx.y);
      ctx.y += 5;
    }
    ctx.y += 3;
  }

  // Salutation
  const salutation = letter.recipientName
    ? `${translate(lang, "letter.salutation")} ${letter.recipientName},`
    : `${translate(lang, "letter.salutation")} heer/mevrouw,`;
  ensureSpace(ctx, 5);
  doc.text(salutation, MARGIN_MM, ctx.y);
  ctx.y += 7;

  const paragraph = (text: string) => {
    if (!text) return;
    const blocks = text.split("\n");
    for (const block of blocks) {
      if (!block.trim()) {
        ctx.y += 3;
        continue;
      }
      const lines = doc.splitTextToSize(block, CONTENT_WIDTH_MM) as string[];
      for (const ln of lines) {
        ensureSpace(ctx, 5);
        doc.text(ln, MARGIN_MM, ctx.y);
        ctx.y += 5;
      }
      ctx.y += 2.5;
    }
    ctx.y += 2;
  };

  paragraph(letter.opening);
  paragraph(letter.body);
  paragraph(letter.closing);

  // Sign-off
  ensureSpace(ctx, 25);
  ctx.y += 4;
  doc.text(translate(lang, "letter.signoff"), MARGIN_MM, ctx.y);
  ctx.y += 20;
  doc.setFont("times", "bold");
  doc.text(cv.personal.fullName || "—", MARGIN_MM, ctx.y);
  ctx.y += 5;
  if (cv.personal.title) {
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(cv.personal.title, MARGIN_MM, ctx.y);
  }

  doc.save(`${sanitizeFileName(fileName)}.pdf`);
  void trackAnalyticsEvent("download");
}

// ---------------------------------------------------------------------------
// ATS-friendly CV — a single-column, plain-text PDF. Unlike downloadCVAsPdf
// (which rasterises the styled preview to an image that scanners cannot read),
// this emits real, selectable text that applicant tracking systems can parse.
// ---------------------------------------------------------------------------

function atsBody(
  ctx: TextCtx,
  text: string,
  opts: {
    size?: number;
    style?: "normal" | "bold" | "italic";
    color?: [number, number, number];
    indent?: number;
    gapAfter?: number;
  } = {},
): void {
  const size = opts.size ?? 10;
  const indent = opts.indent ?? 0;
  ctx.doc.setFont("helvetica", opts.style ?? "normal");
  ctx.doc.setFontSize(size);
  const [r, g, b] = opts.color ?? [30, 30, 30];
  ctx.doc.setTextColor(r, g, b);
  const lineH = size * 0.3528 * 1.25;
  const lines = ctx.doc.splitTextToSize(
    text,
    CONTENT_WIDTH_MM - indent,
  ) as string[];
  for (const ln of lines) {
    ensureSpace(ctx, lineH);
    ctx.doc.text(ln, MARGIN_MM + indent, ctx.y);
    ctx.y += lineH;
  }
  if (opts.gapAfter) ctx.y += opts.gapAfter;
}

function atsSectionHeading(ctx: TextCtx, text: string): void {
  ctx.y += 3.5;
  ensureSpace(ctx, 9);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setFontSize(11);
  ctx.doc.setTextColor(20, 20, 20);
  ctx.doc.text(text.toUpperCase(), MARGIN_MM, ctx.y);
  ctx.y += 1.6;
  ctx.doc.setDrawColor(170, 170, 170);
  ctx.doc.setLineWidth(0.3);
  ctx.doc.line(MARGIN_MM, ctx.y, A4_WIDTH_MM - MARGIN_MM, ctx.y);
  ctx.y += 4;
}

function atsBulletLine(ctx: TextCtx, text: string): void {
  const size = 10;
  const lineH = size * 0.3528 * 1.25;
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(size);
  ctx.doc.setTextColor(30, 30, 30);
  const lines = ctx.doc.splitTextToSize(text, CONTENT_WIDTH_MM - 6) as string[];
  lines.forEach((ln, i) => {
    ensureSpace(ctx, lineH);
    if (i === 0) ctx.doc.text("-", MARGIN_MM + 1.5, ctx.y);
    ctx.doc.text(ln, MARGIN_MM + 6, ctx.y);
    ctx.y += lineH;
  });
}

// Renders `text` as a clickable link instead of dumping a raw (often long) URL
// as visible text — keeps the credential reachable without an ugly URL blob.
function atsLink(ctx: TextCtx, text: string, url: string): void {
  const size = 10;
  const lineH = size * 0.3528 * 1.25;
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(size);
  ctx.doc.setTextColor(30, 30, 30);
  const lines = ctx.doc.splitTextToSize(text, CONTENT_WIDTH_MM) as string[];
  for (const ln of lines) {
    ensureSpace(ctx, lineH);
    ctx.doc.textWithLink(ln, MARGIN_MM, ctx.y, { url });
    ctx.y += lineH;
  }
}

export async function downloadCVAsAtsPdf(
  cv: CV,
  lang: Locale,
  options: { fileName?: string } = {},
): Promise<void> {
  const { fileName = "CV" } = options;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });
  const ctx: TextCtx = { doc, y: MARGIN_MM };
  const p = cv.personal;
  const tr = (k: string) => translate(lang, k);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(15, 15, 15);
  doc.text(p.fullName || tr("preview.placeholder.name"), MARGIN_MM, ctx.y);
  ctx.y += 8;

  if (p.title) atsBody(ctx, p.title, { size: 11.5, color: [70, 70, 70] });

  const contact = [
    p.email,
    p.phone,
    p.location,
    p.website,
    p.linkedin,
    p.github,
  ].filter(Boolean) as string[];
  if (contact.length > 0)
    atsBody(ctx, contact.join("   |   "), { size: 9.5, color: [55, 55, 55] });

  const detailPairs: Array<[string | undefined, string]> = [
    [p.dateOfBirth, "personal.dateOfBirth"],
    [p.nationality, "personal.nationality"],
    [p.workEligibility, "personal.workEligibility"],
    [p.drivingLicense, "personal.drivingLicense"],
    [p.bigNumber, "personal.bigNumber"],
    [p.agbCode, "personal.agbCode"],
  ];
  const details = detailPairs
    .filter(([v]) => v && v.trim())
    .map(([v, k]) => `${tr(k)}: ${v}`);
  if (details.length > 0)
    atsBody(ctx, details.join("   |   "), { size: 9, color: [90, 90, 90] });

  for (const key of cv.sectionOrder) {
    switch (key) {
      case "summary": {
        if (!cv.summary.trim()) break;
        atsSectionHeading(ctx, tr("tpl.section.summary"));
        atsBody(ctx, cv.summary, { gapAfter: 1 });
        break;
      }
      case "experience": {
        if (cv.experience.length === 0) break;
        atsSectionHeading(ctx, tr("tpl.section.experience"));
        for (const e of cv.experience) {
          const title = [e.role, e.company].filter(Boolean).join(" — ");
          if (title) atsBody(ctx, title, { size: 10.5, style: "bold" });
          const meta = [
            e.location,
            dateRange(e.startDate, e.endDate, e.current, lang),
          ]
            .filter(Boolean)
            .join("   ·   ");
          if (meta) atsBody(ctx, meta, { size: 9.5, color: [90, 90, 90] });
          for (const b of e.bullets.filter(Boolean)) atsBulletLine(ctx, b);
          ctx.y += 2.5;
        }
        break;
      }
      case "education": {
        if (cv.education.length === 0) break;
        atsSectionHeading(ctx, tr("tpl.section.education"));
        for (const ed of cv.education) {
          const hasDegree = [ed.degree, ed.field].filter(Boolean).length > 0;
          const title = hasDegree
            ? [ed.degree, ed.field].filter(Boolean).join(", ")
            : ed.school;
          if (title) atsBody(ctx, title, { size: 10.5, style: "bold" });
          const meta = [
            hasDegree ? ed.school : "",
            dateRange(ed.startDate, ed.endDate, undefined, lang),
          ]
            .filter(Boolean)
            .join("   ·   ");
          if (meta) atsBody(ctx, meta, { size: 9.5, color: [90, 90, 90] });
          if (ed.description)
            atsBody(ctx, ed.description, { size: 9.5, color: [60, 60, 60] });
          ctx.y += 2.5;
        }
        break;
      }
      case "skills": {
        const { technical, professional } = splitSkills(cv, lang);
        if (technical.length === 0 && professional.length === 0) break;
        atsSectionHeading(ctx, tr("tpl.section.skills"));
        if (technical.length > 0)
          atsBody(ctx, `${tr("tpl.skills.technical")}: ${technical.join(", ")}`);
        if (professional.length > 0)
          atsBody(
            ctx,
            `${tr("tpl.skills.professional")}: ${professional.join(", ")}`,
          );
        ctx.y += 1;
        break;
      }
      case "strengths": {
        if (cv.strengths.length === 0) break;
        atsSectionHeading(ctx, tr("tpl.section.strengths"));
        atsBody(ctx, resolveStrengths(cv, lang).join(", "), { gapAfter: 1 });
        break;
      }
      case "projects": {
        if (cv.projects.length === 0) break;
        atsSectionHeading(ctx, tr("tpl.section.projects"));
        for (const pr of cv.projects) {
          if (pr.name) atsBody(ctx, pr.name, { size: 10.5, style: "bold" });
          const links = [
            pr.link ? `Live: ${linkLabel(pr.link)}` : "",
            pr.github ? `GitHub: ${linkLabel(pr.github)}` : "",
          ]
            .filter(Boolean)
            .join("   ·   ");
          if (links) atsBody(ctx, links, { size: 9.5, color: [70, 70, 70] });
          if (pr.description)
            atsBody(ctx, pr.description, { size: 9.5, color: [60, 60, 60] });
          ctx.y += 2.5;
        }
        break;
      }
      case "languages": {
        if (cv.languages.length === 0) break;
        atsSectionHeading(ctx, tr("tpl.section.languages"));
        atsBody(
          ctx,
          cv.languages
            .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
            .filter(Boolean)
            .join(",   "),
          { gapAfter: 1 },
        );
        break;
      }
      case "certifications": {
        if (cv.certifications.length === 0) break;
        atsSectionHeading(ctx, tr("tpl.section.certifications"));
        for (const c of cv.certifications) {
          const parts = [c.name, c.issuer].filter(Boolean).join(" — ");
          const line = c.date ? `${parts} (${c.date})` : parts;
          if (!line) continue;
          // A link becomes a clickable credential on the title, rather than a
          // long raw URL printed as visible text.
          if (c.link.trim()) atsLink(ctx, line, normalizeUrl(c.link));
          else atsBody(ctx, line, { size: 10 });
          ctx.y += 1;
        }
        break;
      }
    }
  }

  doc.save(`${sanitizeFileName(fileName)}.pdf`);
  void trackAnalyticsEvent("download");
}
