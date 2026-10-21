<script setup lang="ts">
useSeoMeta({
  title: "Blog",
  description:
    "Writing about Laravel, Vue.js, Rust, SaaS development, and the lessons learned building products.",
  ogTitle: "Blog | Mehedi Hasan",
  ogDescription:
    "Writing about Laravel, Vue.js, Rust, SaaS development, and the lessons learned building products.",
});

const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("blog").order("date", "DESC").all(),
);
</script>

<template>
  <div>
    <section class="bg-stone-100 px-6 py-24">
      <div class="mx-auto max-w-4xl">
        <span
          class="text-sm font-medium tracking-wider text-amber-600 uppercase"
          >Blog</span
        >
        <h1
          class="mt-2 text-4xl font-bold tracking-tight text-stone-900 md:text-5xl"
        >
          Writing about building software
        </h1>
        <p class="mt-4 max-w-2xl text-lg leading-relaxed text-stone-500">
          Notes on Laravel, Vue.js, Rust, and the ups and downs of building SaaS
          products.
        </p>
      </div>
    </section>

    <section class="px-6 py-20">
      <div class="mx-auto max-w-4xl">
        <div v-if="posts?.length" class="grid gap-6 sm:grid-cols-2">
          <BlogCard v-for="post in posts" :key="post.path" :post="post" />
        </div>
        <p v-else class="text-center text-stone-400">
          No posts yet — check back soon.
        </p>
      </div>
    </section>
  </div>
</template>
