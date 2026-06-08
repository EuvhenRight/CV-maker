import type { CV } from "@/lib/cv-types";
import { translate, type Locale } from "@/lib/i18n";
import {
  ContactRows,
  defaultRenderer,
  PageFooter,
  PhotoFrame,
  type BlockOpts,
} from "../blocks";
import { placeholderName } from "../shared";

export function RetailTemplate({
  cv,
  lang = "nl",
}: {
  cv: CV;
  lang?: Locale;
}) {
  const accent = cv.accentColor;
  const t = (k: string) => translate(lang, k);
  const opts: BlockOpts = { accent, heading: "bold-large", lang };

  return (
    <article className="flex flex-1 flex-col p-10 text-[#1a1a1a]">
      <header className="mb-5 grid grid-cols-[110px_1fr] gap-5">
        <PhotoFrame
          src={cv.personal.photo}
          size={110}
          shape="rounded"
          borderColor={accent}
          lang={lang}
          hidden={cv.photoHidden}
        />
        <div className="min-w-0">
          <div
            className="font-display text-[11px] font-bold uppercase tracking-[0.2em] break-words"
            style={{ color: accent }}
          >
            {t("tpl.retail.tagline")}
          </div>
          <h1 className="font-display text-[28px] font-extrabold leading-tight break-words">
            {cv.personal.fullName || placeholderName(lang)}
          </h1>
          {cv.personal.title && (
            <div className="text-[14px] text-[#555] break-words">
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
      <div
        className="mb-5 h-1 w-full rounded-full"
        style={{ background: accent }}
      />
      <div className="space-y-5">
        {cv.sectionOrder.map((k) => defaultRenderer(k, opts, cv))}
      </div>
      <PageFooter accent={accent} lang={lang} />
    </article>
  );
}
