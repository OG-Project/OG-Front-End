<template>
    <div class="cardPrincipal">
        <div class="parteInformacoes">
            <div class='justify-start informacoes'>{{resumoTarefa}}</div>
            <div class=' justify-end informacoes'>Projeto: {{nomeProjeto}}</div>
        </div>
        <div @click="clicado=!clicado" class="caixaCheck">
            <div v-if="clicado" class='check'>
                <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.00977 14.994L7.99979 21.0001L16.5946 0.713867" stroke="#620BA7" stroke-width="3"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
let clicado=ref(false)
const props=defineProps({
    nomeProjeto:String,
    resumoTarefa:String
})
</script>

<style scoped>
@import url(../assets/main.css);
@layer components{
    .cardPrincipal{
        @apply shadow-md 
        hover:outline 
        hover:outline-2
        hover:outline-roxo 
        active:outline
        active:outline-2
        active:outline-clickBorder
        w-[425px] 
        bg-[#D9D9D9] 
        h-12 
        flex 
        justify-around 
        items-center;
    }
    .parteInformacoes{
        @apply flex 
        justify-between 
        border-b-2 
        w-[362px] 
        border-roxo ;
    }
    .informacoes{
        @apply
        truncate 
        text-ellipsis 
        flex  
        w-[181px] ;
    }
    .caixaCheck{
        @apply 
        cursor-pointer 
        w-8 
        h-8 
        bg-[#D9D9D9] 
        shadow-inner 
        shadow-slate-500;
    }
    .check{
        @apply 
        flex 
        justify-center 
        items-center 
        h-full;
    }
}
</style>