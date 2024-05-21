<template>
    <div class="h-[90%]">
        <div v-if="screenWidth >= 1024" class="h-[90%]" >
            <PerfilViewDesktop />
        </div>
        <div v-else>
            <PerfilViewMobile />
        </div>
    </div>
 
</template>

<script setup>
import { ref, onMounted,watch } from 'vue'
import PerfilViewDesktop from './desktop/PerfilViewDesktop.vue';
import PerfilViewMobile from './mobile/PerfilViewMobile.vue';
import router from '../router';
import { useRoute } from 'vue-router';
const route = useRoute()

// https://dontpad.com/02-05-2024gks
// import { useShepherd } from 'vue-shepherd'

const screenWidth = ref(window.innerWidth)

watch(() => window.innerWidth, () => {
  screenWidth.value = window.innerWidth
})
onMounted(() => {
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth
    })
    if(screenWidth.value>=1024){
        
    }
})

</script>

<style scoped>

</style>