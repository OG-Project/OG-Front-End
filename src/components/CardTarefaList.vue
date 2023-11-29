<template>
    <div class='w-[1760px] h-[50px] flex justify-around items-center bg-[#CCC9CE] hover:bg-[#CD98FD] active:outline active:outline-clickBorder active:outline-2'>
        <svg width="19" height="33" viewBox="0 0 19 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0.973022" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
        <rect x="11.4297" y="0.9729" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
        <rect y="12.658" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
        <rect x="11.4297" y="12.658" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
        <rect y="24.343" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
        <rect x="11.4297" y="24.343" width="7.42971" height="7.68505" rx="1" fill="#FEFBFF"/>
        </svg>

        <div v-for="propriedade in propriedades" class=' border-r-2 border-white pr-6'>
        {{propriedade.valor}} 
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
const props=defineProps({
    propriedades:[]

})
</script>

<style scoped>

</style>