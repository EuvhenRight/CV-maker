"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { trackAnalyticsEvent } from "./analytics-client";
import type { CV } from "./cv-types";
import { translate, type Locale } from "./i18n";

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
  const pageHeightPx = A4_HEIGHT_PX * scale;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const totalPages = Math.max(1, Math.ceil(canvas.height / pageHeightPx));

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    if (pageIndex > 0) pdf.addPage();

    const sliceCanvas = document.createElement("canvas");
    sliceCanvas.width = pageWidthPx;
    const remaining = canvas.height - pageIndex * pageHeightPx;
    const sliceHeight = Math.min(pageHeightPx, remaining);
    sliceCanvas.height = sliceHeight;
    const ctx = sliceCanvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
    ctx.drawImage(
      canvas,
      0,
      pageIndex * pageHeightPx,
      pageWidthPx,
      sliceHeight,
      0,
      0,
      pageWidthPx,
      sliceHeight,
    );

    const imgData = sliceCanvas.toDataURL("image/jpeg", 0.95);
    const sliceHeightMm = (sliceHeight / pageHeightPx) * A4_HEIGHT_MM;
    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      A4_WIDTH_MM,
      sliceHeightMm,
      undefined,
      "FAST",
    );
  }

  // The pages are flattened bitmaps, so hyperlinks are baked-in pixels. Overlay
  // invisible, clickable link annotations on top of them by mapping each marked
  // element's on-screen box into PDF millimetres. Never let this break the save.
  try {
    addLinkAnnotations(pdf, element, totalPages);
  } catch (err) {
    console.error("PDF link annotations failed", err);
  }

  pdf.save(`${sanitizeFileName(fileName)}.pdf`);
  void trackAnalyticsEvent("download");
}

// Reads elements carrying a `data-pdf-link` marker (added by the PdfLink
// component in the templates) and draws a jsPDF link annotation over each one.
// The capture target renders at exactly A4_WIDTH_PX CSS pixels (scale 1), so
// CSS pixels map linearly to millimetres and page N covers the CSS y-band
// [N*A4_HEIGHT_PX, (N+1)*A4_HEIGHT_PX).
function addLinkAnnotations(
  pdf: jsPDF,
  element: HTMLElement,
  totalPages: number,
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
      const pageIndex = Math.floor(relTop / A4_HEIGHT_PX);
      if (pageIndex < 0 || pageIndex >= totalPages) continue;

      const x = relLeft * MM_PER_PX_X;
      const y = (relTop - pageIndex * A4_HEIGHT_PX) * MM_PER_PX_Y;
      const w = r.width * MM_PER_PX_X;
      let h = r.height * MM_PER_PX_Y;
      if (y + h > A4_HEIGHT_MM) h = A4_HEIGHT_MM - y;

      pdf.setPage(pageIndex + 1);
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
