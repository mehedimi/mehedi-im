<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

defineOptions({ inheritAttrs: false });

defineProps({
  code: { type: String, default: "" },
  language: { type: String, default: "" },
});

const { copy, copied } = useClipboard();
</script>

<template>
  <Mermaid v-if="language === 'mermaid'" :code="code" />
  <div v-else class="group relative">
    <pre v-bind="$attrs"><slot /></pre>
    <button
      v-if="code"
      type="button"
      class="absolute top-2.5 right-3 cursor-pointer rounded-md border border-line bg-bg px-2 py-0.5 font-sans text-[0.72rem] text-muted transition-colors duration-150 hover:text-text"
      @click="copy(code)"
    >
      {{ copied ? "Copied ✓" : "Copy" }}
    </button>
  </div>
</template>
