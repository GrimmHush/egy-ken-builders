# Product

## Register

brand

## Users

Prospective construction clients in Kenya and East Africa evaluating whether EGY-KEN Builders is credible enough to shortlist: institutional investors, joint-venture partners, private property developers, and sports-club owners (padel). They arrive from referrals, tender processes, or search ("construction company Nairobi", "padel court construction Kenya"), often on mobile with mid-tier connectivity. Their job: verify legitimacy (NCA registration, real projects, compliance), gauge quality tier, and make contact with minimal friction (WhatsApp, call, or form).

## Product Purpose

Premium ("$10k-tier") marketing website for EGY-KEN Builders Limited, an NCA 1 building & civil engineering firm in Nairobi (est. 2018). It must convey engineering trust and craftsmanship, present the portfolio and five specialised services, and capture leads via a working form (Resend), WhatsApp, and click-to-call. Success = qualified enquiries from developers and investors. No blog, no CMS, no portal — content is edited in typed data files (`src/lib/*.ts`).

## Brand Personality

Refined-but-industrial. Three words: **engineered, premium, assured**. Elegant discipline applied to a cool industrial palette (steel/navy/charcoal with a single amber accent); serif display voice (Fraunces) with an italic emphasis word; smooth, restrained motion that stays fast on any device. Confident and factual, never flashy or salesy — trust is carried by verifiable credentials and project numbers.

## Anti-references

- Generic template contractor sites (stock hard-hat clichés, red/yellow "construction" palettes).
- AI-default landing pages: cream/beige body backgrounds, identical icon-card grids, eyebrow-kicker on every section.
- Blog-heavy content marketing sites — out of scope by decision.
- Named positive references for calibration: ARCOVA (refined/elegant), BUILDORA (bold/industrial), abvtek.com.

## Design Principles

1. **Trust is the product.** NCA 1 registration, KRA compliance, FIDIC standards, and real project metrics are featured content, not footer fine print.
2. **Show the work.** Real photography and the real hero film beat abstraction; on-brand SVG placeholders are a stopgap awaiting client assets, never the end state.
3. **Motion earns its keep.** Transform/opacity only, scroll-orchestrated where it aids the narrative, honors `prefers-reduced-motion`, never blocks reading or layout (CLS < 0.1).
4. **Contrast-guarded palette.** Amber is accent-only (never amber text on white); concrete is never body text on white; light and dark sections verified independently (WCAG AA).
5. **Fast on any device.** Lighthouse mobile ≥ 90; the Kenyan audience is mobile-first on variable networks.

## Accessibility & Inclusion

WCAG AA contrast; full keyboard navigation with visible focus rings; semantic heading hierarchy; descriptive alt text; `prefers-reduced-motion` support throughout (hydration-safe hook + CSS kill-switch); breakpoints verified at 375 / 768 / 1024 / 1440.
