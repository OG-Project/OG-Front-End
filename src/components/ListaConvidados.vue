<template>
    <div class="grid-template flex">
            <div class="convites-bg flex-col w-full bg-[#FEFBFF] shadow shadow-gray-950">
                <div class="flex justify-center">
                <h1 class="font-semibold xl:text-xl">CONVITES</h1>
                </div>
                <div class="flex items-center flex-col mt-5 ml-5">
                    <div class=" w-full flex items-center mt-10 mb-2">
                        <img class="imgDePerfil" src="img" alt="">
                        <h2 class="md:text-sm xl:text-xl">{{ Usuario.nome }}</h2>
                        <img class="imgIcon" src="img" alt="">
                        <SelectPadrao class="selectEdit" styleSelect="select-cinza" :listaSelect="opcoesSelect"></SelectPadrao>
                    </div>
                </div>
            </div>
        </div>
  </template>

<script setup>
import SelectPadrao from './selectPadrao.vue';
import { defineProps, computed } from 'vue';

const Usuario = {
    nome: String,
    permissao: String,
    img: String
}
const opcoesSelect = ['Edit', 'View']
Usuario.nome = "EduardoCosta"
Usuario.img = "" 

</script>

<style lang="scss">

@import url(../assets/main.css);

    
    .convites-bg {
        @apply 
        xl:h-[24vh] 
        lg:h-[18vh]
        md:h-[21vh]
        justify-items-center justify-center;
        display: grid;
        grid-template-columns: 0% 0%;
        clip-path: polygon(20% 0, 80% 0, 100% 15%, 100% 100%, 0 100%, 0 15%);
    }

    .imgIcon {
        @apply bg-cover 
        bg-center flex flex-col justify-center 
        items-center mr-[-25px] ml-[10px] 
        xl:w-[2vw] xl:h-[4vh];
    }

    .imgDePerfil {
        @apply rounded-full bg-cover bg-center flex 
        flex-col mr-[5px] ml-[-25px]
        xl:w-[2vw] xl:h-[4vh];
    }

    .selectEdit {
        @apply
        text-xs ml-[30px] mb-[3px];
    }

    .grid-template{ 
        @apply w-[80%%] h-[11%] gap-4  items-center justify-items-center justify-center ; 
        display: grid;
        grid-template-columns: 40% 55%;
    }
   

</style>