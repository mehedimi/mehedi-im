<script setup lang="ts">
defineProps<{
  project: {
    name: string;
    url: string;
    description: string;
    tags: string[];
  };
}>();
</script>

<template>
  <a
    :href="project.url"
    target="_blank"
    rel="noopener"
    class="group block border-t border-line py-[18px] no-underline"
  >
    <h3
      class="mb-1 flex items-baseline justify-between gap-3 text-[1.05rem] font-bold text-text"
    >
      {{ project.name }}
      <span
        class="text-muted transition-all duration-150 group-hover:translate-x-[3px] group-hover:text-accent"
        >↗</span
      >
    </h3>
    <p class="mb-2 text-[0.95rem] text-muted">{{ project.description }}</p>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="rounded-full bg-surface px-2.5 py-[3px] text-[0.8rem] text-muted"
      >
        {{ tag }}
      </span>
    </div>
  </a>
</template>
