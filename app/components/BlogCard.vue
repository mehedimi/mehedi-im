<script setup lang="ts">
defineProps<{
  post: {
    path: string;
    title: string;
    description: string;
    date: string | Date;
    body?: unknown;
  };
}>();
</script>

<template>
  <NuxtLink
    :to="post.path"
    class="block border-t border-line py-[18px] no-underline"
  >
    <div
      class="flex flex-col gap-[2px] min-[520px]:flex-row min-[520px]:items-baseline min-[520px]:gap-[18px]"
    >
      <time
        :datetime="new Date(post.date).toISOString()"
        class="text-[0.85rem] text-muted tabular-nums min-[520px]:w-[92px] min-[520px]:flex-none"
        >{{ formatDate(post.date) }}</time
      >
      <div>
        <h3 class="mb-1 text-[1.1rem] font-bold text-text">{{ post.title }}</h3>
        <p class="text-[0.95rem] text-muted">
          {{ post.description
          }}<template v-if="readingTime(post.body)">
            · {{ readingTime(post.body) }} min read</template
          >
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
