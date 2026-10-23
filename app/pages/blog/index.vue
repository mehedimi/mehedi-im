<script setup lang="ts">
useSeoMeta({
  title: "Blog",
  description:
    "Notes on building software and SaaS products — Laravel, Rust, Vue.js, and the lessons learned shipping products.",
  ogTitle: "Blog — Mehedi Hasan",
  ogDescription:
    "Notes on building software and SaaS products — Laravel, Rust, Vue.js, and the lessons learned shipping products.",
});

const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("blog").order("date", "DESC").all(),
);
</script>

<template>
  <div class="mx-auto max-w-[720px] px-[22px] pt-14 pb-10">
    <h1
      class="text-[clamp(2rem,6vw,2.8rem)] leading-[1.15] font-bold tracking-[-0.03em]"
    >
      Blog
    </h1>
    <p class="mt-3.5 mb-9 max-w-[56ch] text-[1.15rem] text-muted">
      Notes on building software and SaaS products.
    </p>

    <div v-if="posts?.length" class="border-b border-line">
      <BlogCard v-for="post in posts" :key="post.path" :post="post" />
    </div>
    <p v-else class="text-muted">No posts yet — check back soon.</p>
  </div>
</template>
