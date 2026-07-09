# PROJECT_CONTEXT.md

> **Purpose:** Living handoff document for developers and AI assistants continuing work on this codebase without prior context. Update this file when architecture, workflows, or conventions change.

**Last updated:** 2026-07-09  
**Repository:** `https://github.com/Accurates-Saudi/DOT.git`  
**Production domain:** `https://www.dynamicoiltools.com`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture](#3-architecture)
4. [Folder Structure](#4-folder-structure)
5. [Routing](#5-routing)
6. [Internationalization (i18n)](#6-internationalization-i18n)
7. [Content System](#7-content-system)
8. [Database Schema](#8-database-schema)
9. [CMS System](#9-cms-system)
10. [API Reference](#10-api-reference)
11. [Admin Workflows](#11-admin-workflows)
12. [Public Site Features](#12-public-site-features)
13. [Coding Standards & Conventions](#13-coding-standards--conventions)
14. [Environment Variables](#14-environment-variables)
15. [Scripts & Tooling](#15-scripts--tooling)
16. [Local Development](#16-local-development)
17. [Deployment](#17-deployment)
18. [Completed Features](#18-completed-features)
19. [Pending Work & Known Issues](#19-pending-work--known-issues)
20. [Git & Branches](#20-git--branches)
21. [AI Assistant Quick Reference](#21-ai-assistant-quick-reference)

---

## 1. Project Overview

### What this is

**DOT Website** (`dot-website`) is the corporate marketing website for **Dynamic Oil Tools** — an industrial oil & gas equipment company based in Dammam, Saudi Arabia. The site showcases products (well screens, strainers, drilling tools, etc.), company information, news, careers, catalogs, and contact details.

### Core goals

- Bilingual public website (**English** + **Arabic** with RTL)
- Server-side rendered (SSR) for SEO and performance
- Custom **headless CMS** for content editors (no third-party CMS)
- Inline **visual editing** on the public site for authenticated CMS users
- Product catalog driven largely from structured asset folders + CMS overrides

### What this is NOT

- Not a customer portal or e-commerce site
- Not a multi-tenant SaaS CMS
- Contact form has **no backend email integration** yet (placeholder only)

---

## 2. Technology Stack

| Layer | Technology | Version (approx.) |
|-------|------------|-------------------|
| Framework | React Router (SSR, file-based routes) | 8.0.0 |
| UI | React | 19.2.x |
| Language | TypeScript (strict) | 5.9.x |
| Styling | Tailwind CSS v4 + shadcn/ui primitives | 4.2.x |
| Build | Vite | 8.0.x |
| Database | PostgreSQL via Prisma 7 + `@prisma/adapter-pg` | 7.8.x |
| DB driver | `pg` connection pool | 8.22.x |
| Auth | Custom cookie sessions (scrypt passwords, HMAC-signed tokens) | — |
| Media storage | Local filesystem (default) or AWS S3 (optional) | — |
| Icons | lucide-react | — |
| Fonts | Geist Variable (Latin), Noto Sans Arabic (RTL) | — |
| Runtime | Node.js 24 (Docker) | — |

### Path aliases

| Alias | Resolves to |
|-------|-------------|
| `@/*` | `src/*` |
| `~/*` | `app/*` |

---

## 3. Architecture

### High-level diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
├──────────────────────────┬──────────────────────────────────────┤
│   Public site            │   Admin CMS (/admin)                  │
│   /:locale/*             │   Login, collections, editors       │
│   + inline visual edit   │   Uses cmsClient SDK                  │
└────────────┬─────────────┴──────────────┬───────────────────────┘
             │                            │
             ▼                            ▼
┌────────────────────────────────────────────────────────────────┐
│              React Router 8 SSR (app/routes/*)                  │
│  Loaders fetch CMS data + i18n messages on server               │
└────────────┬───────────────────────────────┬───────────────────┘
             │                               │
             ▼                               ▼
┌────────────────────────┐    ┌──────────────────────────────────┐
│  Static content layer   │    │  CMS server (src/server/cms/)    │
│  en.json / ar.json      │    │  Auth, content versioning, media │
│  Asset-based products   │    │  Prisma → PostgreSQL             │
│  i18n/content builders  │    └──────────────────────────────────┘
└────────────────────────┘
```

### Content resolution order (public pages)

1. **CMS published override** (from root loader or route loader) — wins if present
2. **Built static content** — `en.json`/`ar.json` → i18n builders → `src/content/` CMS-shaped sources
3. **Entity collections** — static registry merged with CMS published entity payloads, filtered by archive status, sorted by collection order keys

### Key design decisions

| Decision | Rationale |
|----------|-----------|
| Append-only content versioning | Audit trail; draft vs published separation |
| Static fallback for all entities | Site works without CMS DB; CMS overrides on first save |
| Hybrid admin saves | Collection actions via server modules; editor publish via client SDK |
| Public media file route | No auth on `/api/cms/media/:id/file` — required for `<img>` tags |
| Locale in URL (`/en/`, `/ar/`) | SEO hreflang, shareable localized links |
| Prisma client in `src/generated/prisma` | Custom output path; use `@/generated/prisma/client` |

---

## 4. Folder Structure

```
DOT-website/
├── app/                          # React Router app shell
│   ├── root.tsx                  # Document shell, root loader (CMS session + overrides)
│   ├── routes.ts                 # Central route manifest
│   ├── routes/                   # Route modules (loaders, actions, meta)
│   │   ├── _layout.tsx           # Site-wide passthrough
│   │   ├── _locale.tsx           # Locale gate + I18nProvider + MainLayout
│   │   ├── home.tsx, about.tsx, products.*, etc.
│   │   ├── admin.*.tsx           # CMS admin UI routes
│   │   └── api.cms.*.ts          # CMS REST API
│   └── app.css                   # Imports src/styles/globals.css
│
├── src/
│   ├── assets/                   # Static images, product folders (content.txt + images)
│   ├── components/               # UI by domain (layout, sections, cms, admin, contact, …)
│   ├── content/                  # toCmsSource wrappers for bilingual CMS shapes
│   ├── contexts/                 # React contexts (CMS experience, cookie consent, admin)
│   ├── data/                     # Legacy/reference static data (site, navigation, products registry)
│   ├── generated/prisma/         # Generated Prisma client (do not edit)
│   ├── hooks/                    # Shared React hooks
│   ├── i18n/                     # Locales, builders, SEO, content hooks
│   │   ├── locales/en.json       # Canonical English copy (~1800+ lines)
│   │   ├── locales/ar.json       # Arabic translations
│   │   └── content/pages/        # Per-page content builders
│   ├── lib/                      # Utilities (cookie-consent, seo, animations, cn())
│   ├── media/registry.ts         # Runtime media ID → src registration
│   ├── pages/                    # Page components (public + admin)
│   ├── sdk/cms/                  # Typed HTTP client for CMS API
│   ├── server/cms/               # Server-only CMS business logic
│   ├── services/content.ts       # resolveCmsSource by locale
│   ├── styles/globals.css        # Tailwind v4 theme, design tokens
│   ├── types/                    # All TypeScript domain types
│   └── utils/                    # CMS helpers, routing sanitization
│
├── prisma/
│   ├── schema.prisma             # CMS database schema
│   └── migrations/               # SQL migrations (do not create unless asked)
│
├── scripts/                      # Locale generation, admin rotation
├── public/                       # favicon, og-image, webmanifest
├── storage/                      # Gitignored: cms-media uploads, admin credentials
├── Dockerfile                    # Multi-stage Node 24 Alpine build
├── prisma.config.ts              # Prisma 7 config (DATABASE_URL)
├── react-router.config.ts        # SSR enabled
├── vite.config.ts                # Tailwind + React Router plugins
└── .env.example                  # Required env template
```

### Component organization (`src/components/`)

| Folder | Purpose |
|--------|---------|
| `layout/` | `MainLayout`, `Navbar`, `Footer` |
| `sections/` | Reusable marketing blocks (Hero, Services, WhyChooseUs, …) |
| `about/`, `products/`, `news/`, `careers/`, `catalogs/`, `contact/` | Page-specific sections |
| `cms/` | Visual editor, section editors, image field editor |
| `editable/` | CMS-highlightable primitives with `contentId` |
| `admin/` | Admin shell, sidebar, forms, collection UI |
| `shared/` | `PageHeroSection`, `Container`, `Pagination`, carousels |
| `ui/` | shadcn-style `button`, `sheet` |
| `cookie-consent/` | GDPR-style consent banner |
| `i18n/` | `LocalizedLink`, `LanguageSwitcher` |

---

## 5. Routing

Route manifest: `app/routes.ts`

### Public routes (locale-prefixed)

| URL pattern | Page | Notes |
|-------------|------|-------|
| `/` | Locale redirect | Cookie `dot_locale` or localStorage `dot-locale` → `/en` or `/ar` |
| `/:locale/` | Home | Certificates, news preview, featured products, partners from loaders |
| `/:locale/about` | About | |
| `/:locale/services` | Services | |
| `/:locale/products` | Products listing | |
| `/:locale/products/:slug` | Product detail | 404 if slug not found |
| `/:locale/catalogs` | Catalog library | |
| `/:locale/news` | News listing | |
| `/:locale/news/:slug` | News article | |
| `/:locale/careers` | Careers listing | |
| `/:locale/careers/:slug` | Career detail | |
| `/:locale/contact` | Contact | |
| `/:locale/*` | 404 | `NotFoundPage` |

Valid locales: `en`, `ar` (invalid → redirect)

### Admin routes (no locale prefix)

| URL | Access | Purpose |
|-----|--------|---------|
| `/admin/login` | Public | Login form |
| `/admin/setup` | Public (only when no users) | Bootstrap first admin |
| `/admin` | Editor+ | Dashboard |
| `/admin/products`, `/admin/news`, … | Editor+ | Collection lists |
| `/admin/products/:key`, etc. | Editor+ | Entity editors |
| `/admin/media` | Editor+ | Media library |
| `/admin/drafts` | Editor+ | Unpublished draft entries |
| `/admin/settings` | Editor+ | Site-wide settings |
| `/admin/users` | **Admin only** | User management |
| `/admin/logout` | Editor+ | Session destroy |

### SEO routes

- `/robots.txt` — generated via `src/lib/seo/sitemap.ts`
- `/sitemap.xml` — static route list + entity slugs

### Route conventions

1. **`app/routes/*.tsx`** — thin: `loader`, `meta`, `action`; delegates to `src/pages/*`
2. **Localized links** — always use `localizePath("/about")` or `<LocalizedLink>`
3. **Admin redirects** — `sanitizeAdminRedirect()` only allows paths starting with `/admin`

---

## 6. Internationalization (i18n)

Config: `src/i18n/config.ts`

| Setting | Value |
|---------|-------|
| Locales | `en` (default), `ar` |
| RTL | Arabic only (`dir="rtl"` on `<html>`) |
| Cookie | `dot_locale` |
| localStorage | `dot-locale` |
| Message files | `src/i18n/locales/en.json`, `ar.json` |

### Content pipeline

```
en.json / ar.json
  → i18n/content/pages/*.ts (builders merge text + assets + structure)
  → src/content/*.ts (toCmsSource for bilingual CMS shapes)
  → services/content.ts (resolveCmsSource)
  → i18n/content/hooks.ts (useHomePageContent, etc.)
  → Page components
```

CMS overrides from root loader take precedence over built static content.

### Locale generation scripts

- `scripts/generate-en-locale.mjs` — builds `en.json` from TypeScript data modules
- `scripts/generate-ar-locale.mjs` — generates Arabic from English with translation rules
- `scripts/merge-asset-locales.mjs` — parses product `content.txt` files into locale content

**After editing static copy sources, regenerate locale JSON if that workflow is in use.**

### Hooks & utilities

- `useI18n()`, `useLocale()`, `useDirection()`, `useLocalizedPath()`
- `useTranslation(namespace)`, `useNumberFormat()` — LTR numeric isolation for Arabic
- `buildPageTitle`, `createPageMeta` — SEO meta from `src/i18n/seo.ts`

---

## 7. Content System

### Three layers

#### Layer A — Asset-based products (`src/assets/products/`)

Each product folder contains:
- `content.txt` — structured text (parsed by `loadFromAssets.ts`)
- Images (`cover.png`, `*.webp`, specification images)

~25 product folders. Parsed at build time via Vite `import.meta.glob`. Factory in `src/data/products/factory.ts` builds `ProductDetailContent`.

#### Layer B — JSON + builders (primary copy source)

- `src/i18n/locales/en.json` / `ar.json` — site-wide copy
- `src/i18n/content/` — typed builders per page
- `src/content/` — `toCmsSource<T>()` wrappers producing `LocalizedValue`, `MediaReference`, `LinkReference`

#### Layer C — CMS (PostgreSQL)

**Page content keys** (examples):
- `site.settings`
- `home.en`, `home.ar`, `footer.en`, `contact.ar`, etc.

**Entity keys** (via `buildEntityKey()` in `src/types/cms-entities.ts`):
- `product.{slug}`, `news.{slug}`, `career.{slug}`
- `certificate.{id}`, `catalog.{id}`, `partner.{id}`

**Collection order keys** (`CMS_COLLECTION_ORDER_KEYS`):
- `products.order`, `news.order`, `careers.order`, `certificates.order`, `catalogs.order`, `partners.order`

### Entity merge logic

`src/server/cms/content/entity-content.server.ts`:
1. Load static registry (products from assets, news/careers from i18n)
2. Load CMS published payloads for entity type
3. Merge by slug/id (CMS wins over static for same key)
4. Filter `ARCHIVED` entries
5. Sort by collection order payload

### Visual inline editing

When a CMS user is logged in:
- `CmsExperienceProvider` (root) exposes session + content overrides
- Toggle edit mode → `document.documentElement.dataset.cmsEditMode = "true"`
- `CmsVisualEditor` + `CmsEditableSection` on public pages
- Saves go through `cmsClient.content.publish()` / `saveDraft()`

---

## 8. Database Schema

Schema: `prisma/schema.prisma`  
Migrations: `prisma/migrations/` (initial: `20260704125149_init`)

### Enums

| Enum | Values |
|------|--------|
| `CmsRole` | `ADMIN`, `EDITOR` |
| `CmsContentStatus` | `DRAFT`, `PUBLISHED`, `ARCHIVED` |
| `CmsContentType` | `SITE`, `NAVIGATION`, `FOOTER`, `PAGE`, `PRODUCT`, `NEWS`, `CERTIFICATE`, `SHARED` |
| `CmsMediaType` | `IMAGE`, `DOCUMENT`, `VIDEO`, `OTHER` |

### Models

| Model | Purpose |
|-------|---------|
| `CmsUser` | Admin/editor accounts (`email` unique, `passwordHash`, `role`, `isActive`) |
| `CmsSession` | Session tokens (`tokenHash` unique, `expiresAt`, `ipAddress`, `userAgent`) |
| `CmsContentEntry` | Content record (`key` unique, `type`, `status`, `currentVersionId`, `publishedVersionId`) |
| `CmsContentVersion` | Versioned JSON `payload`, `isPublished`, `publishedAt` |
| `CmsMediaAsset` | Media record (`key` unique, `type`, `currentVersionId`) |
| `CmsMediaVersion` | File metadata (`storageKey`, `mimeType`, `size`, `width`, `height`, `alt` JSON) |

### Prisma conventions (project rules)

- Both sides of relations with `@relation`
- IDs: `@default(cuid())` for strings
- `createdAt` / `updatedAt` on mutable models
- `@@index` on frequently queried fields

### Prisma client usage

```typescript
import { prisma } from "@/server/cms/db.server";
```

- Uses `@prisma/adapter-pg` with a singleton `pg.Pool`
- Pool max: `DATABASE_POOL_MAX` (default `5`) — important on shared Postgres hosts
- **Do not create migrations unless explicitly requested**

---

## 9. CMS System

### Server modules (`src/server/cms/`)

| Module | Responsibility |
|--------|----------------|
| `env.server.ts` | Session secret, media path, optional S3 config |
| `db.server.ts` | Prisma + pg pool singleton |
| `http.server.ts` | `CmsHttpError`, JSON response helpers |
| `request.server.ts` | Multipart upload parsing, image MIME validation |
| `auth/session.server.ts` | Cookie sign/parse (`cms_session`) |
| `auth/password.server.ts` | scrypt hash/verify |
| `auth/service.server.ts` | Login, logout, bootstrap, user CRUD |
| `auth/admin-access.server.ts` | `requiresSetup` detection |
| `content/service.server.ts` | Content CRUD, versioning, publish |
| `content/entity-content.server.ts` | Entity merge, archive, duplicate, reorder |
| `content/site-settings.server.ts` | `site.settings` merge |
| `content/admin-*.server.ts` | Dashboard, collection rows, actions |
| `media/service.server.ts` | Media CRUD, versioning |
| `media/storage.server.ts` | Local disk or S3 I/O |
| `media/gallery.server.ts` | Unified gallery (uploads + static site images) |
| `query-cache.server.ts` | In-flight request deduplication |

### Auth flow

1. Login POST → verify scrypt password → create `CmsSession` with random token
2. Cookie: `{token}.{HMAC-SHA256(token, CMS_SESSION_SECRET)}`
3. DB stores `SHA-256(token)` in `tokenHash`
4. Session TTL: 12 hours (default) or 14 days (remember me)
5. Roles: `admin` (rank 2) ≥ `editor` (rank 1)

### Content versioning

Every save creates a new `CmsContentVersion`:
- `currentVersionId` → latest version (draft or published)
- `publishedVersionId` → last published version (public reads this)
- `publish: true` on upsert → sets status `PUBLISHED`, `isPublished: true`

### Media storage

| Backend | When | Path pattern |
|---------|------|--------------|
| Local (default) | No AWS env vars | `{CMS_MEDIA_STORAGE_PATH}/{assetId}/v{N}.{ext}` |
| S3 | All four AWS vars set | `cms-media/{assetId}/v{N}.{ext}` |

Allowed upload MIME types: PNG, JPEG, WebP, SVG.

### Client SDK (`src/sdk/cms/`)

```typescript
import { cmsClient } from "@/sdk/cms";

// Browser (admin editors)
await cmsClient.content.publish({ key, type, payload, publish: true });
await cmsClient.media.upload({ key, file });

// SSR (loaders/actions)
import { createCmsServerClient } from "@/sdk/cms";
const client = createCmsServerClient(request);
```

Response envelope: `{ data: T }` or `{ error: { code, message, details? } }`.

---

## 10. API Reference

Base path: `/api/cms`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/bootstrap` | None | Create first admin (409 if users exist) |
| POST | `/auth/login` | None | Login → Set-Cookie |
| POST | `/auth/logout` | Editor+ | Destroy session |
| GET | `/auth/me` | None | Current session or null |
| GET | `/content` | Editor+ | List content entries |
| POST | `/content` | Editor+ | Upsert content entry |
| GET | `/content/:key` | Editor+ | Get entry + versions |
| PUT/PATCH | `/content/:key` | Editor+ | Upsert by key |
| DELETE | `/content/:key` | Editor+ | Archive entry |
| GET | `/media` | Editor+ | Media gallery |
| POST | `/media` | Editor+ | Upload (multipart) |
| GET | `/media/:id` | Editor+ | Asset metadata |
| PUT/PATCH | `/media/:id` | Editor+ | Replace (new version) |
| GET | `/media/:id/file` | **Public** | Serve file bytes (`?v=N` for version) |

---

## 11. Admin Workflows

### First-time setup

1. Set `DATABASE_URL`, run migrations (`prisma migrate deploy`)
2. Visit `/admin` → redirects to `/admin/setup`
3. Create admin (password ≥ 12 chars)
4. **Or** run `node scripts/rotate-cms-admin.mjs` (writes credentials to `storage/cms-initial-credentials.txt`)

### Editing a product

1. `/admin/products` → list (static + CMS entries)
2. Click entity → `/admin/products/:key`
3. Edit in form with live preview (`AdminProductEditorPage`)
4. Save Draft or Publish → `cmsClient.content.publish/saveDraft`
5. Public site reads published version via entity merge

### Collection management (server actions)

- Reorder → `saveCollectionOrder()` → `products.order` etc.
- Archive → `archiveEntityContent()` (materializes static to CMS first if needed)
- Duplicate → `duplicateContentEntry()`

### Drafts workflow

`/admin/drafts` lists entries where `currentVersionId ≠ publishedVersionId`.

### User management (admin only)

`/admin/users` — create users, set roles, activate/deactivate.

---

## 12. Public Site Features

| Feature | Status | Location |
|---------|--------|----------|
| Home page (hero, about, services, products, news, partners, certificates) | ✅ Complete | `HomePage.tsx` |
| About page | ✅ Complete | `AboutPage.tsx` |
| Services page | ✅ Complete | `ServicesPage.tsx` |
| Products listing + detail | ✅ Complete | Asset folders + CMS |
| Catalogs | ✅ Complete | `CatalogsPage.tsx` |
| News listing + detail | ✅ Complete | Static + CMS |
| Careers listing + detail | ✅ Complete | Static + CMS |
| Contact page | ⚠️ Form UI only | `ContactForm.tsx` logs to console |
| Cookie consent | ✅ Complete | `src/lib/cookie-consent/` |
| SEO (meta, hreflang, JSON-LD, sitemap) | ✅ Complete | `src/i18n/seo.ts`, `src/lib/seo/` |
| RTL Arabic layout | ✅ Complete | `dir="rtl"`, Noto Sans Arabic |
| CMS inline visual editing | ✅ Complete | `CmsVisualEditor` |
| 404 page | ✅ Complete | `NotFoundPage.tsx` |

### Site settings (company info)

Defaults from `src/data/site.ts` (sourced from `en.json`):
- Company: Dynamic Oil Tools
- Email: `info@dynamicoiltools.com`
- Phone: `+966 (13) 8041290`
- Address: Industrial City 3, Sector II, Block 7, Dammam, Saudi Arabia
- Site URL: `https://www.dynamicoiltools.com`

Overridable via CMS key `site.settings`.

---

## 13. Coding Standards & Conventions

### TypeScript

- `strict: true`, `verbatimModuleSyntax: true`
- Import types with `import type`
- Domain types in `src/types/` — import from `@/types`

### React / components

- Functional components only
- Page components in `src/pages/`, composed from `src/components/`
- Class merging: `cn()` from `@/lib/utils` (clsx + tailwind-merge)
- Sections receive typed `content` props from `@/types`

### Styling

- Tailwind utility classes; brand colors include `#0c1524` (navy)
- `globals.css` defines shadcn theme tokens and `@theme` variables
- Responsive: mobile-first (`sm:`, `md:` breakpoints)
- Arabic: use `useNumberFormat()` for LTR numbers in RTL context

### Server code

- Files ending in `.server.ts` are server-only (not bundled to client)
- Use dynamic imports in root loader for CMS modules (graceful degradation if DB unavailable)
- Throw `CmsHttpError` for API errors with proper status codes

### CMS content shapes

- Bilingual fields: `LocalizedValue<T>` with `en` and `ar` keys
- Images: `MediaReference` with `mediaId` or `src`
- Links: `LinkReference` with `label` and `href`
- Entity payloads: `CmsLocalizedPayload<T>` with `locales: { en, ar }`

### Prisma

- Generated client at `src/generated/prisma` — run `npm run prisma:generate` after schema changes
- **Do not run `prisma migrate dev` unless user asks**

### Git / commits

- Only commit when explicitly requested
- Never commit `.env` or `storage/` contents
- Branches: `main` (production), `staging`

### General principles (from team rules)

- Minimize scope — smallest correct diff
- Avoid over-engineering and unnecessary abstractions
- Match existing conventions in surrounding code
- Comments only for non-obvious business logic
- Add tests only when requested or meaningfully valuable

---

## 14. Environment Variables

Copy `.env.example` to `.env`.

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | **Yes** | — | PostgreSQL connection string |
| `CMS_SESSION_SECRET` | **Yes in prod** | dev fallback | HMAC secret for session cookies |
| `CMS_MEDIA_STORAGE_PATH` | No | `./storage/cms-media` | Local media upload directory |
| `DATABASE_POOL_MAX` | No | `5` | pg pool size per Node process |
| `AWS_ACCESS_KEY_ID` | S3 only | — | All four AWS vars required together |
| `AWS_SECRET_ACCESS_KEY` | S3 only | — | |
| `AWS_S3_BUCKET_NAME` | S3 only | — | |
| `AWS_REGION` | S3 only | — | |
| `CMS_INITIAL_ADMIN_EMAIL` | Script only | `cms-admin@dynamicoiltools.com` | For `rotate-cms-admin.mjs` |
| `CMS_INITIAL_ADMIN_NAME` | Script only | `DOT CMS Administrator` | |

---

## 15. Scripts & Tooling

| npm script | Command | Purpose |
|------------|---------|---------|
| `dev` | `react-router dev` | Dev server (default `localhost:5173`) |
| `build` | `react-router build` | Production build → `build/` |
| `start` | `react-router-serve ./build/server/index.js` | Production server |
| `typecheck` | `react-router typegen && tsc` | Type generation + check |
| `prisma:generate` | `prisma generate` | Regenerate Prisma client |
| `prisma:validate` | `prisma validate` | Validate schema |
| `cms:rotate-admin` | `node scripts/rotate-cms-admin.mjs` | Reset admin credentials |

---

## 16. Local Development

### Prerequisites

- Node.js 20+ (Docker uses 24)
- PostgreSQL database

### Setup

```bash
npm install
cp .env.example .env
# Edit DATABASE_URL and CMS_SESSION_SECRET

npm run prisma:generate
# Apply migrations (when ready):
# npx prisma migrate deploy

npm run dev
```

### URLs

| URL | Purpose |
|-----|---------|
| `http://localhost:5173/` | Locale redirect |
| `http://localhost:5173/en/` | English home |
| `http://localhost:5173/ar/` | Arabic home |
| `http://localhost:5173/admin` | CMS admin |

### First admin

Visit `/admin/setup` or run `npm run cms:rotate-admin`.

---

## 17. Deployment

### Build output

```
build/
├── client/    # Static assets (served by CDN or app server)
└── server/    # SSR server bundle
```

### Docker

```bash
docker build -t dot-website .
docker run -p 3000:3000 \
  -e DATABASE_URL=... \
  -e CMS_SESSION_SECRET=... \
  dot-website
```

Multi-stage Dockerfile: `npm ci` → `npm run build` → `npm run start`.

### Production checklist

- [ ] `DATABASE_URL` points to production Postgres
- [ ] `CMS_SESSION_SECRET` is a long random string
- [ ] Run `npx prisma migrate deploy`
- [ ] Bootstrap admin (setup page or rotate script)
- [ ] Configure S3 media vars OR ensure persistent volume for `CMS_MEDIA_STORAGE_PATH`
- [ ] Set `DATABASE_POOL_MAX` appropriately for host connection limits (comment in `.env.example` mentions Render shared Postgres)
- [ ] Verify `seoDefaults.siteUrl` in `src/data/site.ts` matches production domain

### Supported platforms

Any Node or Docker host: AWS ECS, Cloud Run, Azure Container Apps, Fly.io, Railway, etc. No platform-specific config files in repo currently.

---

## 18. Completed Features

- [x] Full bilingual public website (EN/AR, RTL)
- [x] SSR with React Router 8
- [x] Custom CMS with PostgreSQL
- [x] User roles (admin/editor) and session auth
- [x] Content versioning (draft/publish/archive)
- [x] Media library with local + optional S3 storage
- [x] Admin UI for products, news, careers, certificates, partners, catalogs
- [x] Collection reordering and archiving
- [x] Inline visual editing on public pages for CMS users
- [x] Site settings editor
- [x] Drafts dashboard
- [x] User management (admin role)
- [x] Cookie consent banner
- [x] SEO: meta tags, hreflang, JSON-LD, sitemap, robots.txt
- [x] Product catalog from asset folders
- [x] Partners on home dashboard
- [x] Admin credential rotation script
- [x] Connection pool tuning for shared Postgres

---

## 19. Pending Work & Known Issues

### Pending / not implemented

| Item | Notes |
|------|-------|
| **Contact form backend** | `ContactForm.tsx` only `console.info`s submissions; needs API + email service (Resend, SendGrid, etc.) |
| **CI/CD pipeline** | No `.github/workflows` in repo |
| **README** | Still default React Router template; not project-specific |
| **`src/data/` migration** | Legacy static data layer; new work should use `i18n/locales` + `i18n/content` pipeline |
| **Automated tests** | No test suite observed |
| **E2E tests** | None |

### Known issues / watch items

| Item | Notes |
|------|-------|
| Postgres connection limits | Recent commits fixed "too many clients" on Render — keep `DATABASE_POOL_MAX` low on shared DB |
| N+1 queries | Addressed in recent commit `85670ac` — verify when adding new CMS loaders |
| Duplicate product folder | `Openhole System` vs `Open hole System` — potential slug/content inconsistency |
| Public media route | Intentionally unauthenticated — do not add auth without CDN strategy |
| Root loader CMS failure | Gracefully degrades to empty overrides if DB unavailable |
| `storage/` gitignored | Media uploads and admin credentials are not in git — backup separately in production |

### Historical git context (recent fixes)

- `e6d6f95` — Prisma error fixed
- `85670ac` — N+1 query fix
- `606bb8b` — Too many clients bug on Render
- `efccd8c` — Partners added to dashboard
- Multiple commits around admin nav errors (`c38af0b` … `919d7c9`)

---

## 20. Git & Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production |
| `staging` | Pre-production / staging |
| `origin/main` | Remote default |

Remote: `https://github.com/Accurates-Saudi/DOT.git`

---

## 21. AI Assistant Quick Reference

### "I need to change page copy"

1. Check if CMS override exists for key like `home.en`
2. If editing defaults: `src/i18n/locales/en.json` / `ar.json` OR `src/i18n/content/pages/*.ts`
3. Regenerate locales if using scripts
4. Types in `src/types/content.ts`

### "I need to add a product"

1. Add folder under `src/assets/products/{Name}/` with `content.txt` + images
2. Or create via `/admin/products/new`
3. Product appears after merge in `entity-content.server.ts`

### "I need to add an API endpoint"

1. Add route in `app/routes.ts`
2. Create handler in `app/routes/`
3. Business logic in `src/server/cms/` (`.server.ts`)

### "I need to change the database"

1. Edit `prisma/schema.prisma`
2. **Ask user before creating migrations**
3. Run `npm run prisma:generate`

### "I need to add a new public page"

1. Add route in `app/routes.ts` under `:locale` layout
2. Create `app/routes/{page}.tsx` with loader + meta
3. Create `src/pages/{Page}Page.tsx`
4. Add i18n content builder + locale JSON keys
5. Add to navigation in `src/data/navigation.ts` / locale messages
6. Add to sitemap in `src/lib/seo/sitemap.ts`

### Key files to read first

| Task | Start here |
|------|------------|
| Routing | `app/routes.ts`, `app/routes/_locale.tsx` |
| CMS auth | `src/server/cms/auth/service.server.ts` |
| Content merge | `src/server/cms/content/entity-content.server.ts` |
| Page content hooks | `src/i18n/content/hooks.ts` |
| Types | `src/types/index.ts` |
| Admin UI | `app/routes/admin.tsx`, `src/pages/admin/` |
| Visual editor | `src/components/cms/CmsVisualEditor.tsx` |

### Do NOT

- Commit `.env` or secrets
- Create Prisma migrations without user approval
- Add auth to public media file route without understanding impact
- Hardcode locale-specific paths (use `localizePath`)
- Edit `src/generated/prisma/` manually

---

## Document Maintenance

When making significant changes, update the relevant sections of this file:

- New routes → [Routing](#5-routing)
- Schema changes → [Database Schema](#8-database-schema)
- New env vars → [Environment Variables](#14-environment-variables)
- Completed features → [Completed Features](#18-completed-features)
- New known issues → [Pending Work & Known Issues](#19-pending-work--known-issues)
- Bump **Last updated** date at the top
