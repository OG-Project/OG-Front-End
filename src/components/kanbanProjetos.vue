<template> 
    <div class="card">
      <div class="flex justify-center">
        <div class="divCor" :style="{ backgroundColor: cor }"></div>   
        <h2 class="card-titulo">{{ truncarNome(nome, larguraNomeEquipe()) }}</h2>
      </div>
      <div class="flex justify-center">
        <div>
          <img class="imagem" :src="imagem" alt="">
        </div>
      </div>
     
    </div>
     
    </template>
    <script setup>

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
      @apply flex 2xl:mt-[-4.3vh] 2xl:ml-[13vw] xl:ml-[14vw] xl:mt-[-4.3vh]  lg:ml-[14vw] lg:mt-[-4.4vh] md:ml-[15vw] md:mt-[-4.3vh] w-[30px] h-[30px] rounded-full;
    }
    .card-titulo {
      @apply truncate flex 2xl:w-[10vw] xl:w-[13vw] lg:w-[14vw] md:w-[14vw] text-base font-semibold items-center justify-start ml-3 mr-[3vw] md:text-sm md:ml-0;
     overflow: hidden; 
     white-space: nowrap; 
     text-overflow: ellipsis; 
    }

    @media(min-width: 2560px){
       .imagem{
        @apply 2xl:w-[40px] 2xl:h-[40px] mt-[-4.8vh] ml-[13vw]
       }
       .card-titulo{
        @apply ml-5 text-xl w-[10vw]
       }

    }

    @media(max-width: 620px){
      .imagem{
        @apply w-[40px] h-[40px] mt-[1.5vh] mr-[1.5vw]
       }
       .card-titulo{
        @apply ml-5 text-xl w-[60vw]
       }
    }
    </style>
    