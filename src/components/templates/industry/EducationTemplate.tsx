import type { CV } from "@/lib/cv-types";
import type { Locale } from "@/lib/i18n";
import {
  ContactRows,
  defaultRenderer,
  PageFooter,
  PersonalDetails,
  PhotoFrame,
  type BlockOpts,
} from "../blocks";
import { placeholderName } from "../shared";

export function EducationTemplate({
  cv,
  lang = "nl",
}: {
  cv: CV;
  lang?: Locale;
}) {
  const accent = cv.accentColor;
  const opts: BlockOpts = {
    accent,
    heading: "serif-caps",
    textColor: "#2a2a2a",
    lang,
  };

  return (
    <article
      className="flex flex-1 flex-col p-10 text-[#2a2a2a]"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <header
        className="mb-5 flex flex-wrap items-center gap-5 rounded-md p-4"
        style={{ background: "#FAF6EE", border: `1px solid ${accent}22` }}
      >
        <PhotoFrame
          src={cv.personal.photo}
          size={112}
          shape="rounded"
          borderColor={accent}
          lang={lang}
          hidden={cv.photoHidden}
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-[26px] font-bold leading-tight break-words">
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
          <div className="mt-2">
            <ContactRows
              cv={cv}
              lang={lang}
              layout="inline"
              color="#666"
              accent={accent}
            />
          </div>
          <PersonalDetails
            cv={cv}
            lang={lang}
            layout="inline"
            color="#666"
            accent={accent}
            className="mt-1"
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
