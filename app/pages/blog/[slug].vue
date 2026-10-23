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

useSeoMeta({
  title: () => post.value!.title,
  description: () => post.value!.description,
  ogTitle: () => post.value!.title,
  ogDescription: () => post.value!.description,
  ogType: "article",
  ogImage: () => post.value!.image,
  ogImageAlt: () => post.value!.title,
  twitterCard: () => (post.value!.image ? "summary_large_image" : "summary"),
  twitterImage: () => post.value!.image,
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
          ...(post.value!.image
            ? { image: `https://mehedi.im${post.value!.image}` }
            : {}),
        }),
      ),
    },
  ],
});
</script>

<template>
  <article
    v-if="post"
    class="mx-auto max-w-[720px] px-[22px] pt-14 pb-16 md:pb-24"
  >
    <NuxtLink
      to="/blog"
      class="mb-7 inline-block text-[0.9rem] text-muted no-underline hover:text-text"
    >
      ← All posts
    </NuxtLink>

    <h1
      class="mb-2.5 font-serif text-[clamp(2rem,5.5vw,2.8rem)] leading-tight font-bold tracking-tight text-balance"
    >
      {{ post.title }}
    </h1>
    <p class="mb-9 text-[0.9rem] text-muted">
      <time :datetime="new Date(post.date).toISOString()">{{
        formatDate(post.date)
      }}</time>
      <template v-if="readingTime(post.body)">
        · {{ readingTime(post.body) }} min read</template
      >
    </p>

    <ContentRenderer :value="post" class="prose" />

    <p class="mt-14">
      <NuxtLink
        to="/blog"
        class="text-[0.9rem] text-muted no-underline hover:text-text"
      >
        ← Back to all posts
      </NuxtLink>
    </p>
  </article>
</template>
