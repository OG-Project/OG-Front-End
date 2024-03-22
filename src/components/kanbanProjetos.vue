<template> 
    <div class="card ml-10">
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
    imagem: String
    });

    function editarProjeto(projeto){
       const projetoId = projeto.id;
       VueCookies.set("projetoEditarId", projetoId, 1000000);
       console.log(VueCookies.set("projetoEditarId", projetoId, 1000000))
    }
    </script>
    <style scoped>
    .card {
      @apply flex flex-wrap justify-start w-[15vw] h-[6vh] bg-[#f2f2f2] shadow-md;
    }
    .divCor {
      @apply w-[1vw] h-[6vh] bg-orange-500;
      clip-path: polygon(50% 0, 78% 13%, 79% 49%, 78% 87%, 50% 100%, 0 100%, 0 79%, 0% 43%, 0 0);
    }
    
    .imagem {
      @apply absolute mt-5 ml-[13vw] w-[30px] h-[30px] rounded-full;
    }
    .icone {
      @apply flex fixed justify-end mt-[0.8vh] ml-[13.1vw];
    }
    .card-titulo {
      @apply flex text-base font-semibold items-center justify-start ml-3 mr-[3vw];
    }
    </style>
    