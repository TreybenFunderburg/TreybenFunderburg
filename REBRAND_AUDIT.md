# Funderworks Rebrand Audit

_Audited against: REBRAND_BRIEF.md · Branch: rebrand/funderworks · Date: 2026-05-24_

---

## 1. Personal-Brand Reference Inventory

Every file that contains a personal identifier (name, short name, email, domain, GitHub handle). **All values ultimately originate in `config/brand.ts` and propagate via the `brand` object** — so that file is the primary change target. The references below are what renders/ships on the site.

### `config/brand.ts`

| Line | Field | Current value |
|------|-------|---------------|
| 3 | `brand.name` | `"Treyben Funderburg"` |
| 4 | `brand.shortName` | `"TF"` |
| 9 | `brand.email` | `"funderburg.treyben@gmail.com"` |
| 10 | `brand.github` | `"https://github.com/TreybenFunderburg"` |
| 11 | `brand.linkedin` | `"https://linkedin.com"` _(no profile path — also a broken link, see §5)_ |
| 15 | `brand.seo.title` | `"Treyben Funderburg — Premium Web Development & Software"` |
| 19 | `brand.seo.url` | `"https://treybenf.com"` |

### `package.json`

| Line | Field | Current value |
|------|-------|---------------|
| 2 | `name` | `"treyben-site"` |

_This is the npm package name. It doesn't render on the site, but it should be updated for hygiene._

### Components that render `brand.*` values on-screen

These all consume values from `config/brand.ts`. No raw personal strings are hardcoded in them — changing `brand.ts` fixes them automatically.

| File | Lines | What renders |
|------|-------|--------------|
| `components/layout/Header.tsx` | 58, 64 | Logo chip `brand.shortName` ("TF") + full name `brand.name` ("Treyben Funderburg") in nav |
| `components/layout/Footer.tsx` | 27, 30 | Logo chip `brand.shortName` + copyright `© {year} {brand.name}` |
| `sections/Contact.tsx` | 148, 247, 260, 281 | `brand.email` in error message, mailto link, and displayed text; `brand.linkedin` in social link |
| `sections/Hero.tsx` | 183–184 | `brand.name.split(" ").join("\n")` — the hero heading **is the personal name split across two lines** |
| `app/layout.tsx` | 23–38 | All metadata: `<title>`, OG `title`/`description`/`url`/`siteName`, Twitter `title`/`description`, `authors` — all from `brand.seo.*` |

### No personal strings found in:
`sections/Services.tsx`, `sections/About.tsx`, `sections/Portfolio.tsx`, `data/services.ts`, `data/projects.ts`, `app/globals.css`, all UI components.

---

## 2. Copy That Needs Repositioning

### Hero — `sections/Hero.tsx` + `config/brand.ts`

| Element | Where | Current copy | Assessment |
|---------|-------|--------------|------------|
| Eyebrow | `brand.eyebrow` (brand.ts:8) | `"Full Stack Development Studio"` | **Minor tweak** — could become "Charlotte Web Studio" or "Funderworks" to add local signal |
| Main heading | `brand.name` split across lines (Hero.tsx:183–184) | Renders as **"Treyben\nFunderburg"** — the name IS the headline | **Full rewrite** — this is the single biggest structural change in the copy. The heading must become the value proposition, e.g., "Modern Websites\nFor Local Business." or the brief's exact headline. The `AnimatedHeading` component works on any multi-line string, so only the source string changes. |
| Sub-headline | `brand.description` (brand.ts:7–8) | `"We build custom full stack websites, CRMs, and software that convert visitors into clients and scale with your business."` | **Full rewrite** — use brief's subhead: "We build fast, beautiful sites with the systems behind them — bookings, CRMs, automations — so your business runs smoother and grows faster." |
| CTA buttons | Hero.tsx:272–278 | "Start a Project" / "Our Services" | **Fine as-is** |
| Scroll indicator | Hero.tsx:291 | "Scroll" | **Fine as-is** |

**Note on hero heading architecture:** The hero currently does `brand.name.split(" ").join("\n")` — which splits "Treyben Funderburg" into two words on two lines. The new headline ("Modern websites for local businesses that want to book more calls.") needs a deliberate line break inserted in the string or the split logic updated. The brief's value prop is too long for the same treatment; recommend hardcoding the line break character in `brand.description` or giving the hero its own dedicated string in `brand.ts` (e.g., `brand.heroHeadline`).

---

### Services — `sections/Services.tsx`

