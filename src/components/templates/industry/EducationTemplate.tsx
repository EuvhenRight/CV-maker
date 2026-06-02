import type { CV } from "@/lib/cv-types";
import { defaultRenderer, PhotoFrame, type BlockOpts } from "../blocks";
import { contactLine } from "../shared";

export function EducationTemplate({ cv }: { cv: CV }) {
  const accent = cv.accentColor;
  const opts: BlockOpts = {
    accent,
    heading: "serif-caps",
    textColor: "#2a2a2a",
  };

  return (
    <article
      className="text-[#2a2a2a]"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <header
        className="mb-5 flex items-center gap-5 rounded-md p-4"
        style={{ background: "#FAF6EE", border: `1px solid ${accent}22` }}
      >
        <PhotoFrame
          src={cv.personal.photo}
          size={112}
          shape="rounded"
          borderColor={accent}
        />
        <div>
          <h1 className="text-[26px] font-bold leading-tight">
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
          <div className="mt-2 text-[11px] text-[#666]">
            {contactLine(cv).join("  ·  ")}
          </div>
        </div>
      </header>
      <div className="space-y-5">
        {cv.sectionOrder.map((k) => defaultRenderer(k, opts, cv))}
      </div>
    </article>
  );
}
