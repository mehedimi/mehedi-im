<script setup lang="ts">
const route = useRoute();
const path = `/blog/${route.params.slug}`;

const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () =>
  queryCollection("blog").path(path).first(),
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
    fatal: true,
  });
}

const { data: surround } = await useAsyncData(
  `blog-surround-${route.params.slug}`,
  () =>
    queryCollectionItemSurroundings("blog", path, {
      fields: ["title", "description"],
    }),
);
const [prev, next] = surround.value ?? [];

useSeoMeta({
  title: () => post.value!.title,
  description: () => post.value!.description,
  ogTitle: () => post.value!.title,
  ogDescription: () => post.value!.description,
  ogType: "article",
  articlePublishedTime: () => new Date(post.value!.date).toISOString(),
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: computed(() =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.value!.title,
          description: post.value!.description,
          datePublished: new Date(post.value!.date).toISOString(),
          author: {
            "@type": "Person",
            name: "Mehedi Hasan",
            url: "https://mehedi.im",
          },
          mainEntityOfPage: `https://mehedi.im${path}`,
        }),
      ),
    },
  ],
});
</script>

<template>
  <article v-if="post" class="px-6 py-16 md:py-24">
    <div class="mx-auto max-w-3xl">
      <NuxtLink
        to="/blog"
        class="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-stone-400 transition-colors hover:text-amber-600"
      >
        <svg
          class="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        Back to blog
      </NuxtLink>

      <header class="mb-12">
        <div
          class="mb-4 flex flex-wrap items-center gap-3 text-sm text-stone-400"
        >
          <time :datetime="new Date(post.date).toISOString()">{{
            formatDate(post.date)
          }}</time>
          <span aria-hidden="true">·</span>
          <span v-if="readingTime(post.body)"
            >{{ readingTime(post.body) }} min read</span
          >
        </div>

        <h1
          class="text-4xl font-bold tracking-tight text-stone-900 md:text-5xl md:leading-tight"
        >
          {{ post.title }}
        </h1>

        <p class="mt-4 font-serif text-lg leading-relaxed text-stone-500">
          {{ post.description }}
        </p>

        <div v-if="post.tags?.length" class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600"
          >
            {{ tag }}
          </span>
        </div>
      </header>

      <ContentRenderer
        :value="post"
        class="blog-prose prose prose-lg max-w-none font-serif prose-stone prose-headings:font-sans prose-headings:tracking-tight prose-a:font-medium prose-a:text-amber-600 prose-a:no-underline hover:prose-a:text-amber-700 prose-blockquote:border-amber-300 prose-blockquote:font-normal prose-blockquote:text-stone-600 prose-img:rounded-2xl prose-hr:border-stone-200"
      />

      <nav
        v-if="prev || next"
        class="mt-16 grid gap-4 border-t border-stone-200 pt-10 sm:grid-cols-2"
        aria-label="Post navigation"
      >
        <NuxtLink
          v-if="prev"
          :to="prev.path"
          class="group rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-300 hover:border-amber-200 hover:shadow-lg"
        >
          <span
            class="text-xs font-medium tracking-wider text-stone-400 uppercase"
          >
            ← Previous
          </span>
          <p
            class="mt-1 font-semibold text-stone-900 transition-colors group-hover:text-amber-600"
          >
            {{ prev.title }}
          </p>
        </NuxtLink>
        <span v-else></span>
        <NuxtLink
          v-if="next"
          :to="next.path"
          class="group rounded-2xl border border-stone-200 bg-white p-5 text-right transition-all duration-300 hover:border-amber-200 hover:shadow-lg"
        >
          <span
            class="text-xs font-medium tracking-wider text-stone-400 uppercase"
          >
            Next →
          </span>
          <p
            class="mt-1 font-semibold text-stone-900 transition-colors group-hover:text-amber-600"
          >
            {{ next.title }}
          </p>
        </NuxtLink>
      </nav>
    </div>
  </article>
</template>
