"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { trackAnalyticsEvent } from "./analytics-client";

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
