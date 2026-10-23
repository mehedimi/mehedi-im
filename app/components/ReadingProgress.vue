<script setup lang="ts">
defineProps<{ hidden?: boolean }>();

const route = useRoute();
const isPost = computed(
  () => route.path.startsWith("/blog/") && route.path !== "/blog",
);
const progress = ref(0);

function update() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
}

onMounted(() => {
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", update);
  window.removeEventListener("resize", update);
});

watch(isPost, () => update());
</script>

<template>
  <div
    v-if="isPost"
    aria-hidden="true"
    class="fixed left-0 z-25 h-0.5 w-full origin-left bg-accent transition-[top] duration-300 ease-out"
    :class="hidden ? 'top-0' : 'top-[60px]'"
    :style="{ transform: `scaleX(${progress})` }"
  />
</template>
