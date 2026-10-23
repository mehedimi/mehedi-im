<script setup lang="ts">
defineProps<{
  role: string;
  company: string;
  dates: string;
  note?: string;
}>();
</script>

<template>
  <div
    class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-[2px] border-t border-line py-3.5"
  >
    <div class="min-w-0">
      <span class="text-[1rem] font-[550] text-text">{{ role }}</span>
      <span class="text-[0.95rem] text-muted">
        · {{ company }}<template v-if="note"> · {{ note }}</template></span
      >
    </div>
    <span class="text-[0.85rem] text-muted tabular-nums">{{ dates }}</span>
  </div>
</template>
