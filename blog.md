---
title: "Blog — Mehedi Hasan"
description: "Notes on building software and SaaS products — Laravel, Rust, Vue.js, and the lessons learned shipping products."
canonical_url: "https://mehedi.im/blog"
meta:
  "og:description": "Notes on building software and SaaS products — Laravel, Rust, Vue.js, and the lessons learned shipping products."
  "og:title": "Blog — Mehedi Hasan"
---

> Index of every page on this site: [llms.txt](https://mehedi.im/llms.txt)

# **Blog **

Notes on building software and SaaS products.

[Oct 24, 2026<h3>**I moved Nginx's internal hops to Unix sockets**</h3>My stream block was opening TCP connections to Nginx itself and to Caddy, on loopback ports anyone on the box could reach. Here's the move to Unix sockets, the permissions that make it worthwhile, and what I left alone. · 7 min read](https://mehedi.im/blog/nginx-stream-unix-sockets) [Oct 23, 2026<h3>**Multi-Tenant Custom Domains, without paying for Cloudflare for SaaS**</h3>How Countdown Builder serves customer domains with their own TLS certs — Nginx stream SNI routing and Caddy on-demand TLS on a single server. · 5 min read](https://mehedi.im/blog/multi-tenant-custom-domains)

```json
{"@context":"https://schema.org","@graph":[{"@id":"https://mehedi.im/#website","@type":"WebSite","description":"Mehedi Hasan is a full-stack developer building SaaS products with Laravel, Rust, Node.js and Vue.js.","name":"Mehedi Hasan","url":"https://mehedi.im/","publisher":{"@id":"https://mehedi.im/#identity"}},{"@id":"https://mehedi.im/blog#webpage","@type":"WebPage","description":"Notes on building software and SaaS products — Laravel, Rust, Vue.js, and the lessons learned shipping products.","name":"Blog","url":"https://mehedi.im/blog","isPartOf":{"@id":"https://mehedi.im/#website"},"potentialAction":[{"@type":"ReadAction","target":["https://mehedi.im/blog"]}]},{"@id":"https://mehedi.im/#identity","@type":"Person","name":"Mehedi Hasan","url":"https://mehedi.im","sameAs":["https://github.com/mehedimi","https://twitter.com/mehedimi","https://www.linkedin.com/in/mehedimi/"]}]}
```

## Sitemap

See the full [sitemap](https://mehedi.im/sitemap.md) for all pages.
