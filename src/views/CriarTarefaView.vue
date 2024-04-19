<template>
    <div class="h-full">
        <div v-if="screenWidth >= 1024" class="h-[90%]">
            <CriaTarefaViewDesktop></CriaTarefaViewDesktop>
        </div>
        <div v-else>
            <CriaTarefaViewMobile></CriaTarefaViewMobile>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted,watch } from 'vue'
import CriaTarefaViewDesktop from './desktop/CriaTarefaViewDesktop.vue';
import CriaTarefaViewMobile from './mobile/CriaTarefaViewMobile.vue';

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