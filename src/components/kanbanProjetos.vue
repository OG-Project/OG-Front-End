<template> 
    <div class="card">
      <div class="flex justify-center">
        <div class="divCor" :style="{ backgroundColor: cor }"></div>   
        <h2 class="card-titulo">{{ truncarNome(nome, larguraNomeEquipe()) }}</h2>
      </div>
      <div class="flex justify-center">
        <div>
          <img @click="editarProjeto(projeto)" class="icone" src="../imagem-vetores/tresPontos.svg" alt="">
        </div>
        <div>
          <img class="imagem" :src="imagem" alt="">
        </div>
      </div>
     
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

    const truncarNome = (nome, comprimentoMaximo) => (nome.length > comprimentoMaximo ? `${nome.slice(0, comprimentoMaximo)}...` : nome);

    function larguraNomeEquipe(){
        const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
        return 12;
    } else if (screenWidth > 768 && screenWidth <= 1024) {
        return 16;
    } else if (screenWidth > 1024 && screenWidth < 1920) {
        return 16;
    } else if (screenWidth >= 1920 && screenWidth < 2560) {
        return 18;
    }else if (screenWidth >= 2560){
        return 16;
    }
    }

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
      @apply flex 2xl:mt-[-3.5vh] 2xl:mr-[1vw] xl:ml-[0vw] xl:mt-[-3.7vh]  lg:ml-[0vw] lg:mt-[-3.7vh] md:mr-[4vw] md:mt-[-3.7vh] w-[30px] h-[30px] rounded-full;
    }
    .icone {
      @apply flex justify-end 2xl:mt-[-5vh] 2xl:ml-[13.1vw] xl:mt-[-5vh] xl:ml-[14.1vw] lg:mt-[-5vh] lg:ml-[14.7vw] md:mt-[-5.2vh] md:ml-[16vw];
    }
    .card-titulo {
      @apply truncate flex 2xl:w-[10vw] xl:w-[13vw] lg:w-[14vw] md:w-[14vw] text-base font-semibold items-center justify-start ml-3 mr-[3vw] md:text-sm md:ml-0;
     overflow: hidden; 
     white-space: nowrap; 
     text-overflow: ellipsis; 
    }

    @media(min-width: 2560px){
       .imagem{
        @apply 2xl:w-[60px] 2xl:h-[60px] mr-[2vw] mt-[-4vh]
       }
       .icone{
        @apply 2xl:w-[50px] 2xl:h-[50px] mt-[-6.5vh] ml-[12.45vw]
       }
       .card-titulo{
        @apply ml-5 text-xl w-[10vw]
       }

    }
    </style>
    