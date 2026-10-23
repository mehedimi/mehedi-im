<script setup lang="ts">
const theme = ref<"light" | "dark">("light");

onMounted(() => {
  theme.value =
    document.documentElement.dataset.theme === "dark" ? "dark" : "light";
});

function toggle() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme.value;
  try {
    localStorage.setItem("theme", theme.value);
  } catch {
    // private mode — theme just won't persist
  }
}
</script>

<template>
  <button
    type="button"
    aria-label="Toggle theme"
    title="Toggle theme"
    class="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-lg border border-line text-muted transition-colors duration-150 hover:text-text"
    @click="toggle"
  >
    ◐
  </button>
</template>
