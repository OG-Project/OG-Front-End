<template> 
    <div class="card justify-center">
      <div class="divCor" :style="{ backgroundColor: cor }"></div>   
      <h2 class="card-titulo">{{ nome }}</h2>
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
      @apply absolute 2xl:mt-5 2xl:ml-[13vw] xl:ml-[14vw] xl:mt-6 lg:ml-[14vw] lg:mt-8 md:ml-[15vw] md:mt-9 w-[30px] h-[30px] rounded-full;
    }
    .icone {
      @apply flex fixed justify-end 2xl:mt-[0.8vh] 2xl:ml-[13.1vw] xl:mt-[0.8vh] xl:ml-[14.1vw] lg:mt-[0.8vh] lg:ml-[14.1vw] md:mt-[0.8vh] md:ml-[15vw];
    }
    .card-titulo {
      @apply flex text-base font-semibold items-center justify-start ml-3 mr-[3vw];
    }
    </style>
    