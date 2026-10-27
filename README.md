# Shubha Vajragiri — personal website

Built with [Astro](https://astro.build), deployed on Vercel.

## Develop

Requires Node `>=22.23.4` (pinned in `.nvmrc`).

```sh
nvm use
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Where things live

| What | Where |
|---|---|
| Home page (about, experience, contact, photos) | `src/pages/index.astro` |
| Projects | one Markdown file per project in `src/content/projects/` (frontmatter only; fields in `src/content.config.ts`) |
| Writing | Markdown posts in `src/content/writing/` (`draft: true` hides one) |
| Shared layout, colors, fonts | `src/layouts/Base.astro` |
| Project thumbnails | `public/projects/` — set `image:` (or `video:`) in the project's frontmatter |
| Sidebar photos | `public/photos/` — listed in `photos` in `src/pages/index.astro` |

Projects marked `featured: true` show on the home page; `inProgress: true` adds an "in progress" label.
