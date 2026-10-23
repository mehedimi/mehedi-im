<script setup lang="ts">
const route = useRoute();

const onBlog = computed(() => route.path.startsWith("/blog"));
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-line bg-bg">
    <div
      class="mx-auto flex h-[60px] max-w-[720px] items-center justify-between px-[22px]"
    >
      <NuxtLink
        to="/"
        class="font-[650] tracking-[-0.01em] text-text no-underline"
      >
        Mehedi Hasan
      </NuxtLink>

      <nav class="flex items-center gap-4 text-[0.95rem] sm:gap-5">
        <NuxtLink
          to="/#projects"
          class="transition-colors duration-150 hover:text-text"
          :class="!onBlog ? 'text-text' : 'text-muted'"
        >
          Work
        </NuxtLink>
        <NuxtLink
          to="/blog"
          class="transition-colors duration-150 hover:text-text"
          :class="onBlog ? 'text-text' : 'text-muted'"
        >
          Blog
        </NuxtLink>
        <a
          href="mailto:me@mehedi.im"
          class="text-muted transition-colors duration-150 hover:text-text"
        >
          Contact
        </a>
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>
