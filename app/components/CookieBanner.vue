<script setup lang="ts">
// Notification-only cookie notice — remember dismissal in localStorage
const STORAGE_KEY = "cookie-notice-dismissed";
const visible = ref(false);

onMounted(() => {
  visible.value = localStorage.getItem(STORAGE_KEY) !== "1";
});

function dismiss() {
  localStorage.setItem(STORAGE_KEY, "1");
  visible.value = false;
}
</script>

<template>
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="translate-y-full"
    leave-active-class="transition-transform duration-200 ease-in"
    leave-to-class="translate-y-full"
  >
    <div
      v-if="visible"
      class="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg"
    >
      <div
        class="mx-auto flex max-w-[720px] flex-wrap items-center justify-between gap-x-6 gap-y-2.5 px-[22px] py-4"
      >
        <p class="text-[0.85rem] text-muted">
          This site uses cookies for Google Analytics, to understand how it's
          used. No ads — nothing else.
        </p>
        <button
          type="button"
          class="shrink-0 cursor-pointer rounded-[9px] border border-line bg-text px-4 py-[7px] text-[0.85rem] font-[550] text-bg hover:border-accent"
          @click="dismiss"
        >
          Got it
        </button>
      </div>
    </div>
  </Transition>
</template>