| Element | Where | Current copy | Assessment |
|---------|-------|--------------|------------|
| Eyebrow | Services.tsx:122 | `"What We Build"` | **Fine as-is** |
| H2 | Services.tsx:131–133 | `"Our Services"` | **Minor tweak** — consider "Our Packages" or "What We Offer" to signal productized offers |
| Sub-paragraph | Services.tsx:134–136 | `"From single-page marketing sites to complex enterprise platforms — we engineer digital products that perform."` | **Full rewrite** — too generic/enterprise. Needs local-biz voice: something like "Three clear packages for Charlotte businesses ready to grow online — or let's scope something custom." |

---

### About — `sections/About.tsx`

| Element | Where | Current copy | Assessment |
|---------|-------|--------------|------------|
| Eyebrow | About.tsx:91 | `"Who We Are"` | **Fine as-is** |
| H2 | About.tsx:101–103 | `"Small Team. / Elite Output."` | **Fine as-is** — brief says keep it |
| Paragraph 1 | About.tsx:106–110 | "We're a focused, senior-level development studio that moves fast and builds things right. No bloated teams, no endless meetings — just a small group of craftspeople who care deeply about the quality and impact of every product we ship." | **Minor tweak** — add Charlotte, NC signal somewhere here. E.g., "Based in Charlotte, NC, we're a focused..." |
| Paragraph 2 | About.tsx:112–115 | "Whether you need a high-converting website, a bespoke business platform, or a complex full stack application, we bring the same level of technical depth and creative ambition to every engagement." | **Minor tweak** — currently sounds enterprise/agency-generic. Can be tuned to call out local service businesses: "Whether you're a contractor, a clinic, or a local service business ready to grow — we bring the same craft and ambition to every build." |
| Pillars list | About.tsx:13–18 | 4 items: "Precision engineering...", "Speed without sacrifice...", "Business-first thinking...", "Ongoing partnership..." | **Fine as-is** — solid differentiators, keep all four |

---

### Stats Block — `sections/About.tsx` (lines 7–11)

| Stat | Current value | Assessment |
|------|---------------|------------|
| Stat 1 | `"10+"` / `"Projects Delivered"` | **Full rewrite** — brief says replace with real, defensible proof points |
| Stat 2 | `"5+"` / `"Clients Served"` | **Full rewrite** — see brief |
| Stat 3 | `"100%"` / `"Client Satisfaction"` | **Full rewrite** — not defensible, replace per brief |

All three stats are hardcoded as a `const stats` array at the top of `sections/About.tsx` (lines 7–11), not in `brand.ts`. You can edit them directly in that file.

---

### Portfolio — `sections/Portfolio.tsx` + `data/projects.ts`

| Element | Where | Current copy | Assessment |
|---------|-------|--------------|------------|
| Eyebrow | Portfolio.tsx:187 | `"Selected Work"` | **Fine as-is** |
| H2 | Portfolio.tsx:190–196 | `"Recent Projects"` | **Fine as-is** |
| Sub-paragraph | Portfolio.tsx:199–201 | "A growing body of work — each project built with precision, purpose, and a relentless focus on results." | **Fine as-is** |
| "More Coming Soon" | Portfolio.tsx:144–155 | "New projects launching soon. Stay tuned." | **Fine as-is** |
| Fun Chiropractic description | projects.ts:22–23 | "A full-featured clinic website built to convert new patients, featuring streamlined online booking..." | **Fine as-is** — brief says keep both case studies |
| K. Manley Studio description | projects.ts:35–36 | "A sophisticated portfolio site for a creative studio that puts the work front and center..." | **Fine as-is** — brief says keep |

---

### Contact — `sections/Contact.tsx`

| Element | Where | Current copy | Assessment |
|---------|-------|--------------|------------|
| Eyebrow | Contact.tsx:222 | `"Get In Touch"` | **Fine as-is** |
| H2 | Contact.tsx:225–234 | `"Ready to Build / Something?"` | **Fine as-is** |
| Intro paragraph | Contact.tsx:237–239 | "Got a project in mind? Tell us about it. Whether it's a new website, a custom platform, or an idea you haven't fully shaped yet — we're here to help you bring it to life." | **Fine as-is** |
| Form subheading | Contact.tsx:302–304 | `"Start the Conversation"` | **Fine as-is** |
| Form label | Contact.tsx:97–99 | `"Company / Project"` | **Minor tweak** — could become "Your Business" to better fit the target customer |
| Error message | Contact.tsx:148 | "Something went wrong. Email us directly at {brand.email}" | **Automatically fixed** when `brand.email` is updated |
| Email display | Contact.tsx:260 | Renders `brand.email` | **Automatically fixed** |

---

### Footer — `components/layout/Footer.tsx`

