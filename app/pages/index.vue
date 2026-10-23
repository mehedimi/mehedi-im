<script setup lang="ts">
useSeoMeta({
  description:
    "Mehedi Hasan is a full-stack developer building SaaS products with Laravel, Rust, Node.js and Vue.js.",
  ogTitle: "Mehedi Hasan — Full-Stack Developer & SaaS Builder",
  ogDescription:
    "Mehedi Hasan is a full-stack developer building SaaS products with Laravel, Rust, Node.js and Vue.js.",
});

const { data: latestPosts } = await useAsyncData("latest-posts", () =>
  queryCollection("blog").order("date", "DESC").limit(3).all(),
);

const featured = [
  {
    name: "Countdown Builder",
    url: "https://countdownbuilder.com",
    description:
      "Live countdown timers for email campaigns and websites. Images come from a custom Rust service, compiled to WASM for the builder.",
    tags: ["Laravel", "Rust", "WASM", "SaaS"],
  },
  {
    name: "OG Dynamic",
    url: "https://ogdynamic.com",
    description:
      "Dynamic Open Graph images for ecommerce: branded pricing, product photos and reusable templates, rendered by a Rust service.",
    tags: ["Laravel", "Rust", "E-commerce"],
  },
  {
    name: "UmamiQR",
    url: "https://umamiqr.com",
    description:
      "Free AI-powered QR menus for restaurants. Manage menus in plain language; sub-600ms loads via Redis and CDN.",
    tags: ["Laravel", "Vue.js", "AI", "Redis"],
  },
];

const more = [
  {
    name: "MD Notes",
    url: "https://codecanyon.net/item/md-notes-note-taking-apps/47341309",
    description:
      "Markdown note-taking desktop app for Windows with live preview, mermaid diagrams and offline SQLite storage.",
    tags: ["Rust", "Desktop"],
  },
  {
    name: "Laravel DynamoDB",
    url: "https://github.com/mehedimi/laravel-dynamodb",
    description:
      "Eloquent-style DynamoDB for Laravel: CRUD, batch operations and pagination.",
    tags: ["Laravel", "AWS", "Open source"],
  },
  {
    name: "WP Query Builder",
    url: "https://github.com/mehedimi/wp-query-builder",
    description:
      "A Composer package that makes WordPress database queries simple to write.",
    tags: ["PHP", "WordPress", "Open source"],
  },
  {
    name: "Laravel AMP Mail",
    url: "https://github.com/mehedimi/laravel-amp-mail",
    description:
      "AMP email support for Laravel with graceful HTML/text fallback.",
    tags: ["Laravel", "Email", "Open source"],
  },
  {
    name: "Typing Master for Developers",
    url: "https://typing-v3.netlify.app",
    description: "Practice typing real code instead of random paragraphs.",
    tags: ["Vue.js", "Education"],
  },
  {
    name: "Product Watcher",
    url: "https://wordpress.org/plugins/product-watcher",
    description:
      "WordPress plugin showing real-time product viewer counts in WooCommerce.",
    tags: ["WordPress", "WooCommerce"],
  },
];

const experience = [
  {
    role: "Founder",
    company: "Countdown Builder",
    dates: "Sep 2025 – Present",
  },
  {
    role: "Senior Software Engineer",
    company: "weDevs",
    dates: "Jan 2023 – Aug 2025",
  },
];

const earlierExperience = [
  {
    role: "Software Engineer",
    company: "weDevs",
    dates: "Jul 2020 – Dec 2022",
  },
  {
    role: "Junior Software Engineer",
    company: "weDevs",
    dates: "Jun 2019 – Jun 2020",
  },
  {
    role: "Laravel Developer",
    company: "Smart Software Ltd.",
    dates: "Nov 2018 – May 2019",
  },
  {
    role: "Laravel Developer",
    company: "Terrestrial IT Ltd",
    dates: "Dec 2017 – Jun 2018",
  },
  {
    role: "Laravel Developer",
    company: "bti- Building Technology & Ideas Ltd.",
    dates: "Jan 2017 – Jun 2017",
    note: "Internship",
  },
  {
    role: "Web Developer",
    company: "Cloud Technology",
    dates: "Jun 2016 – Nov 2016",
  },
];

const stack = [
  "Laravel",
  "Vue.js",
  "Node.js",
  "Rust",
  "AWS",
  "PostgreSQL",
  "Redis",
];
</script>

