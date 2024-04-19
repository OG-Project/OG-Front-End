<template>
  <div class="grid-template flex">
    <div class="convites-bg flex-col w-full bg-[#FEFBFF] shadow-md  shadow-gray-200 overflow-y-auto scrollbar-thin"
      :style="{ height: altura }">
      <div class="flex justify-center overfloow-y:auto">

        <h1 class="font-semibold xl:text-xl">{{ texto }}</h1>

      </div>
      <div class="flex items-center flex-col ml-5">
        <div class="w-full flex items-center justify-center mt-5 mb-2" v-for="convidado in listaConvidados" :key="convidado.name" :style="{'margin-left':marginLeft, 'margin-right': marginRight}">
             <!-- Renderiza as imagens apenas se houver usuários convidados -->
        <template v-if="listaConvidados.length > 0">
          <img class="imgDePerfil" :src="caminhoDaImagemPerfil" :style="altDaImagemPerfil" />
          
        </template>
        <h2 class="nome-convidado w-[4vw] md:text-sm xl:text-lg 2xl:mx-2 2xl:ml-2 xl:mx-10 xl:ml-2 lg:mx-3 lg:ml-2 md:ml-3 md:mx-1 truncate">{{ convidado.username }}</h2>
        <template v-if="listaConvidados.length > 0">
          <img class="imgIcon" :src="caminhoDaImagemIcon" :style="altDaImagem"  @click="$emit('foiClicado',convidado)"/>
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

defineEmits(['foiClicado'])

const props = defineProps({
  altura: String,
  nome: String,
  caminhoDaImagemIcon: String,
  altDaImagem: String,
  caminhoDaImagemPerfil: String,
  texto: String,
  mostrarSelect: String,
  marginLeft: String,
  marginRight: String,
  listaConvidados: {
    type: Array,
    default: []
  }
})


const opcoesSelect = ['Edit', 'View'];

const imagemIcon = {
  height: props.altDaImagemIcon,
}
</script>

<style lang="scss" scoped>
@import url(../assets/main.css);

    ::-webkit-scrollbar{
    @apply hidden;
    }

    .nome-convidado {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .convites-bg::-webkit-scrollbar{
        @apply hidden
        justify-items-center justify-center items-center;
        display: grid;
        grid-template-columns: 0% 0%;
        
    }
    .imgIcon {
        @apply bg-cover 
        bg-center flex flex-col justify-center 
        items-center 2xl:mr-[1vw] 2xl:ml-[2vw] xl:mr-[-2vw] xl:ml-[3vw] lg:mr-[-4vw] lg:ml-[4vw] md:mr-[-6vw] md:ml-[6vw]
        2xl:w-[2vw] 2xl:h-[3vh] xl:w-[2.5vw] xl:h-[4vh] lg:w-[3vw] lg:h-[5vh] md:w-[4vw] md:h-[6vh];
    }

    .imgDePerfil {
        @apply rounded-full bg-cover bg-center flex justify-center  
        flex-col 2xl:ml-2 xl:ml-10 lg:ml-8 md:ml-[-1.5vw]
        2xl:w-[3vw] 2xl:h-[5vh] xl:w-[3vw] xl:h-[6vh] lg:w-[4vw] lg:h-[8vh] md:w-[5vw] md:h-[10vh];
    }

    .selectEdit {
        @apply
        text-xs flex 2xl:ml-[0vw] xl:ml-[4vw] lg:ml-[6vw] md:ml-[8vw] mb-[10px] mt-2 
         2xl:w-[5vw] 2xl:h-[5vh] xl:w-[8vw] xl:h-[4vw] lg:w-[10vw] lg:h-[5vw] md:w-[12vw] md:h-[6vw] ;
    }

    .grid-template{ 
        @apply w-[100%] h-[11%] gap-4  items-center justify-items-center justify-center ; 
        display: grid;
        grid-template-columns: 40% 55%;
    }
   


.grid-template {

  @apply w-[100%] h-[11%] gap-4 items-center justify-items-center justify-center;

  display: grid;
  grid-template-columns: 40% 55%;
}
</style>