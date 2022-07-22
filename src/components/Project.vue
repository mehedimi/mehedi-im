<template>
  <div
    class="border my-6 px-5 rounded hover:shadow-2xl transition-all hover:border-transparent duration-300"
  >
    <h3 class="mt-4"><slot name="title"></slot></h3>
    <p><slot /></p>
  </div>
</template>
