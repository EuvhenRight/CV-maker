import type { CV } from "@/lib/cv-types";
import { defaultRenderer, PageFooter, PhotoFrame, type BlockOpts } from "../blocks";
import { contactLine } from "../shared";

export function HousekeepingTemplate({ cv }: { cv: CV }) {
  const accent = cv.accentColor;
  const opts: BlockOpts = { accent, heading: "side-bar" };

  return (
    <article className="flex flex-1 flex-col p-10 text-[#2a2a2a]">
      <header
        className="mb-5 flex items-center gap-5 rounded-2xl p-5"
        style={{ background: "#F4F1EA" }}
      >
        <PhotoFrame
          src={cv.personal.photo}
          size={112}
          shape="circle"
          borderColor="#A3CBA9"
        />
        <div>
          <h1
            className="font-display text-[26px] font-bold leading-tight"
            style={{ color: accent }}
          >
            {cv.personal.fullName || "Jouw naam"}
          </h1>
          {cv.personal.title && (
            <div className="text-[13px] text-[#5a5a5a]">
              {cv.personal.title}
            </div>
          )}
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-[#666]">
            {contactLine(cv).map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        </div>
      </header>
      <div className="my-auto space-y-5">
        {cv.sectionOrder.map((k) => defaultRenderer(k, opts, cv))}
      </div>
      <PageFooter accent={accent} />
    </article>
  );
}
