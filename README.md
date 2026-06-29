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

## Swapping placeholder images for real photos

Every image is currently an on-brand SVG placeholder rendered by
`src/components/BrandImage.tsx` (a seeded architectural skyline). To use real photos:

1. Drop optimised images into `public/images/` (landscape, ≥ ~2000px wide).
2. Replace `<BrandImage … />` usages with Next's `<Image>`:

```tsx
import Image from "next/image";

<Image src="/images/riverpoint-1.jpg" alt="Riverpoint towers, Lavington"
       fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
```

Image usages to swap: `Hero.tsx`, `ProjectCard.tsx`, `PageHero.tsx`,
`projects/[slug]/page.tsx` (cover + gallery), and the `about` / `services` panels.

A field-by-field list of everything still needed is in
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
