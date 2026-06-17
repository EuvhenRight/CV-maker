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
import { placeholderName, softTextOn, textOn } from "../shared";

export function DeliveryTemplate({
  cv,
  lang = "nl",
}: {
  cv: CV;
  lang?: Locale;
}) {
  const accent = cv.accentColor;
  const opts: BlockOpts = { accent, heading: "underline", lang };
  const headerText = textOn(accent);
  const headerMuted = softTextOn(accent);

  return (
    <article className="flex flex-1 flex-col text-[#1a1919]">
      <header
        className="mb-5 flex flex-wrap items-center gap-5 px-10 pb-5 pt-10"
        style={{ background: accent, color: headerText }}
      >
        <PhotoFrame
          src={cv.personal.photo}
          size={108}
          shape="rounded"
          borderColor={headerText}
          lang={lang}
          hidden={cv.photoHidden}
        />
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-[28px] font-extrabold leading-tight break-words">
            {cv.personal.fullName || placeholderName(lang)}
          </h1>
          {cv.personal.title && (
            <div
              className="text-[14px] font-medium break-words"
              style={{ color: headerMuted }}
            >
              {cv.personal.title}
            </div>
          )}
          <div className="mt-2">
            <ContactRows
              cv={cv}
              lang={lang}
              layout="inline"
              color={headerMuted}
              accent={headerMuted}
            />
          </div>
          <PersonalDetails
            cv={cv}
            lang={lang}
            layout="inline"
            color={headerMuted}
            accent={headerText}
            className="mt-1"
          />
        </div>
      </header>
      <div className="flex flex-1 flex-col px-10 pb-10">
        <div className="grid grid-cols-1 gap-5">
          {cv.sectionOrder.map((k) => defaultRenderer(k, opts, cv))}
        </div>
        <PageFooter accent={accent} lang={lang} />
      </div>
    </article>
  );
}
