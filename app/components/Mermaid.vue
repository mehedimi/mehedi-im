<script setup lang="ts">
const props = defineProps<{ code: string }>();

const el = ref<HTMLDivElement>();

onMounted(async () => {
  const mermaid = (await import("mermaid")).default;
  mermaid.initialize({
    startOnLoad: false,
    // Neutral is grayscale — reads correctly in both light and dark themes
    theme: "neutral",
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif",
  });
  const { svg } = await mermaid.render(
    `mermaid-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    props.code.trim(),
  );
  el.value!.innerHTML = svg;
});
</script>

<template>
  <div ref="el" class="mermaid"></div>
</template>