| Element | Where | Current copy | Assessment |
|---------|-------|--------------|------------|
| Logo chip | Footer.tsx:27 | `brand.shortName` → "TF" | **Change** → "FW" (or wordmark) |
| Copyright | Footer.tsx:30 | `© {year} {brand.name}` → "© 2026 Treyben Funderburg" | **Automatically fixed** when `brand.name` is updated |
| Credit line | Footer.tsx:34–36 | "Built with Next.js · Deployed on Vercel" | **Keep** — brief says keep |
| Location signal | Footer.tsx:_missing_ | _Not present_ | **Add** — brief calls for Charlotte, NC signal in footer. No file change needed for location; add a short line: "Charlotte, NC" or "Charlotte, NC · hello@funderworks.com" |

---

### Header — `components/layout/Header.tsx`

| Element | Where | Current copy | Assessment |
|---------|-------|--------------|------------|
| Logo chip | Header.tsx:58 | `brand.shortName` → "TF" | **Change** → "FW" (or wordmark) |
| Brand name in nav | Header.tsx:64 | `brand.name` → "Treyben Funderburg" | **Automatically fixed** when `brand.name` is updated |
| Nav links | Header.tsx:8–13 | "Services / Work / About / Contact" | **Fine as-is** |
| CTA button | Header.tsx:85, 134 | "Start a Project" | **Fine as-is** |

---

## 3. Structural Changes for Services Section

### Current state

`data/services.ts` defines 5 objects. `sections/Services.tsx` renders them with `services.map()` into a `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` grid.

The 5 current offerings:
1. Custom Website Design & Development
2. Full Stack Web Applications
3. CRM Systems & Business Software
4. E-Commerce Solutions
5. API Integrations & Automation

### What the brief calls for

Replace with 3 productized offers:
1. **Starter Site** — $2,500 + $99/mo
2. **Growth Site** — $4,500 + $199/mo
3. **Custom Build** — From $7,500 + $349/mo

### Files that need to change

**`data/services.ts` — primary content change**
- Replace all 5 service objects with 3 offer objects.
- The current `Service` interface has `id`, `icon`, `title`, `description`, `features[]`. For productized offers, you'll want to add a `price` field (e.g., `"$2,500 + $99/mo"`) and optionally a `deliveryTime` field (e.g., `"2 weeks"`). Add these to the `Service` interface.
- Icon suggestions: `Monitor` for Starter Site, `Layers` for Growth Site, `Zap` for Custom Build — all already in the `iconMap` in Services.tsx.

**`sections/Services.tsx` — component updates**
- The `iconMap` (lines 8–14) currently includes `Monitor`, `Layers`, `Users`, `ShoppingBag`, `Zap`. If the 3 new offers use only `Monitor`, `Layers`, and `Zap`, you can remove `Users` and `ShoppingBag` from the import and the map. Or leave them; unused imports are cleaned by the linter.
- The `ServiceCard` component (lines 34–98) needs to render the `price` field if you add it. Add a price display between the description and the features list — a prominent line like `$2,500 + $99/mo`.
- The section subhead (lines 134–136): "From single-page marketing sites to complex enterprise platforms — we engineer digital products that perform." → **full rewrite** (see §2 above).
- The section H2 (line 131–133): "Our Services" → consider "Our Packages."
- The grid is `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. With 3 cards it will render as: 1 col mobile, 2 col tablet, 3 col desktop. That's correct. No grid change needed.

**`data/services.ts` — interface change**
```
// Add to Service interface:
price?: string;        // e.g. "$2,500 + $99/mo care"
deliveryTime?: string; // e.g. "Launched in 2 weeks"
```

No other files need to change for this restructure. The `ServiceCard` and the grid logic are entirely self-contained in `sections/Services.tsx`.

---

## 4. New Pages Needed — Full Capabilities

**Recommendation: `/capabilities` as a new standalone page.**

Reasoning:
- The homepage should stay focused on 3 offers → conversion. Adding a full capabilities list would dilute the value proposition.
- A dedicated `/capabilities` page (or `/what-we-build`) can carry the full 5-service technical breakdown, plus any additional capabilities (member portals, multi-location, etc.) that don't fit the 3-package model.
- A link from the Services section (e.g., "See full capabilities →") bridges the two pages without cluttering the homepage.
- `/services` as the URL is also reasonable, but if you ever want a separate "services" overview page with pricing context, `/capabilities` keeps the naming cleaner.

**What that page needs (when you build it):**
- New file: `app/capabilities/page.tsx`
- Content: the 5 current service categories from `data/services.ts` (or an expanded version), plus anything in the brief's Custom Build tier that doesn't fit a card (multi-location, member portals, etc.)
- Nav: add a link to `/capabilities` in `components/layout/Header.tsx`'s `navLinks` array, or link from within the Services section copy.
- No new data file needed — the existing `services.ts` array can serve this page after the homepage switches to a new `offers.ts`.

---

## 5. Broken / Bad Links

| Link | File | Line | Issue |
|------|------|------|-------|
| `https://linkedin.com` | `config/brand.ts` | 11 | **No profile path.** Points to LinkedIn homepage, not a Funderworks company page. Both the Contact section (Contact.tsx:281) and Footer (Footer.tsx:50) use this value. |
| `https://formspree.io/f/YOUR_FORM_ID` | `config/brand.ts` | 13 | **Placeholder not configured.** The contact form POSTs to this endpoint. Form submissions go nowhere until this is replaced with a real Formspree form ID. |
| `https://github.com/TreybenFunderburg` | `config/brand.ts` | 10 | **Personal GitHub, not a studio GitHub.** Used in Contact.tsx:275 and Footer.tsx:43. Should either point to a Funderworks org/profile or be removed from the UI. |

