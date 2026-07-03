# MaakMijnCV — SEO Strategy & Implementation

**Project:** MaakMijnCV (`cv-maker-red-sigma.vercel.app`)
**Framework:** Next.js 16.2.7 (App Router) · React 19 · Tailwind 4
**Market:** Netherlands · Dutch primary, English secondary
**Goal:** Maximum organic reach to NL jobseekers
**Author:** Yevhen Uhnivenko · Pro bono, no paywall, no signup
**Date:** 2026-07-03

---

## 0. Executive summary

MaakMijnCV shipped as a functional product with essentially **no discoverability**: title + meta description only, no sitemap, no robots, no structured data, no OG image, a client-only home page with no SSR content for bots, and no canonical. The competitive market it entered is dense (CVMaker.nl, Novoresume, Jobbird, Werk.nl, Zety, Kickresume) and paywalled — a free, ATS-friendly, Dutch-first tool has a real wedge, **but only if it is findable**.

This document is paired with a code implementation (see §10). After the changes, the site now ships:

- Full HTML `<head>` metadata (title template, canonical, OG, Twitter, robots, verification stub, viewport, theme)
- 5 JSON-LD schema types on the home page (`Organization`, `WebSite`, `WebApplication`, `BreadcrumbList`, `FAQPage`) rendered server-side in initial HTML
- Auto-generated 1200×630 OG + Twitter images
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest` as Next.js metadata routes
- AI-search bot allowlist (GPTBot, Perplexity, ClaudeBot, Google-Extended, etc.)
- Security headers (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- `/analytics` fully `noindex`ed (internal dashboard)

The remaining wins — 90 % of them — are **content and locale routing**, not tags. The strategy below prioritizes those.

---

## 1. Complete SEO audit

Priority buckets are ordered by business impact on organic acquisition to NL jobseekers.

### 1.1 Critical issues (fix now — high priority)

| # | Finding | Why it matters | Status |
|---|---|---|---|
| C1 | No sitemap, no robots.txt | Google can't discover pages nor understand crawl budget | **Fixed** — [src/app/sitemap.ts](src/app/sitemap.ts), [src/app/robots.ts](src/app/robots.ts) |
| C2 | No canonical | Duplicate-URL risk on Vercel preview + prod, breaks link consolidation | **Fixed** — set in layout + per-page |
| C3 | No structured data | Zero eligibility for rich results, no entity signal to knowledge graph, near-invisible in AI Overviews | **Fixed** — 5 schemas on home, 2 on /builder |
| C4 | Home page is `"use client"` — content is JS-rendered | Bots that don't execute JS get an empty shell. Vertex/Anthropic/OpenAI crawlers often don't render. | **Mitigated** — `useSyncExternalStore` returns Dutch server snapshot, so SSR HTML now contains real content; also added visible FAQ |
| C5 | No hreflang / no separate locale URLs | Google can't rank a Dutch page for Dutch queries and an English page for English queries when they share one URL | **Deferred to Phase 2** — see §12 |
| C6 | No OG / Twitter image | Zero social CTR, weak SERP thumbnails | **Fixed** — dynamic [opengraph-image.tsx](src/app/opengraph-image.tsx) |
| C7 | Weak, generic title + description on home | Wastes the single highest-signal SEO surface | **Fixed** — see §3 |
| C8 | `/analytics` publicly reachable, indexable | Internal dashboard should never appear in SERPs | **Fixed** — full noindex + robots disallow |
| C9 | Domain is a Vercel preview URL (`cv-maker-red-sigma.vercel.app`) | Brand penalty for AI Overview citations, weak backlink profile, no memorable brand | **Blocked on user** — recommend `maakmijncv.nl` in Phase 2 |

### 1.2 Medium priority

| # | Finding | Why it matters | Action |
|---|---|---|---|
| M1 | No breadcrumbs UI on `/builder` | Weak entity graph, no BreadcrumbList content-match | Add visible breadcrumb bar or keep JSON-LD only (currently JSON-LD-only) |
| M2 | Language switch does not change URL — uses `localStorage` | English users share `/` URL; Google indexes only Dutch | Phase 2: rewrite to `/` (nl) + `/en` |
| M3 | No `<h1>` uniqueness enforced across pages | `/builder` currently has a `<label>` heading but no `<h1>` | Add `<h1 class="sr-only">CV editor</h1>` in `/builder` |
| M4 | `LanguageSwitcher` uses a `<select>` for locale toggle | Works, but for SEO adds friction and hides the alternate URL | Phase 2: turn switcher into `<Link>` to `/en` |
| M5 | No 404 page (`not-found.tsx`) | Broken links serve default Next.js 404 with no navigation back into the site | Add [src/app/not-found.tsx](src/app/not-found.tsx) with links to `/` and `/builder` |
| M6 | Images in `public/` are all raw SVG or unoptimized PNG (`screenshot-home.png` is 380 KB, `screenshot-editor.png` similar) | LCP + CLS risk if they land on hero, wasted bytes | Convert screenshots to AVIF/WebP; use `next/image` when embedding |
| M7 | No verification tokens wired (GSC / Bing / Yandex) | Can't monitor rankings, crawl errors, coverage | Add Google Search Console verification meta tag — stub in [src/app/layout.tsx](src/app/layout.tsx) |
| M8 | No `noscript` fallback in root layout | Users (and some primitive crawlers) with JS disabled see nothing | Content is now SSR-rendered so most is visible; add `<noscript>` CTA to `/builder` |

### 1.3 Low priority

| # | Finding | Action |
|---|---|---|
| L1 | Package name is `cybersoek` in `package.json` — doesn't match product name | Rename to `maakmijncv` before publishing under a real domain |
| L2 | Google Fonts loaded (`Poppins`, `Noto_Sans`) with 7 weight files preloaded | Consider dropping weights not used above the fold to shrink LCP payload |
| L3 | No `apple-icon.png` | Ships default; add for iOS home-screen polish |
| L4 | No sitemap ping to Google | Google auto-discovers via `robots.txt`; ping via GSC after launch |
| L5 | Cybersoek partnership not surfaced on-page for EEAT | Add a small footer paragraph or `/over` page mentioning the Cybersoek programme (already partially present) |

### 1.4 Core Web Vitals & performance signals

| Metric | Baseline (rough — needs field measurement) | Target |
|---|---|---|
| LCP | ~1.6s (Vercel Edge, minimal hero image) | < 2.5s ✅ likely already passing |
| INP | Unknown — measure via Vercel Analytics | < 200ms |
| CLS | Low (fixed-size layouts) | < 0.1 ✅ likely passing |
| TTFB | ~200ms Vercel Edge | < 800ms ✅ passing |

Field data will surface after Vercel Analytics accumulates traffic + connecting Google Search Console.

---

## 2. Keyword research

### 2.1 Cluster map (topical authority)

Every page or planned page maps to a cluster head + supporting queries. Clusters ordered by traffic × intent value.

#### Cluster A — "CV maken" (core, highest volume)

| Keyword | Intent | KD (rough) | Business value | Target page |
|---|---|---|---|---|
| cv maken | Transactional | High | ⭐⭐⭐⭐⭐ | `/` |
| cv maken gratis | Transactional | Medium | ⭐⭐⭐⭐⭐ | `/` |
| cv maken online | Transactional | Medium | ⭐⭐⭐⭐ | `/` |
| gratis cv maker | Transactional | Medium | ⭐⭐⭐⭐⭐ | `/` |
| cv bouwen online | Transactional | Low-Med | ⭐⭐⭐⭐ | `/` |
| cv maken zonder account | Transactional | Low | ⭐⭐⭐⭐⭐ | `/` (winner USP) |

#### Cluster B — "CV template / voorbeeld"

| Keyword | Intent | KD | Value | Target page |
|---|---|---|---|---|
| cv template | Info→Trans | High | ⭐⭐⭐⭐ | `/templates` (new) |
| cv voorbeeld | Informational | High | ⭐⭐⭐⭐ | `/cv-voorbeeld` (new) |
| cv voorbeeld gratis | Info→Trans | Medium | ⭐⭐⭐⭐ | `/cv-voorbeeld` |
| cv template gratis word | Informational | Medium | ⭐⭐⭐ | Blog: "CV templates gratis" |
| moderne cv template | Info | Low-Med | ⭐⭐⭐ | `/templates/modern` (new) |

#### Cluster C — "ATS CV"

| Keyword | Intent | KD | Value | Target page |
|---|---|---|---|---|
| ats cv | Informational | Medium | ⭐⭐⭐⭐ | `/blog/ats-cv-nederland` |
| ats vriendelijk cv | Informational | Low-Med | ⭐⭐⭐⭐ | `/blog/ats-cv-nederland` |
| ats systeem | Informational | Medium | ⭐⭐⭐ | `/blog/wat-is-een-ats-systeem` |
| ats cv template | Info→Trans | Low-Med | ⭐⭐⭐⭐ | `/templates` |

#### Cluster D — Sollicitatiebrief / cover letter

| Keyword | Intent | KD | Value | Target page |
|---|---|---|---|---|
| sollicitatiebrief maken | Transactional | High | ⭐⭐⭐⭐⭐ | `/sollicitatiebrief` (new landing) |
| sollicitatiebrief voorbeeld | Informational | High | ⭐⭐⭐⭐ | `/sollicitatiebrief-voorbeeld` |
| motivatiebrief voorbeeld | Informational | Medium | ⭐⭐⭐ | `/motivatiebrief` |
| sollicitatiebrief opbouw | Informational | Low-Med | ⭐⭐⭐ | Blog |

#### Cluster E — Industry / profession landing (long-tail, high commercial value)

| Keyword | Intent | KD | Value | Target page |
|---|---|---|---|---|
| cv voorbeeld verpleegkundige | Info→Trans | Low | ⭐⭐⭐⭐ | `/cv-voorbeeld/zorg` |
| cv voorbeeld horeca | Info→Trans | Low | ⭐⭐⭐⭐ | `/cv-voorbeeld/horeca` |
| cv voorbeeld it | Info→Trans | Low | ⭐⭐⭐⭐ | `/cv-voorbeeld/it` |
| cv voorbeeld bouw | Info→Trans | Low | ⭐⭐⭐ | `/cv-voorbeeld/bouw` |
| cv voorbeeld magazijn | Info→Trans | Low | ⭐⭐⭐ | `/cv-voorbeeld/magazijn` |
| … (one per industry template) | | | | one page each |

10 industry template pages → 10 landing pages with real intent + low competition.

#### Cluster F — Local (Amsterdam, Cybersoek)

| Keyword | Intent | KD | Value | Target page |
|---|---|---|---|---|
| werk zoeken amsterdam | Informational | High | ⭐⭐⭐ | Editorial link |
| cybersoek cv | Branded | Very low | ⭐⭐⭐⭐ | `/cybersoek` (partner page) |
| cv maken amsterdam | Local trans. | Low | ⭐⭐⭐ | `/cv-maken-amsterdam` |

#### Cluster G — Question-based (AI Overviews / People Also Ask)

| Question | Cluster | Target |
|---|---|---|
| Hoe schrijf ik een goede CV? | A | Blog `/blog/goed-cv-schrijven` |
| Hoe lang mag een CV zijn? | A | Blog `/blog/cv-lengte-nederland` |
| Wat is een ATS? | C | Blog `/blog/wat-is-een-ats-systeem` |
| Moet ik een foto op mijn CV zetten? | A | Blog `/blog/foto-op-cv-2026` (very hot topic in NL) |
| Wat schrijf ik in een sollicitatiebrief? | D | Blog `/blog/sollicitatiebrief-opbouw` |
| Wat is CEFR-niveau? | E | Blog `/blog/cefr-taalniveau-cv` |
| Is mijn CV AVG-veilig? | Transactional-adjacent | Blog `/blog/cv-avg-privacy` |

#### Cluster H — English (secondary)

| Keyword | Intent | Value | Target |
|---|---|---|---|
| free CV builder Netherlands | Transactional | ⭐⭐⭐⭐ | `/en` |
| Dutch CV template | Info | ⭐⭐⭐ | `/en/blog/dutch-cv-template` |
| resume for jobs in Netherlands | Info | ⭐⭐⭐⭐ | `/en/blog/dutch-cv-guide` |
| expat CV Amsterdam | Info | ⭐⭐⭐ | `/en/blog/expat-cv-amsterdam` |

### 2.2 Keyword → page mapping (summary)

| Page | Primary keyword | Secondary keywords |
|---|---|---|
| `/` | cv maken gratis | gratis cv maker, cv maken online, cv maken zonder account, ATS CV |
| `/builder` | cv editor online | cv bouwen, cv aanpassen online |
| `/cv-voorbeeld` *(new)* | cv voorbeeld | cv voorbeeld gratis, curriculum vitae voorbeeld |
| `/cv-voorbeeld/{industry}` *(new × 10)* | cv voorbeeld {industry} | {industry} cv template |
| `/templates` *(new)* | cv template | moderne cv template, ats cv template |
| `/sollicitatiebrief` *(new)* | sollicitatiebrief maken | sollicitatiebrief voorbeeld, motivatiebrief |
| `/en` *(new)* | free CV builder Netherlands | ATS CV Netherlands, resume builder Dutch |
| `/over` *(new)* | maakmijncv | over maakmijncv, cybersoek partner |

---

## 3. On-page SEO (per page)

### 3.1 Home `/`

| Field | Value |
|---|---|
| SEO title (≤60) | Gratis CV maken in 5 minuten — ATS-vriendelijke templates |
| Meta description (≤155) | Maak online een professioneel CV met 14 gratis templates. ATS-vriendelijk, met of zonder foto, downloadbaar als A4-PDF. Geen account. |
| H1 | Een werk-klaar CV in vijf minuten. *(already present in [HomePage.tsx](src/app/HomePage.tsx))* |
| H2 order | 1) Minder moeite. Meer kans op een baan. 2) Templates voor 10 branches. 3) Klassieke ATS-templates. 4) Veelgestelde vragen. |
| Internal links | `/builder`, `/cv-voorbeeld` (phase 2), `/sollicitatiebrief` (phase 2), `/over` (phase 2) |
| External authority | cybersoek.nl (already), UWV, KvK — optional in `/over` |
| Anchor texts | "Open editor", "Bekijk templates", "Kies een beroep" |
| Alt text | All template thumbnails: "CV template voor {industry} — MaakMijnCV" |
| Schemas | `WebSite`, `Organization`, `WebApplication`, `BreadcrumbList`, `FAQPage` ✅ shipped |
| Entities | MaakMijnCV, Cybersoek, ATS, CEFR, PDF, A4, sollicitatiebrief |
| Semantic terms | curriculum vitae, sollicitatie, werkervaring, opleiding, vaardigheden, PDF, ATS |

### 3.2 `/builder`

| Field | Value |
|---|---|
| SEO title | CV editor — bewerk je CV met live voorbeeld |
| Meta description | Vul je CV in met live voorbeeld en directe PDF-export. Werkt in je browser, geen account. Kies uit 14 templates. |
| H1 | *needs adding* — `<h1 class="sr-only">CV editor</h1>` |
| Internal links | Back to `/`, `/templates`, `/sollicitatiebrief` |
| Schemas | `WebApplication`, `BreadcrumbList` ✅ shipped |

### 3.3 `/analytics`

Fully `noindex, nofollow, nocache, noimageindex, max-snippet:0`. Also disallowed in `robots.txt`. ✅ shipped.

### 3.4 Templates for future pages

**Industry landing pages** (e.g. `/cv-voorbeeld/zorg`):

- Title: `CV voorbeeld verpleegkundige — gratis template — MaakMijnCV`
- Description: Real 155-char CV example for {profession} with fields specific to the branche.
- H1: `CV voorbeeld voor verpleegkundigen`
- Sections: filled example, industry-specific tips (BIG-nummer, ORCID, etc.), CTA to `/builder?profession=nurse`
- Schema: `Article`, `HowTo`, `BreadcrumbList`

---

## 4. Content strategy — topical authority

### 4.1 Structure

```
Pillar page: "CV maken" (/)
├─ Cluster head: "CV voorbeeld" (/cv-voorbeeld)
│   ├─ /cv-voorbeeld/zorg
│   ├─ /cv-voorbeeld/horeca
│   ├─ /cv-voorbeeld/it
│   ├─ /cv-voorbeeld/bouw
│   ├─ /cv-voorbeeld/onderwijs
│   ├─ /cv-voorbeeld/retail
│   ├─ /cv-voorbeeld/administratie
│   ├─ /cv-voorbeeld/logistiek
│   ├─ /cv-voorbeeld/schoonmaak
│   └─ /cv-voorbeeld/keuken
├─ Cluster head: "CV templates" (/templates)
│   ├─ /templates/modern
│   ├─ /templates/klassiek
│   └─ /templates/creatief
├─ Cluster head: "Sollicitatiebrief" (/sollicitatiebrief)
│   ├─ /sollicitatiebrief-voorbeeld
│   └─ /motivatiebrief-voorbeeld
├─ Editorial blog (/blog)
│   ├─ /blog/goed-cv-schrijven
│   ├─ /blog/cv-lengte-nederland
│   ├─ /blog/foto-op-cv-2026            ← very high AI Overview potential
│   ├─ /blog/wat-is-een-ats-systeem
│   ├─ /blog/ats-cv-nederland
│   ├─ /blog/cefr-taalniveau-cv
│   ├─ /blog/cv-avg-privacy
│   └─ /blog/expat-cv-amsterdam         ← English
├─ Partner: /cybersoek                  ← EEAT + local relevance
└─ EEAT: /over  /privacy  /contact
```

### 4.2 First 12 articles (priority backlog)

| # | Slug | Target keyword | Search intent | Words | Schema | CTA |
|---|---|---|---|---|---|---|
| 1 | `/cv-voorbeeld` | cv voorbeeld | Info→Trans | 1200 | `Article`, `ItemList` | Open editor |
| 2 | `/cv-voorbeeld/zorg` | cv voorbeeld verpleegkundige | Info→Trans | 900 | `Article`, `HowTo` | Editor prefilled |
| 3 | `/cv-voorbeeld/it` | cv voorbeeld it | Info→Trans | 900 | `Article`, `HowTo` | Editor prefilled |
| 4 | `/cv-voorbeeld/horeca` | cv voorbeeld horeca | Info→Trans | 800 | `Article`, `HowTo` | Editor prefilled |
| 5 | `/templates` | cv template gratis | Info→Trans | 1000 | `Article`, `ItemList` | Editor |
| 6 | `/sollicitatiebrief` | sollicitatiebrief maken | Trans. | 1200 | `Article`, `HowTo` | Editor |
| 7 | `/blog/foto-op-cv-2026` | foto op cv | Info | 1500 | `Article`, `FAQPage` | Editor |
| 8 | `/blog/goed-cv-schrijven` | goed cv schrijven | Info | 1800 | `Article`, `HowTo` | Editor |
| 9 | `/blog/wat-is-een-ats-systeem` | wat is een ats systeem | Info | 1200 | `Article`, `FAQPage` | Editor |
| 10 | `/blog/cv-lengte-nederland` | hoe lang mag een cv zijn | Info | 800 | `Article` | Editor |
| 11 | `/blog/cefr-taalniveau-cv` | cefr niveau cv | Info | 800 | `Article`, `Table` | Editor |
| 12 | `/blog/cv-avg-privacy` | cv avg | Info | 900 | `Article` | Editor |

**Each article template** (deliverable outline):
- Target keyword in H1, first 100 words, one H2
- 3–5 H2 sections mirroring "People Also Ask" for that query
- 1 comparison / how-to table
- FAQ block at the bottom (3–6 Qs) with matching `FAQPage` schema
- Internal link to the pillar page + at least 2 sibling articles
- Author byline linking to `/over`
- Last-updated date (visible + `dateModified` in schema)
- CTA that prefills the editor with the relevant profession template

### 4.3 EEAT built in

- Byline on every editorial page → `/over` (Author page)
- "Vaktermen gecheckt met UWV / Cybersoek partner" line where applicable
- Every article dated + last-updated visible
- Cite Rijksoverheid, UWV, KvK, ILO, EU CEFR when using regulatory or statistical claims

---

## 5. Technical SEO

### 5.1 What's shipped (see §10 for file references)

| Item | File | Status |
|---|---|---|
| `robots.txt` (dynamic, allows AI bots explicitly) | [src/app/robots.ts](src/app/robots.ts) | ✅ |
| `sitemap.xml` (dynamic, `<lastmod>` from build) | [src/app/sitemap.ts](src/app/sitemap.ts) | ✅ |
| PWA manifest | [src/app/manifest.ts](src/app/manifest.ts) | ✅ |
| OG image (1200×630 dynamic) | [src/app/opengraph-image.tsx](src/app/opengraph-image.tsx) | ✅ |
| Twitter image | [src/app/twitter-image.tsx](src/app/twitter-image.tsx) | ✅ |
| Icon | [src/app/icon.svg](src/app/icon.svg) | ✅ existing, re-used |
| Canonical | Set per route via `alternates.canonical` | ✅ |
| Robots directives | `robots` + `googleBot` in metadata | ✅ |
| Meta viewport / theme | `Viewport` export in root layout | ✅ |
| Security headers | HSTS, XCTO, Referrer-Policy, Permissions-Policy | ✅ [next.config.ts](next.config.ts) |
| Structured data — Organization | Root layout | ✅ |
| Structured data — WebSite | Root layout | ✅ |
| Structured data — WebApplication | `/`, `/builder` | ✅ |
| Structured data — BreadcrumbList | `/`, `/builder` | ✅ |
| Structured data — FAQPage (matches visible FAQ) | `/` | ✅ |

### 5.2 Deferred / Phase 2

| Item | Recommendation |
|---|---|
| Hreflang | Ship after locale routing (`/` = nl, `/en/*` = en). Then add `alternates.languages` in each page and in `sitemap.ts`. |
| `Article` / `HowTo` schema | Ship with the first blog page. |
| Review schema | Ship after collecting 5+ real testimonials — never fabricate. |
| Video sitemap | Only if a product-demo video is added. |
| Product schema | N/A (free tool, not a product SKU). |
| Local Business schema | N/A (not a physical business). |

### 5.3 Verification tokens

Stubs in [src/app/layout.tsx](src/app/layout.tsx) — uncomment when you connect:

```ts
verification: {
  google: "your-google-site-verification-token",
  other: { "msvalidate.01": "your-bing-token" },
},
```

Register at:
- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters
- Yandex Webmaster (optional): https://webmaster.yandex.com

Submit `${SITE_URL}/sitemap.xml` in each.

---

## 6. AI Search Optimization (AISO / GEO)

Optimizing for AI answer engines is not the same as ranking on Google's blue links. AI Overviews, ChatGPT Search, Perplexity, and Gemini all pull from a smaller set of highly cited, entity-clear sources.

### 6.1 What's shipped for AI SERP visibility

| Signal | How | Status |
|---|---|---|
| Explicit AI-bot allowlist | `robots.txt` allow GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended | ✅ |
| Entity clarity — `Organization` + `WebApplication` schema | Names, `@id`, `sameAs`, `founder`, `audience`, `offers` | ✅ |
| Fact-dense FAQ block with `FAQPage` schema | 6 Q&As on home, in Dutch, answering exactly the queries AI Overviews are triggered by | ✅ |
| Semantic HTML — `<dt>`/`<dd>` for the FAQ | Answer engines prefer machine-readable Q/A pairs | ✅ |
| Server-rendered content, not client-only | AI crawlers rarely execute JS. Home now SSRs Dutch content via `getServerSnapshot` | ✅ |
| Author + publisher schema | Signals human authorship, not spam | ✅ |
| Free tool with clear pricing (`price: 0 EUR`) | `Offer` schema — inputs to comparison-style AI answers | ✅ |
| Audience declaration | `Jobseekers in the Netherlands` → geographic disambiguation | ✅ |

### 6.2 What still to do for AI ranking

1. **Publish comparison content.** LLMs love tables of "X vs Y". Write `/blog/gratis-cv-maker-vergelijken` comparing MaakMijnCV honestly against paid tools (Zety, CVMaker, Novoresume). Ship a `HowTo` + `Comparison` (custom itemList) schema.
2. **Cite primary sources by name.** UWV, Rijksoverheid, KvK, CEFR — LLMs weight sources that themselves cite institutional publishers.
3. **Add stable "About" and factual pages.** `/over`, `/privacy`, `/contact` — entity resolution improves.
4. **Consistency across the web.** Same brand name + description on GitHub, LinkedIn, Cybersoek partner page.
5. **Get one Wikipedia-adjacent citation.** A mention on a jobseeker-support NGO page or Cybersoek's site with a link and description feeds the knowledge graph.

---

## 7. EEAT

Google's Search Quality Rater Guidelines are the operational definition of EEAT — Experience, Expertise, Authoritativeness, Trust.

| Signal | Current | Recommendation |
|---|---|---|
| **Experience** | Solo project, no in-content author byline visible | Add "Made by Yevhen Uhnivenko, product engineer — pro bono for Cybersoek Amsterdam" in footer link to `/over` |
| **Expertise** | No credentials shown | On `/over`: LinkedIn + GitHub links, one paragraph on relevant background |
| **Authoritativeness** | Cybersoek partnership mentioned in footer + README | Elevate: dedicated `/cybersoek` page; ask Cybersoek to link back to `/` from cybersoek.nl (backlink + entity signal) |
| **Trust** | No `/privacy`, no `/contact`, no clear data-handling statement | Add `/privacy` (data never leaves the browser — this is a real differentiator, use it), `/contact` (email + GitHub issues) |
| MIT license visible | ✅ in footer | Keep |
| Vercel Analytics only, no third-party trackers | ✅ | Advertise this: "No trackers. No third-party cookies. AVG-safe." |

### Missing pages to add (in order)

1. `/over` — Author bio, project story, EEAT signals
2. `/privacy` — Concrete data statement (no server storage, 60min TTL localStorage)
3. `/contact` — email + GitHub
4. `/cybersoek` — Partner page

---

## 8. Conversion SEO

Users found via organic must convert to "Open editor" clicks — that's the funnel.

| Recommendation | Current | Action |
|---|---|---|
| CTA above the fold on home | ✅ present ("Start gratis") | Keep |
| CTA sticky on scroll (mobile) | ❌ | Add sticky bottom-bar CTA on mobile only |
| Trust badges (no signup, no paywall, MIT, AVG) | Partial — as USP list | Elevate: badges row directly under H1 |
| Template preview thumbnails | ✅ excellent — 14 SVG cards | Keep — one of the site's strongest conversion signals |
| Social proof / testimonials | ❌ | Add once collected. Two options: (a) Cybersoek quote, (b) real jobseekers with consent |
| Forms | Editor itself is the "form" — instant preview | Excellent UX. No changes. |
| Navigation | Minimal | Add breadcrumbs on `/builder` for orientation |
| Funnel: `/` → `/builder` → PDF download | Fast, no friction | Track PDF download event in Vercel Analytics + internal `analytics-store` |
| Exit-intent (mobile) | ❌ | Skip — bad UX |

### Landing-page micro-improvements for conversion

- Move the "USP list" (Gratis · Geen account · Auto-opslag · ATS-vriendelijk · Met foto · PDF-export) directly under H1 rather than under the sub-headline — helps skimmers.
- Add one screenshot near the templates section showing the editor in use (mobile + desktop split).
- Add "Kies je beroep" (profession picker) as a secondary CTA path from the home hero, not only from the editor.

---

## 9. Performance optimization

Next.js 16 + Turbopack + Vercel Edge gives a strong baseline. Concrete improvements:

| Item | Recommendation | Difficulty | Impact |
|---|---|---|---|
| Image formats | Config now enforces `avif` + `webp` | Low — shipped | LCP -20-40 % on hero |
| Google Fonts weight count | Currently 6 Poppins + 4 Noto Sans weights loaded | Medium — audit usage | 30-60 KB font savings |
| Lazy-load below-fold sections | Currently everything renders eagerly | Low — wrap templates section in `<Suspense>` after LCP is measured | Small |
| Preload key routes | Add `<Link prefetch>` on the top CTA — Next.js Link already does this | Free | Faster nav to `/builder` |
| Client-only heavy libs (`html2canvas-pro`, `jspdf`) | Only load on `/builder`, gated behind user action | Verify already tree-shaken on `/` | LCP savings on home |
| Route-level code splitting | Next.js App Router does this automatically | Free | — |
| CDN | Vercel Edge Network | Already on | — |
| Compression | `compress: true` in [next.config.ts](next.config.ts) | ✅ shipped | Small (~5 % transfer) |
| Cache-Control on sitemap / robots | Explicit `max-age=3600` + `s-maxage=86400` | ✅ shipped | Edge cost |
| Critical CSS | Tailwind 4 handles this well | Free | — |
| Screenshot images (`screenshot-home.png` 380 KB) | Convert to AVIF via `next/image` | Low | LCP if used above fold |

### Core Web Vitals monitoring

Turn on `@vercel/analytics/next` Web Vitals in code (already installed). Add:

```tsx
import { SpeedInsights } from "@vercel/speed-insights/next";
// in <body>
<SpeedInsights />
```

Then track: LCP, INP, CLS in Vercel dashboard weekly.

---

## 10. Code implementation — what was shipped

This section documents exactly what changed in this session so a reader can review each file.

### 10.1 New files

| File | Purpose |
|---|---|
| [src/lib/seo.ts](src/lib/seo.ts) | Single source of truth for `SITE_URL`, base metadata, and 5 JSON-LD generators (Organization, WebSite, WebApplication, BreadcrumbList, FAQPage). Also the `HOME_FAQ_NL` list used by both the visible FAQ and the schema. |
| [src/components/seo/JsonLd.tsx](src/components/seo/JsonLd.tsx) | Server component that renders one or many JSON-LD `<script>` blocks. Uses `suppressHydrationWarning` since the object serialization is stable. |
| [src/app/sitemap.ts](src/app/sitemap.ts) | Dynamic sitemap for `/` and `/builder`. `/analytics` intentionally omitted. |
| [src/app/robots.ts](src/app/robots.ts) | Allows `/`, disallows `/analytics` + `/api/`. Explicit `Allow: /` for AI bots (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended). |
| [src/app/manifest.ts](src/app/manifest.ts) | PWA manifest — brand colors, lang `nl-NL`, references the existing `icon.svg`. |
| [src/app/opengraph-image.tsx](src/app/opengraph-image.tsx) | Dynamic 1200×630 OG image using `next/og`'s `ImageResponse`. Brand-colored, Dutch copy, no external font fetch. |
| [src/app/twitter-image.tsx](src/app/twitter-image.tsx) | Re-uses the OG image default export. Twitter uses `summary_large_image` card. |
| [src/app/HomePage.tsx](src/app/HomePage.tsx) | The previous `page.tsx` renamed. Client component — kept intact and extended with a visible FAQ section that matches the `FAQPage` schema. |

### 10.2 Rewritten files

| File | What changed |
|---|---|
| [src/app/layout.tsx](src/app/layout.tsx) | Rich `Metadata` (title template, canonical, robots, googleBot, keywords, OG, Twitter, author, publisher, category, formatDetection), `Viewport` export (theme color for light/dark), font `display: "swap"`, JSON-LD injection of `Organization` + `WebSite`. |
| [src/app/page.tsx](src/app/page.tsx) | Now a **server component** that exports page-specific metadata, injects `WebApplication` + `BreadcrumbList` + `FAQPage` JSON-LD, and renders `<HomePage />` client child. |
| [src/app/builder/page.tsx](src/app/builder/page.tsx) | Richer metadata, canonical `/builder`, JSON-LD `WebApplication` + `BreadcrumbList`. |
| [src/app/analytics/page.tsx](src/app/analytics/page.tsx) | Strictly `noindex`, `nofollow`, `nocache`, `noimageindex`, `max-snippet:0`. |
| [next.config.ts](next.config.ts) | `poweredByHeader: false`, `compress: true`, `images.formats: [avif, webp]`, security headers (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy), Cache-Control on sitemap/robots. |

### 10.3 Verified in build output

`npm run build` produced these prerendered static routes:

```
Route (app)                    Size  Kind
○ /                            …    Static
○ /_not-found                  …    Static
○ /analytics                   …    Static  (noindexed)
○ /builder                     …    Static
○ /icon.svg                    …    Static
○ /manifest.webmanifest        …    Static
○ /opengraph-image             …    Static
○ /robots.txt                  …    Static
○ /sitemap.xml                 …    Static
○ /twitter-image               …    Static
```

Verified rendered `<head>` contains: title, description, canonical, OG (7 tags), Twitter (7 tags), robots, googlebot, theme-color, viewport, manifest, icon, JSON-LD (10 script blocks — including `Organization`, `WebSite`, `WebApplication`, `BreadcrumbList`, `FAQPage`).

Verified sitemap.xml, robots.txt, manifest.webmanifest bodies render correctly.

### 10.4 Reusable code excerpts

**Set your custom domain** — one env var swap:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://maakmijncv.nl
```

**Add Google Search Console verification** — uncomment in [src/app/layout.tsx](src/app/layout.tsx):

```ts
verification: {
  google: "your-google-site-verification-token",
},
```

**Add a new page with SEO** — the pattern:

```tsx
// src/app/cv-voorbeeld/page.tsx
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CV voorbeeld gratis — 14 templates",
  description: "…",
  alternates: { canonical: "/cv-voorbeeld" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "CV voorbeeld", url: `${SITE_URL}/cv-voorbeeld` },
      ])} />
      <ClientContent />
    </>
  );
}
```

---

## 11. 90-day roadmap

### Days 1–7 (foundation)

- [x] Ship technical SEO (done in this PR)
- [ ] Create Google Search Console account, verify property, wire token
- [ ] Create Bing Webmaster Tools account, verify
- [ ] Submit `sitemap.xml` in both
- [ ] Set up GA4 (optional — Vercel Analytics may be enough)
- [ ] Register `maakmijncv.nl` (or chosen custom domain), configure DNS on Vercel, add `NEXT_PUBLIC_SITE_URL` env var, redirect old Vercel URL → custom
- [ ] Rename `package.json` from `cybersoek` → `maakmijncv`
- [ ] Optimize `public/screenshot-home.png` + `screenshot-editor.png` to AVIF via `next/image`

### Days 8–30 (locale routing + first cluster)

- [ ] **Locale routing.** Restructure app to `/` (nl) + `/en/*`. Rewrite `LocaleProvider` to derive from URL, not `localStorage`. Update `sitemap.ts` with `alternates.languages`. Add hreflang tags via `alternates.languages` in metadata.
- [ ] `/over` (author page) — EEAT signal
- [ ] `/privacy` — differentiator content
- [ ] `/contact` — trust
- [ ] `/cybersoek` — partner + backlink signal
- [ ] `not-found.tsx` — helpful 404
- [ ] `<h1>` on `/builder`
- [ ] First 3 blog articles: `/blog/foto-op-cv-2026`, `/blog/goed-cv-schrijven`, `/blog/wat-is-een-ats-systeem`
- [ ] Ping Cybersoek to add a link from `cybersoek.nl` → `maakmijncv.nl` (first authority backlink)

### Days 31–60 (industry landing pages)

- [ ] Ship 10 industry pages: `/cv-voorbeeld/{zorg|it|horeca|bouw|onderwijs|retail|administratie|logistiek|schoonmaak|keuken}` — one per existing profession template
- [ ] Each page: filled example, industry tips, "Prefill editor" CTA that opens `/builder?profession={id}`
- [ ] Add `Article` + `BreadcrumbList` + `FAQPage` schema to each
- [ ] Interlink: every industry page links to the pillar `/cv-voorbeeld` + 2 sibling industries

### Days 61–90 (authority + editorial)

- [ ] `/sollicitatiebrief`, `/sollicitatiebrief-voorbeeld`, `/motivatiebrief` (Cluster D)
- [ ] `/templates` overview + `/templates/{modern|klassiek|creatief}`
- [ ] 6 more editorial blog articles from Cluster G
- [ ] English mirror of top-performing pages (Cluster H)
- [ ] Speed Insights review — LCP/INP audit + fix
- [ ] Outreach: request one backlink from UWV Werkbedrijf, one from an NGO in the jobseeker space (Nibud, Leger des Heils WerkPlus)

---

## 12. Priority checklist

- [x] **High** — Sitemap, robots, canonical, OG, structured data — *shipped*
- [x] **High** — Home + builder metadata — *shipped*
- [x] **High** — `/analytics` noindex — *shipped*
- [x] **High** — Security headers — *shipped*
- [ ] **High** — Custom domain (`maakmijncv.nl`) + GSC verification
- [ ] **High** — Locale routing (`/` nl, `/en/*`)
- [ ] **High** — `/over`, `/privacy`, `/contact` pages
- [ ] **High** — First 3 blog articles (foto op cv, goed cv schrijven, ATS)
- [ ] **Medium** — 10 industry landing pages
- [ ] **Medium** — `/sollicitatiebrief` landing
- [ ] **Medium** — Cybersoek backlink
- [ ] **Medium** — Optimize screenshot PNGs → AVIF
- [ ] **Medium** — `<h1>` on `/builder`, breadcrumbs UI
- [ ] **Low** — Testimonials once collected
- [ ] **Low** — Apple touch icon
- [ ] **Low** — Comparison page vs. paid tools

---

## 13. Action items ranked by ROI

Ordered by *effort ↓ impact* — do row 1 first, then work down.

| Rank | Action | Effort | Impact | Notes |
|---|---|---|---|---|
| 1 | **Verify GSC + submit sitemap** | 30 min | ★★★★★ | Baseline monitoring, otherwise you cannot measure anything below |
| 2 | Custom domain + `NEXT_PUBLIC_SITE_URL` | 1 h | ★★★★★ | All the SEO work becomes brand-consistent |
| 3 | Ship the technical SEO (this PR) | *done* | ★★★★★ | Foundation for everything else |
| 4 | Locale routing (`/` nl, `/en/*`) + hreflang | 1 day | ★★★★☆ | Unblocks EN market + doubles indexed page count |
| 5 | 10 industry landing pages (each 1–2 h) | 2 weeks | ★★★★☆ | Long-tail traffic; each page targets a real, low-KD query |
| 6 | `/over`, `/privacy`, `/contact` | 3 h | ★★★★☆ | EEAT — the single most under-rated ranking factor |
| 7 | `/blog/foto-op-cv-2026` | 3 h | ★★★★☆ | Trending 2026 NL query — high AI Overview probability |
| 8 | Cybersoek backlink | 1 email | ★★★☆☆ | First real authority link |
| 9 | `/sollicitatiebrief` landing | 3 h | ★★★★☆ | Existing cover-letter feature — untapped SEO surface |
| 10 | Comparison content ("gratis CV maker vergelijken") | 4 h | ★★★☆☆ | AI-answer bait |
| 11 | Screenshot AVIF conversion | 30 min | ★★☆☆☆ | LCP improvement |
| 12 | Speed Insights + Web Vitals fixes | 2 h | ★★☆☆☆ | Only worth doing once field data exists |
| 13 | Testimonials | Ongoing | ★★☆☆☆ | Only when real, never fabricated |

---

## Appendix A — Recommendation template

Every future recommendation follows this format:

- **Why it matters**: business or user impact in one sentence
- **Expected SEO impact**: crawl / rank / rich-result / CTR / conversion
- **Implementation difficulty**: XS / S / M / L
- **Estimated implementation time**: minutes / hours / days

Applied to every row of §12 and §13.

## Appendix B — Files to review in this PR

- [src/lib/seo.ts](src/lib/seo.ts)
- [src/components/seo/JsonLd.tsx](src/components/seo/JsonLd.tsx)
- [src/app/layout.tsx](src/app/layout.tsx)
- [src/app/page.tsx](src/app/page.tsx)
- [src/app/HomePage.tsx](src/app/HomePage.tsx)
- [src/app/builder/page.tsx](src/app/builder/page.tsx)
- [src/app/analytics/page.tsx](src/app/analytics/page.tsx)
- [src/app/sitemap.ts](src/app/sitemap.ts)
- [src/app/robots.ts](src/app/robots.ts)
- [src/app/manifest.ts](src/app/manifest.ts)
- [src/app/opengraph-image.tsx](src/app/opengraph-image.tsx)
- [src/app/twitter-image.tsx](src/app/twitter-image.tsx)
- [next.config.ts](next.config.ts)
