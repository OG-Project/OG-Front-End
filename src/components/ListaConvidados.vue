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
        <div class="w-full flex items-center mt-8 mb-2" v-for="convidado in listaConvidados" :key="convidado.nome">
             <!-- Renderiza as imagens apenas se houver usuários convidados -->
        <template v-if="listaConvidados.length > 0">
          <img class="imgDePerfil" :src="caminhoDaImagemPerfil" :style="altDaImagemPerfil" />
          
        </template>

        <h2 class="nome-convidado md:text-sm xl:text-xl w-[15vh]">{{ truncarNome(convidado.nome, 15) }}</h2>

        <template v-if="listaConvidados.length > 0">
          <img class="imgIcon" :src="caminhoDaImagemIcon" :style="altDaImagem" />
        </template>
        
        <!-- Renderiza o SelectPadrao apenas se houver usuários convidados -->
        <template v-if="mostrarSelect">
          <template v-if="listaConvidados.length > 0">
            <SelectPadrao
              class="selectEdit"
             styleSelect="select-cinza"
              :listaSelect="opcoesSelect"
            ></SelectPadrao>
          </template>
        </template>
        
    
        </div>
      </div>
    </div>
  </div>  
</template>
<script setup>
import SelectPadrao from './selectPadrao.vue';
import { defineProps } from 'vue';

const props = defineProps({
  altura:String,
  nome:String,
  caminhoDaImagemIcon:String,
  altDaImagem:String,
  texto:String,
  mostrarSelect:String,
  listaConvidados:{
    type: []
  }
})


const truncarNome = (nome, comprimentoMaximo) => (nome.length > comprimentoMaximo ? `${nome.slice(0, comprimentoMaximo)}...` : nome);
const opcoesSelect = ['Edit', 'View'];
</script>
  <style lang="scss">
  /* ... o restante do seu estilo permanece o mesmo ... */
  </style>
  

<style lang="scss" scoped>

@import url(../assets/main.css);

    .nome-convidado {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

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
        flex-col  mr-[5px] ml-[-25px]
        xl:w-[2vw] xl:h-[4vh];
    }

    .selectEdit {
        @apply
        text-xs ml-[30px] mb-[10px] mt-2 ;
    }

    .grid-template{ 
        @apply w-[80%%] h-[11%] gap-4  items-center justify-items-center justify-center ; 
        display: grid;
        grid-template-columns: 40% 55%;
    }
   

</style>