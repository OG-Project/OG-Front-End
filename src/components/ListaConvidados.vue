<template>
    <div class="flex justify-center">
            <div class="convites-bg flex flex-col  bg-[#FEFBFF] shadow shadow-gray-950">
                <div class="flex justify-center">
                <h1 class="font-semibold xl:text-xl mt-5">CONVITES</h1>
                </div>
                <div class="flex justify-center items-center flex-col mt-4 ml-5">
                    <div class="flex justify-center items-center mt-4 mb-2">
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
        md:h-[21vh] w-full;
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

    @media (min-width: 2560px) {
        .convites-bg {
             @apply w-[20vw];
        }
        .selectEdit{
            @apply 2xl:text-2xl
        }
    }

    @media(min-width: 1280px) and (max-width: 1440px){
        
    }



</style>