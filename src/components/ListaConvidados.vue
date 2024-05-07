<template>
  <div class="grid-template flex">
    <div class="convites-bg flex-col w-full bg-[[var(--backgroundItemsClaros)]] shadow-md  shadow-[var(--backgroundItemsClaros)] overflow-y-auto scrollbar-thin"
      :style="{ height: altura }">
      <div class="flex justify-center overfloow-y:auto">

        <h1 class="font-semibold xl:text-xl">{{ texto }}</h1>

      </div>
      <div class="flex items-center flex-col ml-5">
        {{ console.log(convidado) }}
        <div class="w-full flex items-center justify-center mt-5 mb-2" v-for="convidado in listaConvidados" :key="convidado.name" :style="{'margin-left':marginLeft, 'margin-right': marginRight}">
             <!-- Renderiza as imagens apenas se houver usuários convidados -->
        <template v-if="listaConvidados.length > 0 && convidado.foto != null">
          <img class="imgDePerfil" :src="`data:${convidado.foto.tipo};base64,${convidado.foto.dados}`" :style="altDaImagemPerfil" />
          
        </template>
        <userTodoPreto v-else class="imgPerfilPadrao"></userTodoPreto>
        <h2  class="nome-convidado w-[4vw] md:text-sm xl:text-lg 2xl:mx-2 2xl:ml-2 xl:mx-10 xl:ml-2 lg:mx-3 lg:ml-2 md:ml-3 md:mx-1 truncate">{{ convidado.username == null ? convidado.nome : convidado.username  }}</h2>
        <template v-if="listaConvidados.length > 0">
          <sair class="imgIcon"  @click="$emit('foiClicado',convidado)"></sair>
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
import sair from '../imagem-vetores/Sair.vue'
import userTodoPreto from '../imagem-vetores/userTodoPreto.vue'

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

const removerConvidado = (convidado) => {
  // Emitir um evento para notificar o componente pai sobre a exclusão do convidado
  emit('foiClicado', convidado);
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
        2xl:w-[60px] 2xl:h-[60px] xl:w-[60px] xl:h-[60px] lg:w-[55px] lg:h-[55px] md:w-[50px] md:h-[50px];
    }
    .imgPerfilPadrao{
      @apply rounded-full bg-cover bg-center flex justify-center  
        flex-col 2xl:ml-2 xl:ml-10 lg:ml-8 md:ml-[-1.5vw]
        2xl:w-[50px] 2xl:h-[50px] xl:w-[50px] xl:h-[50px] lg:w-[45px] lg:h-[45px] md:w-[40px] md:h-[40px];
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
    @media(max-width: 620px){
      .imgDePerfil{
       @apply mr-2 w-[40px] h-[40px]; 
      }
      .imgIcon{
       @apply bg-cover 
       bg-center flex flex-col justify-center 
       items-center mr-5 ml-[2vw];
      }
      .nome-convidado  {
       @apply mr-2 justify-center w-[20vw];
      }
      .selectEdit{
       @apply w-[60px] h-[30px]
      }
   }
</style>