<template>
  <div class="mx-auto max-w-[720px] px-[22px] pt-14 pb-10">
    <!-- Intro -->
    <img
      src="/images/mehedi.jpg"
      alt="Portrait of Mehedi Hasan"
      width="300"
      height="300"
      class="mb-6 h-[88px] w-[88px] rounded-full border border-line object-cover"
    />
    <h1
      class="mb-3.5 text-[clamp(2rem,6vw,2.8rem)] leading-[1.15] font-bold tracking-[-0.03em]"
    >
      Hi, I'm Mehedi. I build SaaS products that solve real problems.
    </h1>
    <p class="mb-6 max-w-[56ch] text-[1.15rem] text-muted">
      Full-stack developer from Bangladesh, working with Laravel, Rust, Node.js
      and Vue.js.
    </p>
    <div class="flex flex-wrap gap-3">
      <NuxtLink
        to="/#projects"
        class="rounded-[9px] border border-line bg-text px-[18px] py-2.5 text-[0.95rem] font-[550] text-bg no-underline hover:border-accent"
      >
        View projects
      </NuxtLink>
      <NuxtLink
        to="/blog"
        class="rounded-[9px] border border-line px-[18px] py-2.5 text-[0.95rem] font-[550] text-text no-underline hover:border-accent"
      >
        Read the blog
      </NuxtLink>
    </div>

    <!-- About -->
    <section class="mt-[72px]">
      <h2
        class="mb-5 text-[0.8rem] font-semibold tracking-[0.1em] text-muted uppercase"
      >
        About
      </h2>
      <p class="mb-3.5 text-[1.05rem]">
        I'm a full-stack developer and open source contributor. My core stack is
        PHP with Laravel, and I'm equally at home with Node.js and Vue.js on the
        front end, plus Rust where performance matters.
      </p>
      <p class="mb-3.5 text-[1.05rem]">
        Right now I'm building
        <a
          href="https://countdownbuilder.com"
          class="text-accent underline underline-offset-[3px]"
          >Countdown Builder</a
        >
        and
        <a
          href="https://ogdynamic.com"
          class="text-accent underline underline-offset-[3px]"
          >OG Dynamic</a
        >.
      </p>
      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="item in stack"
          :key="item"
          class="rounded-full bg-surface px-2.5 py-[3px] text-[0.8rem] text-muted"
        >
          {{ item }}
        </span>
      </div>
    </section>

    <!-- Experience -->
    <section class="mt-[72px]">
      <h2
        class="mb-5 text-[0.8rem] font-semibold tracking-[0.1em] text-muted uppercase"
      >
        Experience
      </h2>
      <div class="border-b border-line">
        <ExperienceItem
          v-for="job in experience"
          :key="job.role + job.company"
          :role="job.role"
          :company="job.company"
          :dates="job.dates"
        />
      </div>
      <details class="mt-7">
        <summary
          class="cursor-pointer text-[0.95rem] text-muted hover:text-text"
        >
          Earlier experience ({{ earlierExperience.length }})
        </summary>
        <div class="mt-3.5 border-b border-line">
          <ExperienceItem
            v-for="job in earlierExperience"
            :key="job.role + job.company"
            :role="job.role"
            :company="job.company"
            :dates="job.dates"
            :note="job.note"
          />
        </div>
      </details>
    </section>

    <!-- Projects -->
    <section id="projects" class="mt-[72px]">
      <h2
        class="mb-5 text-[0.8rem] font-semibold tracking-[0.1em] text-muted uppercase"
      >
        Featured projects
      </h2>
      <div class="border-b border-line">
        <ProjectItem
          v-for="project in featured"
          :key="project.name"
          :project="project"
        />
      </div>
      <details class="mt-7">
        <summary
          class="cursor-pointer text-[0.95rem] text-muted hover:text-text"
        >
          More projects &amp; open source ({{ more.length }})
        </summary>
        <div class="mt-3.5 border-b border-line">
          <ProjectItem
            v-for="project in more"
            :key="project.name"
            :project="project"
          />
        </div>
      </details>
    </section>

    <!-- Latest writing -->
    <section v-if="latestPosts?.length" class="mt-[72px]">
      <h2
        class="mb-5 text-[0.8rem] font-semibold tracking-[0.1em] text-muted uppercase"
      >
        Latest writing
      </h2>
      <div class="border-b border-line">
        <BlogCard v-for="post in latestPosts" :key="post.path" :post="post" />
      </div>
      <p class="mt-7">
        <NuxtLink to="/blog" class="text-accent no-underline"
          >All posts →</NuxtLink
        >
      </p>
    </section>

    <!-- Contact -->
    <section id="contact" class="mt-[72px]">
      <h2
        class="mb-5 text-[0.8rem] font-semibold tracking-[0.1em] text-muted uppercase"
      >
        Contact
      </h2>
      <p class="mb-4 text-[1.05rem]">
        Have a project in mind or just want to say hello? Reach out on any of
        these.
      </p>
      <div class="flex flex-wrap gap-[18px]">
        <a
          href="mailto:me@mehedi.im"
          class="text-accent underline underline-offset-[3px]"
          >me@mehedi.im</a
        >
        <a
          href="https://github.com/mehedimi"
          target="_blank"
          rel="noopener"
          class="text-accent underline underline-offset-[3px]"
          >GitHub</a
        >
        <a
          href="https://www.linkedin.com/in/mehedimi/"
          target="_blank"
          rel="noopener"
          class="text-accent underline underline-offset-[3px]"
          >LinkedIn</a
        >
        <a
          href="https://twitter.com/mehedimi"
          target="_blank"
          rel="noopener"
          class="text-accent underline underline-offset-[3px]"
          >Twitter</a
        >
        <a
          href="https://www.fiverr.com/mehedi_mi"
          target="_blank"
          rel="noopener"
          class="text-accent underline underline-offset-[3px]"
          >Hire me on Fiverr</a
        >
      </div>
    </section>
  </div>
</template>
