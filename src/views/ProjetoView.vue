<template>
    <div id="step-11" class="h-[90%]">
        <div v-if="screenWidth >= 768" class="h-full">
            <ProjetoViewDesktop></ProjetoViewDesktop>
        </div>
        <div v-else>
            <ProjetoViewMobile></ProjetoViewMobile>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted,watch } from 'vue'
import CriarProjetoViewDesktop from './desktop/CriarProjetoViewDesktop.vue';
import CriaProjetoViewMobile from './mobile/CriaProjetoViewMobile.vue';
import ProjetoViewDesktop from './desktop/ProjetoViewDesktop.vue';
import ProjetoViewMobile from './mobile/ProjetoViewMobile.vue';

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