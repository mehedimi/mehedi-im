---
title: Rebuilding my portfolio with Nuxt
description: Why I moved mehedi.im to Nuxt — file-based routing, markdown content, and SEO features out of the box.
date: 2026-10-20
tags:
  - Nuxt
  - Vue
  - SSG
---

My portfolio had outgrown itself. It started as a single Vue page rendered with vite-ssg, which was perfectly fine while it was just a homepage. But once I wanted to start writing, a single page with no routing and hand-rolled SEO tags was going to fight me every step of the way.

So I rebuilt it with [Nuxt](https://nuxt.com). Here's what that unlocked.

## File-based routing, for free

The old site was one big `App.vue`. In Nuxt, the pages I needed just appeared:

```txt
app/
├── pages/
│   ├── index.vue        # the portfolio itself
│   └── blog/
│       ├── index.vue    # post listing
│       └── [slug].vue   # a single post
└── content/
    └── blog/
        └── *.md         # where posts live
```

No router config, no route guards, nothing to wire up.

## Markdown as a first-class citizen

`@nuxt/content` gives me a `content/` directory that turns into a queryable collection. The blog listing page is basically three lines:

```ts
const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("blog").order("date", "DESC").all(),
);
```

Code blocks are highlighted with [Shiki](https://shiki.style) at build time — no client-side highlighter, no layout shift.

## SEO without reinventing it

This was the big one. With the Nuxt SEO modules, I get:

- **A sitemap** generated from the actual routes at build time
- **robots.txt** pointing at that sitemap
- **Canonical URLs** and Open Graph tags derived from the site config
- **`llms.txt`** so AI assistants can index the writing

One `site.url` setting in `nuxt.config.ts` feeds all of it.

## Still a static site

`nuxt generate` prerenders every page to plain HTML and ships them to GitHub Pages. It's as fast as the old setup, but now every page carries its own title, description, and structured data.

If your portfolio is a single page today and you're eyeing a blog tomorrow — start with a framework that won't make you restructure everything when you get there.
