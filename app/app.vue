<script setup lang="ts">
useHead({
  titleTemplate: (title) =>
    title
      ? `${title} | Mehedi Hasan`
      : "Mehedi Hasan | Full-Stack Developer & SaaS Builder",
});
</script>

<template>
  <div class="flex min-h-screen flex-col bg-stone-50 text-stone-800">
    <div class="noise-overlay"></div>

    <SiteNav />

    <main class="flex-1">
      <NuxtPage />
    </main>

    <SiteFooter />
  </div>
</template>
