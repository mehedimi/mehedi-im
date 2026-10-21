<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number } }>();
</script>

<template>
  <div class="flex min-h-screen flex-col bg-stone-50 text-stone-800">
    <div class="noise-overlay"></div>
    <div class="flex flex-1 items-center justify-center px-6 py-24 text-center">
      <div>
        <p class="text-sm font-medium tracking-wider text-amber-600 uppercase">
          {{ props.error.statusCode }}
        </p>
        <h1 class="mt-2 text-4xl font-bold text-stone-900 md:text-5xl">
          {{
            props.error.statusCode === 404
              ? "Page not found"
              : "Something went wrong"
          }}
        </h1>
        <p class="mt-4 text-stone-500">
          The page you're looking for doesn't exist or has moved.
        </p>
        <NuxtLink
          to="/"
          class="mt-8 inline-block rounded-full bg-stone-900 px-8 py-4 font-medium text-stone-50 transition-all duration-300 hover:bg-amber-600"
        >
          Back home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
