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

export function ConstructionTemplate({
  cv,
  lang = "nl",
}: {
  cv: CV;
  lang?: Locale;
}) {
  const accent = cv.accentColor;
  const opts: BlockOpts = {
    accent,
    heading: "filled-pill",
    textColor: "#1a1a1a",
    lang,
  };

  return (
    <article className="flex flex-1 flex-col text-[#1a1a1a]">
      <header
        className="mb-5 flex flex-wrap items-center gap-5 px-10 py-8 text-white"
        style={{ background: "#1f2933" }}
      >
        <PhotoFrame
          src={cv.personal.photo}
          size={110}
          shape="square"
          borderColor={accent}
          lang={lang}
          hidden={cv.photoHidden}
        />
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-[30px] font-extrabold uppercase leading-tight tracking-tight break-words">
            {cv.personal.fullName || placeholderName(lang)}
          </h1>
          {cv.personal.title && (
            <div
              className="text-[14px] font-semibold uppercase tracking-wide break-words"
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
              color="#cdd5db"
              accent={accent}
            />
          </div>
          <PersonalDetails
            cv={cv}
            lang={lang}
            layout="inline"
            color="#cdd5db"
            accent={accent}
            className="mt-1"
          />
        </div>
      </header>
      <div className="flex flex-1 flex-col px-10 pb-10">
        <div className="space-y-5">
          {cv.sectionOrder.map((k) => defaultRenderer(k, opts, cv))}
        </div>
        <PageFooter accent={accent} lang={lang} />
      </div>
    </article>
  );
}
