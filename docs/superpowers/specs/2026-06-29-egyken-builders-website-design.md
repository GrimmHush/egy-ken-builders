# EGY-KEN Builders — Website Design Spec

**Date:** 2026-06-29
**Status:** Approved — awaiting client assets before build
**Owner:** Saif (saifadel97@gmail.com)

## 1. Goal
A premium ("$10k-tier"), refined-but-industrial marketing website for **EGY-KEN Builders**, a construction company in **Nairobi, Kenya**. Must convey engineering trust and craftsmanship, capture leads, and feel elegant with smooth animations that stay fast on any device.

## 2. Decisions (locked)
| Area | Decision |
|---|---|
| Aesthetic | Refined & elegant discipline applied to a cool industrial palette |
| Structure | Multi-page: Home · About · Services · Projects (+ project detail) · Contact |
| Palette | Steel `#0A6394` · Navy `#053E5C` · Amber `#EE9C45` · Charcoal `#2E2E2A` · Concrete `#B8BBBA` · Bone `#F6F6F4` / White |
| Type | Fraunces (display serif) + Inter (body), via `next/font` |
| Content | Real client-provided content & photos (see `docs/asset-checklist.md`) |
| Contact | Working lead form (Resend) **+** WhatsApp (`wa.me`, +254) **+** click-to-call |
| Insights/blog | Out of scope |
| Stack | Next.js (App Router) + Tailwind CSS + Framer Motion → Vercel |
| Build timing | Begin once all assets are in hand |

## 3. Palette usage rules (contrast guardrails)
- **Steel** — links, headings on light surfaces, key UI. (≈5.9:1 on white — AA pass.)
- **Navy** — deep section backgrounds, footer, nav background on scroll.
- **Amber** — accent ONLY: CTA button fills (with charcoal/navy text), highlights, hover states, the italic emphasis word in display headings. **Never amber text on white.**
- **Charcoal** — body text on light; deepest backgrounds.
- **Concrete** — dividers, muted labels, decorative/large text only. **Not** for body text on white.
- **Bone/White** — light section surfaces.
- Design light + dark sections together; verify both independently.

## 4. Typography
- Headings: **Fraunces** (optical, refined; weight 500–600, occasional italic for the emphasis word per the ARCOVA reference).
- Body/UI: **Inter** (400 body, 500 labels, 600 emphasis).
- Base 16px+, line-height 1.5–1.7 body, measure 60–75ch desktop / 35–60ch mobile.
- `font-display: swap` via `next/font` (no FOIT, no layout shift).
- Swap-friendly if client supplies brand fonts.

## 5. Sitemap & page sections
**Home:** sticky nav (transparent → navy on scroll) · hero (headline w/ amber emphasis word, sub, dual CTA, hero image) · trust stat bar (count-ups) · about teaser · featured services (3–6 cards) · featured projects (asymmetric grid) · process (Discover→Design→Build→Deliver→Beyond) · credentials/NCA strip · testimonials · CTA band · footer.
**About:** story · mission/values · stats · milestones timeline · team (optional) · certifications & safety/NCA.
**Services:** intro · service blocks (icon, title, description, optional detail) · process · CTA.
**Projects:** filterable grid (Residential / Commercial / Civil / Renovation) → **/projects/[slug]** detail (gallery, scope, location, year, client, optional before/after, next-project link).
**Contact:** lead form · WhatsApp + click-to-call · address + hours · embedded map · socials.

## 6. Components
`Nav`, `Footer`, `Hero`, `SectionReveal` (scroll fade+rise wrapper), `StatCounter`, `ServiceCard`, `ProjectCard`, `ProjectGallery`, `ProcessSteps`, `TestimonialCard`, `CredentialStrip`, `CTABand`, `ContactForm`, `WhatsAppButton` (floating), `MapEmbed`.

## 7. Motion spec (verifiable bar)
- **Technique:** transform & opacity ONLY. CSS handles simple hovers/reveals; Framer Motion reserved for scroll-stagger/orchestration and kept off the critical render path (lazy where heavy).
- **Patterns:** hero parallax (subtle, transform) · section reveal fade + 16–24px rise, grid stagger 40ms · stat count-up on in-view · project-card image scale 1→1.05 + overlay on hover · nav solidify on scroll · 150–250ms ease-out micro-interactions, 0.98 active scale · subtle route fade.
- **Constraints:** honor `prefers-reduced-motion` (reduce to instant/none) · animate ≤1–2 key elements per view · no layout-shifting animation (CLS < 0.1).

## 8. Contact / lead capture
- **Form fields:** Name, Email, Phone, Project type (select), Budget range (select), Message. Inline validation on blur, error below field, required markers, submit → loading → success/error states, `aria-live` for errors.
- **Backend:** Next.js Route Handler `app/api/contact/route.ts` using **Resend**. Requires `RESEND_API_KEY` (env) + verified sending domain (client adds DNS records) + destination email. Build against a clean interface so the backend is swappable.
- **WhatsApp:** floating button + contact section, `https://wa.me/<254…>` with prefilled message.
- **Phone:** `tel:+254…` click-to-call.

## 9. Kenya / local specifics
- Phone & WhatsApp in **+254** format.
- **NCA (National Construction Authority) registration number + category** featured prominently (footer + About + credentials strip) — primary local trust signal.
- `LocalBusiness` JSON-LD (name, address, geo, phone, hours, url) + Nairobi-targeted page metadata (titles, descriptions, OG tags).

## 10. Performance & accessibility targets
- `next/image` everywhere: WebP/AVIF, responsive `sizes`, lazy below fold, blur placeholder, explicit dimensions (CLS guard).
- `next/font` for fonts; route-level code splitting; framer-motion dynamically imported where heavy.
- **Target: Lighthouse mobile ≥ 90** (Performance + Accessibility).
- WCAG AA contrast; full keyboard nav; visible focus rings; descriptive alt text; semantic heading hierarchy; skip link; reduced-motion support.
- Breakpoints tested: 375 / 768 / 1024 / 1440.

## 11. Project structure
```
app/
  layout.tsx            # fonts, nav, footer, base metadata, JSON-LD
  page.tsx              # Home
  about/page.tsx
  services/page.tsx
  projects/page.tsx
  projects/[slug]/page.tsx
  contact/page.tsx
  api/contact/route.ts  # Resend handler
components/             # see §6
lib/ or data/
  site.ts               # name, contacts, NCA #, socials
  services.ts           # typed service data
  projects.ts           # typed project data (+ slugs)
  testimonials.ts
styles/ + tailwind.config.ts   # palette tokens, type scale
public/                 # logo, images, favicon
```
Content is data-driven (typed files) so swapping real services/projects is trivial.

## 12. Out of scope
Insights/blog · e-commerce · client login/portal · CMS (content edited in data files for v1).

## 13. Blocked on (to start build)
1. Assets per `docs/asset-checklist.md` (logo, photos, copy, projects, testimonials, contacts).
2. **NCA registration number + category.**
3. Resend: account + verified domain (DNS records) + destination email.
4. Final confirm on fonts (default Fraunces + Inter) and palette (locked unless changed).

## 14. References
ARCOVA (refined/elegant), BUILDORA (bold/industrial), abvtek.com, Elevates Temlis (Webflow). Design system pattern: "Trust & Authority" — credentials, project metrics, before/after, stat reveals.
