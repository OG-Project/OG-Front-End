<template>
    <div class="h-full">
        <div v-if="screenWidth >= 768" class="h-[90%]">
            <CriarProjetoViewDesktop></CriarProjetoViewDesktop>
        </div>
        <div v-else>
            <CriaProjetoViewMobile></CriaProjetoViewMobile>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CriarProjetoViewDesktop from './desktop/CriarProjetoViewDesktop.vue';
import CriaProjetoViewMobile from './mobile/CriaProjetoViewMobile.vue';

const screenWidth = ref(window.innerWidth)


onMounted(() => {
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
    })
})
</script>