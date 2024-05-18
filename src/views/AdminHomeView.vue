<template>
    <div class="h-[90%]">
        <div v-if="screenWidth >= 1024" class="h-[90%]">
            <TelaAdmViewDesktop></TelaAdmViewDesktop>
        </div>
        <div v-else>
            <TelaAdmViewMobile></TelaAdmViewMobile>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
const screenWidth = ref(window.innerWidth)
import TelaAdmViewDesktop from './desktop/TelaAdministradorDesktop.vue';
import TelaAdmViewMobile from './mobile/TelaAdministradorMobile.vue';

watch(() => window.innerWidth, () => {
    screenWidth.value = window.innerWidth
})
onMounted(() => {
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
    })
    console.log("entrou na home on mounted");
})
</script>