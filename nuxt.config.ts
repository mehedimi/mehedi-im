import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2026-10-21",
  devtools: { enabled: false },

  modules: ["@nuxt/content", "@nuxt/fonts", "@nuxtjs/seo"],

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  site: {
    url: "https://mehedi.im",
    name: "Mehedi Hasan",
    description:
      "Mehedi Hasan is a full-stack developer building SaaS products with Laravel, Rust, Node.js and Vue.js.",
  },

  schemaOrg: {
    identity: {
      type: "Person",
      name: "Mehedi Hasan",
      url: "https://mehedi.im",
      sameAs: [
        "https://github.com/mehedimi",
        "https://twitter.com/mehedimi",
        "https://www.linkedin.com/in/mehedimi/",
      ],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "manifest", href: "/site.webmanifest" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
      ],
      script: [
        {
          // Set the theme before first paint — no flash
          innerHTML: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}})();`,
        },
        // Google Analytics (gtag.js)
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-K3DR91J839",
          async: true,
        },
        {
          innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-K3DR91J839');`,
        },
      ],
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "github-light",
            dark: "github-dark",
          },
          langs: [
            "php",
            "js",
            "ts",
            "vue",
            "json",
            "bash",
            "nginx",
            "dockerfile",
            "toml",
            "ini",
            "diff",
            "sql",
            "rust",
            "css",
            "html",
            "http",
            "yaml",
            "md",
          ],
        },
      },
    },
  },

  fonts: {
    defaults: {
      // Figtree arrives subsetted from Google, which skips preload by default
      preload: true,
    },
  },

  ogImage: {
    enabled: false,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
});
