<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-stone-200/60 bg-stone-50/80 backdrop-blur-md"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <NuxtLink
        to="/"
        class="font-serif text-lg font-bold tracking-tight text-stone-900 transition-colors hover:text-amber-600"
      >
        mehedi<span class="text-amber-600">.im</span>
      </NuxtLink>

      <div class="flex items-center gap-2 sm:gap-6">
        <NuxtLink
          to="/"
          class="rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4"
          :class="
            route.path === '/'
              ? 'bg-stone-200/70 text-stone-900'
              : 'text-stone-500 hover:text-stone-900'
          "
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/blog"
          class="rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4"
          :class="
            route.path.startsWith('/blog')
              ? 'bg-stone-200/70 text-stone-900'
              : 'text-stone-500 hover:text-stone-900'
          "
        >
          Blog
        </NuxtLink>
        <a
          href="https://www.fiverr.com/mehedi_mi"
          target="_blank"
          rel="noopener"
          class="rounded-full border-2 border-green-300 px-4 py-1.5 text-sm font-medium text-green-700 transition-all duration-300 hover:border-green-400 hover:bg-green-50"
        >
          Hire Me
        </a>
      </div>
    </nav>
  </header>
</template>
