import type { CV } from "@/lib/cv-types";
import { defaultRenderer, PhotoFrame, type BlockOpts } from "../blocks";
import { contactLine } from "../shared";

export function ConstructionTemplate({ cv }: { cv: CV }) {
  const accent = cv.accentColor;
  const opts: BlockOpts = {
    accent,
    heading: "filled-pill",
    textColor: "#1a1a1a",
  };

  return (
    <article className="text-[#1a1a1a]">
      <header
        className="-mx-10 -mt-10 mb-5 flex items-center gap-5 px-10 py-6 text-white"
        style={{ background: "#1f2933" }}
      >
        <PhotoFrame
          src={cv.personal.photo}
          size={110}
          shape="square"
          borderColor={accent}
        />
        <div className="flex-1">
          <h1 className="font-display text-[30px] font-extrabold uppercase leading-tight tracking-tight">
            {cv.personal.fullName || "Your Name"}
          </h1>
          {cv.personal.title && (
            <div
              className="text-[14px] font-semibold uppercase tracking-wide"
              style={{ color: accent }}
            >
              {cv.personal.title}
            </div>
          )}
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-[#cdd5db]">
            {contactLine(cv).map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        </div>
      </header>
      <div className="space-y-5">
        {cv.sectionOrder.map((k) => defaultRenderer(k, opts, cv))}
      </div>
    </article>
  );
}
