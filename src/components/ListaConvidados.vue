<template>
  <div class="grid-template flex">
    <div
      class="convites-bg flex-col w-full bg-[#FEFBFF] shadow shadow-gray-950 "
      :style="{height: altura}"
    >
      <div class="flex justify-center">
        <h1 class="font-semibold xl:text-2xl" :alt="texto">{{ texto }}</h1>
      </div>
      <div class="flex items-center flex-col ml-5">
        <div class="w-full flex items-center mt-8 mb-2">
          <img class="imgDePerfil" :src="caminhoDaImagemPerfil" :alt="altDaImagemPerfil" />
          <h2 class="md:text-sm xl:text-xl mt-2">{{ Usuario.nome }}</h2>
            <img class="imgIcon" src="../imagem-vetores/sair.svg"  :style="imagemIcon" />
          
          <!-- Condição para renderizar o SelectPadrao -->
          <template v-if="mostrarSelect">
            <SelectPadrao
              class="selectEdit"
              styleSelect="select-cinza"
              :listaSelect="opcoesSelect"
            ></SelectPadrao>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SelectPadrao from './selectPadrao.vue';
import { defineProps } from 'vue';

const props = defineProps(['altura', 'nome', 'caminhoDaImagemPerfil', 'caminhoDaImagemIcon', 'altDaImagemIcon', 'texto', 'mostrarSelect']);

const Usuario = {
  nome: props.nome || "EduardoCosta",
  permissao: String,
  img: String
};
const opcoesSelect = ['Edit', 'View'];

const imagemIcon={
  height: props.altDaImagemIcon,
}
</script>
  <style lang="scss">
  /* ... o restante do seu estilo permanece o mesmo ... */
  </style>
  

<style lang="scss" scoped>

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
        flex-col  mr-[5px] ml-[-25px] mt-2
        xl:w-[2vw] xl:h-[4vh];
    }

    .selectEdit {
        @apply
        text-xs ml-[30px] mb-[10px] mt-2;
    }

    .grid-template{ 
        @apply w-[80%%] h-[11%] gap-4  items-center justify-items-center justify-center ; 
        display: grid;
        grid-template-columns: 40% 55%;
    }
   

</style>