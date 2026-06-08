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

  pdf.save(`${sanitizeFileName(fileName)}.pdf`);
  void trackAnalyticsEvent("download");
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
