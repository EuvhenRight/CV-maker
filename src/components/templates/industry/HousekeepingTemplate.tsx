import type { CV } from "@/lib/cv-types";
import type { Locale } from "@/lib/i18n";
import {
  ContactRows,
  defaultRenderer,
  PageFooter,
  PhotoFrame,
  type BlockOpts,
} from "../blocks";
import { placeholderName } from "../shared";

export function HousekeepingTemplate({
  cv,
  lang = "nl",
}: {
  cv: CV;
  lang?: Locale;
}) {
  const accent = cv.accentColor;
  const opts: BlockOpts = { accent, heading: "side-bar", lang };

  return (
    <article className="flex flex-1 flex-col p-10 text-[#2a2a2a]">
      <header
        className="mb-5 flex flex-wrap items-center gap-5 rounded-2xl p-5"
        style={{ background: "#F4F1EA" }}
      >
        <PhotoFrame
          src={cv.personal.photo}
          size={112}
          shape="circle"
          borderColor="#A3CBA9"
          lang={lang}
        />
        <div className="min-w-0 flex-1">
          <h1
            className="font-display text-[26px] font-bold leading-tight break-words"
            style={{ color: accent }}
          >
            {cv.personal.fullName || placeholderName(lang)}
          </h1>
          {cv.personal.title && (
            <div className="text-[13px] text-[#5a5a5a] break-words">
              {cv.personal.title}
            </div>
          )}
          <div className="mt-2">
            <ContactRows
              cv={cv}
              lang={lang}
              layout="inline"
              color="#666"
              accent={accent}
            />
          </div>
        </div>
      </header>
      <div className="space-y-5">
        {cv.sectionOrder.map((k) => defaultRenderer(k, opts, cv))}
      </div>
      <PageFooter accent={accent} lang={lang} />
    </article>
  );
}
