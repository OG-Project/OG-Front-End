<template>
    <div class="h-[90%]">
        <div v-if="screenWidth >= 768" class="h-full">
            <CriarProjetoViewDesktop></CriarProjetoViewDesktop>
        </div>
        <div v-else>
            <CriaProjetoViewMobile></CriaProjetoViewMobile>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted,watch } from 'vue'
import CriarProjetoViewDesktop from './desktop/CriarProjetoViewDesktop.vue';
import CriaProjetoViewMobile from './mobile/CriaProjetoViewMobile.vue';

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
