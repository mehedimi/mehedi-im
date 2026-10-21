<template>
  <footer class="border-t border-stone-200 px-6 py-8">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row"
    >
      <p class="text-sm text-stone-400">Built with Nuxt + Tailwind CSS</p>
      <div class="flex items-center gap-6">
        <NuxtLink
          to="/blog"
          class="text-sm text-stone-400 transition-colors hover:text-amber-600"
        >
          Blog
        </NuxtLink>
        <a
          href="https://twitter.com/mehedimi"
          target="_blank"
          rel="noopener"
          class="text-sm text-stone-400 transition-colors hover:text-amber-600"
        >
          Twitter
        </a>
        <a
          href="https://github.com/mehedimi"
          target="_blank"
          rel="noopener"
          class="text-sm text-stone-400 transition-colors hover:text-amber-600"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/mehedimi/"
          target="_blank"
          rel="noopener"
          class="text-sm text-stone-400 transition-colors hover:text-amber-600"
        >
          LinkedIn
        </a>
      </div>
      <p class="text-sm text-stone-400">
        © {{ new Date().getFullYear() }} Mehedi Hasan. All rights reserved.
      </p>
    </div>
  </footer>
</template>
