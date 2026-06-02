import type { CV } from "@/lib/cv-types";
import { defaultRenderer, PhotoFrame, type BlockOpts } from "../blocks";

export function RetailTemplate({ cv }: { cv: CV }) {
  const accent = cv.accentColor;
  const opts: BlockOpts = { accent, heading: "bold-large" };

  return (
    <article className="text-[#1a1a1a]">
      <header className="mb-5 grid grid-cols-[110px_1fr] gap-5">
        <PhotoFrame
          src={cv.personal.photo}
          size={110}
          shape="rounded"
          borderColor={accent}
        />
        <div>
          <div
            className="font-display text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            Customer Experience
          </div>
          <h1 className="font-display text-[28px] font-extrabold leading-tight">
            {cv.personal.fullName || "Jouw naam"}
          </h1>
          {cv.personal.title && (
            <div className="text-[14px] text-[#555]">{cv.personal.title}</div>
          )}
          <div className="mt-2 flex flex-wrap gap-x-3 text-[11px] text-[#666]">
            {cv.personal.email && <span>{cv.personal.email}</span>}
            {cv.personal.phone && <span>{cv.personal.phone}</span>}
            {cv.personal.location && <span>{cv.personal.location}</span>}
          </div>
        </div>
      </header>
      <div
        className="mb-5 h-1 w-full rounded-full"
        style={{ background: `${accent}33` }}
      >
        <div
          className="h-full rounded-full"
          style={{ background: accent, width: "60%" }}
        />
      </div>
      <div className="space-y-5">
        {cv.sectionOrder.map((k) => defaultRenderer(k, opts, cv))}
      </div>
    </article>
  );
}
