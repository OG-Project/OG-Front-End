<template>
    <div class="h-[90%]">
        <div v-if="screenWidth >= 768" class="h-full">
            {{ console.log("Será 2") }}
            <ChatViewDesktop></ChatViewDesktop>
        </div>
        <div v-else>
            {{ console.log("Será") }}
            <ChatViewMobile></ChatViewMobile>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted,watch } from 'vue'
import ChatViewDesktop from './desktop/ChatViewDesktop.vue';
import ChatViewMobile from './mobile/ChatViewMobile.vue';

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