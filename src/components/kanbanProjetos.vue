<template> 
    <div class="card justify-center">
      <div class="divCor" :style="{ backgroundColor: cor }"></div>   
      <h2 class="card-titulo truncate">{{ nome }}</h2>
      <img @click="editarProjeto(projeto)" class="icone" src="../imagem-vetores/tresPontos.svg" alt="">
      <img class="imagem" :src="imagem" alt="">
    </div>
     
    </template>
    <script setup>
     import { VueCookies } from 'vue-cookies';

     const props = defineProps({
    cor: String,
    nome: String,
    imagem: String,
    categoria: String
    });

    function editarProjeto(projeto){
       const projetoId = projeto.id;
       VueCookies.set("projetoEditarId", projetoId, 1000000);
       console.log(VueCookies.set("projetoEditarId", projetoId, 1000000))
    }
    </script>
    <style scoped>
    .card {
      @apply flex flex-wrap justify-start 2xl:w-[15vw] 2xl:h-[6vh] xl:w-[17vw] xl:h-[6vh] lg:w-[18vw] lg:h-[6vh] md:w-[20vw] md:h-[6vh] bg-[#f2f2f2] shadow-md;
    }
    .divCor {
      @apply w-[1vw] h-[6vh] bg-orange-500;
      clip-path: polygon(50% 0, 78% 13%, 79% 49%, 78% 87%, 50% 100%, 0 100%, 0 79%, 0% 43%, 0 0);
    }
    
    .imagem {
      @apply absolute 2xl:mt-5 2xl:ml-[13vw] xl:ml-[14vw] xl:mt-5  lg:ml-[14.5vw] lg:mt-5 md:ml-[15.7vw] md:mt-5 w-[30px] h-[30px] rounded-full;
    }
    .icone {
      @apply flex fixed justify-end 2xl:mt-[0.8vh] 2xl:ml-[13.1vw] xl:mt-[0.8vh] xl:ml-[14.1vw] lg:mt-[0.8vh] lg:ml-[14.7vw] md:mt-[0.5vh] md:ml-[16vw];
    }
    .card-titulo {
      @apply flex 2xl:w-[10vw] xl:w-[13vw] lg:w-[14vw] md:w-[14vw] text-base font-semibold items-center justify-start ml-3 mr-[3vw] md:text-sm md:ml-0;
    }

    @media(min-width: 2560px){
       .imagem{
        @apply 2xl:w-[60px] 2xl:h-[60px] ml-[12.2vw] mt-8
       }
       .icone{
        @apply 2xl:w-[50px] 2xl:h-[50px] mt-[-0.5vh] ml-[12.45vw]
       }
       .card-titulo{
        @apply ml-5 text-xl w-[10vw]
       }
    }
    </style>
    