<template>
  <div id="zoom" class="h-[7vw] w-[16vw] flex justify-center text-xl hover:scale-125">
    <p class="mt-4" style="text-decoration: underline">{{ nomeDoTopico }}</p>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  nomeDoTopico: String,
});
</script>
<style>
#zoom { 
  transition: all .2s ease-in-out; 
  box-shadow: 14px 10px 21px 1px rgba(0, 0, 0, 0.51) 
  }
#zoom:hover { 
  transform: scale(1.1);
  cursor: pointer;
  }
</style>
