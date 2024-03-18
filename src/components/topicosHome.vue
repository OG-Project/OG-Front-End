<template>
  <div
    class="h-[7vw] w-[16vw] flex justify-center text-xl"
    style="box-shadow: 14px 10px 21px 1px rgba(0, 0, 0, 0.51)"
  >
    <p class="mt-4" style="border-bottom: solid">{{ nomeDoTopico }}</p>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  nomeDoTopico: String,
});
</script>
<style></style>
