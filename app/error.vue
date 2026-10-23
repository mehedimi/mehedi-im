<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number } }>();
</script>

<template>
  <div class="flex min-h-screen flex-col bg-bg text-text">
    <SiteNav />
    <div class="flex flex-1 items-center justify-center px-[22px] py-24">
      <div class="max-w-[720px] text-center">
        <p
          class="text-[0.8rem] font-semibold tracking-[0.1em] text-muted uppercase"
        >
          {{ props.error.statusCode }}
        </p>
        <h1
          class="mt-3 text-[clamp(2rem,6vw,2.8rem)] leading-[1.15] font-bold tracking-[-0.03em]"
        >
          {{
            props.error.statusCode === 404
              ? "Page not found"
              : "Something went wrong"
          }}
        </h1>
        <p class="mt-4 text-muted">
          The page you're looking for doesn't exist or has moved.
        </p>
        <a
          href="/"
          class="mt-8 inline-block rounded-[9px] border border-line bg-text px-[18px] py-2.5 text-[0.95rem] font-[550] text-bg no-underline hover:border-accent"
        >
          Back home
        </a>
      </div>
    </div>
    <SiteFooter />
  </div>
</template>
