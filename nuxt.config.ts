import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2026-10-21",
  devtools: { enabled: false },

  modules: ["@nuxt/content", "@nuxtjs/seo"],

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  site: {
    url: "https://mehedi.im",
    name: "Mehedi Hasan",
    description:
      "Mehedi Hasan is a full-stack developer specializing in Laravel, Node.js, Vue.js, and scalable SaaS solutions. Explore his projects, writing, and expertise.",
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
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap",
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
          },
          langs: [
            "php",
            "js",
            "ts",
            "vue",
            "json",
            "bash",
            "sql",
            "rust",
            "css",
            "html",
            "yaml",
            "md",
          ],
        },
      },
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