**Links that are fine:**
- `https://funchiropractic.net` — real client site, works
- `https://kmanley-studio-website.vercel.app/` — real client site, works
- All internal `#anchor` navigation links — fine

---

## 6. Metadata and SEO

All metadata is defined in two places: the values in `config/brand.ts` and the export in `app/layout.tsx`. No metadata is hardcoded anywhere else.

### `config/brand.ts` — source values

| Line | Field | Current value | Needs change? |
|------|-------|---------------|---------------|
| 5–6 | `brand.tagline` | `"Premium Digital Products for Ambitious Businesses"` | Yes — not used in metadata currently, but update for consistency |
| 7–8 | `brand.description` | `"We build custom full stack websites, CRMs, and software..."` | Yes — this is the site meta description AND the hero sub-headline |
| 8 | `brand.eyebrow` | `"Full Stack Development Studio"` | Yes — used in Hero eyebrow |
| 15 | `seo.title` | `"Treyben Funderburg — Premium Web Development & Software"` | **Yes** — full rewrite, e.g. "Funderworks — Modern Websites for Local Business" |
| 16–18 | `seo.description` | `"Custom full stack websites, CRMs, and business software built to convert and scale. High-quality digital products for ambitious businesses."` | **Yes** — needs Charlotte/local signal and Funderworks voice |
| 18 | `seo.keywords` | `"web development, full stack, CRM, business software, Next.js, TypeScript"` | **Yes** — add local SEO terms: "Charlotte web design", "Charlotte website design", "local business website", "Carolinas web studio" |
| 19 | `seo.url` | `"https://treybenf.com"` | **Yes** → `"https://funderworks.com"` |

### `app/layout.tsx` — metadata export (lines 22–40)

All values are `brand.*` references. No hardcoded strings. Once `brand.ts` is updated, the following are automatically corrected:

| Metadata field | Line | Source |
|----------------|------|--------|
| `title` | 23 | `brand.seo.title` |
| `description` | 24 | `brand.seo.description` |
| `keywords` | 25 | `brand.seo.keywords` |
| `authors[0].name` | 26 | `brand.name` |
| `metadataBase` | 27 | `brand.seo.url` |
| `openGraph.title` | 29 | `brand.seo.title` |
| `openGraph.description` | 30 | `brand.seo.description` |
| `openGraph.url` | 31 | `brand.seo.url` |
| `openGraph.siteName` | 32 | `brand.name` |
| `twitter.title` | 36 | `brand.seo.title` |
| `twitter.description` | 37 | `brand.seo.description` |

**Gap: No OG image is configured.** `openGraph.images` is absent from `app/layout.tsx`. Without it, link previews on Slack, iMessage, Twitter/X, etc., will render with no image. A 1200×630 OG image (`public/og-image.png`) and a single line in `layout.tsx` fixes this.

**Theme color:** `app/layout.tsx:43` — `themeColor: "#0a0a0a"`. Matches the site's background. Fine as-is, no change needed.

**Favicon:** `app/favicon.ico` — see §7.

---

## 7. Hardcoded Brand Assets

### Favicon
- `app/favicon.ico` — This is the only favicon file. It's the default Next.js favicon (the Next.js "N" logo). It contains no TF/Treyben reference, but it's a generic placeholder that should be replaced with a Funderworks mark. Place new files at:
  - `app/favicon.ico` — main browser favicon (32×32 or multi-size ICO)
  - `app/icon.png` — Next.js App Router also picks up `app/icon.png` as the app icon
  - `app/apple-icon.png` — for iOS home screen

