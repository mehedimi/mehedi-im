<script setup lang="ts">
const route = useRoute();

// Hide the header while scrolling down, bring it back on any scroll up
const headerHidden = ref(false);
let lastY = 0;

function onScroll() {
  const y = window.scrollY;
  headerHidden.value = y > 80 && y > lastY;
  lastY = y;
}

onMounted(() => {
  lastY = window.scrollY;
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));

// A fresh page starts with the header visible
watch(
  () => route.path,
  () => {
    headerHidden.value = false;
    lastY = 0;
  },
);

useHead({
  titleTemplate: (title) =>
    title
      ? `${title} — Mehedi Hasan`
      : "Mehedi Hasan — Full-Stack Developer & SaaS Builder",
});
</script>

<template>
  <div class="flex min-h-screen flex-col bg-bg text-text">
    <SiteNav :hidden="headerHidden" />
    <ReadingProgress :hidden="headerHidden" />

    <main class="flex-1">
      <NuxtPage />
    </main>

    <SiteFooter />
  </div>
</template>
