<script setup lang="ts">
useHead({
  titleTemplate: (title) =>
    title
      ? `${title} — Mehedi Hasan`
      : "Mehedi Hasan — Full-Stack Developer & SaaS Builder",
});
</script>

<template>
  <div class="flex min-h-screen flex-col bg-bg text-text">
    <SiteNav />
    <ReadingProgress />

    <main class="flex-1">
      <NuxtPage />
    </main>

    <SiteFooter />
  </div>
</template>
