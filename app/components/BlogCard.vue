<script setup lang="ts">
defineProps<{
  post: {
    path: string;
    title: string;
    description: string;
    date: string | Date;
    tags?: string[];
    body?: unknown;
  };
}>();
</script>

<template>
  <NuxtLink
    :to="post.path"
    class="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:border-amber-200 hover:shadow-lg"
  >
    <div class="mb-3 flex items-center gap-3 text-xs text-stone-400">
      <time :datetime="new Date(post.date).toISOString()">{{
        formatDate(post.date)
      }}</time>
      <span aria-hidden="true">·</span>
      <span v-if="readingTime(post.body)"
        >{{ readingTime(post.body) }} min read</span
      >
    </div>

    <h3
      class="mb-2 text-xl font-bold text-stone-900 transition-colors duration-300 group-hover:text-amber-600"
    >
      {{ post.title }}
    </h3>

    <p class="mb-4 flex-1 text-sm leading-relaxed text-stone-500">
      {{ post.description }}
    </p>

    <div v-if="post.tags?.length" class="flex flex-wrap gap-2">
      <span
        v-for="tag in post.tags"
        :key="tag"
        class="rounded-full bg-stone-50 px-2 py-1 text-xs font-medium text-stone-500"
      >
        {{ tag }}
      </span>
    </div>
  </NuxtLink>
</template>