### Logo mark
- The "TF" / "FW" logo is **not an image file**. It is rendered as text in a CSS-clipped `<div>` in both:
  - `components/layout/Header.tsx:51–61` — 32×32 cyan block with `brand.shortName`
  - `components/layout/Footer.tsx:19–31` — 28×28 cyan block with `brand.shortName`
- To change TF → FW: update `brand.shortName` in `config/brand.ts`. No image replacement needed unless you want to swap the text-based logo for an SVG wordmark.

### OG image
- **None exists.** No OG image file in `public/`. See §6 for the impact.

### Public SVGs
- `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` — All are default Create Next App boilerplate assets. **None are referenced anywhere in the site code.** None contain TF/Treyben branding. Safe to ignore (or delete).

---

## 8. Stack Summary

**Next.js 16.2.6** with the App Router (confirmed by the `app/` directory structure, `app/layout.tsx` using the Next.js `Metadata` export, and `app/page.tsx` using React Server Component syntax). **React 19.2.4**. **TypeScript 5**.

**Tailwind CSS 4** (`tailwindcss: ^4`, `@tailwindcss/postcss: ^4`) — this is the modern Tailwind v4 with the `@import "tailwindcss"` syntax and `@theme inline` blocks, not the traditional `tailwind.config.js` approach. Design tokens are defined as CSS custom properties in `app/globals.css`.

**Framer Motion 12.40.0** — used extensively for scroll-triggered animations (`useInView`), entrance transitions, and hover states. Present in Hero, Services, Portfolio, About, Contact, and Header.

**Lucide React 1.16.0** — icon library. Used for ArrowDown, ArrowRight, Mail, Send, CheckCircle, Monitor, Layers, etc.

**Fonts:** Syne (display/headings, weights 400–800) + Inter (body) loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables `--font-syne` / `--font-inter`. No self-hosted fonts.

**No UI component library** (no shadcn/ui, Radix, MUI, etc.) — all components are custom-built.

**No CMS** — all content is hardcoded in `config/brand.ts`, `data/services.ts`, and `data/projects.ts`.

**Form handling:** Formspree (third-party SaaS) — not yet configured (placeholder form ID).

**No database, no auth, no API routes.**

---

## 9. Files You Should NOT Touch

These are infrastructure, config, design system, or otherwise out of scope for a copy/branding rebrand.

| File | Why hands-off |
|------|---------------|
| `app/globals.css` | The visual design system — colors, typography scale, animation classes, glass effects, cursor. Brief says: don't touch. |
| `components/ui/CustomCursor.tsx` | Pure visual behavior, no brand content. |
| `components/ui/SocialIcons.tsx` | Generic SVG icon components (GitHub, LinkedIn logos). No brand content. |
| `tsconfig.json` | TypeScript compiler config. |
| `tsconfig.tsbuildinfo` | Build artifact. |
| `eslint.config.mjs` | Linting rules. |
| `postcss.config.mjs` | CSS toolchain config. |
| `package.json` | Dependencies. (`name: "treyben-site"` is the only personal reference — low priority, internal only.) |
| `package-lock.json` | Lockfile. Never edit manually. |
| `public/*.svg` | Unused boilerplate assets (file.svg, globe.svg, next.svg, vercel.svg, window.svg). |
| `README.md` | Default Create Next App README. Not user-facing. |
| `AGENTS.md` / `CLAUDE.md` | Project meta-instructions. |

---

## Quick-Reference Change Checklist

For execution, the minimum set of files to touch for a complete rebrand:

1. **`config/brand.ts`** — `name`, `shortName`, `tagline`, `description`, `eyebrow`, `email`, `github`, `linkedin`, all `seo.*` fields, `formspreeEndpoint`. _Single file, fixes ~80% of all references site-wide._
2. **`sections/Hero.tsx`** — Change the heading logic (line 183–184) from name-split to a hardcoded value-prop headline.
3. **`sections/About.tsx`** — Rewrite stats array (lines 7–11), add Charlotte signal to paragraph 1 (line 106), tune paragraph 2 (line 112).
4. **`data/services.ts`** — Replace 5 service objects with 3 offer objects; add `price` field to `Service` interface.
5. **`sections/Services.tsx`** — Render `price` in `ServiceCard`; update section H2 and subhead.
6. **`components/layout/Footer.tsx`** — Add Charlotte, NC line (brand.name/shortName auto-update from step 1).
7. **`app/layout.tsx`** — Add `openGraph.images` for OG image.
8. **`app/favicon.ico`** — Replace with Funderworks favicon.
9. **New: `app/capabilities/page.tsx`** — Create capabilities page.
10. **New: `public/og-image.png`** — Create 1200×630 OG image.
