import type { CV } from "@/lib/cv-types";
import { defaultRenderer, PhotoFrame, type BlockOpts } from "../blocks";
import { contactLine, textOn, softTextOn } from "../shared";

export function DeliveryTemplate({ cv }: { cv: CV }) {
  const accent = cv.accentColor;
  const opts: BlockOpts = { accent, heading: "underline" };
  const headerText = textOn(accent);
  const headerMuted = softTextOn(accent);

  return (
    <article className="text-[#1a1919]">
      <header
        className="-mx-10 -mt-10 mb-5 flex items-center gap-5 px-10 pb-5 pt-7"
        style={{ background: accent, color: headerText }}
      >
        <PhotoFrame
          src={cv.personal.photo}
          size={108}
          shape="rounded"
          borderColor={headerText}
        />
        <div className="flex-1">
          <h1 className="font-display text-[28px] font-extrabold leading-tight">
            {cv.personal.fullName || "Jouw naam"}
          </h1>
          {cv.personal.title && (
            <div
              className="text-[14px] font-medium"
              style={{ color: headerMuted }}
            >
              {cv.personal.title}
            </div>
          )}
          <div
            className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px]"
            style={{ color: headerMuted }}
          >
            {contactLine(cv).map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-5">
        {cv.sectionOrder.map((k) => defaultRenderer(k, opts, cv))}
      </div>
    </article>
  );
}
