<template>
  <div class="h-full">
      <div v-if="screenWidth >= 1024" class="h-[90%]">
      <HomeViewDesktop></HomeViewDesktop>
      </div>
      <div v-else>
      <HomeViewMobile></HomeViewMobile>
      </div>
  </div>
</template>
<script setup>
import { ref, onMounted,watch } from 'vue'
import HomeViewDesktop from './desktop/HomeViewDesktop.vue';
import HomeViewMobile from './mobile/HomeViewMobile.vue';

const screenWidth = ref(window.innerWidth)

watch(() => window.innerWidth, () => {
  screenWidth.value = window.innerWidth
})
onMounted(() => {
  window.addEventListener('resize', () => {
      screenWidth.value = window.innerWidth
  })
})
</script>