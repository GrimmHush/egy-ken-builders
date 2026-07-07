# EGY-KEN Builders — Website

Marketing website for **EGY-KEN Builders Limited**, a Nairobi-based NCA 1 building & civil engineering firm. Built with Next.js (App Router), Tailwind CSS v4 and Framer Motion.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Editing content

All copy/data lives in typed files — no code changes needed to update most content:

| What | File |
| --- | --- |
| Company info, contacts, NCA #, hours, socials, stats, values | `src/lib/site.ts` |
| Services | `src/lib/services.ts` |
| Projects (+ detail pages, generated from this) | `src/lib/projects.ts` |

## Photos

Real photography lives in `public/` (lowercase kebab-case names) and is wired
through the data files — no component changes needed:

- **Services**: set `image` on an entry in `src/lib/services.ts`.
- **Projects**: set `cover`, `coverAlt` and `photos` on an entry in
  `src/lib/projects.ts` (cards, detail hero and gallery all follow).

Any entry without photos falls back to the on-brand SVG placeholder art
(`src/components/BrandImage.tsx`). Surfaces still on placeholders:
`PageHero.tsx` page headers and the about-page story panel.

Remaining asset wishes are tracked in
[`docs/asset-checklist.md`](docs/asset-checklist.md).

## Contact form (Resend)

The form posts to `src/app/api/contact/route.ts`. Until configured it logs leads
to the server console; to actually email enquiries:

1. Copy `.env.example` → `.env.local`.
2. Create a [Resend](https://resend.com) account, verify your sending domain
   (DNS records), and create an API key.
3. Fill in `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO`.

On Vercel, add the same variables under **Project → Settings → Environment Variables**.

## Deploy

Push to a Git repo and import into [Vercel](https://vercel.com) (zero config), or run
`vercel` with the CLI. Set the Resend env vars in the Vercel dashboard.

## Brand palette

Steel `#0A6394` · Navy `#053E5C` · Amber `#EE9C45` (accent) · Charcoal `#2E2E2A` · Concrete `#B8BBBA`. Defined as Tailwind tokens in `src/app/globals.css`.
