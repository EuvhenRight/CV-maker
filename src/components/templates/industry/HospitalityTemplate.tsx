import type { CV } from "@/lib/cv-types";
import { defaultRenderer, PhotoFrame, type BlockOpts } from "../blocks";
import { contactLine } from "../shared";

export function HospitalityTemplate({ cv }: { cv: CV }) {
  const accent = cv.accentColor;
  const opts: BlockOpts = { accent, heading: "serif-caps" };

  return (
    <article
      className="text-[#1a1a1a]"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <header className="mb-5 flex flex-col items-center text-center">
        <PhotoFrame
          src={cv.personal.photo}
          size={120}
          shape="circle"
          borderColor={accent}
        />
        <h1 className="mt-3 text-[28px] font-bold uppercase tracking-[0.12em]">
          {cv.personal.fullName || "Jouw naam"}
        </h1>
        {cv.personal.title && (
          <div
            className="text-[14px] italic"
            style={{ color: accent }}
          >
            {cv.personal.title}
          </div>
        )}
        <div className="mt-2 h-px w-24" style={{ background: accent }} />
        <div className="mt-2 text-[11px] text-[#555]">
          {contactLine(cv).join("  ·  ")}
        </div>
      </header>
      <div className="space-y-5">
        {cv.sectionOrder.map((k) => defaultRenderer(k, opts, cv))}
      </div>
    </article>
  );
}
