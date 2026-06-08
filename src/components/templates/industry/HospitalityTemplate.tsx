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

export function HospitalityTemplate({
  cv,
  lang = "nl",
}: {
  cv: CV;
  lang?: Locale;
}) {
  const accent = cv.accentColor;
  const opts: BlockOpts = { accent, heading: "serif-caps", lang };

  return (
    <article
      className="flex flex-1 flex-col p-10 text-[#1a1a1a]"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <header className="mb-5 flex flex-col items-center text-center">
        <PhotoFrame
          src={cv.personal.photo}
          size={120}
          shape="circle"
          borderColor={accent}
          lang={lang}
          hidden={cv.photoHidden}
        />
        <h1 className="mt-3 text-[28px] font-bold uppercase tracking-[0.12em] break-words">
          {cv.personal.fullName || placeholderName(lang)}
        </h1>
        {cv.personal.title && (
          <div
            className="text-[14px] italic break-words"
            style={{ color: accent }}
          >
            {cv.personal.title}
          </div>
        )}
        <div className="mt-2 h-px w-24" style={{ background: accent }} />
        <div className="mt-2 flex justify-center">
          <ContactRows
            cv={cv}
            lang={lang}
            layout="inline"
            color="#555"
            accent={accent}
          />
        </div>
      </header>
      <div className="space-y-5">
        {cv.sectionOrder.map((k) => defaultRenderer(k, opts, cv))}
      </div>
      <PageFooter accent={accent} lang={lang} />
    </article>
  );
}
